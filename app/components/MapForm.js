"use client"
import * as Yup from "yup";
import { Formik , Form ,Field , ErrorMessage} from "formik";

const SignupSchema = Yup.object().shape({
  name: Yup.string()
    .min(3,'Name must be at least 3 characters')
    .max(20,"Name can't be more than 20 charcters" )
    .required('Required name')
    .matches(/^[\p{L}\p{N}]+$/u, 'Name can only contain letters and numbers'),
    width: Yup.number()
    .integer('Width must be an integer')
    .required('Width is required')
    .min(1, 'Width must be at least 1')
    .max(50, "Width can't be higher than 50"),

    height: Yup.number()
    .integer('Heigth must be an integer')
    .required('Heigth is required')
    .min(1, 'Heigth must be at least 1')
    .max(50, "Height can't be higher than 50"),
});



export default function MapForm({onSubmit}) {
  return (
    <Formik initialValues={{
      name: '',
      width: '',
      height: '',
    }}
      validationSchema={SignupSchema}
      onSubmit={onSubmit}>
        <Form>
        <div>
          <Field name="name" type="text" />
          <ErrorMessage name="name" component="div" />
        </div>

        <div>
          <Field name="width" type="number" />
          <ErrorMessage name="width" component="div" />
        </div>

        <div>
          <Field name="height" type="number" />
          <ErrorMessage name="height" component="div" />
        </div>
        <button type="submit">Submit</button>
        </Form>
      </Formik>
  )
}