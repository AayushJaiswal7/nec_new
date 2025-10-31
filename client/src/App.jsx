import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AppRoutes from './routes/routes.jsx';
import PageTitleManager from './utils/PageTitleManager.jsx';
import { AuthProvider } from './contexts/AuthContext.jsx';

const App = () => {
  return (
    
    <AuthProvider>
      <Router>
        <PageTitleManager />
        <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
};

export default App;