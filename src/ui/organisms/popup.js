import React, { useRef } from "react"
import useOnClickOutside from "use-onclickoutside"
import PropTypes from "prop-types"

export const PopUp = ({ children, close }) => {
  const ref = useRef(null)
  useOnClickOutside(ref, close)

  return <div ref={ref}>{children}</div>
}

PopUp.propTypes = {
  children: PropTypes.node.isRequired,
  close: PropTypes.func.isRequired,
}
