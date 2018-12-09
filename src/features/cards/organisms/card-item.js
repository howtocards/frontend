import React from "react"

import PropTypes from "prop-types"
import { format } from "date-fns"
import { RichViewer } from "@lib/rich-text"
import { Col, Row } from "@lib/styled-components-layout"
import { Card, H3, Link } from "@ui/atoms"

export const CardItem = ({
  id,
  title,
  createdAt,
  content,
  canEdit = false,
}) => (
  <Card>
    <Col>
      <Row justify="space-between">
        <H3 narrow>{title}</H3>
        <Row basis="25%" justify="space-between">
          <Link to={`/open/${id}`}>Open</Link>
          {canEdit && <Link to={`/edit/${id}`}>Edit</Link>}
          <i>{format(new Date(createdAt), "HH:MM MM/DD/YYYY")}</i>
        </Row>
      </Row>
      <RichViewer content={content} />
    </Col>
  </Card>
)

CardItem.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  canEdit: PropTypes.bool,
}

CardItem.defaultProps = {
  canEdit: false,
}
