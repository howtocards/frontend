import Future from 'fluture'
import { models } from '../models'

/**
 * @param {{ title: string, content: string, authorId: number }} cardData
 * @return created card
 */
export function cardCreate(cardData) {
  const { title, content, authorId } = cardData

  const card = models.Cards.insert({ title, content, authorId })

  return Future.of(card)
}

export function cardsGet() {
  const map = ({ $loki, content, title, meta, authorId }) => ({
    $loki,
    content,
    title,
    meta,
    authorId,
  })

  const data = models.Cards.chain()
    .data()
    .map(map)
    .reverse()

  return Future.of(data)
}
