'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { MdErrorOutline } from 'react-icons/md';
import { z } from 'zod';
import { useAuth } from './auth.provider';
import { addNewUser } from '@/app/lib/user.db';

const formSchema = z
    .object({
        email: z.string().email({ message: 'You need to enter a valid email' }),
        firstName: z.string().min(1, { message: 'You need to enter a first name' }),
        lastName: z.string().min(1, { message: 'You need to enter a last name' }),
        password: z.string().min(6, { message: 'The password must be at least 6 characters long' }),
        confirmPassword: z.string(),
    })
    .refine((values) => values.password === values.confirmPassword, {
        message: 'Passwords must match',
        path: ['confirmPassword'],
    });

const SignUpForm = () => {
    const { register: authRegister } = useAuth();
    const router = useRouter();

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: '',
            firstName: '',
            lastName: '',
            password: '',
            confirmPassword: '',
        },
    });

    const onSubmit = async (values) => {
        try {
            const uid = await authRegister(values);
            await addNewUser({
                name: `${values.firstName} ${values.lastName}`,
                email: values.email,
                password: values.password,
            }, uid);
            router.push('/');
            console.log('User added successfully');
        } catch (error) {
            console.error('Could not add user to database!', error);
        }
    };

    return (
        <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
            <form className='space-y-6' onSubmit={handleSubmit(onSubmit)}>
                <InputField
                    id='email'
                    label='Email address'
                    type='email'
                    register={register}
                    registerName='email'
                    error={errors.email}
                />
                <InputField
                    id='first-name'
                    label='First name'
                    type='text'
                    register={register}
                    registerName='firstName'
                    error={errors.firstName}
                />
                <InputField
                    id='last-name'
                    label='Last name'
                    type='text'
                    register={register}
                    registerName='lastName'
                    error={errors.lastName}
                />
                <InputField
                    id='password'
                    label='Password'
                    type='password'
                    register={register}
                    registerName='password'
                    error={errors.password}
                />
                <InputField
                    id='confirm-password'
                    label='Confirm password'
                    type='password'
                    register={register}
                    registerName='confirmPassword'
                    error={errors.confirmPassword}
                />
                <div>
                    <button
                        type='submit'
                        className='flex w-full justify-center rounded-md bg-black px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm'>
                        Sign up
                    </button>
                </div>
            </form>
        </div>
    );
};

const InputField = ({ id, label, type, register, registerName, error }) => (
    <div>
        <label htmlFor={id} className='block text-sm font-medium leading-6 text-black'>
            {label}
        </label>
        <div className='mt-2'>
            <input
                id={id}
                name={id}
                type={type}
                {...register(registerName)}
                className='block w-full rounded-md border-0 py-1.5 text-white  sm:text-sm sm:leading-6'
            />
            {error && (
                <span className='text-error text-xs mt-[2px] flex gap-1 items-center'>
                    <MdErrorOutline />
                    <span className='text-xs text-red-500'>{error.message}</span>
                </span>
            )}
        </div>
    </div>
);

export default SignUpForm;
