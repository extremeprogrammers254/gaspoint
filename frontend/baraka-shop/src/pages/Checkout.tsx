import React, { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import Navbar from '../components/Navbar';
import { addOrder, getOrderStatus } from '../features/order/orderSlice';
import { clearCart } from '../features/cart/cartSlice';
import FormattedAmount from '../components/FormattedAmount';
import Footer from '../components/Footer';

const Checkout = () => {

    const dispatch = useAppDispatch();

    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [phoneNumber, setPhoneNumber] = useState<string>('');
    const [deliveryLocation, setDeliveryLocation] = useState<string>('');
    const [orderPlaced, setOrderPlaced] = useState<boolean>(false);
    const [orderId, setOrderId] = useState<string | null>(null);

    const order_status = useAppSelector(getOrderStatus);

    const cartItems = useAppSelector((state) => state.cart);
    const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

    const handlePlaceOrder = async () => {
        if (firstName && lastName && phoneNumber && deliveryLocation && cartItems.length > 0) {
            const orderData = {
                customerDetails: {
                    first_name: firstName,
                    last_name: lastName,
                    phone: phoneNumber,
                    location: deliveryLocation
                },
                cartItems,
            };

            const resultAction = await dispatch(addOrder({ orderData }));
            console.log(resultAction.payload);

            if (addOrder.fulfilled.match(resultAction)) {
                setOrderPlaced(true);
                setOrderId(resultAction.payload.order.order_number);
                dispatch(clearCart());
            } else {
                alert("Failed to place the order. Please try again.")
            }
        } else {
            alert('Please fill in all the details and make sure your cart is not empty.')
        }
    };


    return (
        <div className=' flex flex-col min-h-screen'>
            <Navbar />

            <section className=' flex-grow mt-4 p-4 container mx-auto bg-white shadow-md rounded-md'>
                {!orderPlaced ? (
                    <>
                        <h2 className='text-2xl font-bold mb-4'>Checkout</h2>
                        <form className=' space-y-4'>
                            <div className='flex flex-col md:flex-row md:space-x-4'>
                                <input 
                                type='text'
                                placeholder='First Name'
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                required
                                className='flex-1 p-2 border border-gray-300 rounded-md mb-1'
                                 />
                                <input 
                                type='text'
                                placeholder='Last Name'
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                required
                                className='flex-1 p-2 border border-gray-300 rounded-md mb-1'
                                 />
                            </div>
                            <input
                            type='tel'
                            placeholder='Phone Number'
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            required
                            className='w-full p-2 border border-gray-300 rounded-md'
                            />
                            <input
                            type='text'
                            placeholder='Delivery Location'
                            value={deliveryLocation}
                            onChange={(e) => setDeliveryLocation(e.target.value)}
                            required
                            className='w-full p-2 border border-gray-300 rounded-md'
                            />
                        </form>

                        <div className='mt-6'>
                            <h3 className='text-xl font-bold mb-2'>Your Order</h3>
                            <div className=' space-y-2'>
                                {cartItems.map((item) => (
                                    <div key={item.id} className=' flex justify-between items-center border-b pb-2'>
                                        <div className='flex items-center'>
                                            <img className='h-7 w-7 object-contain' src={item.image} alt={item.name} />
                                            <p>{item.name} (x{item.quantity})</p>
                                        </div>
                                        <p><FormattedAmount amount={(item.price * item.quantity)} /></p>
                                    </div>
                                ))}
                            </div>
                            <div className=' mt-4 text-right font-bold'>
                                <p>Total: <FormattedAmount amount={totalPrice} /></p>
                            </div>
                        </div>

                        <button 
                        disabled={order_status === "loading"}
                        onClick={handlePlaceOrder}
                        className={`mt-4 w-full py-2 font-semibold rounded-md transition ${order_status === "loading" ? "bg-gray-400 cursor-not-allowed" : "bg-blue text-white hover:bg-green-700" }`}
                        >
                            {order_status === "loading" ? (
                                <div className='flex items-center justify-center'>
                                    <svg
                                    className='animate-spin h-5 w-5 mr-2 text-white'
                                    xmlns='http://www.w3.org/200/svg'
                                    fill='none'
                                    viewBox='0 0 24 24'
                                    >
                                        <circle
                                        className='opacity-25'
                                        cx='12'
                                        cy='12'
                                        r='10'
                                        stroke='currentColor'
                                        strokeWidth='4'
                                        ></circle>
                                        <path
                                        className='opacity-75'
                                        fill='currentColor'
                                        d='M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z'
                                        ></path>
                                    </svg>
                                    Processing...
                                </div>
                            ): (
                                'Place Order'
                            )}

                        </button>
                    </>
                ) : (<div className='text-center'>
                    <h2 className='text-2xl font-bold mb-4'>Order Placed Successfully!</h2>
                    <p>Thank you, {firstName}. Your order has been placed.</p>
                    <p>Order ID: {orderId}</p>
                    <p>We will call you at {phoneNumber} to confirm the order shortly.</p>
                </div>)}
            </section>
            <Footer />
        </div>
    )
}

export default Checkout