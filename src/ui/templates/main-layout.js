import React from 'react'
import styled from 'styled-components'


const StyledLayout = styled.div`
  [data-layout="grid"] {
    display: grid;
    min-height: 100vh;
    min-width: 992px;
    grid-template-rows: auto 1fr auto;
  }

  [data-layout="header"] {
    padding: 1rem;
    background-color: tomato;
  }

  [data-layout="content"] {
    display: grid;
    grid-column-gap: 2rem;
    width: 900px;
    grid-template-columns: 30% auto;
    grid-template-rows: 1fr;
    
    grid-template-areas: 
      "sidebar main";
    margin-left: auto;
    margin-right: auto;
  }

  [data-layout="sidebar"] {
    grid-area: sidebar;
    background-color: gold;
  }

  [data-layout="main"] {
    grid-area: main;
    background-color: rebeccapurple;
  }

  [data-layout="footer"] {
    padding: 2rem;
    background-color: gray;
  }
`

export const MainLayoutTemplate = () => (
  <StyledLayout>
    <header data-layout="header" />
    <div data-layout="content">
      <aside data-layout="sidebar" />
      <main data-layout="main" />
    </div>
    <footer data-layout="footer" />
  </StyledLayout>
)
