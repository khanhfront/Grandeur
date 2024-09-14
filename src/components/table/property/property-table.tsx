import { DataTable } from "@/components/ui/data-table";
import { columns, PropertyDto } from "./columns";
import { Heading } from "@/components/ui/heading";
import ButtonLink from "@/components/button/link-button";

export const PropertyTable = ({ data }: { data: PropertyDto[] }) => {
  async function handleDelete(selectedRows: any[]): Promise<string[]> {
    "use server";

    const results: string[] = [];
    const successIds: number[] = [];
    const errorMessages: string[] = [];

    for (const property of selectedRows) {
      try {
        const response = await fetch(
          `https://localhost:7209/api/properties/${property.propertyId}`,
          {
            method: "DELETE",
          }
        );

        if (response.ok) {
          successIds.push(property.propertyId);
        } else {
          errorMessages.push(
            `Failed to delete property with ID: ${property.propertyId}`
          );
        }
      } catch (error) {
        errorMessages.push(
          `Error deleting property with ID - ${property.propertyId}: ${error}`
        );
      }
    }

    if (successIds.length > 0) {
      if (successIds.length >= 3) {
        results.push(
          `Successfully deleted properties with IDs: ${successIds.join(", ")}`
        );
      } else {
        successIds.forEach((id) =>
          results.push(`Successfully deleted property with ID: ${id}`)
        );
      }
    }

    results.push(...errorMessages);

    return results;
  }
  return (
    <div className="space-y-2">
      <div className="flex item-start justify-between">
        <Heading
          title={`Property (${data.length})`}
          description="Manage property Table for Admin"
        />
        <ButtonLink
          url="/dashboard/properties/new"
          className="bg-foreground text-background"
        >
          Add new
        </ButtonLink>
      </div>
      <DataTable
        searchKey="propertyName"
        data={data}
        columns={columns}
        onDelete={handleDelete}
      />
    </div>
  );
};
