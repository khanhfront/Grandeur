"use client";
import { useSearchParams } from "next/navigation";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { propertyStructureIcons } from "@/constant/data";
import Link from "next/link";
export default function StructureTab() {
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab") || "Nổi bật";
  return (
    //px-6 sm:px-12 md:px-16 lg:px-24
    <div className="w-full flex justify-center mb-2">
      <ScrollArea className="w-[calc(100dvw-50px)] sm:w-[calc(100dvw-98px)] md:w-[calc(100dvw-130px)] lg:w-[calc(100dvw-194px)]  whitespace-nowrap overflow-x-auto">
        <div className="flex gap-3 xl:justify-between mb-2 pr-1 overflow-x-auto">
          {propertyStructureIcons.map((structure) => (
            <Link
              key={structure.value}
              href={`/property?tab=${structure.label}`}
              className={`pt-1 flex flex-col justify-center items-center text-center border-b-[3px]  hover:border-border ${
                tab === structure.label
                  ? "border-hdbg text-foreground"
                  : "border-transparent text-secondary-foreground"
              }`}
            >
              <structure.icon size={25} />
              {structure.label}
            </Link>
          ))}
        </div>
        <ScrollBar orientation="horizontal" className="h-2 overflow-x-auto" />
      </ScrollArea>
    </div>
  );
}
