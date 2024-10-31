import PageContainer from "@/components/layout/page-container";
import { NotFoundCom } from "@/components/common/not-found-com";

export default function NotFound() {
  return (
    <main>
      <PageContainer isMain={true}>
        <NotFoundCom />
      </PageContainer>
    </main>
  );
}
