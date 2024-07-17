import { fireEvent, render, waitFor, findAllByText, screen, getByRole, findByRole, queryByRole } from '@testing-library/react';
import App from './App';
import { MemoryRouter } from 'react-router-dom';
import { EcommerceApi } from './api';
import '@testing-library/jest-dom'


describe("App", () => {
    test('renders', () => {
        render(<MemoryRouter>
            <App />
        </MemoryRouter>);
    });
})



