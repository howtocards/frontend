import React, { useEffect } from "react"
import { useStore } from "effector-react"

import { Col, Row } from "lib/styled-components-layout"
import { H2 } from "@howtocards/ui"
import { $cardsIds, pageReady } from "../model/home"
import { CardsCommonTemplate } from "../templates/common"
import { CardsList, CardItem } from "../organisms"

export const CardsHomePage = () => {
  const ids = useStore($cardsIds)
  useEffect(() => {
    pageReady()
  }, [])

  return (
    <CardsCommonTemplate sidebar={<Sidebar />}>
      <CardsList
        ids={ids}
        renderCard={({ card, onUsefulClick }) => (
          <CardItem key={card.id} card={card} onUsefulClick={onUsefulClick} />
        )}
      />
    </CardsCommonTemplate>
  )
}

const Sidebar = () => (
  <Col gap="3rem">
    <Row>
      <H2 narrow>Latest cards</H2>
    </Row>
    <Row>To find useful cards use search field</Row>
  </Col>
)
