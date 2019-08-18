// @flow
import * as React from "react"

const noop = () => null;

type Props<T> = {
  list: T[],
  renderExists: (T[]) => React.Node,
  renderEmpty?: () => React.Node,
}

export const ConditionalList = <T>({
  list,
  renderExists,
  renderEmpty = noop,
}: Props<T>) => (
  <>
    {list && list.filter(Boolean).length > 0
      ? renderExists(list)
      : renderEmpty()}
  </>
)
