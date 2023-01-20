import { TileProps } from '../../App'
import Row from './Row'

const Board = () => {
  return (
    <div className='flex flex-col items-center gap-1 py-2'>
      {Array(6)
        .fill(0)
        .map((_, i) => {
          return <Row key={i} />
        })}
    </div>
  )
}

export default Board
