import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { loadTutors } from "@/api/slices/tutorthunk";
import { Tutor } from "@/types/tutor";
import { AddTutorModal } from "@/components/ui/component/AddTutorForm";
import { Button } from "@/components/ui/button";

export default function Tables() {
  const dispatch = useAppDispatch();

  // Access Redux state
  const { tutors, loading, error } = useAppSelector((state) => state.tutor);
  console.log("checking tutors", tutors);
  // Initialize data state
  console.log("Tutors", tutors);
  const [data, setData] = useState<Tutor[]>(tutors);
  const [isOpen, setOpen] = useState(false);
  console.log("CHECKING DATA AFTER ADDING IT", data);

  // Load tutors on component mount
  useEffect(() => {
    dispatch(loadTutors())
      .then((res) => {
        setData(res.payload);
        console.log(res.payload);
        // Set data state to fetched tutors
      })
      .catch((error) => {
        console.error(error);
      });
  }, [dispatch]);
  // Update data state when tutors change
  useEffect(() => {
    if (tutors) {
      setData(tutors);
    }
  }, [tutors]);

  // Create columns using Tutor properties
  const columnHelper = createColumnHelper<Tutor>();

  const columns = [
    columnHelper.accessor("firstName", {
      cell: (info) => info.getValue() ?? "N/A",
      header: () => "First Name",
    }),
    columnHelper.accessor("lastName", {
      cell: (info) => info.getValue() ?? "N/A",
      header: () => "Last Name",
    }),
    columnHelper.accessor("gender", {
      cell: (info) => info.getValue() ?? "N/A",
      header: () => "Gender",
    }),
    columnHelper.accessor("email", {
      cell: (info) => info.getValue() ?? "N/A",
      header: () => "Email",
    }),
    columnHelper.accessor("contact", {
      cell: (info) => info.getValue() ?? "N/A",
      header: () => "Contact",
    }),
    columnHelper.accessor("registeredCode", {
      cell: (info) => info.getValue() ?? "N/A",
      header: () => "RegisterationCode",
    }),
  ];

  // Initialize table using useReactTable
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="p-2">
      <div className="flex justify-end w-full p-3">
        <Button onClick={() => setOpen(true)} variant="secondary">
          Add Tutor
        </Button>
      </div>
      {/* Show AddTutor component */}

      {loading ? <p>Loading tutors...</p> : null}
      {error && <p>Error: {error}</p>}
      {!loading && !error && data.length === 0 && <p>No tutors available.</p>}
      {!loading && !error && data.length > 0 && (
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup?.headers?.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
          <tfoot>
            {table.getFooterGroups().map((footerGroup) => (
              <TableRow key={footerGroup.id}>
                {footerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.footer,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </tfoot>
        </Table>
      )}

      {/* Modal */}
      <AddTutorModal isOpen={isOpen} setClose={() => setOpen(false)} />
    </div>
  );
}
