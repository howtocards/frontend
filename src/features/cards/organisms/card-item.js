import React from "react"
import styled from "styled-components"

import PropTypes from "prop-types"
import { format } from "date-fns"
import { RichViewer } from "@lib/rich-text"
import { Col, Row } from "@lib/styled-components-layout"
import { Card, H3, Link, Button, ButtonPrimary } from "@ui/atoms"

export const CardItem = ({
  canEdit = false,
  content,
  createdAt,
  id,
  isUseful,
  onClickUseful,
  title,
}) => (
  <CardBox>
    <Col>
      <CardHeading
        card={{ id, title, canEdit, createdAt, isUseful }}
        onClickUseful={onClickUseful}
      />
      <RichViewer content={content} />
    </Col>
  </CardBox>
)

CardItem.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  canEdit: PropTypes.bool,
  isUseful: PropTypes.bool,
  onClickUseful: PropTypes.func,
}

CardItem.defaultProps = {
  canEdit: false,
  isUseful: false,
  onClickUseful: () => {},
}

const CardHeading = ({ card, onClickUseful }) => (
  <HeadingLine>
    <Link to={`/open/${card.id}`}>
      <H3 narrow>{card.title}</H3>
    </Link>
    <Row basis="25%" justify="space-between">
      {card.canEdit && <Link to={`/edit/${card.id}`}>Edit</Link>}
      {card.isUseful ? (
        <ButtonPrimary small title="Remove from saved" onClick={onClickUseful}>
          Saved
        </ButtonPrimary>
      ) : (
        <Button small title="Add to saved" onClick={onClickUseful}>
          Save
        </Button>
      )}
      <i>{format(new Date(card.createdAt), "HH:MM MM/DD/YYYY")}</i>
    </Row>
  </HeadingLine>
)

CardHeading.propTypes = {
  card: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    canEdit: PropTypes.bool,
    isUseful: PropTypes.bool,
  }).isRequired,
  onClickUseful: PropTypes.func.isRequired,
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
