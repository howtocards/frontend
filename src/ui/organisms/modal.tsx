import * as React from "react"
import styled from "styled-components"
import useOnClickOutside from "use-onclickoutside"

import { Box, Button, H3, Icon, Text } from "@howtocards/ui"
import { Row } from "@lib/styled-components-layout"

type Props = {
  title?: string
  children: React.ReactChildren
  onClose: () => void
  onDeleteClick: (event: React.MouseEvent<HTMLButtonElement>) => void
}

export const Modal = ({ children, title, onClose, onDeleteClick }: Props) => {
  const ref = React.useRef(null)
  useOnClickOutside(ref, onClose)

  return (
    <div ref={ref}>
      <Box popup>
        <GridPopUp>
          {title && (
            <CellPopUpHeading>
              <H3>{title}</H3>
            </CellPopUpHeading>
          )}

          <CellPopUpClose>
            <Row
              basis="25%"
              justify="flex-end"
              align-items="center"
              gap="1.4em"
              align="center"
            >
              <Button small onClick={onClose}>
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
            <Button onClick={onClose}>No, please cancel</Button>
          </CellPopUpButtonNo>
        </GridPopUp>
      </Box>
    </div>
  )
}

Modal.defaultProps = {
  title: undefined,
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
