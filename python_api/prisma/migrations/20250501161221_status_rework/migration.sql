/*
  Warnings:

  - The values [RENDEZ-VOUS] on the enum `event_type` will be removed. If these variants are still used in the database, this will fail.
  - The values [N/A] on the enum `genders` will be removed. If these variants are still used in the database, this will fail.
  - The values [A PAYER,EN COURS DE PAIEMENT,NON PAYER] on the enum `payment` will be removed. If these variants are still used in the database, this will fail.
  - The values [A FAIRE] on the enum `statuts` will be removed. If these variants are still used in the database, this will fail.
  - Added the required column `status` to the `events` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "event_type_new" AS ENUM ('RENDEZVOUS', 'OPERATION', 'AUTRE');
ALTER TABLE "events" ALTER COLUMN "type" TYPE "event_type_new" USING ("type"::text::"event_type_new");
ALTER TYPE "event_type" RENAME TO "event_type_old";
ALTER TYPE "event_type_new" RENAME TO "event_type";
DROP TYPE "event_type_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "genders_new" AS ENUM ('M', 'F', 'NA');
ALTER TABLE "clients" ALTER COLUMN "gender" TYPE "genders_new" USING ("gender"::text::"genders_new");
ALTER TABLE "patients" ALTER COLUMN "gender" TYPE "genders_new" USING ("gender"::text::"genders_new");
ALTER TYPE "genders" RENAME TO "genders_old";
ALTER TYPE "genders_new" RENAME TO "genders";
DROP TYPE "genders_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "payment_new" AS ENUM ('PAYER', 'APAYER', 'ENCOURSDEPAIEMENT', 'NONPAYER');
ALTER TABLE "earnings" ALTER COLUMN "paymentstatus" TYPE "payment_new" USING ("paymentstatus"::text::"payment_new");
ALTER TYPE "payment" RENAME TO "payment_old";
ALTER TYPE "payment_new" RENAME TO "payment";
DROP TYPE "payment_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "statuts_new" AS ENUM ('AVENIR', 'REPORTER', 'ANNULER', 'TERMINER');
ALTER TABLE "booster_shots" ALTER COLUMN "status" TYPE "statuts_new" USING ("status"::text::"statuts_new");
ALTER TABLE "events" ALTER COLUMN "status" TYPE "statuts_new" USING ("status"::text::"statuts_new");
ALTER TYPE "statuts" RENAME TO "statuts_old";
ALTER TYPE "statuts_new" RENAME TO "statuts";
DROP TYPE "statuts_old";
COMMIT;

-- AlterTable
ALTER TABLE "events" ADD COLUMN     "status" "statuts" NOT NULL;
