/*
  Warnings:

  - You are about to drop the column `clerkUserId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `EntrepreneurDetails` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Investment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `InvestorDetails` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Pitch` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[clerkId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `clerkId` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `roleId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "EntrepreneurDetails" DROP CONSTRAINT "EntrepreneurDetails_userId_fkey";

-- DropForeignKey
ALTER TABLE "Investment" DROP CONSTRAINT "Investment_investorDetailsId_fkey";

-- DropForeignKey
ALTER TABLE "InvestorDetails" DROP CONSTRAINT "InvestorDetails_userId_fkey";

-- DropForeignKey
ALTER TABLE "Pitch" DROP CONSTRAINT "Pitch_entrepreneurDetailsId_fkey";

-- DropIndex
DROP INDEX "User_clerkUserId_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "clerkUserId",
ADD COLUMN     "clerkId" TEXT NOT NULL,
ADD COLUMN     "roleId" TEXT NOT NULL;

-- DropTable
DROP TABLE "EntrepreneurDetails";

-- DropTable
DROP TABLE "Investment";

-- DropTable
DROP TABLE "InvestorDetails";

-- DropTable
DROP TABLE "Pitch";

-- CreateTable
CREATE TABLE "Role" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Role_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Role_name_key" ON "Role"("name");

-- CreateIndex
CREATE UNIQUE INDEX "User_clerkId_key" ON "User"("clerkId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
