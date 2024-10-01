import PageContainer from "@/components/layout/page-container";
import { MobileModeToggle } from "@/components/common/button/mobile-mode-toggle";
import dynamic from "next/dynamic";
import PropertyListCard from "@/components/common/property/property-list-card";
const Header = dynamic(() => import("@/components/layout/header"));

// Lazy load StructureTab
const StructureTab = dynamic(
  () => import("@/components/common/tabs/home/structure-custom-tab"),
  {
    ssr: false,
    loading: () => <p className="w-full text-center">Loading Structure...</p>,
  }
);

export default function Home() {
  return (
    <main>
      <Header />
      <PageContainer isMain={true}>
        <StructureTab />
        <PropertyListCard />
        <MobileModeToggle />
      </PageContainer>
    </main>
  );
}
