import * as React from "react"
import styled from "styled-components"

type Props<P> = {
  items: P[]
  render: (item: P) => React.ReactChild | null
}

export function ItemsList<P>({ items, render }: Props<P>) {
  return <Items>{items.map((item) => render(item))}</Items>
}

const Items = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
  align-items: flex-start;
`
