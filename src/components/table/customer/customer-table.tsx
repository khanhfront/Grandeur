import { DataTable } from "@/components/ui/data-table";
import { columns, CustomerDto } from "./columns";
import { Heading } from "@/components/ui/heading";

export const CustomerTable = ({ data }: { data: CustomerDto[] }) => {
  return (
    <div className="space-y-2">
      <div className="flex item-start justify-between">
        <Heading
          title={`Customer (${data.length})`}
          description="Manage Customer Table for Admin"
        />
      </div>
      <DataTable searchKey="username" data={data} columns={columns} />
    </div>
  );
};
