/*
  Warnings:

  - You are about to drop the column `featuredImage` on the `Autoblog` table. All the data in the column will be lost.
  - You are about to drop the column `html` on the `Autoblog` table. All the data in the column will be lost.
  - Added the required column `detailedReport` to the `Autoblog` table without a default value. This is not possible if the table is not empty.
  - Added the required column `images` to the `Autoblog` table without a default value. This is not possible if the table is not empty.
  - Added the required column `links` to the `Autoblog` table without a default value. This is not possible if the table is not empty.
  - Added the required column `videos` to the `Autoblog` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Autoblog" DROP COLUMN "featuredImage",
DROP COLUMN "html",
ADD COLUMN     "detailedReport" TEXT NOT NULL,
ADD COLUMN     "images" JSONB NOT NULL,
ADD COLUMN     "links" JSONB NOT NULL,
ADD COLUMN     "videos" JSONB NOT NULL;
