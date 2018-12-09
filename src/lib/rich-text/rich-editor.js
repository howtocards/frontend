import React from "react"
import ReactDOM from "react-dom"
import ReactQuill from "react-quill"
import PropTypes from "prop-types"
import styled from "styled-components"
import { modules, formats } from "./config"

const WrapperRichEditor = styled.div`
  .ql-editor {
    border-radius: 4px;
    box-shadow: 0 0 0 2px ${(p) => p.theme.palette.decoration.borders};
  }
`

export class RichEditor extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      text: props.content,
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(value) {
    const { onChange } = this.props

    this.setState({ text: value }, () => {
      onChange(value)
    })
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
