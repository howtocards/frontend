import React from 'react'
import { Editor } from 'slate-react'
import { Value } from 'slate'
import { isKeyHotkey } from 'is-hotkey'
import Prism from 'prismjs'
import { defaultValue } from './default-value'

/**
 * Define our code components.
 *
 * @param {Object} props
 * @return {Element}
 */

function CodeBlock(props) {
  const { attributes, children } = props

  return (
    <pre>
      <code {...attributes}>{children}</code>
    </pre>
  )
}

/**
 * Define the default node type.
 *
 * @type {String}
 */

const DEFAULT_NODE = 'paragraph'

/**
 * Define hotkey matchers.
 *
 * @type {Function}
 */

const isBoldHotkey = isKeyHotkey('mod+b')
const isItalicHotkey = isKeyHotkey('mod+i')
const isUnderlinedHotkey = isKeyHotkey('mod+u')
const isCodeHotkey = isKeyHotkey('mod+`')

/**
 * The rich text example.
 *
 * @type {Component}
 */

export class RichEditor extends React.Component {
  /**
   * Deserialize the initial editor value.
   *
   * @type {Object}
   */

  state = {
    value: Value.fromJSON(defaultValue),
  }

  /**
   * Check if the current selection has a mark with `type` in it.
   *
   * @param {String} type
   * @return {Boolean}
   */

  hasMark = (type) => {
    const { value } = this.state

    return value.activeMarks.some((mark) => mark.type === type)
  }

  /**
   * Check if the any of the currently selected blocks are of `type`.
   *
   * @param {String} type
   * @return {Boolean}
   */

  hasBlock = (type) => {
    const { value } = this.state

    return value.blocks.some((node) => node.type === type)
  }


  /**

  /**
   * Render a block-toggling toolbar button.
   *
   * @param {String} type
   * @return {Element}
   */

  renderBlockButton = (type, cb) => {
    const markLists = ['bold', 'italic', 'underlined']
    let isActive = false
    let onClick = () => { }

    if (markLists.includes(type)) {
      isActive = this.hasMark(type)
      onClick = this.onClickMark
    }
    else if (['numbered-list', 'bulleted-list'].includes(type)) {
      const { value } = this.state
      const parent = value.document.getParent(value.blocks.first().key)

      isActive = this.hasBlock('list-item') && parent && parent.type === type
      onClick = this.onClickBlock
    }
    else {
      isActive = this.hasBlock(type)
      onClick = this.onClickBlock
    }

    return cb({ isActive, onMouseDown: (event) => onClick(event, type) })
  }

  /**
   * Render a Slate node.
   *
   * @param {Object} props
   * @return {Element}
   */

  renderNode = (props, editor, next) => {
    const { attributes, children, node } = props

    switch (node.type) {
      case 'block-quote':
        return (
          <blockquote
            {...attributes}
            style={{
              borderLeft: '2px solid #ddd',
              marginLeft: 0,
              marginRight: 0,
              paddingLeft: '10px',
              color: '#aaa',
              fontStyle: 'italic',
            }}
          >
            {children}

          </blockquote>
        )
      case 'code':
        return <CodeBlock {...props} />
      case 'bulleted-list':
        return <ul {...attributes}>{children}</ul>
      case 'list-item':
        return <li {...attributes}>{children}</li>
      case 'numbered-list':
        return <ol {...attributes}>{children}</ol>
      default:
        return next()
    }
  }

  /**
   * Render a Slate mark.
   *
   * @param {Object} props
   * @return {Element}
   */

  renderMark = (props, editor, next) => {
    const { children, mark, attributes } = props

    switch (mark.type) {
      case 'comment':
        return (
          <span {...attributes} style={{ opacity: '0.33' }}>
            {children}
          </span>
        )
      case 'keyword':
        return (
          <span {...attributes} style={{ fontWeight: 'bold' }}>
            {children}
          </span>
        )
      case 'tag':
        return (
          <span {...attributes} style={{ fontWeight: 'bold' }}>
            {children}
          </span>
        )
      case 'punctuation':
        return (
          <span {...attributes} style={{ opacity: '0.75' }}>
            {children}
          </span>
        )
      case 'bold':
        return <strong {...attributes}>{children}</strong>
      case 'code':
        return (
          <CodeBlock {...props}>
            {children}
          </CodeBlock>
        )
      case 'italic':
        return <em {...attributes}>{children}</em>
      case 'underlined':
        return <u {...attributes}>{children}</u>
      default:
        return next()
    }
  }

  /**
   * On change, save the new `value`.
   *
   * @param {Editor} editor
   */

  onChange = ({ value }) => {
    this.setState({ value })
  }

  /**
   * On key down, if it's a formatting command toggle a mark.
   *
   * @param {Event} event
   * @param {Editor} editor
   * @return {Change}
   */
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

  /**
   * When a mark button is clicked, toggle the current mark.
   *
   * @param {Event} event
   * @param {String} type
   */

  onClickMark = (event, type) => {
    event.preventDefault()
    this.editor.toggleMark(type)
  }

  /**
   * When a block button is clicked, toggle the block type.
   *
   * @param {Event} event
   * @param {String} type
   */

  onClickBlock = (event, type) => {
    event.preventDefault()


    const { editor } = this
    const { value } = editor
    const { document } = value

    // Handle everything but list buttons.
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
      // Handle the extra wrapping required for list buttons.
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


  /**
  * A helper function to return the content of a Prism `token`.
  *
  * @param {Object} token
  * @return {String}
  */

  getContent = (token) => {
    if (typeof token === 'string') {
      return token
    } if (typeof token.content === 'string') {
      return token.content
    }
    return token.content.map(this.getContent).join('')
  }


  /**
   * Decorate code blocks with Prism.js highlighting.
   *
   * @param { Node } node
  * @return { Array }
  */

  decorateNode = (node, editor, next) => {
    const others = next() || []

    if (node.type !== 'code') return others

    const language = 'javascript'
    const texts = node.getTexts().toArray()
    const string = texts.map((t) => t.text).join('\n')
    const grammar = Prism.languages[language]
    const tokens = Prism.tokenize(string, grammar)
    const decorations = []
    let startText = texts.shift()
    let endText = startText
    let startOffset = 0
    let endOffset = 0
    let start = 0

    // eslint-disable-next-line no-restricted-syntax
    for (const token of tokens) {
      startText = endText
      startOffset = endOffset

      const content = this.getContent(token)
      const newlines = content.split('\n').length - 1
      const length = content.length - newlines
      const end = start + length

      let available = startText.text.length - startOffset
      let remaining = length

      endOffset = startOffset + remaining

      while (available < remaining && texts.length > 0) {
        endText = texts.shift()
        remaining = length - available
        available = endText.text.length
        endOffset = remaining
      }

      if (typeof token !== 'string') {
        const dec = {
          anchor: {
            key: startText.key,
            offset: startOffset,
          },
          focus: {
            key: endText.key,
            offset: endOffset,
          },
          mark: {
            type: token.type,
          },
        }

        decorations.push(dec)
      }

      start = end
    }

    return [...others, ...decorations]
  }

  /**
   * Store a reference to the `editor`.
   *
   * @param {Editor} editor
   */

  ref = (editor) => {
    this.editor = editor
  }

  render() {
    const { value } = this.state
    const { renderToolbar } = this.props

    return (

      <div>
        {renderToolbar && renderToolbar(this.renderBlockButton)}
        <Editor
          style={{ margin: '20px 0' }}
          spellCheck
          autoFocus
          placeholder="Enter some rich text..."
          ref={this.ref}
          value={value}
          onChange={this.onChange}
          onKeyDown={this.onKeyDown}
          renderNode={this.renderNode}
          renderMark={this.renderMark}
          decorateNode={this.decorateNode}
        />
      </div>
    )
  }
}
