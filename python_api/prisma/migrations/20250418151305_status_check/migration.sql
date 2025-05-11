/*
  Warnings:

  - The values [A-FAIRE] on the enum `statuts` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "statuts_new" AS ENUM ('A FAIRE', 'REPORTER', 'ANNULER', 'TERMINER');
ALTER TABLE "booster_shots" ALTER COLUMN "status" TYPE "statuts_new" USING ("status"::text::"statuts_new");
ALTER TYPE "statuts" RENAME TO "statuts_old";
ALTER TYPE "statuts_new" RENAME TO "statuts";
DROP TYPE "statuts_old";
COMMIT;
