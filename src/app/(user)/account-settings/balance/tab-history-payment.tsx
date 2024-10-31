import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PaymentMethod } from "./payment-method";
import { HistoryTransaction } from "./history-transaction";
interface tabProp {
  userTransaction: any;
  transactions: any;
}
export const TabHistoryPayment: React.FC<tabProp> = ({
  userTransaction,
  transactions,
}) => (
  <Tabs
    defaultValue="HistoryTransaction"
    className="hidden min-[400px]:block col-span-full md:col-span-2"
  >
    <TabsList>
      <TabsTrigger value="HistoryTransaction">Lịch sử giao dịch</TabsTrigger>
      <TabsTrigger value="PaymentMethod">Phương thức thanh toán</TabsTrigger>
    </TabsList>
    <TabsContent value="HistoryTransaction">
      {userTransaction || transactions ? (
        <HistoryTransaction transactions={userTransaction || transactions} />
      ) : (
        <div className="flex-1">Lỗi khi load biến động số dư</div>
      )}
    </TabsContent>
    <TabsContent value="PaymentMethod">
      <PaymentMethod />
    </TabsContent>
  </Tabs>
);
