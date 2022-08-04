import { useEffect } from 'react'
import { useFormik } from 'formik'
import { useNavigate } from 'react-router-dom'
import { SessionSchema } from '../validations/RegistrationValidation'
import { useSessionsContext } from '../context/SessionContext'
import { Link } from 'react-router-dom'


const Login = () => {
  const { createSession, isAuthenticated } = useSessionsContext()
  let navigate = useNavigate();
  // const id_session = localStorage.getItem('session_id');
  
  const { handleSubmit, handleChange, errors, touched} = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: SessionSchema,
    onSubmit: values => {
      createSession(values)
      navigate('/store')
    },
  })
  
  // useEffect(() => {
  //   if(isAuthenticated){
  //     navigate('/store')
  //   }
  // },[isAuthenticated])

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="field sign-in">
          <input className="input-field" name="email" onChange={handleChange} type="email" placeholder="Email"/>
          {errors.email && touched.email ? <div>{errors.email}</div> : null}
        </div>
        <div className="field">
          <input className="input-field" name="password" onChange={handleChange} type="password" placeholder="Password"/>
          {errors.password && touched.password ? <div>{errors.password}</div> : null}
        </div>
        <button className="submit-button" type="submit">Submit</button>
      </form>
      <Link to="/register">Sign up</Link>
    </div>
  )
}

export default Login