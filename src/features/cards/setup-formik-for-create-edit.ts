const CONTENT_MIN_LENGTH = 3

export const setupFormikForCreateEdit = {
  enableReinitialize: true,
  mapPropsToValues: (props: any) => ({
    ...props.card,
  }),
  validate: (values: any) => {
    const errors: Record<string, string> = {}

    if (values.title.trim().length < CONTENT_MIN_LENGTH) {
      errors.title = "Please, fill title"
    }
    // else if (values.content.trim().length < CONTENT_MIN_LENGTH) {
    //   errors.content = "Please, fill card content"
    // }
    return errors
  },
  handleSubmit: async (values: any, { props, setSubmitting }: any) => {
    await props.onSubmit(values)
    setSubmitting(false)
  },
}
