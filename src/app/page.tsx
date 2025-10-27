"use client";

import { useState } from 'react';
import RideRequestForm from '@/components/ride-request-form';
import RideOptions from '@/components/ride-options';
import RideTracking from '@/components/ride-tracking';
import MapPlaceholder from '@/components/map-placeholder';

type RideState = 'request' | 'options' | 'tracking';

export default function Home() {
  const [rideState, setRideState] = useState<RideState>('request');
  const [locations, setLocations] = useState({ pickup: 'City Center', dropoff: 'North Suburbs' });

  const handleRequest = (data: { pickup: string; dropoff: string }) => {
    setLocations(data);
    setRideState('options');
  };

  const handleOptions = () => {
    setRideState('tracking');
  };
  
  const handleNewRide = () => {
    setRideState('request');
  };

  return (
    <main className="relative h-screen w-screen overflow-hidden bg-background">
      <MapPlaceholder />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent"></div>
      <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-8 flex justify-center">
        <div className="w-full max-w-md">
          {rideState === 'request' && <RideRequestForm onConfirm={handleRequest} />}
          {rideState === 'options' && <RideOptions onConfirm={handleOptions} locations={locations} />}
          {rideState === 'tracking' && <RideTracking onNewRide={handleNewRide} locations={locations} />}
        </div>
      </div>
    </main>
  );
}
