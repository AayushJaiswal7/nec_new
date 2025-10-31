import React, { useState, useEffect } from 'react';
import ReusableModal from '../../components/ReusableModal';
import PasswordField from '../../components/PasswordField';
import ButtonComponent from '../../components/ButtonComponent';
import api from '../../utils/api';

function ForceReset() {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ new_password: '', confirm_password: '' });
  const [formValidationError, setFormValidationError] = useState({ new_password: '', confirm_password: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const checkFirstLogin = async () => {
      try {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (!storedUser) return;

        const { data } = await api.post('/users/check-is-first-login', { user_id: storedUser.userId });

        if (data.is_first_login) setShowModal(true);
      } catch (error) {
        console.error('Error checking first login:', error);
      }
    };

    checkFirstLogin();
  }, []);

  const handleFormChange = (fieldName, value) => {
    setFormData(prev => ({ ...prev, [fieldName]: value }));
    validateField(fieldName, value);
  };

  const validateField = (fieldName, value) => {
    let errorMsg = '';
    if (!value.trim()) errorMsg = 'This field is required';
    else if (fieldName === 'new_password' && value.length < 6)
      errorMsg = 'Password must be at least 6 characters long';

    setFormValidationError(prev => ({ ...prev, [fieldName]: errorMsg }));
    return !errorMsg;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { new_password, confirm_password } = formData;
    let valid = true;

    if (!new_password.trim()) {
      setFormValidationError(prev => ({ ...prev, new_password: 'Password is required' }));
      valid = false;
    } else if (new_password.length < 6) {
      setFormValidationError(prev => ({ ...prev, new_password: 'Password must be at least 6 characters long' }));
      valid = false;
    }

    if (!confirm_password.trim()) {
      setFormValidationError(prev => ({ ...prev, confirm_password: 'Confirm Password is required' }));
      valid = false;
    } else if (new_password !== confirm_password) {
      setFormValidationError(prev => ({ ...prev, confirm_password: 'Passwords do not match' }));
      valid = false;
    }

    if (!valid) return;

    try {
      setIsSubmitting(true);
      setSuccessMessage('');

      const storedUser = JSON.parse(localStorage.getItem('user'));
      const user_id = storedUser?.userId;

      await api.post('/users/reset-password', { user_id, password: new_password });

      setSuccessMessage('✅ Password updated successfully!');
      setTimeout(() => setShowModal(false), 1000);
      setFormData({ new_password: '', confirm_password: '' });
    } catch (error) {
      console.error('Error resetting password:', error);
      alert(error?.response?.data?.message || 'Something went wrong');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {showModal && (
        <ReusableModal isOpen={showModal} title="Reset Your Password" onClose={() => setShowModal(false)}>
          <div className="flex flex-col space-y-8 items-center justify-center">
            <PasswordField
              label="New Password"
              name="new_password"
              value={formData.new_password}
              onChange={(e) => handleFormChange('new_password', e.target.value)}
              error={formValidationError.new_password}
            />

            <PasswordField
              label="Confirm Password"
              name="confirm_password"
              value={formData.confirm_password}
              onChange={(e) => handleFormChange('confirm_password', e.target.value)}
              error={formValidationError.confirm_password}
            />

            {successMessage && <p className="text-green-600 font-semibold text-sm">{successMessage}</p>}

            <ButtonComponent title={isSubmitting ? 'Updating...' : 'Reset Password'} type="submit" disabled={isSubmitting} />
          </div>
        </ReusableModal>
      )}
    </form>
  );
}

export default ForceReset;
