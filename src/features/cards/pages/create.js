import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { withFormik } from 'formik'

import { Authenticated } from 'features/account'
import { CardsCommonTemplate } from '../templates/common'


export const CardCreatePage = () => (
  <CardsCommonTemplate>
    <Authenticated
      render={() => (
        <div>CARD CREATE PAGE</div>
      )}
    />
  </CardsCommonTemplate>
)
