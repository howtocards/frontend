import { Result } from '@es2/option-result'
import { models } from '../models'


/**
 * @param {{ title: string, content: string, authorId: number }} cardData
 * @return {Promise<Result<{ $loki: number }, string>>} created card
 */
export async function cardCreate(cardData) {
  const { title, content, authorId } = cardData

  const card = models.Cards.insert({ title, content, authorId })

  return Result.Ok(card)
}
