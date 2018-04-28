import { material, createEmbed } from 'lib/material-colors'


const palette = {
  primary: {
    initial: material.palette.Blue['500'],
  },
}

const embed = {
  link: {
    color: material.palette.Grey['900'],
  },
  card: {
    ...createEmbed('White'),
    borderColor: material.palette.Black.Dividers,
  },
  canvas: createEmbed('Blue Grey', '50'),
}

export const lightTheme = {
  palette,
  embed,
}
