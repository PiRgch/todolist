import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

// GET /api/todo/[id] (single todo by id)
export const GET = async (request: Request, {params}: {params: Promise<{id: string}>}) => {
    const id = (await params).id;
    try {
        const todo = await prisma.todo.findUnique({
            where: { id: Number(id) },
        });
        if (!todo) {
            return NextResponse.json({ error: "Todo not found" }, { status: 404 });
        }
        return NextResponse.json(todo, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Failed to fetch todo" }, { status: 500 });
    }
};

// PUT /api/todo/[id] (update todo by id)
export const PUT = async (request: Request, {params}: {params: Promise<{id: string}>}) => {
    const id = (await params).id;
    const data = await request.json();
    try {
        const updatedTodo = await prisma.todo.update({
            where: { id: Number(id) },
            data,
        });
        return NextResponse.json(updatedTodo, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Failed to update todo" }, { status: 500 });
    }
};
