import { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { useNavigate, useLocation } from 'react-router-dom'
import { SessionSchema } from '../validations/RegistrationValidation'
import { useSessionsContext } from '../context/SessionContext'
import { Link } from 'react-router-dom'


const Login = () => {

  const location: any = useLocation()
  const [isFalse, setFalse] = useState(false)
  const { createSession } = useSessionsContext()
  const status = localStorage.getItem('isFalse')

  useEffect(() => {
    setTimeout(() => {
     localStorage.removeItem('isFalse')
    }, 500)
  }, [isFalse])

  const { handleSubmit, handleChange, errors, touched } = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: SessionSchema,
    onSubmit: values => {
      createSession(values)
    },
  })

  const notification = () => (
    <div key={location.state.type} className={`logout alert alert-${location.state.type}`}>
      <i className='fas fa-info-circle' />{location.state.msg}
    </div>
  )

  status && setTimeout(() => {
    const alert: any = document.querySelector('.logout')
    alert.style.display = 'none'
  }, 5000);

  return (
    <div>
      <div>{ status && notification() }</div>
      <form onSubmit={handleSubmit}>
        <div className="field sign-in">
          <input className="input-field" name="email" onChange={handleChange} type="email" placeholder="Email"/>
          {errors.email && touched.email ? <div className="error ff-Kumbh">{errors.email}</div> : null}
        </div>
        <div className="field">
          <input className="input-field" name="password" onChange={handleChange} type="password" placeholder="Password"/>
          {errors.password && touched.password ? <div className="error ff-Kumbh">{errors.password}</div> : null}
        </div>
        <button className="submit-button" type="submit">Submit</button>
      </form>
      <Link to="/register" className="sign_in">Sign up</Link>
    </div>
  )
}

export default Login;