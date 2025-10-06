/*
  Warnings:

  - Added the required column `heroImage` to the `HomepageContent` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."HomepageContent" ADD COLUMN     "heroImage" TEXT NOT NULL;
