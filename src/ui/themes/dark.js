import { css } from 'styled-components'
import { material, createEmbed } from '@lib/material-colors'


const palette = {
  primary: {
    initial: createEmbed('Blue', '300'),
    hover: createEmbed('Blue', '500'),
  },
  decoration: {
    borders: material.palette.White.Dividers,
  },
}

const embed = {
  link: css`
    color: ${material.palette.Grey['200']};
  `,
  card: css`
    color: ${createEmbed('Blue Grey', '800').color};
    background-color: ${createEmbed('Blue Grey', '800').background};
    border-color: ${palette.decoration.borders};
  `,
  canvas: css`
    color: ${createEmbed('Blue Grey', '900').color};
    background-color: ${createEmbed('Blue Grey', '900').background};
  `,
  button: {
    primary: css``,
  },
}

export const darkTheme = {
  palette,
  embed,
}
