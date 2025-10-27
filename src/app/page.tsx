"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { useUser } from '@/firebase';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Loader2 } from 'lucide-react';

export default function SplashPage() {
  const { user, isUserLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isUserLoading && user) {
      router.push('/ride');
    }
  }, [user, isUserLoading, router]);

  const bgImage = PlaceHolderImages.find(img => img.id === 'map-background');

  if (isUserLoading || user) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-background">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <main className="relative h-screen w-screen overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src={bgImage?.imageUrl || "https://picsum.photos/seed/map/1920/1080"}
          alt={bgImage?.description || "Map of a city"}
          data-ai-hint={bgImage?.imageHint || "city map"}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/20"></div>
      </div>
      <div className="relative z-10 flex h-full flex-col items-center justify-center text-center text-white">
        <div className="bg-background/50 backdrop-blur-sm p-8 rounded-xl shadow-2xl">
          <h1 className="text-5xl font-headline font-bold text-foreground">Alliaz X-ride</h1>
          <p className="mt-4 max-w-md text-lg text-muted-foreground">
            Your ride, your way. Get moving with the tap of a button.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Button asChild size="lg" className="text-lg py-7 px-10 font-headline">
              <Link href="/login">Log In</Link>
            </Button>
            <Button asChild variant="secondary" size="lg" className="text-lg py-7 px-10 font-headline">
              <Link href="/register">Register</Link>
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
