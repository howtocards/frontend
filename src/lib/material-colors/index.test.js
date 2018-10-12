/* eslint-disable no-magic-numbers */
import { createEmbed } from './index'


test('given Brown 700 when createEmbed then background #5D4037', () => {
  const color = createEmbed('Brown', 700)

  expect(color.background).toEqual('#5D4037')
})

test('given Brown 700 when createEmbed then color white', () => {
  const color = createEmbed('Brown', 700)

  expect(color.color).toEqual('White')
})
