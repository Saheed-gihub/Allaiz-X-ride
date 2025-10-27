import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const MapPlaceholder = () => {
  const mapImage = PlaceHolderImages.find(img => img.id === "map-background");

  return (
    <div className="absolute inset-0">
      <Image
        src={mapImage?.imageUrl || "https://picsum.photos/seed/map/1920/1080"}
        alt={mapImage?.description || "Map of a city"}
        data-ai-hint={mapImage?.imageHint || "city map"}
        fill
        className="object-cover"
        priority
      />
    </div>
  );
};

export default MapPlaceholder;
