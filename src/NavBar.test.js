import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import NavBar from './NavBar';

test('renders learn react link', () => {
    const {getByText} = render(<MemoryRouter>
        <NavBar searchFilter={'a'}
            handleChange={() => { }}
            handleSearch={() => { }}
            user={{}}
            setShowCart={() => { }}
            showCart={false} />
    </MemoryRouter>);

    expect(getByText('Log in')).toBeInTheDocument()
    expect(getByText('Sign up')).toBeInTheDocument()
    expect(getByText('Search')).toBeInTheDocument()
});
