const User = require('../model/User');
const Role = require('../model/Role');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
});

const loginUser = async (req, res) => {
    const { userId, password } = req.body;

    if (!userId || !password) {
        return res.status(400).json({ message: 'User ID and Password are required' });
    }

    // const hash = await bcrypt.hash('Nec@123', 10);
    // console.log(hash);

    try {
        // Find user by userId
        const user = await User.findOne({ where: { user_id: userId, is_deleted: '0', } });

        if (!user) return res.status(401).json({ message: 'Invalid credentials' });

        if (user.is_active === '0') return res.status(401).json({ message: 'User is inactive, please contact admin' });

        // Compare password
        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) return res.status(401).json({ message: 'Password did not match' });

        // Create JWT payload
        const payload = {
            id: user.id,
            userId: user.user_id,
            // name: user.user_name,
            is_first_login: user.is_first_login
        };

        // Sign token
        const token = jwt.sign(payload, process.env.JWT_SECRET || 'your_jwt_secret', { expiresIn: '1h' });

        res.json({
            message: 'Login successful',
            token,
            user: payload
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
const userIdGenerator = async (req, res) => {
    try {

        const lastUser = await User.findOne({
            order: [['id', 'DESC']],
        });

        let newUserId = 1;


        if (lastUser && lastUser.user_id) {
            newUserId = parseInt(lastUser.user_id, 10) + 1;
        }
        newUserId = newUserId.toString().padStart(4, '0');
        res.json({
            message: 'User ID generated successfully',
            userId: newUserId
        });

        return newUserId.toString().padStart(4, '0');

    } catch (err) {
        console.error('Error generating user ID:', err);
        throw new Error('Error generating user ID');
    }
};
const addUser = async (req, res) => {
    try {

        //get all details from req body
        const { user_id, user_name, email, phone, role_id, department, branch, initial_password, valid_from, valid_to, is_active } = req.body;

        //check user already exists
        const userExists = await User.findOne({ where: { email: email } });
        if (userExists) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        const newUser = await User.create({
            user_id,
            user_name,
            email,
            phone,
            role_id,
            department,
            branch,
            initial_password,
            valid_from,
            valid_to,
            is_active
        });

        // Send email
        (async () => {
            try {
                await sendCredentialsMail(email, user_name, initial_password, user_id);
            } catch (error) {
                console.error('Email sending failed:', error);
                // You might want to log this to a monitoring system
            }
        })();

        return res.status(201).json(newUser);

    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

async function sendCredentialsMail(email, user_name, initial_password, user_id) {

    try {
        const mailOptions = {
            from: `"NEC Construction" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: `Your NEC Construction Login Credentials`,
            headers: {
                //"List-Unsubscribe": `<${process.env.CLIENT_URL}/unsubscribe>`,
                "X-Priority": "1",
                Importance: "High",
            },
            html: `
  <table width="100%" style="border-collapse: collapse; margin-bottom: 20px;">
    <tr>
      <td style="vertical-align: top; text-align: left;">
        <p>Dear <strong>${user_name}</strong>,</p>

        <p>Welcome to <strong>NEC Construction</strong>. Below are your login credentials:</p>

        <table style="margin: 20px 0; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px; font-weight: bold;">Username:</td>
            <td style="padding: 8px;">${user_id}</td>
          </tr>
          <tr>
            <td style="padding: 8px; font-weight: bold;">Password:</td>
            <td style="padding: 8px;">${initial_password}</td>
          </tr>
        </table>

        <p>If you have any questions or require support, please don’t hesitate to contact us.</p>

        <p><strong>Contact Us:</strong></p>
        <table style="margin-top: 10px;">
          <tr>
            <td style="padding-top: 5px;">
              <a href="mailto:info@dtdengineering.com" style="text-decoration: none; color: #00376b; font-size: 16px;">
                <strong>Email:</strong> ${process.env.EMAIL_USER}
              </a>
            </td>
          </tr>
        </table>

        <p style="margin-top: 20px;">Best regards,<br><strong>NEC Construction Team</strong></p>
      </td>
      
    </tr>
  </table>
`,

            // <td style="vertical-align: top; text-align: right;">
            //         <img src="${process.env.WEB_URL}/assets/logo-Qw56rVng.png" alt="NEC Construction" style="max-height: 80px;" />
            //       </td>

        };

        await transporter.sendMail(mailOptions);
        console.log("Mail sent successfully");

    } catch (e) {
        console.log("error sending mail", e)

    }

}





const resetPassword = async (req, res) => {
    try {
        const { user_id, password } = req.body;

        if (!user_id || !password) {
            return res.status(400).json({ message: "User ID and password are required" });
        }

        // Hash password
        const hash = await bcrypt.hash(password, 10);

        // Update user password
        const [updated] = await User.update(
            { password: hash, is_first_login: "0" },
            { where: { user_id } }
        );

        if (updated === 0) {
            return res.status(404).json({ message: "Pasword didn't updated" });
        }

        return res.status(200).json({
            message: "Password updated successfully",
        });
    } catch (err) {
        console.error("Error resetting password:", err);
        return res.status(500).json({ message: "Internal server error" });
    }
};

const checkIsFirstLogin = async (req, res) => {
    try {
        const { user_id } = req.body;
        const user = await User.findOne({ where: { user_id } });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (user.is_first_login === "1") {
            return res.status(200).json({ message: "User needs to reset password", is_first_login: true });
        } else {
            return res.status(200).json({ message: "User does not need to reset password", is_first_login: false });
        }

    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

const getAllUser = async (req, res) => {
    try {
        const { limit = 10, page = 1, search } = req.query;
        const offset = (page - 1) * limit;

        // Base condition — get only users that are not deleted
        const whereCondition = { is_deleted: '0' };

        // Add search filter if 'search' query is provided
        if (search) {
            const lowerSearch = search.toLowerCase();
            whereCondition[Op.or] = [
                Sequelize.where(
                    Sequelize.fn("LOWER", Sequelize.col("user_name")),
                    { [Op.like]: `%${lowerSearch}%` }
                ),
                Sequelize.where(
                    Sequelize.fn("LOWER", Sequelize.col("email")),
                    { [Op.like]: `%${lowerSearch}%` }
                ),
                Sequelize.where(
                    Sequelize.fn("LOWER", Sequelize.col("user_id")),
                    { [Op.like]: `%${lowerSearch}%` }
                ),
                Sequelize.where(
                    Sequelize.fn("LOWER", Sequelize.col("department")),
                    { [Op.like]: `%${lowerSearch}%` }
                ),
                Sequelize.where(
                    Sequelize.fn("LOWER", Sequelize.col("branch")),
                    { [Op.like]: `%${lowerSearch}%` }
                ),
            ];
        }

        // Fetch paginated users with role information
        const { count, rows: users } = await User.findAndCountAll({
            where: whereCondition,
            include: [
                {
                    model: Role,
                    attributes: ['role_name'], // Only include role_name from Role model
                    as: 'role', // Add this line - use the same alias as in your association
                    required: false // Use left join to include users even if role not found
                }
            ],
            limit: parseInt(limit),
            offset: parseInt(offset),
            order: [["id", "ASC"]],
        });

        const totalPages = Math.ceil(count / limit);

        // Format the response to include role_name at the root level
        const formattedUsers = users.map(user => {
            const userData = user.get({ plain: true });
            return {
                ...userData,
                role_name: user.role ? user.role.role_name : null // Access via the alias 'role'
            };
        });

        // Send paginated response
        return res.status(200).json({
            success: true,
            message: "Users fetched successfully",
            totalItems: count,
            totalPages,
            currentPage: parseInt(page),
            itemsPerPage: parseInt(limit),
            users: formattedUsers,
        });
    } catch (error) {
        console.error("Error fetching users:", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message,
        });
    }
};
 
 
const editUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { user_name, user_email, phone, role_id, department, branch, is_Active, valid_from, valid_to, is_active } = req.body;
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        user.user_name = user_name;
        user.user_email = user_email;
        user.phone = phone;
        user.role_id = role_id;
        user.department = department;
        user.branch = branch;
        user.is_Active = is_Active;
        user.valid_from = valid_from;
        user.valid_to = valid_to;
        user.is_active = is_active;
        await user.save();
        return res.status(200).json(user);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}
 
const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        user.is_deleted = '1';
        await user.save();
        return res.status(200).json({ message: "User deleted successfully" });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

const forgotPassword = async (req, res) => {
    try {
        const { user_id } = req.body;

        if (!user_id) {
            return response.sendError(res, "User-Id is required", 400);
        }

        const user = await User.findOne({ where: { user_id } });

        if (!user) {
            return response.sendSuccess(res, {}, "User not found", 404);
        }

        if (user.is_deleted == 1) {
            return response.sendSuccess(res, {}, "User is inactive", 404);
        }



        const password = decryptPassword(user.password);

        await sendCredentialsForgotMail(user.email, user.user_name, password, user.user_id);

        return response.sendSuccess(
            res,
            {},
            "Credentials sent to registered email",
            200
        );
    } catch (error) {
        console.error("Error in forgotPassword:", error);
        return response.sendError(res, error.message, 500);
    }
};

async function sendCredentialsForgotMail(email, user_name, password, user_id) {

    try {
        const mailOptions = {
            from: `"NEC Construction" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: `Your NEC Construction Login Credentials`,
            headers: {
                //"List-Unsubscribe": `<${process.env.CLIENT_URL}/unsubscribe>`,
                "X-Priority": "1",
                Importance: "High",
            },
            html: `
  <table width="100%" style="border-collapse: collapse; margin-bottom: 20px;">
    <tr>
      <td style="vertical-align: top; text-align: left;">
        <p>Dear <strong>${user_name}</strong>,</p>

        <p>Below are your login credentials:</p>

        <table style="margin: 20px 0; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px; font-weight: bold;">User Id:</td>
            <td style="padding: 8px;">${user_id}</td>
          </tr>
          <tr>
            <td style="padding: 8px; font-weight: bold;">Password:</td>
            <td style="padding: 8px;">${password}</td>
          </tr>
        </table>

        <p>If you have any questions or require support, please don’t hesitate to contact us.</p>

        <p><strong>Contact Us:</strong></p>
        <table style="margin-top: 10px;">
          <tr>
            <td style="padding-top: 5px;">
              <a href="mailto:info@necconstruction.com" style="text-decoration: none; color: #00376b; font-size: 16px;">
                <strong>Email:</strong> ${process.env.EMAIL_USER}
              </a>
            </td>
          </tr>
        </table>

        <p style="margin-top: 20px;">Best regards,<br><strong>NEC Construction Team</strong></p>
      </td>
    
    </tr>
  </table>
`,

            //   <td style="vertical-align: top; text-align: right;">
            //     <img src="${process.env.WEB_URL}/assets/logo-Qw56rVng.png" alt="NEC Construction" style="max-height: 80px;" />
            //   </td>

        };

        await transporter.sendMail(mailOptions);
        console.log("Mail sent successfully");

    } catch (e) {
        console.log("error sending mail", e)

    }

}



module.exports = {
    loginUser,
    addUser,
    getAllUser,
    resetPassword,
    checkIsFirstLogin,
    deleteUser,
    editUser,
    userIdGenerator,
    forgotPassword,
};
