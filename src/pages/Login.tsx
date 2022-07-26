import { useFormik } from 'formik'
import * as Yup from 'yup'
import { SessionSchema } from '../validations/RegistrationValidation'
import { useSessionsContext } from '../context/SessionContext'


const Login = () => {
  const { createSession } = useSessionsContext()
  const { handleSubmit, handleChange, errors, touched} = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: SessionSchema,
    onSubmit: values => {
      createSession(values)
    },
  })
  return (
    <form onSubmit={handleSubmit}>
      <div className="field">
        <input name="email" onChange={handleChange} type="email" placeholder="email"/>
        {errors.email && touched.email ? <div>{errors.email}</div> : null}
      </div>
      <div className="field">
        <input name="password" onChange={handleChange} type="text" placeholder="password"/>
        {errors.password && touched.password ? <div>{errors.password}</div> : null}
      </div>
      <button type="submit">Submit</button>
    </form>
  )
}

export default Login