import React from "react"
import ReactQuill from "react-quill"
import PropTypes from "prop-types"
import styled from "styled-components"

import { modules, formats } from "./config"
import { bubbleTheme } from "./bubble-theme"

const WrapperRichEditor = styled.div`
  ${bubbleTheme}
  .ql-editor {
    border-radius: 4px;
    box-shadow: 0 0 0 2px ${(p) => p.theme.palette.decoration.borders};
  }
`

export class RichEditor extends React.Component {
  state = {
    // eslint-disable-next-line react/destructuring-assignment
    text: this.props.content,
  }

  handleChange = (value) => {
    const { onChange } = this.props

    this.setState({ text: value }, () => onChange(value))
  }

  render() {
    const { text } = this.state

    return (
      <WrapperRichEditor>
        <ReactQuill
          value={text}
          onChange={this.handleChange}
          theme="bubble"
          modules={modules}
          formats={formats}
        />
      </WrapperRichEditor>
    )
  }
}

RichEditor.propTypes = {
  onChange: PropTypes.func.isRequired,
  content: PropTypes.string.isRequired,
}
