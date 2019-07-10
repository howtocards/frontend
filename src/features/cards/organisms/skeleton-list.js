// @flow
import * as React from "react"
import { CardsList } from "./cards-list"
import { CardSkeleton } from "./card-skeleton"

type Props = {
  isLoading: boolean,
  ids: number[],
  count?: number,
  renderEmpty: () => React.Node,
}

export const SkeletonList = ({
  isLoading,
  ids,
  count = 3,
  renderEmpty,
}: Props) =>
  isLoading ? (
    <>
      {Array.from({ length: count }, (_, idx) => (
        <CardSkeleton key={idx} />
      ))}
    </>
  ) : (
    <CardsList ids={ids} renderEmpty={renderEmpty} />
  )

SkeletonList.defaultProps = {
  count: undefined,
}
