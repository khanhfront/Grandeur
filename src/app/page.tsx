import dynamic from "next/dynamic";
import { PuffLoader } from "react-spinners";
import Header from "@/components/layout/header";
import PageContainer from "@/components/layout/page-container";
import PropertyListCard from "@/components/common/property/property-list-card";
import { Suspense } from "react";

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
      <PageContainer isMain={true}>
        <StructureTab />
        <Suspense
          fallback={
            <div className="w-full flex h-16 items-center justify-center">
              <PuffLoader size={20} color="#00cccc" />
            </div>
          }
        >
          <PropertyListCard />
        </Suspense>
        <MobileModeToggle />
      </PageContainer>
    </main>
  );
}
