import update from 'immutability-helper'
import type { FC, CSSProperties } from 'react'
import { memo, useCallback, useState } from 'react'
import { useDrop } from 'react-dnd'

import { Card } from './Card'
import ItemTypes from './ItemTypes'

const style: CSSProperties = {
  width: 400,
}

interface Item {
  id: number
  text: string
}

export interface ContainerState {
  cards: Item[]
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
  const [cards, setCards] = useState(ITEMS)

  const findCard = useCallback(
    (id: string) => {
      const card = cards.filter((c) => `${c.id}` === id)[0] as {
        id: number
        text: string
      }
      return {
        card,
        index: cards.indexOf(card),
      }
    },
    [cards],
  )

  const moveCard = useCallback(
    (id: string, atIndex: number) => {

      // // Dragging downwards
      // if (dragIndex < hoverIndex) {
      //   console.log('move↓', { dragIndex, hoverIndex });
      // }
      // // Dragging upwards            
      // else if (dragIndex > hoverIndex) {
      //   console.log('move↑', { dragIndex, hoverIndex });
      // }

      const { card, index } = findCard(id)
      setCards(
        update(cards, {
          $splice: [
            [index, 1],
            [atIndex, 0, card],
          ],
        }),
      )
    },
    [findCard, cards, setCards],
  )

  const [, drop] = useDrop(() => ({ accept: ItemTypes.CARD }))
  return (
    <div ref={drop} style={style}>
      {cards.map((card) => (
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
