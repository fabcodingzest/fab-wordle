import { ReactComponent as BackSpace } from '../../assets/backspace.svg'

const keyboardLetters = [
  ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
  ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
  ['Enter', 'z', 'x', 'c', 'v', 'b', 'n', 'm', 'Backspace'],
]

interface KeyPadProps {
  handleInput: (key: string) => void
  keyboardEnable: boolean
  usedKeys: { [key: string]: string }
}

const Keypad = ({ usedKeys, keyboardEnable, handleInput }: KeyPadProps) => {
  return (
    <section>
      {keyboardLetters.map((row, i) => {
        return (
          <div key={i} className='flex justify-center gap-x-1 pb-1 md:gap-2 md:pb-2'>
            {row.map((letter) => {
              const color = usedKeys[letter]
              return (
                <button
                  className={`${
                    color ? color : 'bg-grey-med'
                  } border-grey-dark flex h-6 w-min items-center justify-center rounded-md border px-2 text-xs md:h-10 md:px-3 md:text-sm `}
                  key={letter}
                  onClick={() => {
                    if (keyboardEnable) handleInput(letter)
                  }}
                >
                  {letter === 'Backspace' ? <BackSpace /> : letter}
                </button>
              )
            })}
          </div>
        )
      })}
    </section>
  )
}

export default Keypad
