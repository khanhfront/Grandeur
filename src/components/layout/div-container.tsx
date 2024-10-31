import { ScrollArea } from "@/components/ui/scroll-area";

export default function DivContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="px-6 sm:px-12 md:px-16 lg:px-24">{children}</div>;
}
