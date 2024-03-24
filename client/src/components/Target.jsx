import React from 'react'

function Target({target}) {

  return( 
      <div className='flex justify-center items-center w-[700px] h-[100px] rounded bg-green-500'>
        <h1 className='text-white font-bold text-2xl'>CashedOut at: {`${target}`}x</h1>
      </div>
  )
}

export default Target