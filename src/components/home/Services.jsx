import React from 'react'
import SectionTitle from '../SectionTitle'

const Services = () => {
  return (
    <div className='container mx-auto'>
        <SectionTitle title="Our Services" description="We offer a wide range of services to help you achieve your fitness goals." />
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
            <div className='p-3 bg-base-200 rounded'>
                <img src="" alt="" />
                <h3 className='text-2xl font-bold text-brand'>Personal Training </h3>
                <p className='text-base-content text-sm px-5 font-medium mt-5 sm:mt-0 border-b border-brand py-2'>Our personal training services are designed to help you achieve your fitness goals. Our certified trainers will work with you to create a personalized training plan that will help you reach your goals.</p>
            </div>
            <div className='p-3 bg-base-200 rounded'>
                <img src="" alt="" />
                <h3 className='text-2xl font-bold text-brand'>Group Training </h3>
                <p className='text-base-content text-sm px-5 font-medium mt-5 sm:mt-0 border-b border-brand py-2'>Our personal training services are designed to help you achieve your fitness goals. Our certified trainers will work with you to create a personalized training plan that will help you reach your goals.</p>
            </div>
            <div className='p-3 bg-base-200 rounded'>
                <img src="" alt="" />
                <h3 className='text-2xl font-bold text-brand'>Neutration Counceling </h3>
                <p className='text-base-content text-sm px-5 font-medium mt-5 sm:mt-0 border-b border-brand py-2'>Our personal training services are designed to help you achieve your fitness goals. Our certified trainers will work with you to create a personalized training plan that will help you reach your goals.</p>
            </div>
        </div>
    </div>
  )
}

export default Services