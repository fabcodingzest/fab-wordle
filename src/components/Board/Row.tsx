import { animation, animationWin, green } from '../../utility/constants'
import Tile, { TileProps } from './Tile'

interface RowProps {
  guess?: TileProps[] | null
  currentGuess?: string
}

const Row = ({ currentGuess, guess }: RowProps) => {
  if (guess) {
    const isWin = guess.every((x) => x.color === green)
    return (
      <div className='flex gap-1'>
        {guess.map(({ color, letter }, i) => (
          <Tile
            key={i}
            letter={letter}
            color={color}
            animation={isWin ? animationWin[i] : animation[i]}
          />
        ))}
      </div>
    )
  }

  if (currentGuess) {
    console.log(false)
    return (
      <div className={'flex gap-1'}>
        {currentGuess.split('').map((item, i) => (
          <Tile key={i} letter={item} animation={'animate-bounce-once'} />
        ))}

        {[...Array<string>(5 - currentGuess.length).fill('')].map((str, i) => (
          <Tile key={i} letter={str} />
        ))}
      </div>
    )
  }

  return (
    <div className='flex gap-1'>
      {Array(5)
        .fill(0)
        .map((_, i) => (
          <Tile key={i} letter={''} />
        ))}
    </div>
  )
}

export default Row
