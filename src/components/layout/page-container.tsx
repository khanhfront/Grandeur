import { ScrollArea } from "@/components/ui/scroll-area";

export default function PageContainer({
  children,
  isMain,
}: {
  children: React.ReactNode;
  isMain?: boolean;
}) {
  return (
    <>
      {isMain ? (
        <ScrollArea className="h-[calc(100dvh-100px)] px-6 sm:px-12 md:px-16 lg:px-24">
          <div className="h-full">{children}</div>
        </ScrollArea>
      ) : (
        <ScrollArea className="h-[calc(100dvh-125px)]">
          <div className="h-full">{children}</div>
        </ScrollArea>
      )}
    </>
  );
}
