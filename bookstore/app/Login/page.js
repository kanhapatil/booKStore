"use client";
import axios from 'axios';
import { useRouter } from 'next/navigation'
import LogInImg from '@/components/LogInImg';
import styles from './Login.module.css';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Login = () => {
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: Yup.object({
      username: Yup.string().email('Invalid email address!').required('Email address is required!'),
      password: Yup.string().min(6, 'Must be at least 6 characters').required('Password is required!'),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        const response = await axios.post(
          'http://127.0.0.1:8000/user/login/',
          values
        );

        const token = response.data.access_token;
        localStorage.setItem('token', token);
        localStorage.setItem('email', values.username)

        if (response.status === 200) {
          router.push('/');
        }
      } catch (error) {
        console.error('Login failed:', error.response.status);
        toast.warning("Email or Password is incorect!");
      }
      resetForm();
    },
  });

  return (
    <>
      <LogInImg />
      <ToastContainer />
      <div className={styles.login}>
        <motion.form
          className={styles.form}
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { scale: 0.4, opacity: 0 },
            visible: {
              scale: 1,
              opacity: 1,
              transition: {
                delay: 0.2,
              },
            },
          }}
          method="POST"
          onSubmit={formik.handleSubmit}
        >
          <p className={styles.heading}>Log in form</p>

          <input
            type="email"
            placeholder="Email Address"
            className={styles.input}
            {...formik.getFieldProps('username')}
          />
          {formik.touched.username && formik.errors.username && (
            <div className={styles.error}>{formik.errors.username}</div>
          )}

          <input
            type="password"
            placeholder="Password"
            className={styles.input}
            {...formik.getFieldProps('password')}
          />
          {formik.touched.password && formik.errors.password && (
            <div className={styles.error}>{formik.errors.password}</div>
          )}

          <div className={styles.account_text}>
            <p>
              &nbsp;&nbsp;Don't have an account? <Link href="/Signup">Signup</Link>
            </p>
            <p>Forget password?&nbsp;&nbsp;</p>
          </div>

          <button type="submit" className="btn">
            Log In <span aria-hidden="true">&rarr;</span>
          </button>
        </motion.form>
      </div>
    </>
  );
};

export default Login;







// "use client"
// import { useState } from 'react';
// import axios from 'axios';

// const LoginPage = () => {
//   const [credentials, setCredentials] = useState({
//     username: '',
//     password: '',
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setCredentials(prevState => ({ ...prevState, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post('http://127.0.0.1:8000/api/auth/login/', credentials);
//       const token = response.data.access; 
//       localStorage.setItem('token', token);
//       console.log(credentials, response.status);
//       console.log(token);
//     } catch (error) {
//       console.error('Login failed:', error);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} style={{ marginTop: '5rem' }}>
//       <h1>Kanha</h1>
//       <input type="text" name="username" style={{ background: 'silver' }} placeholder='Username' value={credentials.username} onChange={handleChange} />
//       <input type="password" name="password" style={{ background: 'silver' }} placeholder='Password' value={credentials.password} onChange={handleChange} />
//       <button type="submit">Login</button>
//     </form>
//   );
// };

// export default LoginPage;
