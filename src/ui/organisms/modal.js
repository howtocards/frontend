import React, { useRef } from "react"
import styled from "styled-components"
import useOnClickOutside from "use-onclickoutside"
import PropTypes from "prop-types"

import { H3, Icon, Text, Button, Box } from "@howtocards/ui"
import { Row } from "@lib/styled-components-layout"

export const Modal = ({ children, close, onDeleteClick }) => {
  const ref = useRef(null)
  useOnClickOutside(ref, close)

  return (
    <div ref={ref}>
      <Box popup>
        <GridPopUp>
          <CellPopUpHeading>
            <H3>Do you want to delete?</H3>
          </CellPopUpHeading>

          <CellPopUpClose>
            <Row
              basis="25%"
              justify="flex-end"
              align-items="center"
              gap="1.4em"
              align="center"
            >
              <Button small onClick={close}>
                Close
                <Icon name="x" fill="grey" id="close" />
              </Button>
            </Row>
          </CellPopUpClose>

          <CellPopUpContent>
            <Text>{children}</Text>
          </CellPopUpContent>
          <CellPopUpButtonYes>
            <Button onClick={onDeleteClick}>Yes, delete</Button>
          </CellPopUpButtonYes>

          <CellPopUpButtonNo>
            <Button onClick={close}>No, please cancel</Button>
          </CellPopUpButtonNo>
        </GridPopUp>
      </Box>
    </div>
  )
}

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  close: PropTypes.func.isRequired,
  onDeleteClick: PropTypes.func,
}

Modal.defaultProps = {
  onDeleteClick: () => {},
}

const GridPopUp = styled.div`
  display: grid;
  grid-template-areas:
    "popupHeading popupClose"
    "popupContent popupContent"
    "popupButtonYes popupButtonNo";
  grid-template-rows: 5rem 1fr 3rem;
  grid-template-columns: 50% 50%;
  grid-gap: 8px;
`
const CellPopUpHeading = styled.div`
  grid-area: popupHeading;
`
const CellPopUpClose = styled.div`
  grid-area: popupClose;
`
const CellPopUpContent = styled.div`
  grid-area: popupContent;
`
const CellPopUpButtonYes = styled.div`
  grid-area: popupButtonYes;
`
const CellPopUpButtonNo = styled.div`
  grid-area: popupButtonNo;
`
