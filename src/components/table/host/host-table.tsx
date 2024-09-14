import { DataTable } from "@/components/ui/data-table";
import { columns, HostDto } from "./columns";
import { Heading } from "@/components/ui/heading";

export const HostTable = ({ data }: { data: HostDto[] }) => {
  return (
    <div className="space-y-2">
      <div className="flex item-start justify-between">
        <Heading
          title={`Host (${data.length})`}
          description="Manage Host Table for Admin"
        />
      </div>
      <DataTable searchKey="username" data={data} columns={columns} />
    </div>
  );
};
