import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import SignInForm from '../(auth)/_components/sign-in-form';


jest.mock('../(auth)/_components/auth.provider', () => ({
    useAuth: () => ({
      login: jest.fn(() => Promise.resolve()),
    }),
  }));

jest.mock('next/navigation', () => ({
    useRouter: () => ({
        push: jest.fn(),
      }),
}));


describe('SignInForm', () => { 
    it('should render the sign in form', () => {
        render(<SignInForm />); // ARRANGE

        const emailInput = screen.getByLabelText('Email address'); // ACT
        const passwordInput = screen.getByLabelText('Password'); // ACT

        expect(emailInput).toBeInTheDocument(); // ASSERT
        expect(passwordInput).toBeInTheDocument(); // ASSERT
    })

    it('should clear the form after submission', async () => {
        render(<SignInForm />); // ARRANGE

        const emailInput = screen.getByLabelText('Email address'); // ACT
        const passwordInput = screen.getByLabelText('Password'); // ACT

        fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
        fireEvent.change(passwordInput, { target: { value: 'password' } });

        expect(emailInput.value).toBe('test@example.com');
        expect(passwordInput.value).toBe('password');

        const submitButton = screen.getByRole('button', { name: /sign in/i });
        fireEvent.submit(submitButton);

       
        await waitFor(() => {
            expect(emailInput.value).toBe('');
            expect(passwordInput.value).toBe('');
          });
    

    })
})