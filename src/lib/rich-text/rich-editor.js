import React from "react"
import ReactQuill from "react-quill"
import PropTypes from "prop-types"
import styled from "styled-components"
import hljs from "highlight.js"

const modules = {
  syntax: {
    highlight: (text) => hljs.highlightAuto(text).value,
  },
  toolbar: [
    /* eslint-disable-next-line no-magic-numbers */
    [{ header: [2, 3, 4, 5, 6, false] }],
    ["bold", "italic", "underline", "blockquote"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["link", "image", "video"],
    ["code-block"],
  ],
  clipboard: {
    matchVisual: false,
  },
}

const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "video",
  "code-block",
]

const WrapperRichEditor = styled.div`
  .ql-editor {
    border-radius: 4px;
    box-shadow: 0 0 0 2px ${(p) => p.theme.palette.decoration.borders};
  }
`

export class RichEditor extends React.PureComponent {
  editorRef = React.createRef()

  static defaultProps = {
    disabled: false,
  }

  componentWillUnmount() {
    this.editorRef.current.blur()
  }

  render() {
    const { disabled, content, onChange } = this.props

    return (
      <WrapperRichEditor>
        <ReactQuill
          ref={this.editorRef}
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
