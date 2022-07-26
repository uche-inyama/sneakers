import { useFormik } from 'formik'
import { useNavigate } from 'react-router-dom'
import { RegistrationSchema } from '../validations/RegistrationValidation'
import { useRegistrationFormContext } from '../context/RegistrationContext'
import { Link } from 'react-router-dom'


const Registration = () => {
  const { createUser } = useRegistrationFormContext()
  let navigate = useNavigate()
  const { handleSubmit, handleChange, errors, touched} = useFormik({
    initialValues: {
      email: '',
      username: '',
      password: '',
      password_confirmation: ''
    },
    validationSchema: RegistrationSchema,
    onSubmit: values => {
      createUser(values)
      navigate('/home')
    },
  })
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="field">
          <input name="username" onChange={handleChange} type="text" placeholder="username"/>
          {errors.email && touched.email ? <div>{errors.email}</div> : null}
        </div>
        <div className="field">
          <input name="email" onChange={handleChange} type="email" placeholder="email"/>
          {errors.email && touched.email ? <div>{errors.email}</div> : null}
        </div>
        <div className="field">
          <input name="password" onChange={handleChange} type="password" placeholder="password"/>
          {errors.password && touched.password ? <div>{errors.password}</div> : null}
        </div>
        <div className="field">
          <input name="password_confirmation" onChange={handleChange} type="password" placeholder="password confirmation"/>
          {errors.password_confirmation && touched.password_confirmation ? <div>{errors.password_confirmation}</div> : null}
        </div>
        <button type="submit">Submit</button>
      </form>
      <Link to="/home">Login</Link>
    </div>
  )
}

export default Registration;