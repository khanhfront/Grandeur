"use client";
import { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { toast } from "sonner";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { a } from "@/utils/antiSSL";
import ButtonLink from "@/components/common/button/link-button";
import { Checkbox } from "@/components/ui/checkbox";

export type PropertyDto = {
  propertyId: number;
  propertyName: string;
  pricePerNight: number;
  averagePropertyRating: number;
  numberPropertyRating: number;
  districtName: string;
  provinceName: string;
  propertyAddress: string;
  hostName: string;
  typeOfPropertyName: string;
};

// Extract the cell content to a separate component
const PropertyActionsCell = ({ property }: { property: PropertyDto }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    try {
      const response = await a.delete(
        `http://localhost:5280/api/properties/${property.propertyId}`
      );
      if (response.status === 204) {
        toast.success("Property deleted successfully");
        setIsDialogOpen(false);
        router.refresh();
      } else {
        toast.error(`Failed to delete property: ${response.statusText}`);
      }
    } catch (error) {
      toast.error("Failed to delete property");
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem
            onClick={() => {
              navigator.clipboard.writeText(property.propertyId.toString());
              toast.success("Copied to clipboard successfully");
            }}
          >
            Copy Property ID
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() =>
              router.push(`/dashboard/properties/${property.propertyId}`)
            }
          >
            Update property
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() =>
              router.push(
                `/dashboard/properties/${property.propertyId}/attribute`
              )
            }
          >
            Edit atributes
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setIsDialogOpen(true)}>
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Delete the property with Id {property.propertyId}
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setIsDialogOpen(false)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

// Define columns with the updated cell component
export const columns: ColumnDef<PropertyDto>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "propertyId",
    header: "Property ID",
  },
  {
    accessorKey: "propertyName",
    header: "Name",
    cell: ({ row }) => {
      const value: any = row.getValue("propertyName");
      const truncatedValue =
        value.length > 20 ? value.substring(0, 20) + "..." : value;
      return <div className="flex-start ">{truncatedValue}</div>;
    },
  },
  {
    accessorKey: "pricePerNight",
    header: "Price",
  },
  {
    accessorKey: "averagePropertyRating",
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="p-0"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        AVG Rating
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "numberPropertyRating",
    header: "Number ratings",
  },
  {
    accessorKey: "districtName",
    header: "District",
  },
  {
    accessorKey: "provinceName",
    header: "Province",
  },
  {
    accessorKey: "hostName",
    header: "Host name",
  },
  {
    id: "actions",
    cell: ({ row }) => <PropertyActionsCell property={row.original} />,
  },
];
