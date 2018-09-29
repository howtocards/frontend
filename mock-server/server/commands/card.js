import { Result } from '@es2/option-result'
import { models } from '../models'


/**
 * @param {{ title: string, content: string, authorId: number }} cardData
 * @return {Promise<Result<{ $loki: number }, string>>} created card
 */
export async function cardCreate(cardData) {
  const { title, content, authorId } = cardData

  const card = models.Cards.insert({ title, content, authorId })

  console.log({ card })

  return Result.Ok(card)
}

const getAuthorEmail = (id) => models.Users.findOne({ $loki: id }).email

const formatterCardsData = ({
  content, title,
  meta: { created }, authorId,
  $loki,
}) => ({ id: $loki, content, title, created, author_id: getAuthorEmail(authorId) })

export async function cardsGet() {
  const data = models.Cards.chain().data().map(formatterCardsData).reverse()

  console.log({ data })

  return Result.Ok(data)
}

export async function cardRead(ctx) {
  let data = models.Cards.findOne({ $loki: +ctx.params.cardId })

  data = formatterCardsData(data)
  console.log({ data })

  return Result.Ok(data)
}
