import React, { useEffect } from "react"
import PropTypes from "prop-types"
import { Box, Button } from "@howtocards/ui"

export const PopUp = ({ children, onClose }) => {
  const myRef = React.createRef()
  const onDocumentClick = (event) => {
    let pointer = event.target
    const element = myRef.current
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

  return (
    <Box popup>
      <Button small onClick={() => onClose()}>
        CLOSE (should be x icon in the corner)
      </Button>
      {children}
    </Box>
  )
}

PopUp.propTypes = {
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired,
}
