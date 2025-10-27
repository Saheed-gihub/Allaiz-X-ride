import { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Car, Gem, Users, CreditCard, ArrowRight } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

type RideOptionsProps = {
  onConfirm: () => void;
  locations: { pickup: string; dropoff: string };
};

const rideTypes = [
  { id: 'standard', name: 'Alliaz Standard', icon: Car, eta: '5 min', price: '$12.50' },
  { id: 'premium', name: 'Alliaz Premium', icon: Gem, eta: '7 min', price: '$25.00' },
  { id: 'xl', name: 'Alliaz XL', icon: Users, eta: '6 min', price: '$18.75' },
];

export default function RideOptions({ onConfirm, locations }: RideOptionsProps) {
  const [selectedRide, setSelectedRide] = useState('standard');

  return (
    <Card className="shadow-2xl animate-in fade-in-0 zoom-in-95 bg-card/80 backdrop-blur-sm border-0 sm:border">
      <CardHeader>
        <CardTitle className="font-headline text-2xl text-center">Choose your ride</CardTitle>
        <CardDescription className="text-center truncate px-4">
           {locations.pickup} → {locations.dropoff}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <RadioGroup value={selectedRide} onValueChange={setSelectedRide} className="p-1">
          {rideTypes.map((ride) => {
            const Icon = ride.icon;
            return (
              <Label
                key={ride.id}
                htmlFor={ride.id}
                className={cn(
                  "flex items-center space-x-4 rounded-lg border p-4 transition-all cursor-pointer",
                  selectedRide === ride.id ? "bg-accent border-primary shadow-md" : "hover:bg-accent/50 border-transparent"
                )}
              >
                <RadioGroupItem value={ride.id} id={ride.id} className="sr-only" />
                <Icon className="h-8 w-8 text-primary" />
                <div className="flex-1">
                  <p className="font-bold font-headline">{ride.name}</p>
                  <p className="text-sm text-muted-foreground">{ride.eta} away</p>
                </div>
                <p className="font-bold text-lg">{ride.price}</p>
              </Label>
            );
          })}
        </RadioGroup>

        <div className="flex items-center justify-between rounded-lg border bg-background/50 p-4 mx-1">
            <div className="flex items-center gap-3">
                <CreditCard className="h-6 w-6 text-muted-foreground" />
                <div>
                    <p className="font-semibold">Visa **** 4242</p>
                    <p className="text-xs text-muted-foreground">Default payment</p>
                </div>
            </div>
            <Button variant="link" className="text-primary">Change</Button>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={onConfirm} className="w-full text-lg py-7 font-headline" size="lg">
          Request {rideTypes.find(r => r.id === selectedRide)?.name || 'Alliaz'}
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </CardFooter>
    </Card>
  );
}
