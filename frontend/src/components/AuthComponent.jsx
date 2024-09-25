import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function AuthComponent() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [forgotEmail, setForgotEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [newPassword, setNewPassword] = useState('');
    const navigate = useNavigate();
  // Handle login or signup form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isLogin
      ? 'http://localhost:5000/api/auth/login'
      : 'http://localhost:5000/api/auth/signup';
    try {
      const response = await axios.post(endpoint, { email, password });
      navigate('/home');
      setMessage(response.data.token ? 'Login/Signup successful!' : 'Something went wrong');
    } catch (error) {
      setMessage(error.response?.data?.msg || 'Error occurred');
    }
  };

  // Handle forgot password submit
  const handleForgotPassword = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/forgot-password', { email: forgotEmail });
      setMessage(response.data.msg || 'Reset link sent!');
    } catch (error) {
      setMessage(error.response?.data?.msg || 'Error occurred');
    }
  };

  // Handle OTP verification
  const handleOtpVerification = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/verify-otp', { email: forgotEmail, otp });
      if (response.data.success) {
        setIsOtpVerified(true);
        setMessage('OTP Verified! Enter a new password.');
      } else {
        setMessage('Invalid OTP.');
      }
    } catch (error) {
      setMessage(error.response?.data?.msg || 'Error occurred during OTP verification.');
    }
  };

  // Handle new password update
  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/update-password', { email: forgotEmail, newPassword });
      setMessage(response.data.msg || 'Password updated successfully!');
    } catch (error) {
      setMessage(error.response?.data?.msg || 'Error occurred while updating password.');
    }
  };

  return (
    <div className="auth-container">
      <div className="form-switcher">
        <button onClick={() => setIsLogin(true)} disabled={isLogin}>
          Login
        </button>
        <button onClick={() => setIsLogin(false)} disabled={!isLogin}>
          Signup
        </button>
      </div>

      <form onSubmit={handleSubmit} className="auth-form">
        <h2>{isLogin ? 'Login' : 'Signup'}</h2>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="submit-btn">
          {isLogin ? 'Login' : 'Signup'}
        </button>

        {isLogin && (
          <div className="forgot-password-section">
            <button
              type="button"
              onClick={() => document.getElementById('forgot-password-form').style.display = 'block'}
              className="forgot-password-btn"
            >
              Forgot Password?
            </button>
          </div>
        )}
      </form>

      <div id="forgot-password-form" style={{ display: 'none' }}>
        <h3>Forgot Password</h3>
        <form onSubmit={handleForgotPassword} className="forgot-password-form">
          <input
            type="email"
            placeholder="Enter your email"
            value={forgotEmail}
            onChange={(e) => setForgotEmail(e.target.value)}
            required
          />
          <button type="submit">Send Reset Link</button>
        </form>

        <form onSubmit={handleOtpVerification} className="otp-verification-form">
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />
          <button type="submit">Verify OTP</button>
        </form>

        {isOtpVerified && (
          <form onSubmit={handlePasswordUpdate} className="new-password-form">
            <input
              type="password"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
            <button type="submit">Update Password</button>
          </form>
        )}
      </div>

      <p>{message}</p>
    </div>
  );
}
