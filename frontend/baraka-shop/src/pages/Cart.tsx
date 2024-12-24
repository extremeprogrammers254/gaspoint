import React from 'react'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import Navbar from '../components/Navbar';
import FormattedAmount from '../components/FormattedAmount';
import { addItem, removeItem } from '../features/cart/cartSlice';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import { CartItem } from '../features/cart/cartSlice';

const Cart = () => {
    const dispatch = useAppDispatch();
    const cartItems = useAppSelector((state) => state.cart);
    const navigate = useNavigate();

    const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)

    const handleQuantityChange = (id: string, newQuantity: number) => {
        if (newQuantity > 0) {
            const item = cartItems.find(item => item.id === id);
            if (item) {
                dispatch(addItem({...item, quantity: newQuantity - item.quantity}));
            }
        }
    }

    const handleRemoveItem = (id: string) => {
        dispatch(removeItem(id));
    }


    const handleNavigate = () => {
        navigate('/checkout');
    }
  return (
    <div className=' flex flex-col min-h-screen'>
        <Navbar />

        <section className='flex-grow mt-4 p-4 container mx-auto bg-white shadow-md rounded-md'>
            <h2 className='text-2xl font-bold mb-4'>Shopping Cart</h2>
            {cartItems.length === 0 ? (
                <p className=' text-center'>Your cart is empty.</p>
            ):(
                <div className='space-y-6'>
                    {cartItems.map((item: CartItem) => (
                        <div key={item.id} className='flex flex-col md:flex-row justify-between items-center border-b pb-4'>
                            <div className=' flex items-center space-x-4 mb-2'>
                                <img 
                                src={`${item.image}`}
                                alt={item.name}
                                className='w-20 h-20 object-cover rounded-md'
                                />
                                <div>
                                    <h3 className='text-lg font-semibold'>{item.name}</h3>
                                    <p className='text-sm text-gray-600'>Price: <FormattedAmount amount={item.price} /></p>
                                </div>
                            </div>

                            <div className=' flex items-center space-x-2'>
                                <input
                                type='number'
                                min='0'
                                value={item.quantity}
                                onChange={(e) => handleQuantityChange(item.id, Number(e.target.value))}
                                className='w-16 p-2 border border-gray-300 rounded-md'
                                />
                                <button
                                onClick={() => handleRemoveItem(item.id)}
                                className='text-red-600 hover:text-red-900 transition font-semibold'
                                >Remove</button>
                            </div>

                            <div className='mt-2 md:mt-0 text-right'>
                                <p className='font-bold'>Subtotal: <FormattedAmount amount={(item.price * item.quantity)} /></p>
                            </div>
                        </div>
                    ))}

                    <div className='mt-6 flex justify-between items-center'>
                        <h3 className='text-xl font-bold'>Total: <FormattedAmount amount={totalPrice} /></h3>
                    <button
                    onClick={handleNavigate}
                    className='px-6 py-2 bg-blue text-white font-semibold rounded-md hover:bg-green-700 transition'
                    >Proceed to Checkout</button>
                    </div>
                </div>
            )}
        </section>
        <Footer />
    </div>
  )
}

export default Cart