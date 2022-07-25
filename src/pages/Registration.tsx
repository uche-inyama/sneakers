import { Formik, Form, Field } from 'formik'
import { useRegistrationFormContext } from '../context/RegistrationContext'
import { RegistrationSchema } from '../validations/RegistrationValidation'

const Registration = () => {
  const { createUser } = useRegistrationFormContext()
  return (
    <div>
    <Formik
      initialValues={{
      email: '',
      username: '',
      password: '',
      password_confirmation: ''
    }}
    validationSchema={RegistrationSchema}
    onSubmit ={values => {
      createUser(values)
    }}
  >
  {({ errors, touched }) => (
    <form>
      <div className="field">
        <Field name="username" placeholder="username"/>
        {errors.username && touched.username ? ( <div>{errors.username}</div>) : null}
      </div>
      <div className="field">
        <Field name="email" type="email" placeholder="email"/>
        {errors.email && touched.email ? <div>{errors.email}</div> : null}
      </div>
      <div className="field">
        <Field name="password" type="text" placeholder="password"/>
        {errors.password && touched.password ? <div>{errors.password}</div> : null}
      </div>
      <div className="field">
        <Field name="password_confirmation" type="text" placeholder="password_confirmation"/>
        {errors.password_confirmation && touched.password_confirmation ? <div>{errors.password_confirmation}</div> : null}
      </div>
      <button type="submit">Submit</button>
    </form>
  )}
</Formik>
    </div>
  )
}


export default Registration