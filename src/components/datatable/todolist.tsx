"use client";

import { columns } from "@/components/datatable/column";
import { DataTable } from "@/components/datatable/todolist-datatable";
import { useTodoStore } from "@/store/useTodoStore";
import { useEffect } from "react";

export default function Todolist() {
  const { todos, loading, error, fetchTodos } = useTodoStore
  ();

  useEffect(() => {
    fetchTodos(); // Charger les données au montage
  }, [fetchTodos]);

  console.log("todos", { todos, loading, error });

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={todos} />
    </div>
  );
}
