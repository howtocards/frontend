import { css } from "styled-components"

export const prismcssDark = css`
  blockquote {
    padding: 4rem 2rem;
    border: 1px solid ${(p) => p.theme.palette.decoration.borders};
    ${({ theme }) => theme.embed.canvas}
    border-left: 10px solid #232222;
    margin: 1.5em 10px;
    padding: 0.5em 10px;
  }
  code[class*="language-"],
  pre[class*="language-"] {
    color: white;
    background: none;
    font-family: Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace;
    text-align: left;
    white-space: pre;
    word-spacing: normal;
    word-break: normal;
    word-wrap: normal;
    line-height: 1.5;

    -moz-tab-size: 4;
    -o-tab-size: 4;
    tab-size: 4;

    -webkit-hyphens: none;
    -moz-hyphens: none;
    -ms-hyphens: none;
    hyphens: none;
  }

  @media print {
    code[class*="language-"],
    pre[class*="language-"] {
      text-shadow: none;
    }
  }

  pre[class*="language-"],
  :not(pre) > code[class*="language-"] {
    /* background: hsl(30, 20%, 25%); */
  }

  /* Code blocks */
  pre[class*="language-"] {
    padding: 1em;
    margin: 0.5em 0;
    overflow: auto;
    padding: 4rem 2rem;
    border: 1px solid ${(p) => p.theme.palette.decoration.borders};
    ${({ theme }) => theme.embed.canvas};
    background-color: #171717; /* border: 0.3em solid hsl(30, 20%, 40%);
    border-radius: 0.5em;
    box-shadow: 1px 1px 0.5em black inset; */
  }

  /* Inline code */
  :not(pre) > code[class*="language-"] {
    padding: 0.15em 0.2em 0.05em;
    padding: 4rem 2rem;
    border: 1px solid ${(p) => p.theme.palette.decoration.borders};
    ${({ theme }) => theme.embed.canvas}
    /* border-radius: 0.3em;
    border: 0.13em solid hsl(30, 20%, 40%); */
    box-shadow: 1px 1px 0.3em -0.1em black inset;
    white-space: normal;
  }

  .token.comment,
  .token.prolog,
  .token.doctype,
  .token.cdata {
    color: hsl(30, 20%, 50%);
  }

  .token.punctuation {
    opacity: 0.7;
  }

  .namespace {
    opacity: 0.7;
  }

  .token.property,
  .token.boolean,
  .token.number,
  .token.tag,
  .token.symbol {
    color: hsl(350, 40%, 70%);
  }

  .token.tag.script {
    color: #4096ae;
  }

  .token.selector,
  .token.attr-name,
  .token.char,
  .token.builtin,
  .token.inserted {
    color: #4096ae;
  }

  .token.string {
    color: #bb7b66;
  }

  .token.operator,
  .token.entity,
  .token.url,
  .language-css .token.string,
  .style .token.string,
  .token.variable {
    color: hsl(40, 90%, 60%);
  }

  .token.atrule,
  .token.attr-value,
  .token.keyword {
    color: hsl(350, 40%, 70%);
  }

  .token.regex,
  .token.important {
    color: #e90;
  }

  .token.important,
  .token.bold {
    font-weight: bold;
  }
  .token.italic {
    font-style: italic;
  }

  .token.entity {
    cursor: help;
  }

  .token.deleted {
    color: red;
  }
  .token.function-variable.function,
  .token.function {
    color: #c0c28f;
  }

  .token.class-name,
  .token.tag {
    color: #00a78f;
  }
  .token.tag.spread.attr-value,
  .token.tag.spread.punctuation,
  .token.tag.attr-name,
  .token.tag.script.language-javascript.script-punctuation.punctuation,
  .token.tag.script.language-javascript,
  .token.tag.script.language-javascript.punctuation {
    color: white;
  }
`

export const prismcssLight = css`
  blockquote {
    padding: 4rem 2rem;
    border: 1px solid ${(p) => p.theme.palette.decoration.borders};
    ${({ theme }) => theme.embed.canvas}
    margin: 1.5em 10px;
    padding: 0.5em 10px;
  }
  code[class*="language-"],
  pre[class*="language-"] {
    color: black;
    background: none;
    font-family: Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace;
    text-align: left;
    white-space: pre;
    word-spacing: normal;
    word-break: normal;
    word-wrap: normal;
    line-height: 1.5;

    -moz-tab-size: 4;
    -o-tab-size: 4;
    tab-size: 4;

    -webkit-hyphens: none;
    -moz-hyphens: none;
    -ms-hyphens: none;
    hyphens: none;
  }

  @media print {
    code[class*="language-"],
    pre[class*="language-"] {
      text-shadow: none;
    }
  }

  pre[class*="language-"],
  :not(pre) > code[class*="language-"] {
    /* background: hsl(30, 20%, 25%); */
  }

  /* Code blocks */
  pre[class*="language-"] {
    padding: 1em;
    margin: 0.5em 0;
    overflow: auto;
    /* border: 0.3em solid hsl(30, 20%, 40%);
    border-radius: 0.5em;
    box-shadow: 1px 1px 0.5em black inset; */
    padding: 4rem 2rem;
    border: 1px solid ${(p) => p.theme.palette.decoration.borders};
    ${({ theme }) => theme.embed.canvas}
  }

  /* Inline code */
  :not(pre) > code[class*="language-"] {
    padding: 0.15em 0.2em 0.05em;
    /* border-radius: 0.3em;
    border: 0.13em solid hsl(30, 20%, 40%); */
    box-shadow: 1px 1px 0.3em -0.1em black inset;
    white-space: normal;
  }

  .token.comment,
  .token.prolog,
  .token.doctype,
  .token.cdata {
    color: hsl(30, 20%, 50%);
  }

  .token.punctuation {
    opacity: 0.7;
  }

  .namespace {
    opacity: 0.7;
  }

  .token.property,
  .token.tag,
  .token.boolean,
  .token.number,
  .token.symbol {
    color: #c034b4;
  }

  .token.tag.script {
    color: #4096ae;
  }

  .token.selector,
  .token.attr-name,
  .token.string,
  .token.char,
  .token.builtin,
  .token.inserted {
    color: #42ad55;
  }

  .token.operator,
  .token.entity,
  .token.url,
  .language-css .token.string,
  .style .token.string,
  .token.variable {
    color: hsl(40, 90%, 60%);
  }

  .token.atrule,
  .token.attr-value,
  .token.keyword {
    color: #c034b4;
  }

  .token.regex,
  .token.important {
    color: #e90;
  }

  .token.important,
  .token.bold {
    font-weight: bold;
  }
  .token.italic {
    font-style: italic;
  }

  .token.entity {
    cursor: help;
  }

  .token.deleted {
    color: red;
  }

  .token.function-variable.function,
  .token.class-name,
  .token.function {
    color: #2f75fa;
  }
  .token.tag.spread.attr-value,
  .token.tag.spread.punctuation,
  .token.tag.attr-name,
  .token.tag.script.language-javascript.script-punctuation.punctuation,
  .token.tag.script.language-javascript,
  .token.tag.script.language-javascript.punctuation {
    color: black;
  }
`
