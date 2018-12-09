import React from "react"
import ReactDOM from "react-dom"
import ReactQuill from "react-quill"
import PropTypes from "prop-types"
import styled from "styled-components"
import { modules, formats } from "./config"

const WrapperRichViewer = styled.div`
  .ql-editor {
    padding: 0;
  }
`

export const RichViewer = ({ content }) => (
  <WrapperRichViewer>
    <ReactQuill
      value={content}
      theme="bubble"
      modules={modules}
      formats={formats}
      readOnly
    />
  </WrapperRichViewer>
)

RichViewer.propTypes = {
  content: PropTypes.string.isRequired,
}
