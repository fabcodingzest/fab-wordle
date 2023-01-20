import { Toaster } from 'react-hot-toast'
import { Board, Footer, Header, Keypad } from './components'
import words from './utility/words.json'
import 'react-responsive-modal/styles.css'
import { Modal } from 'react-responsive-modal'
import useStore from './hooks/useStore'

export interface TileProps {
  letter: string
  color?: string
}

const solution = words[Math.floor(Math.random() * words.length)]

function App() {
  const {
    guesses,
    turn,
    currentGuess,
    usedKeys,
    handleInput,
    onCloseModal,
    isCorrect,
    open,
    keyboardEnable,
  } = useStore(solution)

  return (
    <div className='flex min-h-screen flex-col'>
      <Header text={'Fabordle'} />
      <main className='bg-grey-light dark:bg-blue-midnight flex flex-1 flex-col justify-center gap-2'>
        <Board guesses={guesses} turn={turn} currentGuess={currentGuess} />
        <Keypad handleInput={handleInput} keyboardEnable={keyboardEnable} usedKeys={usedKeys} />
      </main>
      <Footer />
      <Toaster />
      <Modal
        open={open}
        onClose={onCloseModal}
        center
        classNames={{ modal: 'rounded p-6', closeButton: 'top-0 p-0.5 right-0' }}
      >
        <div className='text-center'>
          <h2 className='pt-2 pb-4 text-xl font-bold'>
            {isCorrect ? 'Congrats, You guessed it right!' : 'Aw! Better luck next time'}
          </h2>
          <p className=''>
            Right answer is <span className='font-bold text-green-700'>{solution}</span>
          </p>
          <p>
            {isCorrect
              ? `You found answer in ${turn === 1 ? ' 1 turn' : `${turn} turns`} Wohuuuuu!`
              : '6 turns were not enough? You suck bruh lol!'}
          </p>
        </div>
      </Modal>
    </div>
  )
}

export default App
