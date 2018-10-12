import { validate } from '../middlewares/validate'
import { authenticated } from '../middlewares/auth'
import { createCardScheme } from '../schemes/card'
import { cardPresent } from '../presenters/card'
import { cardCreate, cardsGet } from '../../commands/card'


export const cardsApi = (cards) => {
  cards.get(list)
  cards.post(authenticated(), create)
  cards.scope(':cardId', (card) => {
    card.get(read)
    card.post(authenticated(), validate(createCardScheme), update)
    card.delete(authenticated(), destroy)
  })
}

const read = () => null

const create = (ctx) => (
  cardCreate({ ...ctx.request.body, authorId: ctx.user.$loki })
    .map(cardPresent)
)

const list = () => cardsGet().map((cards) => cards.map(cardPresent))

const update = () => null
const destroy = () => null
