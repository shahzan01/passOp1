import React from 'react'

const Footer = () => {
  return (
    <div className='bg-slate-600  max-w-full min-w-fit text-white flex flex-col justify-center items-center p-0 m-0'>
      <div>
      <h1 className='sm:text-xl lg:text-3xl   text-sm font-bold text-center'><span className='text-green-700 '>&lt;</span>
Pass
<span className='text-green-700 '>OP/&gt;</span></h1>
      </div>

      <div className='flex gap-1 sm:text-xl lg:text-2xl text-xs'>Created with  <img src="\icons\heart.png" width={20} alt="heart" className='  sm:w-6 lg:w-8' /> by  <a href="https://github.com/shahzan01" target='_blank'> Shahzan</a></div>

    </div>
  )
}

export default Footer
