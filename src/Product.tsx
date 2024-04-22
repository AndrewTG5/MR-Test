import React, { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import './Product.css';

type SizeOption = {
    id: number;
    label: string;
};

type ProductType = {
    id: number;
    title: string;
    description: string;
    price: number;
    imageURL: string;
    sizeOptions: SizeOption[];
};

type SelectedProduct = {
    id: number;
    title: string;
    description: string;
    price: number;
    imageURL: string;
    size: string;
    quantity: number;
  };

type ProductProps = {
    addToCart: (product: SelectedProduct) => void;
};

const Product: React.FC<ProductProps> = ({ addToCart }) => {
    const [product, setProduct] = useState<ProductType | null>(null);
    const [selectedSize, setSelectedSize] = useState<string | null>(null);
    const isLandscape = useMediaQuery({ query: '(orientation: landscape)' });

    useEffect(() => {
        fetch('https://3sb655pz3a.execute-api.ap-southeast-2.amazonaws.com/live/product')
            .then(response => response.json())
            .then(data => setProduct(data))
            .catch(error => console.error('Error:', error));
    }, []);

    const handleAddToCart = () => {
        if (!selectedSize) {
            alert('Please select a size before adding to cart.');
        } else if (product) {
            addToCart({ ...product, size: selectedSize, quantity: 1 });
        }
    };

    if (!product) {
        return <div>Loading...</div>;
    }

    return (
        <div className='productWrapper' style={isLandscape ? {display: 'flex', width: '60%'} : {width: '80%'}}>
            <div style={isLandscape ? {flex: '50%'} : {}}>
                <img style={isLandscape ? { height: '80%'} : {width: '80%'}} src={product.imageURL} alt={product.title} />
            </div>
            <div style={isLandscape ? {flex: '50%'} : {}}>
                <h2>{product.title}</h2>
                <b>${product.price}</b>
                <p>{product.description}</p>
                <p>SIZE<span style={{color: '#C90000'}}>*</span> {selectedSize}</p>
                {product.sizeOptions.map(size => (
                    <button key={size.id} onClick={() => setSelectedSize(size.label)}>
                        {size.label}
                    </button>
                ))}
                <br />
                <button onClick={handleAddToCart}>Add to Cart</button>
            </div>
        </div>
        
    );
};

export default Product;

