-- CreateTable
CREATE TABLE "Todo" (
    "id" SERIAL NOT NULL,
    "action" TEXT NOT NULL,
    "deadLine" DATE NOT NULL,
    "isDone" BOOLEAN NOT NULL,

    CONSTRAINT "Todo_pkey" PRIMARY KEY ("id")
);
