import React from "react"
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

export class RichEditor extends React.PureComponent {
  static defaultProps = {
    disabled: false,
  }

  render() {
    const { disabled, content, onChange } = this.props

    return (
      <WrapperRichEditor>
        <ReactQuill
          value={content}
          onChange={onChange}
          theme="bubble"
          modules={modules}
          formats={formats}
          readOnly={disabled}
        />
      </WrapperRichEditor>
    )
  }
}

RichEditor.propTypes = {
  disabled: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  content: PropTypes.string.isRequired,
}
