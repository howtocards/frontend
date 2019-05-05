// @flow
import React from "react"
import PropTypes from "prop-types"
import { useStore } from "effector-react"

import { Col, Row } from "@lib/styled-components-layout"
import { RichEditor } from "@lib/rich-text"
import { Authenticated } from "@features/common"
import { Card, ButtonPrimary, H2 } from "@howtocards/ui"

import { CardsCommonTemplate } from "../templates/common"
import { TitleInput } from "../atoms/title-input"

import {
  $content,
  $title,
  cardFetching,
  cardLoading,
  contentChanged,
  pageUnloaded,
  savePressed,
  titleChanged,
} from "../model/edit"

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

CardEditPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      cardId: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
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

const Sidebar = () => (
  <Col gap="2rem">
    <Row>
      <H2 narrow>Edit card</H2>
    </Row>
    <Row>
      The card is your personal solution of the specific case. Fill it with
      enriched text without further ado.
    </Row>
    <Row>Select text to use rich editor features.</Row>
    <ButtonPrimary onClick={onPressSubmit}>Save</ButtonPrimary>
  </Col>
)
