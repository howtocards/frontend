import { css } from "styled-components"
import { createEmbed, material } from "@lib/material-colors"
import { prismcssLight } from "./prismcss"

const palette = {
  primary: {
    initial: createEmbed("Blue", "500"),
    hover: createEmbed("Blue", "600"),
  },
  decoration: {
    borders: material.palette.Black.Dividers,
  },
}

const embed = {
  link: css`
    color: ${material.palette.Grey["900"]};
  `,
  card: css`
    color: ${createEmbed("White").color};
    background-color: ${createEmbed("White").background};
    border-color: ${palette.decoration.borders};
  `,
  canvas: css`
    color: ${createEmbed("Blue Grey", "50").color};
    background-color: ${createEmbed("Blue Grey", "50").background};
  `,
  button: {
    primary: css``,
  },
}

export const lightTheme = {
  palette,
  embed,
  prismcss: prismcssLight,
}

export const staticLight = css`
  --bw10: #ffffff;
  --bw15: #f2f2f2;
  --bw20: #d9d9d9;
  --bw30: #bfbfbf;
  --bw40: #a6a6a6;
  --bw50: #808080;
  --bw65: #666666;
  --bw75: #4d4d4d;
  --bw85: #333333;
  --bw95: #262626;
  --bw100: #191919;

  --primary: ${createEmbed("Blue", "500").background};
  --primary-text: ${createEmbed("Blue", "500").color};
  --primary-hover: ${createEmbed("Blue", "600").background};
  --primary-hover-text: ${createEmbed("Blue", "600").color};

  --secondary: ${createEmbed("Grey", "900").background};
  --secondary-text: ${createEmbed("Grey", "900").color};
  --secondary-hover: ${createEmbed("Grey", "600").background};
  --secondary-hover-text: ${createEmbed("Grey", "600").color};

  --borders: ${material.palette.Black.Dividers};
  --canvas: ${createEmbed("Blue Grey", "50").background};
  --canvas-text: ${createEmbed("Blue Grey", "50").color};
  --card: ${createEmbed("White").background};
  --card-text: ${createEmbed("White").color};
`
