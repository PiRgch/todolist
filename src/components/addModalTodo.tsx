"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { DatePicker } from "./datePicker";
import { useTodoStore } from "@/store/useTodoStore";

export function AddModalTodo() {
    const [task, setTask] = useState("");
    const [date, setDate] = useState<Date>();
    const [open, setOpen] = useState(false);
    const addTodo = useTodoStore((state) => state.addTodo); // Récupérer addTodo depuis Zustand

    const handleSubmit = async () => {
        if (!task || !date) {
            alert("Please fill in all fields !");
            return;
        }

        try {
            const response = await fetch("/api/todo", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    action: task,
                    deadLine: date.toISOString().split("T")[0], // Format YYYY-MM-DD pour PostgreSQL
                    isDone: false, // Par défaut, la tâche n'est pas terminée
                }),
            });

            if (!response.ok) {
                throw new Error("Error while adding todo !");
            }

            const newTodo = await response.json();
            console.log("Todo add :", newTodo);

            // Ajouter le nouveau todo dans Zustand
            addTodo(newTodo);

            // Réinitialiser les champs après soumission
            setTask("");
            setDate(undefined);

            // Fermer la modal
            setOpen(false);
        } catch (error) {
            console.error(error);
            alert("Error while adding todo !");
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <div className="flex justify-center mt-5">
                <DialogTrigger asChild>
                    <Button className="w-auto">Add a todo</Button>
                </DialogTrigger>
            </div>
            <DialogContent className="sm:max-w-[425px] bg-[rgb(9,9,11)] text-white">
                <DialogHeader>
                    <DialogTitle>Create a todo</DialogTitle>
                    <DialogDescription className="opacity-80">
                        What is your next task? Let&apos;s add it to your list.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="task" className="text-right">
                            Task
                        </Label>
                        <Input
                            id="task"
                            placeholder="Do sport..."
                            className="col-span-3"
                            value={task}
                            onChange={(e) => setTask(e.target.value)}
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="task" className="text-right">
                            Pick a date
                        </Label>
                        <DatePicker date={date} setDate={setDate} />
                    </div>
                </div>
                <DialogFooter>
                    <Button type="button" onClick={handleSubmit}>
                        Save task
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
