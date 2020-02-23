import * as React from "react";
import { Formik, FormikActions, FormikProps, Form } from "formik";
import * as Yup from "yup";
import Input from "components/Input/Input";
import Button from "components/Button/Button";
import {
  ContactWrapper,
  ContactPageTitle,
  ContactFromWrapper,
  InputGroup,
} from "./style";

interface MyFormValues {
  firstName: string;
  email: string;
  message: string;
}

const SignupSchema = Yup.object().shape({
  firstName: Yup.string().required("Required/必須項目です"),
  email: Yup.string()
    .email("メールアドレスの形式が違います")
    .required("Required/必須項目です"),
  message: Yup.string().required("Required/必須項目です"),
});

const Contact: React.SFC<{}> = () => {
  return (
    <Formik
      initialValues={{ firstName: "", email: "", message: "" }}
      onSubmit={(
        values: MyFormValues,
        actions: FormikActions<MyFormValues>
      ) => {
        setTimeout(() => {
          // console.log({ values, actions })
          // alert(JSON.stringify(values, null, 2))
          const url = `${process.env.SLACK_WEB_HOOKS}`
          console.info(url)
          const data = {
            type: "mrkdwn",
            text: `Forestone blogからのお問合せ \n 名前: ${values.firstName} \n メールアドレス${values.email} \n お問い合せ内容: ${values.message} \n `,
          }
          const xml = new XMLHttpRequest()
          xml.open("POST", url, false)
          xml.setRequestHeader(
            "content-type",
            "application/x-www-form-urlencoded;charset=UTF-8"
          )
          xml.send(`payload=${JSON.stringify(data)}`)
          actions.setSubmitting(false)
        }, 700)
      }}
      validationSchema={SignupSchema}
      render={({
        handleChange,
        values,
        errors,
        handleBlur,
        touched,
        isSubmitting,
      }: FormikProps<MyFormValues>) => (
        <>
          <Form>
            <ContactWrapper>
              <ContactPageTitle>
                <h2>Contact</h2>
                <p>
                  {/* StoryHub theme comes with a contact form built-in. You can use
                  this form with Gatsbay Js service and get up to 50 submissions
                  for free per form per month. Also, you can easily switch to
                  another service if you want. */}
                </p>
              </ContactPageTitle>
              <ContactFromWrapper>
                <InputGroup>
                  <Input
                    type="text"
                    name="firstName"
                    value={`${values.firstName}`}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    label="Name"
                    notification={`${
                      errors.firstName && touched.firstName
                        ? errors.firstName
                        : ""
                    }`}
                  />
                  <Input
                    type="email"
                    name="email"
                    value={`${values.email}`}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    label="Email"
                    notification={`${
                      errors.email && touched.email ? errors.email : ""
                    }`}
                  />
                </InputGroup>
                <Input
                  type="textarea"
                  name="message"
                  value={`${values.message}`}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  label="Message"
                  notification={
                    errors.message && touched.message ? errors.message : ""
                  }
                />
                <Button
                  title="Submit"
                  type="submit"
                  isLoading={isSubmitting ? true : false}
                  loader="Submitting.."
                />
              </ContactFromWrapper>
            </ContactWrapper>
          </Form>
        </>
      )}
    />
  )
};

export default Contact;
