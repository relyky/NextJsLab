import update from 'immutability-helper'
import type { FC, CSSProperties } from 'react'
import { memo, useCallback, useState } from 'react'

import { Card } from './Card'

const style: CSSProperties = {
  width: 400,
}

interface Item {
  id: number
  text: string
}

const ITEMS = [
  {
    id: 201,
    text: 'Write a cool JS library',
  },
  {
    id: 202,
    text: 'Make it generic enough',
  },
  {
    id: 203,
    text: 'Write README',
  },
  {
    id: 204,
    text: 'Create some examples',
  },
  {
    id: 205,
    text: 'Spam in Twitter and IRC to promote it',
  },
  {
    id: 206,
    text: '???',
  },
  {
    id: 207,
    text: 'PROFIT',
  },
]

export const Container: FC = memo(() => {
  const [cardList, setCardList] = useState<Item[]>(ITEMS)

  const findCard = useCallback(
    (id: string) => {
      const card = cardList.filter((c) => `${c.id}` === id)[0] as {
        id: number
        text: string
      }
      return {
        card,
        index: cardList.indexOf(card),
      }
    },
    [cardList],
  )

  const moveCard = useCallback(
    (id: string, atIndex: number, from: number, by: string) => {
      console.log('moveCard', { id, atIndex, from, by })

      const { card, index } = findCard(id)
      setCardList(
        update(cardList, {
          $splice: [
            [index, 1],
            [atIndex, 0, card],
          ],
        }),
      )
    },
    [findCard, cardList, setCardList],
  )

  return (
    <div style={style}>
      {cardList.map((card) => (
        <Card
          key={card.id}
          id={`${card.id}`}
          text={card.text}
          moveCard={moveCard}
          findCard={findCard}
        />
      ))}
    </div>
  )
})
