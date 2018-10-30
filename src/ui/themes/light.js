import { css } from 'styled-components'
import { material, createEmbed } from '@lib/material-colors'


const palette = {
  primary: {
    initial: createEmbed('Blue', '500'),
    hover: createEmbed('Blue', '600'),
  },
  decoration: {
    borders: material.palette.Black.Dividers,
  },
}

const embed = {
  link: css`
    color: ${material.palette.Grey['900']};
  `,
  card: css`
    color: ${createEmbed('White').color};
    background-color: ${createEmbed('White').background};
    border-color: ${palette.decoration.borders};
  `,
  canvas: css`
    color: ${createEmbed('Blue Grey', '50').color};
    background-color: ${createEmbed('Blue Grey', '50').background};
  `,
  button: {
    primary: css`

    `,
  },
}

export const lightTheme = {
  palette,
  embed,
}
