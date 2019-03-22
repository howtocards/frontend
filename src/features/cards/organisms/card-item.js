import React from "react"
import styled from "styled-components"
import PropTypes from "prop-types"
import { format } from "date-fns"

import { RichEditor } from "@lib/rich-text"
import { Row } from "@lib/styled-components-layout"
import { Link, H2, Icon, Text } from "@howtocards/ui"

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
  //grid-template-rows: 20px 15px 200px 30px;
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
      <Icon name="trash" height="1.6rem" />
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
  display: grid;
  grid-area: flag;
`
const CellCardHeader = styled.div`
  display: grid;
  grid-area: header;
`
const CellCardInfo = styled.div`
  display: grid;
  grid-area: info;
`
const CellCardContent = styled.div`
  display: grid;
  grid-area: content;
  overflow-y: hidden;
`

// export const CardItem = ({ onUsefulClick, card }) => (
//   <CardBox>
//     <Col>
//       <CardHeading card={card} onUsefulClick={onUsefulClick} />
//       <RichEditor readOnly content={card.content} />
//     </Col>
//   </CardBox>
// )

// const CardHeading = ({ card, onUsefulClick }) => (
//   <HeadingLine>
//     <Link to={`/open/${card.id}`}>
//       <H3 narrow>{card.title}</H3>
//     </Link>
//     <Row basis="25%" justify="space-between">
//       {card.meta.isUseful ? (
//         <ButtonPrimary small title="Remove from saved" onClick={onUsefulClick}>
//           Saved
//         </ButtonPrimary>
//       ) : (
//         <Button small title="Add to saved" onClick={onUsefulClick}>
//           Save
//         </Button>
//       )}
//       {card.usefulFor > 0 ? <div>{card.usefulFor}</div> : <div>&nbsp;</div>}
//       {card.meta.canEdit && <Link to={`/edit/${card.id}`}>Edit</Link>}
//       <i>{format(new Date(card.createdAt), "HH:MM MM/DD/YYYY")}</i>
//     </Row>
//   </HeadingLine>
// )

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
