// @flow
import * as React from "react"
import { useStore } from "effector-react"
import { Link } from "react-router-dom"

import { Col, Row } from "@lib/styled-components-layout"
import { RichEditor } from "@lib/rich-text"
import { Authenticated } from "@features/common"
import { Card, ButtonPrimary, Button, H2 } from "@howtocards/ui"
import { CardsCommonTemplate, TitleInput } from "@features/cards"

import {
  $content,
  $title,
  cardFetching,
  cardLoading,
  contentChanged,
  pageUnloaded,
  savePressed,
  titleChanged,
  $cardId,
} from "./model"

type Props = {
  match: {
    params: {
      cardId: string,
    },
  },
}

export const CardEditPage = ({ match }: Props) => {
  const isLoading = useStore(cardFetching.isLoading)

  React.useEffect(() => {
    cardLoading(parseInt(match.params.cardId, 10))
    return () => pageUnloaded()
  }, [])

  if (isLoading) {
    return (
      <CardsCommonTemplate>
        <div>Loading...</div>
      </CardsCommonTemplate>
    )
  }

  return (
    <CardsCommonTemplate sidebar={<Sidebar />}>
      <Authenticated
        render={() => (
          <Card style={{ marginBottom: "2rem" }}>
            <form onSubmit={onPressSubmit}>
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

const onPressSubmit = (event) => {
  event.preventDefault()
  savePressed()
}

const Title = () => {
  const title = useStore($title) || ""
  const titleRef = React.createRef()

  React.useEffect(() => {
    if (titleRef.current) {
      titleRef.current.focus()
    }
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

  if (!content) return null

  return (
    <RichEditor
      content={content}
      // disabled={isSubmitting}
      onChange={contentChanged}
    />
  )
}

const Sidebar = () => {
  const id = useStore($cardId)
  return (
    <Col gap="2rem">
      <Row>
        <H2 narrow>Edit card</H2>
      </Row>
      <Row>
        The card is your personal solution of the specific case. Fill it with
        enriched text without further ado.
      </Row>
      <Row>Select text to use rich editor features.</Row>
      <Row gap="1rem" justify="stretch">
        <Col grow="1">
          <ButtonPrimary onClick={onPressSubmit}>Save</ButtonPrimary>
        </Col>
        <Col>
          {typeof id === "number" && (
            <Button as={Link} to={`/open/${id}`}>
              Cancel
            </Button>
          )}
        </Col>
      </Row>
    </Col>
  )
}
