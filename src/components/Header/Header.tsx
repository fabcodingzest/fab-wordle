import ModeSwitch from './ModeSwitch'

interface HeaderProps {
  text: string
}

const Header = ({ text }: HeaderProps) => {
  return (
    <header className='bg-primary bg-violet-dark flex justify-between py-2 px-4 text-center text-2xl font-bold text-white'>
      <h1>{text}</h1>
      <ModeSwitch />
    </header>
  )
}

export default Header
