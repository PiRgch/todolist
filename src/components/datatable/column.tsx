"use client";

import { Todo } from "@/lib/types";
import { useTodoStore } from "@/store/useTodoStore";
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "../ui/checkbox";

const { putTodo } = useTodoStore.getState();

export const columns: ColumnDef<Todo>[] = [
    {
        accessorKey: "action",
        header: () => <span className="text-white font-semibold">To do</span>, // Custom header
        cell: ({ row }) => {
            const action = row.getValue("action") as string;
            return <span className={`inline-block text-white px-2 py-1 rounded`}>{action}</span>;
        },
    },
    {
        accessorKey: "deadLine",
        header: () => <span className="text-white font-semibold">For When</span>,
        cell: ({ row }) => {
            const deadLineString = row.getValue("deadLine") as string; // Récupère la valeur en string
            const deadLine = new Date(deadLineString); // Convertit en objet Date

            // Vérifie si la date est valide
            if (isNaN(deadLine.getTime())) {
                return <span className="text-red-500">Invalid Date</span>;
            }

            const formattedDeadLine = deadLine.toLocaleDateString("fr-FR", {
                year: "numeric",
                month: "long",
                day: "numeric",
            });

            return <span className="text-white">{formattedDeadLine}</span>;
        },
    },
    {
        accessorKey: "isDone",
        header: () => <span className="text-white font-semibold">Is done</span>,
        cell: ({ row }) => {
            const isDone = row.getValue("isDone") as boolean;
            const originalTodo = row.original;

            return (
                <Checkbox
                    checked={isDone}
                    onCheckedChange={async () => {
                        console.log("Checkbox clicked!", originalTodo);
                        await putTodo({ ...originalTodo, isDone: !isDone });
                    }}
                    aria-label="Select all"
                />
            );
        },
    },
];
