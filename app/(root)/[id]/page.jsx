'use client';

import Image from 'next/image';
import { useEvents } from '@/app/(root)/_components/events-provider';
import { useParams } from 'next/navigation';
import { useEffect } from 'react';
import { useUsers } from '@/app/(auth)/_components/users-provider';


const EventDetail = () => {
    const { id } = useParams();
    const { event, setEvent } = useEvents();
    const {
        bookEvent,
        isMaxUsers,
        numberOfBookedUsers,
        Booked,
        undoBookedEvent,
    } = useUsers();

    useEffect(() => {
        const fetchEventDetails = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/events/${id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch event details');
                }
                const data = await response.json();
                setEvent(data);
            } catch (error) {
                console.error('Could not fetch event details:', error.message);
            }
        };

        fetchEventDetails();
    }, [id, setEvent]);

    return (
        <div className='rounded-mb shadow-mb flex flex-col justify-center items-center'>
            {event && (
                <>
                    <div className='px-6 md:px-16 lg:px-36 pb-2 md:py-8'>

                        <dl className='sm:w-fit my-8 mx-auto sm:mx-0 bg-primary-muted divide-y divide-white rounded-md shadow-md text-white-800'>
                            <div className='py-4 flex justify-center items-center'>
                                <h1 className='px-3 py-1.5 font-bold tracking-tight bg-tertiary w-fit'>
                                    {event.name}
                                </h1>
                            </div>
                            <div className='py-4 flex justify-center items-center'>
                                <h3>{event.description}</h3>
                            </div>
                            <div className='py-4 flex justify-center items-center flex-col sm:grid sm:grid-cols-2 sm:gap-4 sm:px-0 grid-flow-col'>
                                <dd className='mt-2 mx-7 sm:mx-0 sm:mr-7 text-sm leading-6 sm:mt-0'>
                                    {event.date}
                                </dd>
                            </div>
                            <div className='py-4 flex justify-center items-center flex-col sm:grid sm:grid-cols-2 sm:gap-4 sm:px-0 grid-flow-col'>
                                <dd className='mt-2 mx-7 sm:mx-0 sm:mr-7 text-sm leading-6 sm:mt-0'>
                                    <span className='font-semibold'>
                                        {event.numberOfSpots -
                                            numberOfBookedUsers}
                                    </span>
                                    <span className='ml-1'>spots left</span>
                                </dd>
                            </div>
                            <div className='py-4 flex justify-center items-center sm:items-start flex-col sm:grid sm:grid-cols-2 sm:gap-4 sm:px-0 grid-flow-col'>
                                <dt className='mx-7 w-fit text-sm font-semibold'>
                                    Participants
                                </dt>
                                <dd className='mt-2 mx-7 sm:mx-0 sm:mr-7 flex flex-col text-sm gap-y-2 leading-6 sm:mt-0'>
                                    {event && event.bookedUsers?.length ? (
                                        event.bookedUsers.map((user) => (
                                            <div
                                                key={user.id}
                                                className='items-center sm:items-start min-w-0 flex-auto flex flex-col'>
                                                <span className='text-sm leading-6 text-white-900'>
                                                    {user.email}
                                                </span>
                                            </div>
                                        ))
                                    ) : (
                                        <span className='text-sm leading-6 text-gray-500/80'>
                                            No participants yet.
                                        </span>
                                    )}
                                </dd>
                            </div>
                            <div className='py-4 flex justify-center items-center flex-col sm:grid sm:grid-cols-2 sm:gap-4 sm:px-0 grid-flow-col'>
                                <dt className='mx-7 w-fit text-sm font-semibold'>
                                    Location
                                </dt>
                                <dd>
                                   <span>{event.location}</span>
                                </dd>
                            </div>
                            <div>
                                {event.image && (
                                    <Image
                                        src={event.image}
                                        alt={event.name}
                                        width={500}
                                        height={400}
                                        
                                    />
                                )}
                                </div>
                            <div className='p-6 sm:flex sm:px-6'>
                                <button
                                    onClick={
                                        Booked
                                            ? undoBookedEvent
                                            : bookEvent
                                    }
                                    className={`text-s text-black py-3 px-6 rounded-md font-semibold transition ${
                                        isMaxUsers ? 'bg-gray-400 cursor-not-allowed' : 'bg-white hover:bg-black-600'
                                    }`}>
                                    {Booked ? 'Undo booking' : 'Book now!'}
                                </button>
                            </div>
                        </dl>
                    </div>
                </>
            )}
        </div>
    );
};

export default EventDetail;
