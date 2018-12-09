import React, { Component } from "react"
import styled from "styled-components"
import PropTypes from "prop-types"
import { format } from "date-fns"
import Markdown from "react-markdown"
import highlight from "highlightjs"

import { Col, Row } from "@lib/styled-components-layout"
import { Card, H3, Text, Link } from "@ui/atoms"

const CardContent = styled(Text)`
  font-size: 1.4rem;
  line-height: 1.2;
  max-height: calc(10 * 2.2rem);
  overflow: hidden;
`

export class CardItem extends Component {
  contentRef = React.createRef()

  highlightBlocks() {
    if (this.contentRef.current) {
      const list = [
        ...this.contentRef.current.querySelectorAll("code").values(),
      ]

      list
        .filter((node) => node.className.indexOf("language") > -1)
        .forEach((node) => highlight.highlightBlock(node))
    }
  }

  componentDidMount() {
    this.highlightBlocks()
  }

  componentDidUpdate() {
    this.highlightBlocks()
  }

  render() {
    const { id, title, createdAt, content, canEdit = false } = this.props

    return (
      <Card>
        <Col>
          <Row justify="space-between">
            <H3 narrow>{title}</H3>
            <Row basis="25%" justify="space-between">
              <Link to={`/open/${id}`}>Open</Link>
              {canEdit && <Link to="/edit">Edit</Link>}
              <i>{format(new Date(createdAt), "HH:MM MM/DD/YYYY")}</i>
            </Row>
          </Row>
        </Col>
        <CardContent ref={this.contentRef}>
          <Markdown source={content} />
        </CardContent>
      </Card>
    )
  }
}

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
