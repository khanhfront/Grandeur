import { MobileModeToggle } from "@/components/common/button/mobile-mode-toggle";
import DynamicBreadcrumb from "@/components/layout/breadcrumb/dynamic-breadcrumb";
import Header from "@/components/layout/header";
import PageContainer from "@/components/layout/page-container";
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section>
      <Header />

      <PageContainer isMain={true}>
        <DynamicBreadcrumb />
        {children}
        <MobileModeToggle />
      </PageContainer>
    </section>
  );
}
