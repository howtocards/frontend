// @flow
import * as React from "react"
import { useStore } from "effector-react"

import { Col, Row } from "@lib/styled-components-layout"
import { H2 } from "@howtocards/ui"

import { $cardsIds, pageReady, homeCardsFetching } from "../model/home"
import { CardsCommonTemplate } from "../templates/common"
import { CardsList } from "../organisms"
import { CardSkeleton } from "../organisms/card-skeleton"

export const CardsHomePage = () => {
  const ids = useStore($cardsIds)
  const isLoading = useStore(homeCardsFetching.isLoading)

  React.useEffect(() => {
    pageReady()
  }, [])

  return (
    <CardsCommonTemplate sidebar={<Sidebar />}>
      {isLoading ? (
        <>
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
        </>
      ) : (
        <CardsList
          ids={ids}
          renderEmpty={() => <p>What about to create new card?</p>}
        />
      )}
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
