import Future from "fluture"
import { models } from "../models"

/**
 * @param {{ title: string, content: string, authorId: number }} cardData
 * @return created card
 */
export function cardCreate(cardData) {
  const { title, content, authorId } = cardData

  const card = models.Cards.insert({ title, content, authorId })

  return Future.of(card)
}

const mapCard = ({ $loki, content, title, meta, authorId }) => ({
  $loki,
  content,
  title,
  meta,
  authorId,
})

export function cardsGet() {
  const data = models.Cards.chain()
    .data()
    .map(mapCard)
    .reverse()

  return Future.of(data)
}

export async function cardRead(ctx) {
  const data = mapCard(models.Cards.findOne({ $loki: +ctx.params.cardId }))

  return Future.of(data)
}
