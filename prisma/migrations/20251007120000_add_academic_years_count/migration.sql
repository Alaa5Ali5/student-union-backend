-- AlterTable: Add academicYearsCount column to College table
ALTER TABLE "College" ADD COLUMN "academicYearsCount" INTEGER NOT NULL DEFAULT 4;

-- Drop Specialization table if it exists (no longer needed)
DROP TABLE IF EXISTS "Specialization" CASCADE;

-- AlterTable: Remove specialization column from Application if it exists
ALTER TABLE "Application" DROP COLUMN IF EXISTS "specialization";

