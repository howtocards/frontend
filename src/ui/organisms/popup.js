import React, { useEffect, useCallback, useRef } from "react"
import PropTypes from "prop-types"

export const PopUp = ({ children, onClose, opened }) => {
  const ref = useRef(null)

  const onDocumentClick = useCallback(
    (event) => {
      let pointer = event.target
      const element = ref.current
      while (pointer !== document && pointer) {
        if (pointer === element) {
          return
        }
        pointer = pointer.parentNode
      }
      onClose() // close popup when click on document
    },
    [opened],
  )

  useEffect(() => {
    document.addEventListener("click", onDocumentClick)

    // returned function will be called on component unmount
    return () => {
      document.removeEventListener("click", onDocumentClick)
    }
  }, [opened])

  return <div ref={ref}>{children}</div>
}

PopUp.propTypes = {
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired,
  opened: PropTypes.bool.isRequired,
}
