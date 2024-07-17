import { render, screen } from '@testing-library/react';
import ProfilePage from './ProfilePage';

test('renders', () =>{
    const {getByText} = render(<ProfilePage profileFormData={{}} 
        handleChange={() =>{}} 
        handleSubmit={() =>{}} 
        errorMessages={{}} 
        handleDelete={() =>{}}
        user={{}} />)

    expect(getByText('Username')).toBeInTheDocument()
    expect(getByText('Age')).toBeInTheDocument()
})