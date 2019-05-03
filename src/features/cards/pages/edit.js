// @flow
import React from "react"
import PropTypes from "prop-types"

import { Col } from "@lib/styled-components-layout"
import { RichEditor } from "@lib/rich-text"
import { Authenticated } from "@features/common"
import { Card, ButtonPrimary, Input } from "@howtocards/ui"
import { CardsCommonTemplate } from "../templates/common"

export const CardEditPage = () => {
  return (
    <>
      <CardsCommonTemplate>
        {/* {values.content && (
          <Authenticated
            render={() => (
              <Card style={{ marginBottom: "2rem" }}>
                <form onSubmit={handleSubmit}>
                  <Col gap="1rem">
                    <Input
                      name="title"
                      autoComplete="title"
                      placeholder="Card title"
                      disabled={isSubmitting}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.title}
                      failed={touched.title && Boolean(errors.title)}
                    />
                    <RichEditor
                      key={card.id}
                      disabled={isSubmitting}
                      content={values.content}
                      onChange={(content) => setFieldValue("content", content)}
                    />
                    <ButtonPrimary type="submit" disabled={isSubmitting}>
                      Edit
                    </ButtonPrimary>
                  </Col>
                </form>
              </Card>
            )}
          />
        )} */}
      </CardsCommonTemplate>
    </>
  )
}

CardEditPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      cardId: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
}
