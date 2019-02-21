import React from "react"
import styled from "styled-components"
import PropTypes from "prop-types"
import { format } from "date-fns"

import { RichEditor } from "@lib/rich-text"
import { Col, Row } from "@lib/styled-components-layout"
import { Card, H3, Link, Button, ButtonPrimary } from "@ui"

export const CardItem = ({ onUsefulClick, card }) => (
  <CardBox>
    <Col>
      <CardHeading card={card} onUsefulClick={onUsefulClick} />
      <RichEditor readOnly content={card.content} />
    </Col>
  </CardBox>
)

CardItem.propTypes = {
  card: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    meta: PropTypes.shape({
      canEdit: PropTypes.bool,
      isUseful: PropTypes.bool,
    }).isRequired,
  }).isRequired,
  onUsefulClick: PropTypes.func.isRequired,
}

const CardHeading = ({ card, onUsefulClick }) => (
  <HeadingLine>
    <Link to={`/open/${card.id}`}>
      <H3 narrow>{card.title}</H3>
    </Link>
    <Row basis="25%" justify="space-between">
      {card.meta.isUseful ? (
        <ButtonPrimary small title="Remove from saved" onClick={onUsefulClick}>
          Saved
        </ButtonPrimary>
      ) : (
        <Button small title="Add to saved" onClick={onUsefulClick}>
          Save
        </Button>
      )}
      {card.usefulFor > 0 ? <div>{card.usefulFor}</div> : <div>&nbsp;</div>}
      {card.meta.canEdit && <Link to={`/edit/${card.id}`}>Edit</Link>}
      <i>{format(new Date(card.createdAt), "HH:MM MM/DD/YYYY")}</i>
    </Row>
  </HeadingLine>
)

CardHeading.propTypes = {
  card: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    meta: PropTypes.shape({
      canEdit: PropTypes.bool,
      isUseful: PropTypes.bool,
    }).isRequired,
  }).isRequired,
  onUsefulClick: PropTypes.func.isRequired,
}

const HeadingLine = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  flex-shrink: 0;
  line-height: 2.4rem;
`

const CardBox = styled(Card)`
  max-height: 24rem;
  overflow-y: hidden;
`
