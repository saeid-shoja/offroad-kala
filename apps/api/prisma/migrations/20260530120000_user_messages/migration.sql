-- CreateEnum
CREATE TYPE "UserMessageType" AS ENUM ('ANNOUNCEMENT', 'NOTIFICATION', 'MESSAGE');

-- CreateEnum
CREATE TYPE "MessageTarget" AS ENUM ('ALL', 'USER');

-- CreateTable
CREATE TABLE "MessageBatch" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "type" "UserMessageType" NOT NULL DEFAULT 'ANNOUNCEMENT',
    "target" "MessageTarget" NOT NULL DEFAULT 'ALL',
    "targetUserId" TEXT,
    "sentById" TEXT NOT NULL,
    "recipientCount" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MessageBatch_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserMessage" (
    "id" TEXT NOT NULL,
    "batchId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "readAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserMessage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "MessageBatch_createdAt_idx" ON "MessageBatch"("createdAt");

-- CreateIndex
CREATE INDEX "UserMessage_userId_readAt_idx" ON "UserMessage"("userId", "readAt");

-- CreateIndex
CREATE INDEX "UserMessage_userId_createdAt_idx" ON "UserMessage"("userId", "createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "UserMessage_batchId_userId_key" ON "UserMessage"("batchId", "userId");

-- AddForeignKey
ALTER TABLE "MessageBatch" ADD CONSTRAINT "MessageBatch_targetUserId_fkey" FOREIGN KEY ("targetUserId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MessageBatch" ADD CONSTRAINT "MessageBatch_sentById_fkey" FOREIGN KEY ("sentById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserMessage" ADD CONSTRAINT "UserMessage_batchId_fkey" FOREIGN KEY ("batchId") REFERENCES "MessageBatch"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserMessage" ADD CONSTRAINT "UserMessage_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
