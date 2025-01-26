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

import { useToast } from "@/hooks/use-toast";
import { loadTutors, removeTutor } from "@/api/slices/tutorthunk";
import { Tutor } from "@/types/tutor";
import { AddTutorModal } from "@/components/ui/component/AddTutorForm";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuItem,
    DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react"; // Ensure you have this imported

export default function Tables() {
    const dispatch = useAppDispatch();
    const { toast } = useToast();
    // Access Redux state
    const { tutors, loading, error } = useAppSelector((state) => state.tutor);

    // Initialize data state
    const [data, setData] = useState<Tutor[]>(tutors);
    const [isOpen, setOpen] = useState(false);

    // Load tutors on component mount
    useEffect(() => {
        dispatch(loadTutors())
            .then((res) => {
                setData(res.payload);
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
            cell: ({ row }) => row.getValue("firstName") ?? "N/A",
            header: () => "First Name",
        }),
        columnHelper.accessor("lastName", {
            cell: ({ row }) => row.getValue("lastName") ?? "N/A",
            header: () => "Last Name",
        }),
        columnHelper.accessor("gender", {
            cell: ({ row }) => row.getValue("gender") ?? "N/A",
            header: () => "Gender",
        }),
        columnHelper.accessor("email", {
            cell: ({ row }) => row.getValue("email") ?? "N/A",
            header: () => "Email",
        }),
        columnHelper.accessor("contact", {
            cell: ({ row }) => row.getValue("contact") ?? "N/A",
            header: () => "Contact",
        }),

        {
            id: "actions",
            enableHiding: false,
            cell: ({ row }: any) => {
                const tutor = row.original;


                const handleDelete = async () => {

                    try {
                        await dispatch(removeTutor(tutor.id)).unwrap();
                        toast({
                            title: "Success",
                            description: (
                                <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                                    <code className="text-white">{"Deleted successfully"}</code>
                                </pre>
                            ),
                        })
                    } catch (error: any) {

                        toast({
                            title: "Error",
                            description: (
                                <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                                    <code className="text-white">{error}</code>
                                </pre>
                            ),
                        })

                    }
                };
                return (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem
                                onClick={() => navigator.clipboard.writeText(tutor.id)}
                            >
                                Copy Tutor ID
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                                onClick={() => alert(`Viewing ${tutor.firstName}`)}
                            >
                                View Tutor
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() => alert(`Editing ${tutor.firstName}`)}
                            >
                                Edit Tutor
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={handleDelete}
                            >
                                Delete Tutor
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                );
            },
            header: () => "Actions",
        },
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

            {loading && <p>Loading tutors...</p>}

            {!loading && !error && data.length === 0 && <p>No tutors available.</p>}
            {!loading && !error && data.length > 0 && (
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
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
                                        {flexRender(
                                            cell.column.columnDef.cell,
                                            cell.getContext()
                                        )}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            )}

            <AddTutorModal isOpen={isOpen} setClose={() => setOpen(false)} />
        </div>
    );
}
