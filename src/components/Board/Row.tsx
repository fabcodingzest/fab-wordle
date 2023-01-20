const Row = () => {
  return (
    <div className='flex gap-1'>
      {Array(5)
        .fill(0)
        .map((_, i) => {
          return (
            <div
              key={i}
              className='border-grey-med flex h-10 w-10 items-center justify-center border-2'
            ></div>
          )
        })}
    </div>
  )
}

export default Row
