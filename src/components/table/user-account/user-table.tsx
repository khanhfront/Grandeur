import { DataTable } from "@/components/ui/data-table";
import { columns, UserDto } from "./columns";
import { Heading } from "@/components/ui/heading";
import ButtonLink from "@/components/button/link-button";

export const UserTable = ({ data }: { data: UserDto[] }) => {
  async function handleDelete(selectedRows: any[]): Promise<string[]> {
    "use server";

    const results: string[] = [];
    const successIds: number[] = [];
    const errorMessages: string[] = [];

    for (const user of selectedRows) {
      try {
        const response = await fetch(
          `https://localhost:7209/api/UserAccounts/${user.userId}`,
          {
            method: "DELETE",
          }
        );

        if (response.ok) {
          successIds.push(user.userId); // Collect successful IDs
        } else {
          errorMessages.push(`Failed to delete user with ID: ${user.userId}`);
        }
      } catch (error) {
        errorMessages.push(
          `Error deleting user with ID: ${user.userId}: ${error}`
        );
      }
    }

    // Handle successful deletions
    if (successIds.length > 0) {
      if (successIds.length >= 3) {
        results.push(
          `Successfully deleted user accounts with IDs: ${successIds.join(
            ", "
          )}`
        );
      } else {
        successIds.forEach((id) =>
          results.push(`Successfully deleted user with ID: ${id}`)
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
          title={`User (${data.length})`}
          description="Manage User Table for Admin"
        />
        <ButtonLink
          url="/dashboard/user-accounts/new"
          className="bg-foreground text-background"
        >
          Add new
        </ButtonLink>
      </div>
      <DataTable
        searchKey="emailAddress"
        data={data}
        columns={columns}
        onDelete={handleDelete}
      />
    </div>
  );
};
