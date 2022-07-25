import * as Yup from 'yup';

export const RegistrationSchema = Yup.object().shape({
  username: Yup.string().required('Required'),
  email: Yup.string().required('Required'),
  password: Yup.string().required('Required'),
  password_confirmation: Yup.string().required('required')
})