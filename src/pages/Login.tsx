import { useFormik } from 'formik'
import { useNavigate } from 'react-router-dom'
import { SessionSchema } from '../validations/RegistrationValidation'
import { useSessionsContext } from '../context/SessionContext'


const Login = () => {
  const { createSession } = useSessionsContext()
  // const { id } = session
  let navigate = useNavigate();
  const { handleSubmit, handleChange, errors, touched} = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: SessionSchema,
    onSubmit: values => {
      createSession(values)
      navigate('/')
    },
  })
  return (
    <form onSubmit={handleSubmit}>
      <div className="field">
        <input name="email" onChange={handleChange} type="email" placeholder="email"/>
        {errors.email && touched.email ? <div>{errors.email}</div> : null}
      </div>
      <div className="field">
        <input name="password" onChange={handleChange} type="password" placeholder="password"/>
        {errors.password && touched.password ? <div>{errors.password}</div> : null}
      </div>
      <button type="submit">Submit</button>
    </form>
  )
}

export default Login