'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

import toast from 'react-hot-toast';
import { useEvents } from '@/app/(root)/_components/events-provider';
import { useAuth } from './auth.provider';

export const UsersContext = createContext();

const UsersContextProvider = ({ children }) => {
    const [inc, setInc] = useState(true);
    const [eventList, setEventList] = useState([]);
    const [eventListOriginal, setEventListOriginal] = useState([]);


    const { event, setEvent } = useEvents();
    const { user } = useAuth();
    const { id } = useParams();


    useEffect(() => {
        if (eventListOriginal.length === 0) {
            setEventListOriginal(eventList);
        }
    }, [eventList]);

    const onSort = () => {
        const sortedList = [...eventListOriginal].sort((a, b) => {
            return inc ? a.numberOfSpots - b.numberOfSpots : b.numberOfSpots - a.numberOfSpots;
        });
        setEventList(sortedList);
        setInc(!inc);
    };
    
    const onSortByDate = () => {
        const sortedList = [...eventListOriginal].sort((a, b) => {
            return inc ? new Date(a.date) - new Date(b.date) : new Date(b.date) - new Date(a.date);
        });
        setEventList(sortedList);
        setInc(!inc);
    };

    const currentlyBookedUsers = event?.bookedUsers || [];
    const numberOfBookedUsers = currentlyBookedUsers.length;
    const isMaxUsers = numberOfBookedUsers === event?.numberOfSpots;
    const hasBooked = currentlyBookedUsers.some((u) => u.id === user?.uid);

    const bookEventFunction = async () => {
        if (isMaxUsers || hasBooked) return;

        if (!user || !user.uid) {
            toast.error('You need to be logged in to book an event.');
            return;
        }

        console.log('Booking event with ID:', id);
        console.log('Booking data:', {
            eventId: id,
            email: user?.email,
            id: user?.uid,
        });

        try {
            const response = await fetch('http://localhost:3000/api/events/booked', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    eventId: id,
                    email: user?.email,
                    id: user?.uid,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to book event');
            }

            setEvent((prevState) => ({
                ...prevState,
                bookedUsers: [
                    ...currentlyBookedUsers,
                    { id: user?.uid, email: user?.email },
                ],
            }));
            toast.success('Event booked successfully!');
        } catch (error) {
            toast.error('Failed to book event, please try again.');
        }
    
    };

    const undoBookedEventFunction = async () => {

        if (!currentlyBookedUsers) return;
        console.log('Undo booking for event with ID:', id);

        try {
            const response = await fetch('http://localhost:3000/api/events/booked', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    eventId: id,
                    email: user?.email,
                    id: user?.uid,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to undo booking');
            }

            setEvent((prevState) => ({
                ...prevState,
                bookedUsers: currentlyBookedUsers.filter((x) => x.id !== user?.uid),
            }));
            toast.success('Event booking undone successfully!');
        } catch (error) {
            toast.error('Failed to undo booking, please try again.');
        }
    };

    const value = {
        onSort,
        onSortByDate,
        inc,
        eventList,
        setEventList,
        setEventListOriginal,
        bookEventFunction,
        isMaxUsers,
        numberOfBookedUsers,
        hasBooked,
        undoBookedEventFunction,
    };

    return (
        <UsersContext.Provider value={value}>{children}</UsersContext.Provider>
    );
};

export default UsersContextProvider;

export const useUsers = () => {
    const context = useContext(UsersContext);
    if (!context)
        throw new Error('useUsers must be used within an UsersContextProvider');
    return context;
};
