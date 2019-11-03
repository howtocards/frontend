// @flow
import * as React from "react"
import { useStore } from "effector-react"

import { Col, Row } from "@lib/styled-components-layout"
import { H2 } from "@howtocards/ui"
import { CardsCommonTemplate, SkeletonList } from "@features/cards"

import { $cardsIds, Gate, homeCardsFetching } from "./model"

export const CardsHomePage = () => {
  const ids = useStore($cardsIds)
  const isLoading = useStore(homeCardsFetching.isLoading)

  return (
    <>
      <Gate />
      <CardsCommonTemplate sidebar={<Sidebar />}>
        <SkeletonList
          isLoading={ids.length === 0 && isLoading}
          ids={ids}
          renderEmpty={() => <p>What about to create new card?</p>}
        />
      </CardsCommonTemplate>
    </>
  )
}

const Sidebar = () => (
  <Col gap="1rem">
    <Row>
      <H2 narrow>Latest cards</H2>
    </Row>
    <Row>To find useful cards use search field</Row>
  </Col>
)
