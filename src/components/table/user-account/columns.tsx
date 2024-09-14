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
import ButtonLink from "@/components/button/link-button";
import { Checkbox } from "@/components/ui/checkbox";

// Định nghĩa kiểu dữ liệu dựa trên API
export type UserDto = {
  userId: number;
  userFirstName: string;
  userLastName: string;
  emailAddress: string;
  phoneNumber: string;
  userDob: string;
  userAbout: string;
  districtName: string;
  provinceName: string;
};

// Định nghĩa cột cho bảng
export const columns: ColumnDef<UserDto>[] = [
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
    accessorKey: "userId",
    header: "User ID",
  },
  {
    accessorKey: "userFirstName",
    header: "First Name",
  },
  {
    accessorKey: "userLastName",
    header: "Last Name",
  },
  {
    accessorKey: "emailAddress",
    header: "Email",
  },
  {
    accessorKey: "phoneNumber",
    header: "Phone Number",
  },
  {
    accessorKey: "userDob",
    header: "Date of Birth",
    cell: ({ row }) => {
      const dob = row.getValue<string>("userDob");
      let formattedDate = "";
      if (dob != null) {
        const date = new Date(dob);
        formattedDate = date.toLocaleDateString("vi-VN", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        });
      }

      return <div className="text-left">{formattedDate}</div>;
    },
  },
  {
    accessorKey: "userAbout",
    header: "About",
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
    id: "actions",
    cell: ({ row }) => {
      const user = row.original;
      const [isDialogOpen, setIsDialogOpen] = useState(false);
      const router = useRouter();

      const handleDelete = async () => {
        try {
          const response = await a.delete(
            `https://localhost:7209/api/UserAccounts/${user.userId}`
          );

          if (response.status === 204) {
            // Xử lý trường hợp xóa thành công với mã 204
            toast.success("User deleted successfully");
            setIsDialogOpen(false);
            router.refresh();
          } else {
            toast.error(`Failed to delete user: ${response.statusText}`);
          }
        } catch (error) {
          toast.error("Failed to delete user");
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
                  navigator.clipboard.writeText(user.userId.toString());
                  toast.success("Copy vào clipboard thành công");
                }}
              >
                Copy User ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => {
                  router.push(`/dashboard/user-accounts/${user.userId}`);
                }}
              >
                View User
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
                  Delete the user with Id {user.userId.toString()}
                </AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  your account and remove your data from our servers.
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
    },
  },
];
