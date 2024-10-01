"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, ArrowUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";

// Định nghĩa kiểu dữ liệu cho host từ API
export type HostDto = {
  hostId: number;
  averageHostRating: number;
  numberHostRating: number;
  username: string;
  emailAddress: string;
  phoneNumber: string;
  avatarImageUrl: string;
  propertyCount: number;
};

const HostActionsCell = ({ host }: { host: HostDto }) => {
  const router = useRouter();
  return (
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
          onClick={() => navigator.clipboard.writeText(host.hostId.toString())}
        >
          Copy host ID
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => {
            router.push(`dashboard/user-accounts${host.hostId}`);
          }}
        >
          View host
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

// Định nghĩa các cột trong bảng
export const columns: ColumnDef<HostDto>[] = [
  {
    accessorKey: "hostId",
    header: "CID",
  },
  {
    accessorKey: "username",
    header: "Username",
  },
  {
    accessorKey: "emailAddress",
    header: "Email",
  },
  {
    accessorKey: "phoneNumber",
    header: "Phone number",
  },
  {
    accessorKey: "averageHostRating",
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
    accessorKey: "numberHostRating",
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="p-0"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Number Ratings
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "propertyCount",
    header: "Property Count",
  },
  {
    id: "actions",
    cell: ({ row }) => <HostActionsCell host={row.original} />,
  },
];
