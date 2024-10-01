import { DataTable } from "@/components/ui/data-table";
import { columns, AmenityDto } from "./columns";
import { Heading } from "@/components/ui/heading";
import ButtonLink from "@/components/common/button/link-button";

export const AmenityTable = ({ data }: { data: AmenityDto[] }) => {
  async function handleDelete(selectedRows: any[]): Promise<string[]> {
    "use server";

    const results: string[] = [];
    const successIds: number[] = [];
    const errorMessages: string[] = [];

    for (const amenity of selectedRows) {
      try {
        const response = await fetch(
          `http://localhost:5280/api/amenities/${amenity.amenityId}`,
          {
            method: "DELETE", // Using GET for demo purposes
          }
        );

        if (response.ok) {
          successIds.push(amenity.amenityId); // Collect successful IDs
        } else {
          errorMessages.push(
            `Failed to delete amenity with ID: ${amenity.amenityId}`
          );
        }
      } catch (error) {
        errorMessages.push(
          `Error deleting amenity with ID: ${amenity.amenityId}: ${error}`
        );
      }
    }

    // Handle successful deletions
    if (successIds.length > 0) {
      if (successIds.length >= 3) {
        results.push(
          `Successfully deleted amenities with IDs: ${successIds.join(", ")}`
        );
      } else {
        successIds.forEach((id) =>
          results.push(`Successfully deleted amenity with ID: ${id}`)
        );
      }
    }

    // Add any error messages
    results.push(...errorMessages);

    return results; // Return the array of messages
  }

  return (
    <div className="space-y-2">
      <div className="flex item-start justify-between">
        <Heading
          title={`Amenity (${data.length})`}
          description="Manage Amenity Table for Admin"
        />
        <ButtonLink
          url="/dashboard/amenities/new"
          className="bg-foreground text-background"
        >
          Add new
        </ButtonLink>
      </div>
      <DataTable
        searchKey="amenityName"
        data={data}
        columns={columns}
        onDelete={handleDelete}
      />
    </div>
  );
};
