import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"

const WrapperRichViewer = styled.div`
  .ql-editor {
    padding: 0;
  }
`

export const RichViewer = ({ content }) => (
  <WrapperRichViewer>
    <div className="quill">
      <div className="ql-container ql-bubble">
        <div
          className="ql-editor"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
    </div>
  </WrapperRichViewer>
)

RichViewer.propTypes = {
  content: PropTypes.string.isRequired,
}
