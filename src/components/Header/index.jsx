import React from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import SearchBar from '../Searchbar';

const Header = ({setSearch}) => {
    return (
        <Navbar expand="lg" fixed='top' bg="primary" data-bs-theme="light">
            <Container>
                <Navbar.Brand href="#" className='text-white fw-bold'>E-COMM</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" className='border-0 outline-0 navbar-toggler-icon-white' />
                <Navbar.Collapse id="navbarScroll" className='lg:d-flex justify-content-center align-items-center'>
                    <SearchBar setSearch={setSearch} />
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;