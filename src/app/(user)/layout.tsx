import DynamicBreadcrumbNoID from "@/components/layout/breadcrumb/breadcrumb-noid";
import DivContainer from "@/components/layout/div-container";
import Footer from "@/components/layout/footer";
import HeaderSkeleton from "@/components/layout/header-skeleton";
import MobileNavigation from "@/components/layout/mobile-navigation";

import dynamic from "next/dynamic";
const Header = dynamic(() => import("@/components/layout/header"), {
  ssr: false,
  loading: () => <HeaderSkeleton />,
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section>
      <Header />
      <DivContainer>
        <DynamicBreadcrumbNoID />
        {children}
        <Footer />
      </DivContainer>
      <MobileNavigation />
    </section>
  );
}
