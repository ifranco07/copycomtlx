import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import styles from './Auth.module.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
  });

  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
  };

  const onSubmit = async (data) => {
    try {
      const response = await axios.post('http://localhost:3001/api/auth/login', data, {
        withCredentials: true,
      });

      if (response.status === 200) {
        alert('Login successful!');
        navigate('/userDetails');
      }
    } catch (error) {
      console.error('Login error:', error);
      if (error.response) {
        alert(error.response.data.message || 'Login failed');
      } else {
        alert('An unexpected error occurred. Please try again.');
      }
    }
  };

  return (
    <section className={styles.authSection}>
      <div className={styles.imageContainer}>
        <img
          src="src/assets/Logo.png"
          alt="Login illustration"
          className={styles.image}
        />
      </div>

      <div className={styles.formContainer}>
        <form className={styles.authForm} onSubmit={handleSubmit(onSubmit)}>
          <h2 className={styles.authTitle}>Login to your account</h2>

          {/* Email */}
          <div className={styles.inputGroup}>
            <label htmlFor="email" className={styles.label}>Email</label>
            <input
              id="email"
              type="email"
              className={styles.input}
              placeholder="Enter your email"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'Invalid email address',
                },
              })}
            />
            {errors.email && (
              <div className={styles.error}>{errors.email.message}</div>
            )}
          </div>

          {/* Password */}
          <div className={styles.inputGroup} style={{ position: 'relative' }}>
            <label htmlFor="password" className={styles.label}>Password</label>
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              className={styles.input}
              placeholder="Enter your password"
              style={{ paddingRight: '40px' }}
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters',
                },
              })}
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              aria-label={showPassword ? "Hide password" : "Show password"}
              style={{
                position: "absolute",
                right: "10px",
                top: "50%",
                transform: "translateY(-50%)",
                background: "transparent",
                border: "none",
                cursor: "pointer",
                padding: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "24px",
                height: "24px",
                color: "#666",
              }}
            >
              {showPassword ? (
                // Ojo cerrado
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2" width="20" height="20">
                  <path strokeLinecap="round" strokeLinejoin="round"
                    d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-10a9.96
                     9.96 0 011.175-4.563M19.071 8.57A9.958 9.958 0 0122 12c0
                     5.523-4.477 10-10 10a9.96 9.96 0 01-4.563-1.175M15
                     12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 3l18 18" />
                </svg>
              ) : (
                // Ojo abierto
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2" width="20" height="20">
                  <path strokeLinecap="round" strokeLinejoin="round"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0
                     8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542
                     7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              )}
            </button>
            {errors.password && (
              <div className={styles.error}>{errors.password.message}</div>
            )}
          </div>

          <button type="submit" className={styles.submitButton}>
            Login
          </button>

          <p className={styles.toggleText}>
            Don't have an account?{' '}
            <Link to="/register" className={styles.toggleLink}>
              Register
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
};

export default Login;
