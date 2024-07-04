import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import NavBar from './NavBar';

test('renders learn react link', () => {
    render(<MemoryRouter>
        <NavBar searchFilter={'a'} 
        handleChange={() =>{

        }}
        handleSearch={() =>{

        }}
        user={{}}
        setShowCart={() =>{

        }}
        showCart={false}/>
    </MemoryRouter>);
});
