/* eslint-disable import/no-default-export */
import * as React from "react"
import { addDecorator } from "@storybook/react"
import { action } from "@storybook/addon-actions"
import { boolean, text, withKnobs } from "@storybook/addon-knobs"

import { withContainer } from "@lib/stories"
import { Button } from "."

export default {
  title: "UI|Atoms/Button",
}

export const component = () => (
  <Button
    small={boolean("small", false)}
    disabled={boolean("disabled", false)}
    onClick={action("clicked")}
    grow={boolean("grow", false)}
  >
    {text("children", "Example")}
  </Button>
)

component.story = {
  decorators: [withContainer],
}

addDecorator(withKnobs)
