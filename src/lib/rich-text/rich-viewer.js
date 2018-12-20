import React, { PureComponent } from "react"
import ReactQuill from "react-quill"
import PropTypes from "prop-types"
import styled from "styled-components"

import { modules, formats } from "./config"
import { bubbleTheme } from "./bubble-theme"

const WrapperRichViewer = styled.div`
  ${bubbleTheme}
  .ql-editor {
    padding: 0;
  }
`

export class RichViewer extends PureComponent {
  static propTypes = { content: PropTypes.string.isRequired }

  render() {
    const { content } = this.props

    return (
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
  }
}
