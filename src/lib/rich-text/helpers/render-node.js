import React from 'react'


export const renderNode = (props, editor, next) => {
  const { attributes, children, node } = props

  console.log(node.type === 'code', children)

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
      return (
        <pre>
          <code {...attributes}>{children}</code>
        </pre>
      )
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
