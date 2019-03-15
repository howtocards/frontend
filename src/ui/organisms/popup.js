import React, { useEffect } from "react"
import PropTypes from "prop-types"
import { Box, Button } from "@howtocards/ui"

export const PopUp = ({ children, onClose }) => {
  const ref = React.createRef()
  const onDocumentClick = (event) => {
    let pointer = event.target
    const element = ref.current
    while (pointer !== document && pointer) {
      if (pointer === element) {
        return
      }
      pointer = pointer.parentNode
    }
    onClose() // close popup when click on document
  }

  useEffect(() => {
    document.addEventListener("click", onDocumentClick)

    // returned function will be called on component unmount
    return () => {
      document.removeEventListener("click", onDocumentClick)
    }
  }, [])

  return <div>{children}</div>
}

PopUp.propTypes = {
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired,
}
