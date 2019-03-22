import React from "react"
import PropTypes from "prop-types"
// When you need more icons just add svg-path in getIconPath and call it
// with <Icon name="yourname" />

const getIconPath = (name, props) => {
  switch (name) {
    case "bookmark-regular":
      return (
        <path
          {...props}
          d="M336 0H48C21.49 0 0 21.49 0 48v464l192-112 192 112V48c0-26.51-21.49-48-48-48zm0 428.43l-144-84-144 84V54a6 6 0 0 1 6-6h276c3.314 0 6 2.683 6 5.996V428.43z"
        />
      )
    case "bookmark-solid":
      return (
        <path
          {...props}
          d="M0 512V48C0 21.49 21.49 0 48 0h288c26.51 0 48 21.49 48 48v464L192 400 0 512z"
        />
      )
    case "x":
      return (
        <path
          {...props}
          d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"
        />
      )
    case "dots-v":
      return (
        <path
          {...props}
          d="M96 184c39.8 0 72 32.2 72 72s-32.2 72-72 72-72-32.2-72-72 32.2-72 72-72zM24 80c0 39.8 32.2 72 72 72s72-32.2 72-72S135.8 8 96 8 24 40.2 24 80zm0 352c0 39.8 32.2 72 72 72s72-32.2 72-72-32.2-72-72-72-72 32.2-72 72z"
        />
      )
    case "trash":
      return (
        <path
          {...props}
          d="M268 416h24a12 12 0 0 0 12-12V188a12 12 0 0 0-12-12h-24a12 12 0 0 0-12 12v216a12 12 0 0 0 12 12zM432 80h-82.41l-34-56.7A48 48 0 0 0 274.41 0H173.59a48 48 0 0 0-41.16 23.3L98.41 80H16A16 16 0 0 0 0 96v16a16 16 0 0 0 16 16h16v336a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128h16a16 16 0 0 0 16-16V96a16 16 0 0 0-16-16zM171.84 50.91A6 6 0 0 1 177 48h94a6 6 0 0 1 5.15 2.91L293.61 80H154.39zM368 464H80V128h288zm-212-48h24a12 12 0 0 0 12-12V188a12 12 0 0 0-12-12h-24a12 12 0 0 0-12 12v216a12 12 0 0 0 12 12z"
        />
      )
    default:
      return <path />
  }
}

export const Icon = ({
  id = "icon",
  name = "",
  width = "2.4em",
  height = "2.4em",
  fill = "#000",
  style = {},
  viewBox = "0 0 384 512",
}) => (
  <svg
    width={width}
    height={height}
    style={style}
    viewBox={viewBox}
    aria-hidden="true"
    focusable="false"
    data-icon="bookmark"
    role="img"
    xmlns="http://www.w3.org/2000/svg"
  >
    {getIconPath(name, { id, fill })}
  </svg>
)

Icon.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  width: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired,
  fill: PropTypes.string.isRequired,
  style: PropTypes.string.isRequired,
  viewBox: PropTypes.string.isRequired,
}
