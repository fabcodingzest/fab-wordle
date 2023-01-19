import { Board, Footer, Header, Keypad } from './components'

function App() {
  return (
    <>
      <Header text={'Fabordle'} />
      <main className='bg-grey-light dark:bg-blue-midnight'>
        <Board />
        <Keypad />
      </main>
      <Footer />
    </>
  )
}

export default App
