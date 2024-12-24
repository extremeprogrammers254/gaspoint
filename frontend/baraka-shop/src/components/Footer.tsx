import { PhoneArrowDownLeftIcon } from '@heroicons/react/24/solid'
import React from 'react'
import HandlePhoneLink from './HandlePhoneLink'

const Footer = () => {
  return (
    <footer className=' py-2 bg-slate-300'>
        <h1 className=' uppercase text-center font-semibold mb-2 text-gray-600'>connect with us</h1>
        <div className='flex flex-col items-center space-y-1'>
            <div className=' flex items-center space-x-2'>
                <PhoneArrowDownLeftIcon className='h-5 w-5' />
                +<HandlePhoneLink phoneNumber={254700200566} />
            </div>
            <div>
                <h3>baraka@gmail.com</h3>
            </div>
            <div>
                <h3>barakagaspoint.com</h3>
            </div>
        </div>
    </footer>
  )
}

export default Footer