import { configure, addDecorator, addParameters } from "@storybook/react"
import { withTheme } from "./themes"

addDecorator(withTheme)

addParameters({
  options: {
    name: "Howtocards",
    showStoriesPanel: true,
    showAddonPanel: true,
    showSearchBox: true,
    addonPanelInRight: false,
    hierarchySeparator: /\//,
    hierarchyRootSeparator: /\|/,
  },
})

configure(require.context("../src", true, /\.stories\.(js|mdx)$/), module)
