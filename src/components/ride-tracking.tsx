import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Phone, MessageSquare, Share2, Star, CheckCircle, Car, MapPin } from "lucide-react";
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Separator } from "@/components/ui/separator";

type RideTrackingProps = {
  onNewRide: () => void;
  locations: { pickup: string; dropoff: string };
};

export default function RideTracking({ onNewRide, locations }: RideTrackingProps) {
  const driverImage = PlaceHolderImages.find(img => img.id === "driver-1");

  return (
    <Card className="shadow-2xl animate-in fade-in-0 zoom-in-95 bg-card/80 backdrop-blur-sm border-0 sm:border">
      <CardHeader>
        <div className="flex justify-between items-start">
            <div>
                <CardTitle className="font-headline text-2xl">Arriving in 5 min</CardTitle>
                <CardDescription>Your driver is on the way.</CardDescription>
            </div>
            <Avatar className="h-16 w-16 border-2 border-primary">
              <AvatarImage src={driverImage?.imageUrl} alt={driverImage?.description} data-ai-hint={driverImage?.imageHint} />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <Separator />
        <div className="flex justify-between items-center">
            <div>
                <p className="font-bold font-headline text-lg">James D.</p>
                <div className="flex items-center text-sm text-muted-foreground">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
                    <span>4.9</span>
                </div>
            </div>
            <div className="text-right">
                <p className="font-semibold">Toyota Camry</p>
                <p className="text-sm text-muted-foreground">ABC-1234</p>
            </div>
        </div>
        
        <div className="space-y-3 pt-2">
            <div className="flex items-start gap-4">
                <CheckCircle className="h-5 w-5 text-green-500 mt-1 shrink-0" />
                <div>
                    <p className="font-semibold">Meet at curbside</p>
                    <p className="text-sm text-muted-foreground line-clamp-1">{locations.pickup}</p>
                </div>
            </div>
             <div className="flex items-start gap-4">
                <Car className="h-5 w-5 text-primary mt-1 shrink-0" />
                <div>
                    <p className="font-semibold">Arriving in 5 minutes</p>
                    <p className="text-sm text-muted-foreground">10:35 PM ETA</p>
                </div>
            </div>
             <div className="flex items-start gap-4">
                <MapPin className="h-5 w-5 text-red-500 mt-1 shrink-0" />
                <div>
                    <p className="font-semibold line-clamp-1">{locations.dropoff}</p>
                    <p className="text-sm text-muted-foreground">Drop-off location</p>
                </div>
            </div>
        </div>
        
        <Separator />
        
        <div className="grid grid-cols-3 gap-2">
            <Button variant="outline"><Phone className="mr-0 sm:mr-2 h-4 w-4"/> <span className="hidden sm:inline">Call</span></Button>
            <Button variant="outline"><MessageSquare className="mr-0 sm:mr-2 h-4 w-4"/> <span className="hidden sm:inline">Message</span></Button>
            <Button variant="outline"><Share2 className="mr-0 sm:mr-2 h-4 w-4"/> <span className="hidden sm:inline">Share</span></Button>
        </div>

      </CardContent>
      <CardFooter>
        <Button onClick={onNewRide} variant="secondary" className="w-full">
          Request a New Ride
        </Button>
      </CardFooter>
    </Card>
  );
}
