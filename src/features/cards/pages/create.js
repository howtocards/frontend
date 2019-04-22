import React, { useEffect } from "react"

import { Col } from "@lib/styled-components-layout"
import { RichEditor } from "@lib/rich-text"
import { Authenticated } from "@features/common"
import { Card, ButtonPrimary, Input } from "@howtocards/ui"

import { useStore } from "effector-react"
import {
  $title,
  $content,
  contentChanged,
  titleChanged,
  pageUnmounted,
  submitButtonPressed,
} from "../model/create"
import { CardsCommonTemplate } from "../templates/common"

export const CardCreatePage = () => {
  const title = useStore($title)
  const content = useStore($content)
  useEffect(() => () => pageUnmounted(), [])

  return (
    <CardsCommonTemplate>
      <Authenticated
        render={() => (
          <Card style={{ marginBottom: "2rem" }}>
            <form onSubmit={submitButtonPressed}>
              <Col gap="1rem">
                <Input
                  name="title"
                  autoComplete="title"
                  placeholder="Card title"
                  // disabled={isSubmitting}
                  onChange={titleChanged}
                  // onBlur={handleBlur}
                  value={title}
                  // failed={touched.title && Boolean(errors.title)}
                />
                <RichEditor
                  content={content}
                  // disabled={isSubmitting}
                  onChange={contentChanged}
                />
                <ButtonPrimary
                  type="submit"
                  // disabled={isSubmitting}
                >
                  Create
                </ButtonPrimary>
              </Col>
            </form>
          </Card>
        )}
      />
    </CardsCommonTemplate>
  )
}

CardCreatePage.propTypes = {}
