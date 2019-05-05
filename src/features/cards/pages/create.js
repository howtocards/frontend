import React from "react"
import styled from "styled-components"

import { Col, Row } from "@lib/styled-components-layout"
import { RichEditor } from "@lib/rich-text"
import { Authenticated } from "@features/common"
import { Card, ButtonPrimary, H2 } from "@howtocards/ui"

import { useStore } from "effector-react"
import {
  $title,
  $content,
  contentChanged,
  titleChanged,
  pageUnmounted,
  submitButtonPressed,
} from "../model/create"
import { CardsCommonTemplate } from "../templates/common"

const onPressSubmit = (event) => {
  event.preventDefault()
  submitButtonPressed()
}

export const CardCreatePage = () => {
  const title = useStore($title)
  const content = useStore($content)
  const titleRef = React.createRef(null)

  React.useEffect(() => {
    titleRef.current.focus()
    return () => pageUnmounted()
  }, [])

  return (
    <CardsCommonTemplate sidebar={<Sidebar />}>
      <Authenticated
        render={() => (
          <Card style={{ marginBottom: "2rem" }}>
            <form onSubmit={onPressSubmit}>
              <Col gap="1rem">
                <TitleInput
                  name="title"
                  autoComplete="title"
                  placeholder="Turtle of your card"
                  onChange={titleChanged}
                  value={title}
                  ref={titleRef}
                />
                <RichEditor
                  content={content}
                  // disabled={isSubmitting}
                  onChange={contentChanged}
                />
              </Col>
            </form>
          </Card>
        )}
      />
    </CardsCommonTemplate>
  )
}

const Sidebar = () => (
  <Col gap="2rem">
    <Row>
      <H2 narrow>New card</H2>
    </Row>
    <Row>
      The card is your personal solution of the specific case. Fill it with
      enriched text without further ado.
    </Row>
    <Row>Select text to use rich editor features.</Row>
    <Row>After creation your card will be available on the home page.</Row>
    <ButtonPrimary onClick={onPressSubmit}>Create</ButtonPrimary>
  </Col>
)

const TitleInput = styled.input`
  box-sizing: border-box;
  background-color: none;
  outline: none;
  box-shadow: none;
  border: none;
  font-size: 1.8em;
  margin-bottom: 1rem;
`
