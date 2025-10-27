"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useUser } from '@/firebase';
import { Car } from 'lucide-react';
import { Loader2 } from 'lucide-react';

export default function SplashPage() {
  const { user, isUserLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isUserLoading && user) {
      router.push('/ride');
    }
  }, [user, isUserLoading, router]);

  if (isUserLoading || user) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-background">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <main className="relative h-screen w-screen overflow-hidden bg-gradient-to-br from-purple-600 via-indigo-700 to-violet-900">
      <div className="absolute top-1/2 left-0 w-full h-1/2">
        <Car className="absolute text-white/10 -translate-y-1/2 w-48 h-48 animate-ride" style={{left: '-150px'}} />
        <Car className="absolute text-white/10 -translate-y-1/2 w-32 h-32 animate-ride" style={{right: '-150px', animationDelay: '2s', animationDuration: '8s'}} />
        <Car className="absolute text-white/5 -translate-y-1/2 w-24 h-24 animate-ride" style={{left: '-100px', animationDelay: '5s', animationDuration: '12s'}}/>
      </div>
      <div className="relative z-10 flex h-full flex-col items-center justify-center text-center text-white">
        <div className="bg-black/20 backdrop-blur-md p-8 rounded-xl shadow-2xl">
          <h1 className="text-5xl font-headline font-bold text-white">Alliaz X-ride</h1>
          <p className="mt-4 max-w-md text-lg text-purple-100">
            Your ride, your way. Get moving with the tap of a button.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Button asChild size="lg" className="text-lg py-7 px-10 font-headline bg-white text-purple-700 hover:bg-purple-100">
              <Link href="/login">Log In</Link>
            </Button>
            <Button asChild variant="secondary" size="lg" className="text-lg py-7 px-10 font-headline bg-white/20 text-white hover:bg-white/30">
              <Link href="/register">Register</Link>
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
