import { TileProps } from '../../App'
import Row from './Row'

interface BoardProps {
  guesses: TileProps[][]
  turn: number
  currentGuess: string
}

const Board = ({ currentGuess, turn, guesses }: BoardProps) => {
  return (
    <div className='flex flex-col items-center gap-1 py-2'>
      {guesses.map((guess, i) => {
        if (guess) {
          return <Row key={i} guess={guess} />
        }
      })}
    </div>
  )
}

export default Board
