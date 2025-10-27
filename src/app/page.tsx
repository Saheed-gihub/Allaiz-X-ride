"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useUser } from '@/firebase';
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
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-stars"></div>
        <div className="absolute inset-0 bg-twinkling"></div>
        <div className="absolute -bottom-1/3 -left-1/4 w-96 h-96 bg-purple-500 rounded-full opacity-20 filter blur-3xl animate-blob"></div>
        <div className="absolute -top-1/4 -right-1/4 w-96 h-96 bg-indigo-500 rounded-full opacity-20 filter blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-1/4 right-1/4 w-72 h-72 bg-violet-400 rounded-full opacity-10 filter blur-3xl animate-blob animation-delay-4000"></div>
      </div>
      <div className="relative z-10 flex h-full flex-col items-center justify-center text-center text-white p-4">
        <div className="max-w-md">
          <h1 className="text-6xl font-headline font-bold text-white drop-shadow-lg">Alliaz X-ride</h1>
          <p className="mt-4 text-lg text-purple-100 drop-shadow-md">
            Your ride, your way. Get moving with the tap of a button.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild size="lg" className="w-full sm:w-auto text-lg py-7 px-10 font-headline bg-white text-purple-700 hover:bg-purple-100 shadow-2xl transition-transform hover:scale-105">
              <Link href="/login">Log In</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="w-full sm:w-auto text-lg py-7 px-10 font-headline bg-transparent border-purple-200 text-white hover:bg-white/10 hover:text-white shadow-2xl transition-transform hover:scale-105">
              <Link href="/register">Register</Link>
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
