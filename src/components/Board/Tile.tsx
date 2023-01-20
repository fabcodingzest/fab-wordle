import { TileProps } from '../../App'

const Tile = ({ letter, color }: TileProps) => {
  return (
    <div
      className={`${
        color ? color : 'border-grey-dark'
      } font-sm text-bold flex h-10 w-10 items-center justify-center border-2 dark:text-white `}
    >
      {letter.toUpperCase()}
    </div>
  )
}

export default Tile
