import { validate } from '../middlewares/validate'
import { authenticated } from '../middlewares/auth'
import { checkExistUser } from '../middlewares/check-exist-user'
import { createCardScheme } from '../schemes/card'
import { cardPresent, cardWithFlagCanEdit } from '../presenters/card'
import { cardCreate, cardsGet, cardRead } from '../../commands/card'


export const cardsApi = (cards) => {
  cards.get(checkExistUser(), list)
  cards.post(authenticated(), create)
  cards.scope(':cardId', (card) => {
    card.get(cardRead)
    card.post(authenticated(), validate(createCardScheme), update)
    card.delete(authenticated(), destroy)
  })
}


const create = (ctx) => (
  cardCreate({ ...ctx.request.body, authorId: ctx.user.$loki })
    .map(cardPresent)
)

const list = (ctx) => (
  cardsGet()
    .map((cards) => cards
      .map(cardPresent)
      .map(cardWithFlagCanEdit(ctx.user.$loki)))
)

const update = () => null
const destroy = () => null
