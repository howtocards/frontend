// @flow
import * as React from "react"
import { useStore } from "effector-react"

import { Col, Row } from "@lib/styled-components-layout"
import { H2 } from "@howtocards/ui"
import { CardsCommonTemplate, SkeletonList } from "@features/cards"

import { $cardsIds, homeCardsFetching, pageReady } from "./model"

export const CardsHomePage = () => {
  const ids = useStore($cardsIds)
  const isLoading = useStore(homeCardsFetching.isLoading)

  React.useEffect(() => {
    pageReady()
  }, [])

  return (
    <CardsCommonTemplate sidebar={<Sidebar />}>
      <SkeletonList
        isLoading={isLoading}
        ids={ids}
        renderEmpty={() => <p>What about to create new card?</p>}
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
