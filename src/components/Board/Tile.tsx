export interface TileProps {
  letter: string
  color?: string
  animation?: string
}

const Tile = ({ letter, color, animation }: TileProps) => {
  return (
    <div
      className={`${color ? color : 'border-grey-dark'} font-sm text-bold ${animation} ${
        color ? 'text-white' : ''
      } flex h-10 w-10 items-center justify-center border-2 font-bold transition dark:text-white`}
    >
      {letter.toUpperCase()}
    </div>
  )
}

export default Tile
