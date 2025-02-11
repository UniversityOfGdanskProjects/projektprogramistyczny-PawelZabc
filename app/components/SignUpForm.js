"use client"
import * as Yup from "yup";
import { Formik , Form ,Field , ErrorMessage} from "formik";

const SignupSchema = Yup.object().shape({
  username: Yup.string()
    .min(3,'Name must be at least 3 characters')
    .max(20,"Name can't be more than 20 charcters" )
    .required('Required Username')
    .matches(/^[\p{L}\p{N}]+$/u, 'Username can only contain letters and numbers'),

  password: Yup.string()
    .min(3,'Password must be at least 3 characters')
    .max(20,"Password can't be more than 20 charcters" )
    .required('Required Password'),
  email: Yup.string()
    .email('Invalid email')
    .required('Required Email'),
});



export default function SignUpForm({onResponse}) {
  return (
    <Formik initialValues={{
      username: '',
      password: '',
      email: '',
    }}
      validationSchema={SignupSchema}
      onSubmit={async (values) => {
        const response = await fetch('/api/signup', {
          method: 'POST',
          body: JSON.stringify(values),
      }).then(async x=>await x.json()).catch(async x=>await x.json())
      onResponse(response)
      }}>
        <Form>
        <div>
          <Field name="username" type="text" />
          <ErrorMessage name="username" component="div" />
        </div>

        <div>
          <Field name="password" type="password" />
          <ErrorMessage name="password" component="div" />
        </div>

        <div>
          <Field name="email" type="email" />
          <ErrorMessage name="email" component="div" />
        </div>
        <button type="submit">Submit</button>
        </Form>
      </Formik>
  )
}