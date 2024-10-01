import { MobileModeToggle } from "@/components/common/button/mobile-mode-toggle";
import DynamicBreadcrumbNoID from "@/components/layout/breadcrumb/breadcrumb-noid";
import Header from "@/components/layout/header";
import PageContainer from "@/components/layout/page-container";
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section>
      <Header />

      <PageContainer isMain={true}>
        <DynamicBreadcrumbNoID />
        {children}
        <MobileModeToggle />
      </PageContainer>
    </section>
  );
}
