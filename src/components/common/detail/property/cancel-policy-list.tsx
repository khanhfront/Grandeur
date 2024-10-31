import { FaBan, FaMoneyBillWave, FaMoneyBillWaveAlt } from "react-icons/fa";

interface CancellationPolicyListProps {
  cancelPolicyList: CancellationPolicy[];
}

const CancellationPolicyList: React.FC<CancellationPolicyListProps> = ({
  cancelPolicyList,
}) => {
  // Hàm để chọn icon dựa trên loại chính sách hủy
  const getPolicyIcon = (typeId: number) => {
    switch (typeId) {
      case 1:
        return <FaMoneyBillWave className="text-foreground w-6 h-6" />;
      case 2:
        return (
          <FaMoneyBillWaveAlt className="text-secondary-foreground w-6 h-6" />
        );
      case 3:
        return <FaBan className="text-muted-foreground w-6 h-6" />;
      default:
        return null;
    }
  };

  return (
    <div className="my-8">
      <h2 className="text-2xl font-semibold mb-6 text-foreground">
        Chính sách hủy
      </h2>
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {cancelPolicyList.map((policy) => (
          <div
            key={policy.cancellationPolicyId}
            className="bg-card dark:border p-6 rounded-lg shadow-md flex flex-col items-center hover:shadow-lg transition-shadow duration-300"
          >
            <div className="mb-4">
              {getPolicyIcon(policy.cancellationPolicyTypeId)}
            </div>
            <h3 className="text-xl font-bold mb-2 text-foreground">
              {policy.cancellationPolicyTypeName}
            </h3>
            <p className="text-lg text-muted-foreground">
              <span
                className={`font-semibold ${
                  policy.refundPercentage === 100
                    ? "text-teal-400"
                    : policy.refundPercentage === 0
                    ? "text-destructive"
                    : "text-amber-500"
                }`}
              >
                {policy.refundPercentage}%
              </span>{" "}
              Hoàn trả
            </p>
            <p className="text-md mt-2 text-muted-foreground dark:text-muted-foreground">
              {policy.milestoneDate > 0
                ? `${policy.milestoneDate} ngày trước khi check in`
                : "Sát ngày check in"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CancellationPolicyList;
