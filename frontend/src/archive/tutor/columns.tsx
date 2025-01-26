"use client";

import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
import { Tutor } from "@/archive/types/tutor";

export const columns: ColumnDef<Tutor>[] = [
  {
    accessorKey: "firstName",
    header: "FirstName",
  },
  {
    accessorKey: "lastName",
    header: "LastName",
  },
  {
    accessorKey: "gender",
    header: "Gender",
  },
  {
    accessorKey: "email",
    header: "Email",
  },

  {
    accessorKey: "contact",
    header: "Contact",
  },
];
