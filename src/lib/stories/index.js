import * as React from "react"
import styled from "styled-components"

const Container = styled.div({
  display: "flex",
  flexDirection: "row",
  padding: "1rem",
})

export const withContainer = (story, context) => (
  <Container>{story(context)}</Container>
)
