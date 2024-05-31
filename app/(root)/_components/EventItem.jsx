'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';



const fetchEvents = async () => {
    const response = await fetch('http://localhost:3000/api/events');
    const data = await response.json();
    return data;
};


export const EventItem = ({
    name,
    image,
    location,
    date,
    eventId,
    numberOfSpots,
    bookedUsers,
    isFullyBooked
    
}) => {
    const router = useRouter();

   
    return (
        <div
            onClick={() => router.push(`/${eventId}`)}
            className='p-6 bg-primary hover:bg-primary-muted hover:scale-105 rounded-md shadow-lg ring-1 ring-gray-900/5 transform transition duration-500 cursor-pointer m-5 max-w-96 w-full sm:w-[370px] h-[360px] sm:h-auto text-gray-800 flex flex-col'>
            <div className='justify-center text-left'>
                <h3 className='mb-2 w-fit px-3 bg-tertiary font-semibold text-primary'>
                    {name}
                </h3>
                <div className='w-full h-[150px]'>
                    <Image
                        src={image}
                        width={200}
                        height={200}
                        alt='Event image'
                        className='w-full h-[150px] object-cover rounded-md'
                    />
                </div>
                <div className='flex flex-col gap-2 mt-4 text-sm'>
                    <span>
                        <span className='font-semibold'>Location: </span>
                        {location}
                    </span>
                    <span>
                        <span className='font-semibold'>Date: </span>
                        {date}
                    </span>
                    {isFullyBooked ? (
                        <span className='text-red-500 font-semibold'>
                            Fully Booked
                        </span>
                    ) : (
                        <span>
                            <span className='font-semibold'>
                                Booked: 
                            </span>
                            {bookedUsers.length}/{numberOfSpots}
                        </span>
                    )}

                </div>
            </div>
        </div>
    );
};

const EventsList = () => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const loadEvents = async () => {
            const eventsData = await fetchEvents();
            const eventsWithBookingInfo = eventsData.map(event => ({
                ...event,
                isFullyBooked: event.bookedUsers.length >= event.numberOfSpots
            }));
            setEvents(eventsWithBookingInfo);
        };
        loadEvents();
    }, []);

    return (
        <div className="events-list">
            {events.map(event => (
                <EventItem key={event.eventId} {...event} />
            ))}
        </div>
    );
};

export default EventsList;