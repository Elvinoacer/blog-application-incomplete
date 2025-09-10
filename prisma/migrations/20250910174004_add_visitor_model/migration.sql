-- CreateTable
CREATE TABLE "Visitor" (
    "id" TEXT NOT NULL,
    "visitorId" TEXT NOT NULL,
    "isFirstVisit" BOOLEAN NOT NULL,
    "firstVisitDate" TIMESTAMP(3) NOT NULL,
    "lastVisitDate" TIMESTAMP(3) NOT NULL,
    "visitCount" INTEGER NOT NULL,
    "country" TEXT,
    "countryCode" TEXT,
    "pageViews" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Visitor_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Visitor_visitorId_key" ON "Visitor"("visitorId");
