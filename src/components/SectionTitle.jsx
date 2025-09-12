import React from 'react'

const SectionTitle = ({title, description}) => {
  return (
    <div className='text-center my-5 py-5 '>
            <h2 className='text-5xl font-bold'>{title}</h2>
            <p className='text-base-content text-sm px-5 font-medium mt-5 sm:mt-0 border-b border-brand py-2'>{description}</p>
    </div>
  )
}

export default SectionTitle