import { css } from 'styled-components'
import { material, createEmbed } from 'lib/material-colors'


const palette = {
  primary: {
    initial: material.palette.Blue['300'],
  },
}

const embed = {
  link: css`
    color: ${material.palette.Grey['200']};
  `,
  card: css`
    color: ${createEmbed('Blue Grey', '800').color};
    background-color: ${createEmbed('Blue Grey', '800').background};
    border-color: ${material.palette.White.Dividers};
  `,
  canvas: css`
    color: ${createEmbed('Blue Grey', '900').color};
    background-color: ${createEmbed('Blue Grey', '900').background};
  `,
}

export const darkTheme = {
  palette,
  embed,
}
