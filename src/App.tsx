import { useEffect } from 'react'
import { Toaster } from 'react-hot-toast'
import { Board, Footer, Header, Keypad } from './components'
import words from './utility/words.json'
import 'react-responsive-modal/styles.css'
import { Modal } from 'react-responsive-modal'
import useStore from './hooks/useStore'
import ModalContent from './components/Modal/ModalContent'

const solution = words[Math.floor(Math.random() * words.length)]

function App() {
  const {
    turn,
    open,
    shake,
    guesses,
    usedKeys,
    isCorrect,
    currentGuess,
    keyboardEnable,
    handleInput,
    onCloseModal,
    setKeyboardEnable,
  } = useStore(solution)

  const handleKeyup = (e: KeyboardEvent) => {
    const key = e.key
    if (key) handleInput(key)
  }

  useEffect(() => {
    window.addEventListener('keyup', handleKeyup)
    // remove access to keyboard after correct guess
    if (isCorrect || turn > 5) {
      setKeyboardEnable(false)
      window.removeEventListener('keyup', handleKeyup)
    }
    return () => window.removeEventListener('keyup', handleKeyup)
  }, [handleKeyup, isCorrect, turn])

  return (
    <>
      <Header text={'Fabordle'} />
      <main className='bg-grey-light dark:bg-blue-midnight flex flex-1 flex-col justify-center gap-2 md:gap-4'>
        <Board guesses={guesses} turn={turn} currentGuess={currentGuess} shake={shake} />
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
        <ModalContent isCorrect={isCorrect} solution={solution} turn={turn} />
      </Modal>
    </>
  )
}

export default App
