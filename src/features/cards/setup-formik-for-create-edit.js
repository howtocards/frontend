const CONTENT_MIN_LENGTH = 3

export const setupFormikForCreateEdit = {
  enableReinitialize: true,
  mapPropsToValues: (props) => {
    const initialValues = {
      title: "",
      content: "",
    }

    const values = props.card

    return values || initialValues
  },
  validate: (values) => {
    const errors = {}

    if (values.title.trim().length < CONTENT_MIN_LENGTH) {
      errors.title = "Please, fill title"
    } else if (values.content.trim().length < CONTENT_MIN_LENGTH) {
      errors.content = "Please, fill card content"
    }
    return errors
  },
  handleSubmit: async (values, { props, setSubmitting }) => {
    await props.onSubmit(values)
    setSubmitting(false)
  },
}
