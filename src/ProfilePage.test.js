import { render, screen } from '@testing-library/react';
import ProfilePage from './ProfilePage';

test('renders', () =>{
    render(<ProfilePage profileFormData={{}}
         handleChange={() =>{

         }}
         handleSubmit={() =>{

         }}
         errorMessages={{}} 
         handleDelete={() =>{
         }}
         user={{}} />)
})