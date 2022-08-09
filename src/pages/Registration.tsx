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
      navigate('/')
    },
  })
  return (
    <div className="registration-form">
      <div>
        <form onSubmit={handleSubmit}>
          <div className="field">
            <input className="input-field" name="username" onChange={handleChange} type="text" placeholder="Username"/>
            {errors.email && touched.email ? <div>{errors.email}</div> : null}
          </div>
          <div className="field">
            <input className="input-field" name="email" onChange={handleChange} type="email" placeholder="Email"/>
            {errors.email && touched.email ? <div>{errors.email}</div> : null}
          </div>
          <div className="field">
            <input className="input-field" name="password" onChange={handleChange} type="password" placeholder="Password"/>
            {errors.password && touched.password ? <div>{errors.password}</div> : null}
          </div>
          <div className="field">
            <input className="input-field" name="password_confirmation" onChange={handleChange} type="password" placeholder="Password confirmation"/>
            {errors.password_confirmation && touched.password_confirmation ? <div>{errors.password_confirmation}</div> : null}
          </div>
          <button className="submit-button" type="submit">Submit</button>
        </form>
        <Link to="/" className="register">Login</Link>
      </div>
    </div>
  )
}

export default Registration;