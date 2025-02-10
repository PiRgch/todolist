import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient;

// GET /api/todo (all todos)
export const GET = async () => {
    try {
        const todolist = await prisma.todo.findMany();
        return NextResponse.json(todolist, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Failed to fetch todolist" }, { status: 500 });
    }
};

// POST /api/todo (create todo)
export const POST = async (req: Request) => {

    const { action, deadLine, isDone } = await req.json();

    try {
        const todo = await prisma.todo.create({
            data: {
                action,
                deadLine: new Date(deadLine),
                isDone,
            },
        });
        return NextResponse.json(todo, { status: 201 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Failed to create todo" }, { status: 500 });
    }
}