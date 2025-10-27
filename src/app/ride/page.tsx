"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import RideRequestForm from '@/components/ride-request-form';
import RideOptions from '@/components/ride-options';
import RideTracking from '@/components/ride-tracking';
import MapPlaceholder from '@/components/map-placeholder';
import { useAuth, useUser } from '@/firebase';
import { Button } from '@/components/ui/button';
import { Loader2, LogOut } from 'lucide-react';

type RideState = 'request' | 'options' | 'tracking';

export default function RidePage() {
  const { user, isUserLoading } = useUser();
  const auth = useAuth();
  const router = useRouter();

  const [rideState, setRideState] = useState<RideState>('request');
  const [locations, setLocations] = useState({ pickup: 'City Center', dropoff: 'North Suburbs' });

  useEffect(() => {
    if (!isUserLoading && !user) {
      router.push('/');
    }
  }, [user, isUserLoading, router]);

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

  const handleSignOut = () => {
    auth.signOut();
  };

  if (isUserLoading || !user) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-background">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <main className="relative h-screen w-screen overflow-hidden bg-background">
      <MapPlaceholder />
      <div className="absolute top-4 right-4 z-20">
        <Button onClick={handleSignOut} variant="secondary" className="shadow-lg">
          <LogOut className="mr-2 h-4 w-4" />
          Sign Out
        </Button>
      </div>
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
