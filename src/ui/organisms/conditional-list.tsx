import * as React from "react"

type Props<T> = {
  list: T[]
  renderExists: (list: T[]) => React.ReactChild | null
  renderEmpty?: () => React.ReactChild | null
}

export function ConditionalList<T>({
  list,
  renderExists,
  renderEmpty = () => null,
}: Props<T>): React.ReactElement {
  return (
    <>
      {list && list.filter(Boolean).length > 0
        ? renderExists(list)
        : renderEmpty()}
    </>
  )
}
