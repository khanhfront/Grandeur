import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";

type Amenity = {
  amenityId: number;
  amenityName: string;
};

interface AmenityStateListProps {
  dataAmenityState: Amenity[];
}

const AmenitySelectedList = ({ dataAmenityState }: AmenityStateListProps) => {
  let count = dataAmenityState.length;
  return (
    <Card className="hidden md:block md:w-1/2 xl:w-3/4">
      <CardHeader>
        <CardTitle className="text-lg font-bold">
          Selected {count} Amenities
        </CardTitle>
      </CardHeader>
      <ScrollArea className="h-[calc(100dvh-210px)]">
        <CardContent>
          {dataAmenityState.length > 0 ? (
            <ul className="mt-4 space-y-2">
              {dataAmenityState.map((amenity, index) => (
                <li
                  key={amenity.amenityId}
                  className="p-2 border border-muted rounded-full flex justify-center items-center hover:outline hover:outline-foreground hover:outline-2"
                >
                  <Label>
                    {index + 1}-{amenity.amenityName}
                  </Label>
                </li>
              ))}
            </ul>
          ) : (
            <p>No amenities selected.</p>
          )}
        </CardContent>
      </ScrollArea>
    </Card>
  );
};

export default AmenitySelectedList;
