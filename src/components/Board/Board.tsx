import { TileProps } from '../../App'
import Row from './Row'

interface BoardProps {
  guesses: TileProps[][]
  turn: number
  currentGuess: string
}

const Board = ({ currentGuess, turn, guesses }: BoardProps) => {
  return (
    <section className='flex flex-col items-center gap-1 py-2'>
      {guesses.map((guess, i) => {
        if (turn === i) {
          return <Row key={i} currentGuess={currentGuess} />
        }
        return <Row key={i} guess={guess} />
      })}
    </section>
  )
}

export default Board
