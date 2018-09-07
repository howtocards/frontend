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

export async function cardsGet() {
  const data = models.Cards.chain().simplesort('created').data().map(({ content, title, meta: { created }, authorId }) => {
    const { email } = models.Users.findOne({ $loki: authorId })

    return ({ content, title, created, email })
  })

  console.log({ data })


  return Result.Ok(data)
}
