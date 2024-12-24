import { ArrowLongRightIcon } from '@heroicons/react/24/solid';
import React from 'react'
import FormattedAmount from '../../components/FormattedAmount';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { addItem } from '../cart/cartSlice';
import {CartItem} from "../../features/cart/cartSlice";

interface ProductExcerptProps {
    product: {
        id: string;
        brand: {
            id: string;
            name: string;
        };
        product_type: {
            id: string;
            name: string;
        };
        weight: {
            id: string;
            weight: string;
        };
        sold_as: {
            id: string;
            name: string;
        };
        name: string;
        price: number;
        description: string;
        date_added: string;
        image: string;
    }
}

const ProductExcerpt: React.FC<ProductExcerptProps> = ({ product }) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const cartItems = useAppSelector((state) => state.cart);

    const isInCart = cartItems.some((item: CartItem) => item.id === product.id);

    const handleAddToCart = () => {
        dispatch(addItem({id: product.id, name: product.name, price: product.price,quantity: 1, image: product.image}))
    };

    const handleViewCart =() => {
        navigate('/cart')
    }
    return (
        <div className=' border p-1 rounded-lg bg-white shadow-md'>
            <div className='h-72'>
                <img onClick={() => navigate(`/product/${product.id}`)} className=' cursor-pointer w-full object-contain h-full rounded-md lg:h-fit' src={product.image} alt={product.name} />
            </div>

            <h2 className=' flex items-center text-base whitespace-nowrap mt-2 text-gray-500 font-bold mb-2'>
                {product.name} {product.weight.weight} <ArrowLongRightIcon className=' h-8 w-12' /> {product.sold_as.name}
            </h2>
            <p className=' text-gray-600'>{product.description}</p>
            <p className='text-lg font-semibold'><FormattedAmount amount={product.price} /></p>

            <div className='text-center mt-2'>
                {isInCart ? (
                    <>
                    <button onClick={handleViewCart} className='bg-blue rounded-md font-bold text-white px-2'>
                        View in Cart
                    </button>
                    </>
                ):(
                    <>
                    <button onClick={handleAddToCart} className='bg-green-500 px-2 rounded-md font-bold text-white'>Add to Cart</button>
                    </>
                    
                )} 
            </div>
        </div>
    )
}

export default ProductExcerpt