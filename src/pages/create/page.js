// @flow
import * as React from "react"
import { useStore } from "effector-react"

import { Col, Row } from "@lib/styled-components-layout"
import { RichEditor } from "@lib/rich-text"
import { Card, ButtonPrimary, H2 } from "@howtocards/ui"
import { Authenticated } from "@features/common"
import { CardsCommonTemplate, TitleInput } from "@features/cards"

import {
  $title,
  $content,
  contentChanged,
  titleChanged,
  pageUnmounted,
  formSubmitted,
} from "./model"

const onFormSubmitted = (event) => {
  event.preventDefault()
  formSubmitted()
}

export const CardCreatePage = () => {
  React.useEffect(() => () => pageUnmounted(), [])

  return (
    <CardsCommonTemplate sidebar={<Sidebar />}>
      <Authenticated
        render={() => (
          <Card style={{ marginBottom: "2rem" }}>
            <form onSubmit={onFormSubmitted}>
              <Col gap="1rem">
                <Title />
                <Content />
              </Col>
            </form>
          </Card>
        )}
      />
    </CardsCommonTemplate>
  )
}

const Title = () => {
  const title = useStore($title)
  const titleRef = React.createRef()

  React.useEffect(() => {
    if (titleRef.current) titleRef.current.focus()
  }, [])

  return (
    <TitleInput
      name="title"
      autoComplete="title"
      placeholder="Turtle of your card"
      onChange={titleChanged}
      value={title}
      ref={titleRef}
    />
  )
}

const Content = () => {
  const content = useStore($content)

  return (
    <RichEditor
      content={content}
      // disabled={isSubmitting}
      onChange={contentChanged}
    />
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
    <ButtonPrimary onClick={onFormSubmitted}>Create</ButtonPrimary>
  </Col>
)
