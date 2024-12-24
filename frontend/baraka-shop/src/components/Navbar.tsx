import React from 'react'
import whatsapp from "../images/whatsapp-svgrepo-com.svg"
import HandlePhoneLink from './HandlePhoneLink'
import { ShoppingCartIcon } from '@heroicons/react/24/solid'
import { Link } from 'react-router-dom'
import { useAppSelector } from '../app/hooks'

const Navbar = () => {
    const cartItems = useAppSelector((state) => state.cart);

    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    return (
        <nav className=' flex top-0 sticky py-2 px-3 shadow-lg justify-between items-center max-w-screen min-w-screen bg-white'>
            <Link to='/'>
                <h1 className=' font-bold '>
                    <span className=' text-yellow uppercase'>BARAKa</span><br />
                    <span className=' text-blue'>GAS</span>
                    <span>POINT</span>
                </h1>
            </Link>


            <div className=' flex items-center space-x-1'>
                <img className=' h-5 w-5 object-contain' src={whatsapp} alt='whatsapp' />
                <div>
                    +<HandlePhoneLink phoneNumber={254700200566} />
                </div>
            </div>

            <Link to='/cart'>
                <div className='relative'>
                    <ShoppingCartIcon className='h-5 w-5' />
                    {totalItems > 0 && (
                        <span className='absolute -top-2 -right-2 bg-red-500 text-white text-sm rounded-full px-1'>
                            {totalItems}
                        </span>
                    )}
                </div>
            </Link>

        </nav>
    )
}

export default Navbar