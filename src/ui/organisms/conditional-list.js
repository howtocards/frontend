// @flow
import * as React from "react"

type Props<T> = {
  list: T[],
  renderExists: (T[]) => React.Node,
  renderEmpty?: () => React.Node,
}

export const ConditionalList = <T>({
  list,
  renderExists,
  renderEmpty = () => null,
}: Props<T>) => (
  <>
    {list && list.filter(Boolean).length > 0
      ? renderExists(list)
      : renderEmpty()}
  </>
)

ConditionalList.defaultProps = {
  renderEmpty: undefined,
}
