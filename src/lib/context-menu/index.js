// @flow
import * as React from "react"
import ReactDom from "react-dom"
import styled, { css } from "styled-components"
import useOnClickOutside from "use-onclickoutside"

import {
  MenuContainer as Container,
  MenuSeparator as Separator,
  MenuItem as Item,
} from "@howtocards/ui"

export { Separator, Item }

type Props = {
  trigger: React.Node,
  menu: ({ close: () => * }) => React.Node,
  as?: string | React.ComponentType<any>,
}

type Ref<T> = {| current: T |}

export const Context = ({ as, trigger, menu }: Props) => {
  const Wrapper = as || "div"
  const rootElement = document.querySelector("#context-menu")

  const wrapperRef: Ref<?HTMLElement> = React.useRef(null)
  const menuRef: Ref<?HTMLElement> = React.useRef(null)
  const [opened, toggle] = React.useReducer((prev) => !prev, false)
  const [position, setPosition] = React.useState(null)

  useOnClickOutside(menuRef, toggle)

  React.useEffect(() => {})

  React.useLayoutEffect(() => {
    if (opened) {
      const menuCur = menuRef.current
      const wrapperCur = wrapperRef.current
      const bodyCur = document.body

      if (menuCur && wrapperCur && bodyCur) {
        const wrapperRect = wrapperCur.getBoundingClientRect()
        const menuRect = menuCur.getBoundingClientRect()
        const bodyRect = bodyCur.getBoundingClientRect()

        const newPosition = {
          top: wrapperRect.top + wrapperRect.height,
          left: wrapperRect.left - menuRect.width + wrapperRect.width,
        }

        const isMenuOverTop = newPosition.top < 0
        const isMenuOverBottom =
          newPosition.top + menuRect.height > bodyRect.height

        if (isMenuOverBottom) {
          newPosition.top -= menuRect.height
        }
        if (isMenuOverTop) {
          newPosition.top = 0
        }

        setPosition(newPosition)
      }
    }
  }, [opened, wrapperRef.current])

  return (
    <>
      <Wrapper
        // $FlowIssue
        ref={wrapperRef}
        onClick={toggle}
      >
        {trigger}
      </Wrapper>
      {opened &&
        rootElement &&
        ReactDom.createPortal(
          <Background>
            <Positioner position={position}>
              <Container ref={menuRef}>{menu({ close: toggle })}</Container>
            </Positioner>
          </Background>,
          rootElement,
        )}
    </>
  )
}

Context.defaultProps = {
  as: "div",
}

const Positioner = styled.div`
  position: relative;
  display: flex;
  ${(p) =>
    p.position
      ? css`
          left: ${p.position.left}px;
          top: ${p.position.top}px;
        `
      : css`
          visibility: hidden;
        `}
`

const Background = styled.div`
  background-color: rgba(0, 0, 0, 0.2);
  bottom: 0;
  display: flex;
  flex-direction: column;
  left: 0;
  position: fixed;
  right: 0;
  top: 0;
  z-index: 1000;
`
