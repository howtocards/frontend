import React, { useState } from "react"
import styled, { css } from "styled-components"
import PropTypes from "prop-types"
import { format } from "date-fns"

import { RichEditor } from "@lib/rich-text"
import { Row } from "@lib/styled-components-layout"
import { Link, H2, H3, Icon, Text, Button, Box, PopUp } from "@howtocards/ui"

const CardBox = styled.div`
  margin: 0.5rem;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  padding: 2rem;
  max-height: 24rem;
  box-sizing: border-box;
  overflow-y: hidden;

  &: hover {
    display: flex;
    flex-flow: column;
    flex-shrink: 0;
    border-radius: 4px;
    padding: 2rem;
    box-sizing: border-box;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.2);
    //transform: scale(1.001);
  }
`

const GridCard = styled.div`
  display: grid;
  grid-template-areas:
    "flag header"
    "flag info"
    "flag content"
    "flag footer";
  grid-template-rows: 2rem 2rem 10rem 3rem;
  grid-template-columns: 50px 1fr;
  grid-gap: 8px;
`

export const CardItem = ({ onUsefulClick, card }) => (
  <CardBox>
    <GridCard>
      <CellCardFlag>
        <CardFlagWithNumber
          usefulFor={card.usefulFor}
          isUseful={card.meta.isUseful}
          onUsefulClick={onUsefulClick}
        />
      </CellCardFlag>

      <CellCardHeader>
        <CardHeader card={card} />
      </CellCardHeader>

      <CellCardInfo>
        <CardInfo createdAt={card.createdAt} />
      </CellCardInfo>

      <CellCardContent>
        <RichEditor readOnly content={card.content} />
      </CellCardContent>

      <CellCardFooter>
        <Link to="/">14 Comments</Link>
      </CellCardFooter>
    </GridCard>
  </CardBox>
)

CardItem.propTypes = {
  card: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    meta: PropTypes.shape({
      canEdit: PropTypes.bool,
      isUseful: PropTypes.bool,
    }).isRequired,
  }).isRequired,
  onUsefulClick: PropTypes.func.isRequired,
}

const CardFlagWithNumber = ({ usefulFor, isUseful, onUsefulClick }) => (
  <div>
    <FlagToggler onUsefulClick={onUsefulClick} isUseful={isUseful} />
    <CenterHorizontal>
      <Link to="/">{usefulFor}</Link>
    </CenterHorizontal>
  </div>
)

CardFlagWithNumber.propTypes = {
  onUsefulClick: PropTypes.func.isRequired,
  usefulFor: PropTypes.number.isRequired,
  isUseful: PropTypes.bool.isRequired,
}

const FlagToggler = ({ isUseful, onUsefulClick }) => {
  // const [isUseful, setIsUseful] = useState(usefulFor)

  return (
    <IconWrapper
      onClick={() => {
        // setIsUseful(!isUseful)
        onUsefulClick()
      }}
    >
      {isUseful ? (
        <Icon name="bookmark-solid" fill="red" />
      ) : (
        <Icon name="bookmark-regular" />
      )}
    </IconWrapper>
  )
}

FlagToggler.propTypes = {
  onUsefulClick: PropTypes.func.isRequired,
  isUseful: PropTypes.bool.isRequired,
}

const CardHeader = ({ card }) => (
  <HeadingLine>
    <Link to={`/open/${card.id}`}>
      <H2 narrow>{card.title}</H2>
    </Link>
    <Row basis="25%" justify="flex-end" gap="1.4em" align="center">
      {card.meta.canEdit && <Link to={`/edit/${card.id}`}>Edit</Link>}
      <PopUpDelete title={card.title} />
      <Icon name="dots-v" height="1.6rem" />
    </Row>
  </HeadingLine>
)
const CardInfo = (card) => (
  <Row>
    <Text small>
      {" "}
      {format(new Date(card.createdAt), "HH:MM MM/DD/YYYY")} by Author
    </Text>
  </Row>
)

const HeadingLine = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  flex-shrink: 0;
  line-height: 2.4rem;
`
const IconWrapper = styled.div`
  padding: 0 0.6rem;
  }
  &:disabled {
    opacity: 0.3;
  }
  
  & #icon:hover {
    fill: green;
    cursor: pointer;
    transition: fill 0.7s;
  }
`

const CenterHorizontal = styled.div`
  display: flex;
  justify-content: center;
  flex-grow: 1;
  width: 100%;
`
const CellCardFooter = styled.div`
  grid-area: footer;
  align-items: flex-end;
  line-height: 2.4rem;
  padding: 8px 0;
`

const CellCardFlag = styled.div`
  grid-area: flag;
`
const CellCardHeader = styled.div`
  grid-area: header;
`
const CellCardInfo = styled.div`
  grid-area: info;
`
const CellCardContent = styled.div`
  grid-area: content;
  overflow-y: hidden;
`

CardHeader.propTypes = {
  card: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    meta: PropTypes.shape({
      canEdit: PropTypes.bool,
      isUseful: PropTypes.bool,
    }).isRequired,
  }).isRequired,
}

const PopUpDelete = ({ title }) => {
  const [popup, setPopup] = useState(false)

  return (
    <div>
      <div
        onClick={() => {
          setPopup(() => !popup)
        }}
        onKeyDown={() => !popup}
        role="button"
        tabIndex={0}
      >
        <Icon name="trash" height="1.6rem" />
      </div>

      {!!popup && (
        <PopUp
          onClose={() => {
            setPopup(() => false)
          }}
        >
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
                  <Button
                    small
                    onClick={() => {
                      setPopup(() => false)
                    }}
                  >
                    Close
                    <Icon name="x" fill="grey" id="close" />
                  </Button>
                </Row>
              </CellPopUpClose>

              <CellPopUpContent>
                <Text>
                  Do you absolutely sure you want to delete article about{" "}
                  <b>
                    &#8220;
                    {title} &#8221;
                  </b>
                  ? Just kidding we are archiving them anyway.
                </Text>
              </CellPopUpContent>
              <CellPopUpButtonYes>
                <Button onClick={() => true}>Yes, delete</Button>
              </CellPopUpButtonYes>

              <CellPopUpButtonNo>
                <Button onClick={() => true}>No, please cancel</Button>
              </CellPopUpButtonNo>
            </GridPopUp>
          </Box>
        </PopUp>
      )}
    </div>
  )
}

PopUpDelete.propTypes = {
  title: PropTypes.string.isRequired,
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
