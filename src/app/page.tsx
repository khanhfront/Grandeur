import dynamic from "next/dynamic";
import { PuffLoader } from "react-spinners";
import PropertyListCard from "@/components/common/property/property-list-card";
import Footer from "@/components/layout/footer";
import DivContainer from "@/components/layout/div-container";
import HeaderSkeleton from "@/components/layout/header-skeleton";

const MobileNavigation = dynamic(
  () => import("@/components/layout/mobile-navigation"),
  {
    ssr: false,
  }
);

const Header = dynamic(() => import("@/components/layout/header"), {
  ssr: false,
  loading: () => <HeaderSkeleton />,
});
const MobileModeToggle = dynamic(
  () =>
    import("@/components/common/button/mobile-mode-toggle").then(
      (mod) => mod.MobileModeToggle
    ),
  {
    ssr: false,
  }
);

const StructureTab = dynamic(
  () => import("@/components/common/tabs/home/structure-custom-tab"),
  {
    ssr: false,
    loading: () => (
      <div className="w-full flex h-16 items-center justify-center">
        <PuffLoader size={20} color="#00cccc" />
      </div>
    ),
  }
);

export default function Home() {
  return (
    <main>
      <Header />
      <DivContainer>
        <StructureTab />
        <PropertyListCard />
        <MobileModeToggle />
        <Footer />
      </DivContainer>
      <MobileNavigation />
    </main>
  );
}
