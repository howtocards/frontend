import React, { useState } from "react"
import PropTypes from "prop-types"
import { Button, PopUp } from "@howtocards/ui"

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
