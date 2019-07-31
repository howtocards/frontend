import { css } from "styled-components"
import { material, createEmbed } from "@lib/material-colors"
import { prismcssDark } from "./prismcss"

const palette = {
  primary: {
    initial: createEmbed("Blue", "300"),
    hover: createEmbed("Blue", "500"),
  },
  decoration: {
    borders: material.palette.White.Dividers,
  },
}

const embed = {
  link: css`
    color: ${material.palette.Grey["200"]};
  `,
  card: css`
    color: ${createEmbed("Blue Grey", "800").color};
    background-color: ${createEmbed("Blue Grey", "800").background};
    border-color: ${palette.decoration.borders};
  `,
  canvas: css`
    color: ${createEmbed("Blue Grey", "900").color};
    background-color: ${createEmbed("Blue Grey", "900").background};
  `,
  button: {
    primary: css``,
  },
}

export const darkTheme = {
  palette,
  embed,
  prismcss: prismcssDark,
}

export const staticDark = css`
  --bw10: #191919;
  --bw15: #262626;
  --bw20: #333333;
  --bw30: #4d4d4d;
  --bw40: #666666;
  --bw50: #808080;
  --bw65: #a6a6a6;
  --bw75: #bfbfbf;
  --bw85: #d9d9d9;
  --bw95: #f2f2f2;
  --bw100: #ffffff;

  --primary: ${createEmbed("Blue", "300").background};
  --primary-text: ${createEmbed("Blue", "300").color};
  --primary-hover: ${createEmbed("Blue", "500").background};
  --primary-hover-text: ${createEmbed("Blue", "500").color};

  --secondary: ${createEmbed("Grey", "200").background};
  --secondary-text: ${createEmbed("Grey", "200").color};
  --secondary-hover: ${createEmbed("Grey", "400").background};
  --secondary-hover-text: ${createEmbed("Grey", "400").color};

  --borders: ${material.palette.White.Dividers};
  --canvas: ${createEmbed("Blue Grey", "900").background};
  --canvas-text: ${createEmbed("Blue Grey", "900").color};
  --card: ${createEmbed("Blue Grey", "800").background};
  --card-text: ${createEmbed("Blue Grey", "800").color};
`
