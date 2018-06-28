import React from 'react'
import { Redirect } from 'react-router-dom'


export const redirectTo = (path, key) => () => <Redirect key={key} to={path} />
export const redirectFrom = (from, to) => ({
  path: from,
  exact: true,
  component: redirectTo(to),
})
