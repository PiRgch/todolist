"use client"

import { ColumnDef } from "@tanstack/react-table"

// Définir la structure de données
export type Payment = {
  id: string
  amount: number
  status: "pending" | "processing" | "success" | "failed"
  email: string
}

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "status",
    header: () => <span className="text-white font-semibold">To do</span>, // Custom header
    cell: () => {
      return (
        <span
          className={`inline-block text-white px-2 py-1 rounded`}
        >
            Faire ses devoirs
        </span>
      );
    },
  },
  {
    accessorKey: "email",
    header: "For when", // Simple text header
    cell: ({ row }) => {
      const email = row.getValue("email") as string;
      return <a href={`mailto:${email}`} className="text-blue-500">{email}</a>; // Custom email cell with link
    },
  },
  {
    accessorKey: "amount",
    header: () => <span className="text-white font-semibold">Is done</span>, // Custom header
    cell: ({ row }) => {
      const amount = row.getValue("amount") as number;
      return <span className=" text-lg text-white">${amount.toFixed(2)}</span>; // Format amount with $ sign
    },
  },
]
