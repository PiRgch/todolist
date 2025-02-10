import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    const todo1 = await prisma.todo.create({
        data: {
            action: "Learn React",
            deadLine: new Date(),
            isDone: true,
        },
    });
    console.log(todo1);
}

main()
.then(() => prisma.$disconnect())
.catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
});
