// @flow
import * as React from "react"
import { CardsList } from "./cards-list"
import { CardSkeleton } from "./card-skeleton"

type Props = {
  isLoading: boolean,
  ids: number[],
  renderEmpty: () => React.Node,
}

export const SkeletonList = ({ isLoading, ids, renderEmpty }: Props) =>
  isLoading ? (
    <>
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
    </>
  ) : (
    <CardsList ids={ids} renderEmpty={renderEmpty} />
  )
