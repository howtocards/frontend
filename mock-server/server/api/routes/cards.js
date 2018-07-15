import { validate } from '../middlewares/validate'
import { authenticated } from '../middlewares/auth'
import { createCardScheme } from '../schemes/card'
import { cardPresent } from '../presenters/card'
import { cardCreate } from '../../commands/card'


const index = () => null
const read = () => null

const create = async (ctx) => (
  await cardCreate({ ...ctx.request.body, authorId: ctx.user.$loki })
).map(cardPresent)

const update = () => null
const destroy = () => null

export const cardsApi = (cards) => {
  cards.get(index)
  cards.post(authenticated(), validate(createCardScheme), create)
  cards.scope(':cardId', (card) => {
    card.get(read)
    card.post(authenticated(), validate(createCardScheme), update)
    card.delete(authenticated(), destroy)
  })
}
