import { css } from 'styled-components'
import { material, createEmbed } from 'lib/material-colors'


const palette = {
  primary: {
    initial: material.palette.Blue['500'],
  },
}

const embed = {
  link: css`
    color: ${material.palette.Grey['900']};
  `,
  card: css`
    color: ${createEmbed('White').color};
    background-color: ${createEmbed('White').background};
    border-color: ${material.palette.Black.Dividers};
  `,
  canvas: css`
    color: ${createEmbed('Blue Grey', '50').color};
    background-color: ${createEmbed('Blue Grey', '50').background};
  `,
}

export const darkTheme = {
  palette,
  embed,
}
