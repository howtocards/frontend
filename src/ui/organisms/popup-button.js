import React, { useState, useEffect } from "react"
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
      <Button onClick={() => onClose()}>CLOSE</Button>
      {children}
    </Box>
  )
}

PopUp.propTypes = {
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired,
}

export const PopUpButton = ({ children }) => {
  const [popup, setPopup] = useState(false)

  const OpenBtn = () => (
    <Button
      small
      onClick={() => {
        setPopup(() => !popup)
      }}
    >
      PopUp
    </Button>
  )
  return (
    <div>
      <OpenBtn />
      {!!popup && (
        <div>
          <PopUp
            onClose={() => {
              setPopup(() => false)
            }}
          >
            {children}
          </PopUp>
        </div>
      )}
    </div>
  )
}

PopUpButton.propTypes = {
  children: PropTypes.node.isRequired,
}
