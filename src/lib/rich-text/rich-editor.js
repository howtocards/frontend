import React from 'react'
import { Editor } from 'slate-react'
import { Value } from 'slate'
import { isKeyHotkey } from 'is-hotkey'
import PropTypes from 'prop-types'
import { defaultValue } from './default-value'
import { renderNode, renderMark } from './helpers'


const DEFAULT_NODE = 'paragraph'
const isBoldHotkey = isKeyHotkey('mod+b')
const isItalicHotkey = isKeyHotkey('mod+i')
const isUnderlinedHotkey = isKeyHotkey('mod+u')
const isCodeHotkey = isKeyHotkey('mod+`')


export class RichEditor extends React.Component {
  state = {
    value: Value.fromJSON(defaultValue),
  }


  hasMark = (type) => {
    const { value } = this.state

    return value.activeMarks.some((mark) => mark.type === type)
  }


  hasBlock = (type) => {
    const { value } = this.state

    return value.blocks.some((node) => node.type === type)
  }


  renderButton = (type, cb) => {
    const markLists = ['bold', 'italic', 'underlined']
    let isActive = false
    let onClickButton = () => { }

    if (markLists.includes(type)) {
      isActive = this.hasMark(type)
      onClickButton = this.onClickMark
    }
    else if (['numbered-list', 'bulleted-list'].includes(type)) {
      const { value } = this.state
      const parent = value.document.getParent(value.blocks.first().key)

      isActive = this.hasBlock('list-item') && parent && parent.type === type
      onClickButton = this.onClickBlock
    }
    else {
      isActive = this.hasBlock(type)
      onClickButton = this.onClickBlock
    }

    return cb({ isActive, onClick: (event) => onClickButton(event, type) })
  }


  onChange = ({ value }) => {
    const { onChange } = this.props

    this.setState({ value }, () => onChange(JSON.stringify(value.toJSON())))
  }

  // eslint-disable-next-line consistent-return
  onKeyDown = (event, editor, next) => {
    let mark


    if (isBoldHotkey(event)) {
      mark = 'bold'
    }
    else if (isItalicHotkey(event)) {
      mark = 'italic'
    }
    else if (isUnderlinedHotkey(event)) {
      mark = 'underlined'
    }
    else if (isCodeHotkey(event)) {
      mark = 'code'
    }
    else {
      return next()
    }

    event.preventDefault()
    editor.toggleMark(mark)
  }


  onClickMark = (event, type) => {
    event.preventDefault()
    this.editor.toggleMark(type)
  }


  onClickBlock = (event, type) => {
    event.preventDefault()


    const { editor } = this
    const { value } = editor
    const { document } = value

    if (type !== 'bulleted-list' && type !== 'numbered-list') {
      const isActive = this.hasBlock(type)
      const isList = this.hasBlock('list-item')

      if (isList) {
        editor
          .setBlocks(isActive ? DEFAULT_NODE : type)
          .unwrapBlock('bulleted-list')
          .unwrapBlock('numbered-list')
      }
      else {
        editor.setBlocks(isActive ? DEFAULT_NODE : type)
      }
    }
    else {
      const isList = this.hasBlock('list-item')
      const isType = value.blocks.some((block) => !!document.getClosest(block.key, (parent) => parent.type === type))

      if (isList && isType) {
        editor
          .setBlocks(DEFAULT_NODE)
          .unwrapBlock('bulleted-list')
          .unwrapBlock('numbered-list')
      }
      else if (isList) {
        editor
          .unwrapBlock(
            type === 'bulleted-list' ? 'numbered-list' : 'bulleted-list',
          )
          .wrapBlock(type)
      }
      else {
        editor.setBlocks('list-item').wrapBlock(type)
      }
    }
  }


  ref = (editor) => {
    this.editor = editor
  }

  render() {
    const { value } = this.state
    const { renderToolbar } = this.props

    return (

      <div>
        {renderToolbar(this.renderButton)}
        <Editor
          style={{ margin: '20px 0' }}
          spellCheck
          autoFocus
          placeholder="Enter some rich text..."
          ref={this.ref}
          value={value}
          onChange={this.onChange}
          onKeyDown={this.onKeyDown}
          renderNode={renderNode}
          renderMark={renderMark}
        />
      </div>
    )
  }
}

RichEditor.propTypes = {
  onChange: PropTypes.func.isRequired,
  renderToolbar: PropTypes.func.isRequired,
}
