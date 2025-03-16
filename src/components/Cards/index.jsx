import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import Paginate from '../Paginate';
import { CalculateDiscount } from '../../utils/utility';

const Cards = ({ products }) => {
    const [currentImageIndices, setCurrentImageIndices] = useState([]);
    const [intervalIds, setIntervalIds] = useState([]);

    useEffect(() => {
        setCurrentImageIndices(products ? products.map(() => 0) : []);
    }, [products]);

    const handleMouseEnter = (productIndex) => {
        const intervalId = setInterval(() => {
            setCurrentImageIndices(prevIndices => {
                const newIndices = [...prevIndices];
                const imageCount = products[productIndex].image_urls.length;
                newIndices[productIndex] = (newIndices[productIndex] + 1) % imageCount;
                return newIndices;
            });
        }, 2000);

        setIntervalIds(prev => {
            const newIds = [...prev];
            newIds[productIndex] = intervalId;
            return newIds;
        });
    };

    const handleMouseLeave = (productIndex) => {
        if (intervalIds[productIndex]) {
            clearInterval(intervalIds[productIndex]);
            setIntervalIds(prev => {
                const newIds = [...prev];
                newIds[productIndex] = null;
                return newIds;
            });
        }

        setCurrentImageIndices(prev => {
            const newIndices = [...prev];
            newIndices[productIndex] = 0;
            return newIndices;
        });
    };

    useEffect(() => {
        return () => {
            intervalIds.forEach(id => {
                if (id) clearInterval(id);
            });
        };
    }, [intervalIds]);

    return (
        <div>
            <Row className='justify-content-center gap-2'>
                {products?.map((product, index) => {
                    const discount = CalculateDiscount(product.price, product.mrp);

                    return (
                        <Col
                            md={4}
                            lg={3}
                            key={product.id}
                            style={{ maxWidth: '280px' }}
                            onMouseEnter={() => handleMouseEnter(index)}
                            onMouseLeave={() => handleMouseLeave(index)}
                        >
                            <div className='card-hover transition-200'>
                                <img
                                    src={product.image_urls[currentImageIndices[index] || 0]}
                                    alt={product.name}
                                    style={{ height: '320px' }}
                                    className='w-100'
                                />
                                <div className='p-1'>
                                    <h2 className='fs-7 fw-semibold text-secondary m-0'>{product.brand}</h2>
                                    <p className='fs-7 my-1 p-0'>
                                        {product.name.length > 80 ? product.name.substr(0, 80) + '...' : product.name}
                                    </p>
                                    <div className='fs-7'>
                                        <span className='fw-bold'>₹{product.price}</span>
                                        <span className='text-decoration-line-through mx-2'>₹{product.mrp}</span>
                                        <span className='text-success fw-semibold'>{discount.toFixed(0)}% off</span>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    );
                })}
            </Row>            
        </div>
    );
};

export default Cards;