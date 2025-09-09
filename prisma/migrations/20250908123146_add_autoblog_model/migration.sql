-- CreateTable
CREATE TABLE "Autoblog" (
    "id" TEXT NOT NULL,
    "topic" TEXT NOT NULL,
    "html" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Autoblog_pkey" PRIMARY KEY ("id")
);
