import { TileProps } from '../../App'
import Tile from './Tile'

interface RowProps {
  guess?: TileProps[] | null
  currentGuess?: string
}

const Row = ({ currentGuess, guess }: RowProps) => {
  console.log(guess)
  if (guess) {
    return (
      <div className='flex gap-1'>
        {guess.map((item, i) => (
          <Tile key={i} letter={item.letter} color={item.color} />
        ))}

        {Array(5 - guess.length).map((item, i) => (
          <Tile key={i} letter={''} />
        ))}
      </div>
    )
  }

  if (currentGuess) {
    return (
      <div className='flex gap-1'>
        {currentGuess.split('').map((item, i) => (
          <Tile key={i} letter={item} />
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
