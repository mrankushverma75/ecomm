import React, { useState, useEffect, useCallback } from 'react';
import { Container } from 'react-bootstrap';
import Cards from '../../components/Cards';
import Paginate from '../../components/Paginate';

const useDebounce = (value, delay) => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => clearTimeout(timer);
    }, [value, delay]);

    return debouncedValue;
};

const Products = ({ search }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [pagination, setPagination] = useState({
        totalItems: 0,
        currentPage: 1,
        lastPage: 1,
        perPage: 12,
    });
    const [filters, setFilters] = useState({
        search: search || '',
        sortBy: 'created_at',
        sortDirection: 'desc',
        perPage: 12,
    });

    const debouncedSearch = useDebounce(search, 500);

    const fetchProducts = useCallback(async (page = 1) => {
        setLoading(true);
        try {
            const params = new URLSearchParams({
                page,
                perPage: filters.perPage,
                sortBy: filters.sortBy,
                sortDirection: filters.sortDirection,
                ...(filters.search && { search: filters.search }),
            });

            const response = await fetch(`https://dashboard-gds-dev.ikargos.com/api/internal/product/list?${params.toString()}`);
            const data = await response.json();

            if (data.success) {
                setProducts(data.data);
                setPagination(data.pagination);
            } else {
                console.error('Failed to fetch products:', data);
            }
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setLoading(false);
        }
    }, [filters]);

    useEffect(() => {
        if (debouncedSearch !== filters.search) {
            setFilters((prev) => ({ ...prev, search: debouncedSearch }));
        }
    }, [debouncedSearch]);

    useEffect(() => {
        fetchProducts();
    }, [filters, fetchProducts]);

    const handleSort = (sortBy, direction) => {
        setFilters((prev) => ({
            ...prev,
            sortBy,
            sortDirection: direction,
        }));
    };

    const handlePageChange = (page) => {
        fetchProducts(page);
    };

    return (
        <Container className="mt-5 py-2">
            <h1 className="text-center fs-2 my-3">Latest Products</h1>

            <div className="d-flex align-items-center mb-4">
                <p className="fw-bold me-3 mb-0">Sort By:</p>
                <button
                    className={`btn btn-sm me-2 ${filters.sortBy === 'price' && filters.sortDirection === 'asc' ? 'btn-primary' : 'btn-outline-primary'}`}
                    onClick={() => handleSort('price', 'asc')}
                >
                    Price -- Low to High
                </button>
                <button
                    className={`btn btn-sm me-2 ${filters.sortBy === 'price' && filters.sortDirection === 'desc' ? 'btn-primary' : 'btn-outline-primary'}`}
                    onClick={() => handleSort('price', 'desc')}
                >
                    Price -- High to Low
                </button>
                <button
                    className={`btn btn-sm me-2 ${filters.sortBy === 'created_at' ? 'btn-primary' : 'btn-outline-primary'}`}
                    onClick={() => handleSort('created_at', 'desc')}
                >
                    Newest First
                </button>
            </div>

            {loading ? (
                <div className="text-center">Loading products...</div>
            ) : (
                <>
                    <Cards products={products} />
                    <div className="d-flex justify-content-center mt-5 mb-2">
                        {pagination.lastPage > 1 &&
                            <Paginate
                                handler={handlePageChange}
                                currentPage={pagination.currentPage}
                                isLast={pagination.currentPage === pagination.lastPage}
                                isFirst={pagination.currentPage === 1}
                            />
                        }
                    </div>
                </>
            )}
        </Container>
    );
};

export default Products;