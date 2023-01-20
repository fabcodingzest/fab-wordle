import { TileProps } from '../../App'
import Tile from './Tile'

interface RowProps {
  guess: TileProps[] | null
}

const Row = ({ guess }: RowProps) => {
  if (guess) {
    return (
      <div>
        {guess.map((item, i) => (
          <Tile key={i} letter={item.letter} color={item.color} />
        ))}
      </div>
    )
  }

  return (
    <div className='flex gap-1'>
      {Array(6).map((_, i) => (
        <Tile key={i} letter={''} />
      ))}
    </div>
  )
}

export default Row
