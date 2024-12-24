import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { useParams } from 'react-router-dom';
import { fetchProduct, getSingleProductError, getSingleProductStatus, selectProduct } from '../features/singleProduct/singleProductSlice';
import Navbar from '../components/Navbar';
import { ArrowLongRightIcon } from '@heroicons/react/24/solid';
import FormattedAmount from '../components/FormattedAmount';
import { Skeleton } from '@mui/material';
import { addItem } from '../features/cart/cartSlice';
import Footer from '../components/Footer';

type RouteParams = {
    id: string
}
const ProductDetails = () => {
    const dispatch = useAppDispatch();

    const single_product = useAppSelector(selectProduct);
    const product_status = useAppSelector(getSingleProductStatus);
    const product_error = useAppSelector(getSingleProductError);
    const {id: productId} = useParams<RouteParams>();
    const [quantity, setQuantity] = useState<string>('1');


    useEffect(() => {
        dispatch(fetchProduct(productId!))
    }, [dispatch, productId])


    const handleQuantityChange = (e:any) => {
        const value = e.target.value;

        if (value === '' || /^\d+$/.test(value)){
            setQuantity(value);
        }
    }

    const handleAddToCart = () => {
        console.log('set items to cart!')
        const parsedQuantity = Math.max(1, Number(quantity));

        if (single_product) {
            dispatch(addItem({id: single_product.id, name: single_product.name, price: single_product.price, quantity: parsedQuantity, image:single_product.image}));

        }

        setQuantity('1');
    }
    

  return (
    <div className='flex flex-col min-h-screen'>
        <Navbar />

        <section className=' flex-grow bg-white container mx-auto p-4 mt-6'>
            {product_status === "loading" && (
                <div className=' text-center py-4'>
                    <div className=' grid grid-cols-1 lg:grid-cols-2 gap-8'>
                        <div className=' flex justify-center'>
                            <Skeleton variant='rectangular' width={450} height={350} className=' max-w-full h-auto rounded-md' />
                        </div>

                        <div className='p-4'>
                            <Skeleton className='text-2xl font-bold mb-2' />
                            <Skeleton className='text-2xl font-bold mb-2' />

                            <div className='flex items-center space-x-2 mb-4'>
                                <Skeleton className=' w-16 p-2 rounded-md' />
                                <Skeleton className=' px-4 py-2  rounded-md' />
                            </div>
                            <div className='mt-4'>
                                <Skeleton className='text-xl mb-2' />
                                <Skeleton className='text-xl mb-2' />
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {product_status === "succeeded" && (
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
                    <div className=' flex justify-center'>
                        <img className=' max-w-full h-auto rounded-md' src={single_product?.image} alt={single_product?.name} />

                    </div>

                    <div className=' p-4'>
                        <h1 className=' flex items-center text-3xl text-gray-500 font-bold mb-2'>{single_product?.name} <ArrowLongRightIcon className=' h-8 w-12 ' /> {single_product?.sold_as.name}</h1>
                        <p>Brand: {single_product?.brand.name}</p>
                        <p className=' text-lg font-semibold text-gray-800 mb-4'><FormattedAmount amount={single_product?.price} /></p>

                        <div className=' flex items-center space-x-2 mb-4'>
                            <input 
                            onChange={handleQuantityChange}
                            type='number'
                            min='0'
                            value={quantity}
                            className='p-2 w-16 border border-gray-600 rounded-md'
                        />
                        <button onClick={handleAddToCart} className=' px-4 py-2 bg-blue text-black font-bold lowercase rounded-md hover:bg-green-500 transition'>
                            add to cart
                        </button>
                        </div>

                        <div className='mt-4'>
                            <h2 className=' text-xl font-semibold mb-2'>Product Details</h2>
                            <p className=' text-gray-700'>{single_product?.description}</p>
                        </div>
                    </div>
                </div>
            )}

            {product_status === "succeeded" && !single_product && (
                <div className=' text-center py-4'>
                    <p>Product not found</p>
                </div>
            )}

            {product_status ==="failed" && (
                <div className=' text-center text-red-500'>
                <h3>Error Loading Product</h3>
                <p>{product_error}</p>
            </div>
            )}
        </section>
        <Footer />
    </div>
  )
}

export default ProductDetails