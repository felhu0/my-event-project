'use client';

import { useEffect, useState } from "react";
import { useEvents } from "./(root)/_components/events-provider";
import withAuth from "./lib/withAuth";
import { EventItem } from "./(root)/_components/EventItem";
import { useAuth } from "./(auth)/_components/auth.provider";
import { useUsers } from "./(auth)/_components/users-provider";

const LandingPage = () => {
  const [loading, setLoading] = useState(false);
  
  const { user } = useAuth();
  const { events } = useEvents();

  const {
      onSortByDate,
      onSortByLocation,
      eventList,
      setEventList,
      setEventListOriginal,
  } = useUsers();

  useEffect(() => {
      setEventList(events)
      setEventListOriginal(events);
  }, [events]);

  if (loading) {
      return <div>Loading...</div>;
  }

  return (
      <div className='flex flex-col py-12 md:py-28 px-6 md:px-16 lg:px-36 justify-center items-center'>
          <div className='flex mt-10 md:mt-20 space-x-5'>
              <button
                  className='flex gap-3 items-center rounded-md bg-white text-black p-2 hover:bg-gray-200'
                  onClick={onSortByLocation}>
                  <span>Sort by location</span>
              </button>
              <button
                  className='flex gap-3 items-center rounded-md bg-white text-black p-2 hover:bg-gray-200'
                  onClick={onSortByDate}>
                  <span>Sort by date</span>
              </button>
             
          </div>
          <h3 className='flex mt-16 justify-center items-center'>
              Check out the current events!
          </h3>
          <div className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 p-2 mt-2'>
              {eventList
              .filter(item => new Date(item.date) > new Date())
              .map((item, i) => {
                const isFullyBooked = item.bookedUsers.length >= item.numberOfSpots;
                  return (
                      <EventItem
                          name={item.name}
                          key={i}
                          image={item.image}
                          location={item.location}
                          date={item.date}
                          numberOfSpots={item.numberOfSpots}
                          eventId={item.id}
                          userId={user?.uid}
                          bookedUsers={item.bookedUsers}
                          isFullyBooked={isFullyBooked}
                      />
                  );
              })}
          </div>
      </div>
  );
};

export default withAuth(LandingPage);