-- CreateEnum
CREATE TYPE "event_type" AS ENUM ('RENDEZ-VOUS', 'OPERATION', 'AUTRE');

-- CreateEnum
CREATE TYPE "genders" AS ENUM ('M', 'F', 'N/A');

-- CreateEnum
CREATE TYPE "payment" AS ENUM ('PAYER', 'A PAYER', 'EN COURS DE PAIEMENT', 'NON PAYER');

-- CreateEnum
CREATE TYPE "roles" AS ENUM ('DIRECTEUR', 'VETERINAIRE', 'ASSISTANT');

-- CreateEnum
CREATE TYPE "statuses" AS ENUM ('ACTIF', 'INACTIF');

-- CreateEnum
CREATE TYPE "statuts" AS ENUM ('A-FAIRE', 'REPORTER', 'ANNULER', 'TERMINER');

-- CreateTable
CREATE TABLE "allergies" (
    "allergyid" SERIAL NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "description" VARCHAR(255),

    CONSTRAINT "allergies_pkey" PRIMARY KEY ("allergyid")
);

-- CreateTable
CREATE TABLE "booster_shots" (
    "boostershotid" SERIAL NOT NULL,
    "type" VARCHAR(50) NOT NULL,
    "initialdate" DATE NOT NULL,
    "executiondate" DATE,
    "status" "statuts" NOT NULL,
    "patientid" INTEGER NOT NULL,

    CONSTRAINT "booster_shots_pkey" PRIMARY KEY ("boostershotid")
);

-- CreateTable
CREATE TABLE "clients" (
    "clientid" SERIAL NOT NULL,
    "lastname" VARCHAR(50) NOT NULL,
    "firstname" VARCHAR(50) NOT NULL,
    "gender" "genders" NOT NULL,
    "phonenumber" VARCHAR(18) NOT NULL,
    "email" VARCHAR(255),
    "address" VARCHAR(255),
    "zipcode" VARCHAR(10),
    "city" VARCHAR(100),

    CONSTRAINT "clients_pkey" PRIMARY KEY ("clientid")
);

-- CreateTable
CREATE TABLE "earnings" (
    "earningid" SERIAL NOT NULL,
    "amount" DECIMAL(6,2) NOT NULL,
    "description" VARCHAR(255),
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "paymentstatus" "payment",
    "clientid" INTEGER NOT NULL,

    CONSTRAINT "earnings_pkey" PRIMARY KEY ("earningid")
);

-- CreateTable
CREATE TABLE "events" (
    "eventid" SERIAL NOT NULL,
    "title" VARCHAR(50) NOT NULL,
    "description" VARCHAR(2048),
    "type" "event_type" NOT NULL,
    "eventdate" DATE NOT NULL,
    "starthour" TIME(6) NOT NULL,
    "endhour" TIME(6) NOT NULL,
    "userid" INTEGER NOT NULL,
    "patientid" INTEGER,
    "clientid" INTEGER,

    CONSTRAINT "events_pkey" PRIMARY KEY ("eventid")
);

-- CreateTable
CREATE TABLE "expenses" (
    "expenseid" SERIAL NOT NULL,
    "amount" DECIMAL(6,2) NOT NULL,
    "description" VARCHAR(255),
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "expenses_pkey" PRIMARY KEY ("expenseid")
);

-- CreateTable
CREATE TABLE "invoices" (
    "invoiceid" SERIAL NOT NULL,
    "amount" DECIMAL(6,2) NOT NULL,
    "invoicelink" VARCHAR(512) NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "clientid" INTEGER NOT NULL,
    "earningid" INTEGER NOT NULL,

    CONSTRAINT "invoices_pkey" PRIMARY KEY ("invoiceid")
);

-- CreateTable
CREATE TABLE "items_bought" (
    "expenseid" INTEGER NOT NULL,
    "productid" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "items_bought_pkey" PRIMARY KEY ("expenseid","productid")
);

-- CreateTable
CREATE TABLE "items_sold" (
    "earningid" INTEGER NOT NULL,
    "productid" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "items_sold_pkey" PRIMARY KEY ("earningid","productid")
);

-- CreateTable
CREATE TABLE "patients" (
    "patientid" SERIAL NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "gender" "genders" NOT NULL,
    "type" VARCHAR(50) NOT NULL,
    "species" VARCHAR(50),
    "birthdate" DATE,
    "numberid" INTEGER,
    "color" VARCHAR(50),
    "clientid" INTEGER NOT NULL,

    CONSTRAINT "patients_pkey" PRIMARY KEY ("patientid")
);

-- CreateTable
CREATE TABLE "patients_allergies" (
    "patientid" INTEGER NOT NULL,
    "allergyid" INTEGER NOT NULL,
    "status" "statuses" NOT NULL,

    CONSTRAINT "patients_allergies_pkey" PRIMARY KEY ("patientid","allergyid")
);

-- CreateTable
CREATE TABLE "prescriptions" (
    "prescriptionid" SERIAL NOT NULL,
    "motive" VARCHAR(255),
    "prescriptionlink" VARCHAR(512) NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "patientid" INTEGER NOT NULL,

    CONSTRAINT "prescriptions_pkey" PRIMARY KEY ("prescriptionid")
);

-- CreateTable
CREATE TABLE "product_types" (
    "producttypeid" SERIAL NOT NULL,
    "name" VARCHAR(50) NOT NULL,

    CONSTRAINT "product_types_pkey" PRIMARY KEY ("producttypeid")
);

-- CreateTable
CREATE TABLE "products" (
    "productid" SERIAL NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "description" VARCHAR(512),
    "sellingprice" DECIMAL(6,2) NOT NULL,
    "cost" DECIMAL(6,2) NOT NULL,
    "tva" DECIMAL(6,2) NOT NULL,
    "quantity" INTEGER NOT NULL,
    "producttypeid" INTEGER NOT NULL,

    CONSTRAINT "products_pkey" PRIMARY KEY ("productid")
);

-- CreateTable
CREATE TABLE "users" (
    "userid" SERIAL NOT NULL,
    "username" VARCHAR(70) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "role" "roles" NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("userid")
);

-- AddForeignKey
ALTER TABLE "booster_shots" ADD CONSTRAINT "booster_shots_patientid_fkey" FOREIGN KEY ("patientid") REFERENCES "patients"("patientid") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "earnings" ADD CONSTRAINT "earnings_clientid_fkey" FOREIGN KEY ("clientid") REFERENCES "clients"("clientid") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "events" ADD CONSTRAINT "events_clientid_fkey" FOREIGN KEY ("clientid") REFERENCES "clients"("clientid") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "events" ADD CONSTRAINT "events_patientid_fkey" FOREIGN KEY ("patientid") REFERENCES "patients"("patientid") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "events" ADD CONSTRAINT "events_userid_fkey" FOREIGN KEY ("userid") REFERENCES "users"("userid") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "invoices" ADD CONSTRAINT "invoices_clientid_fkey" FOREIGN KEY ("clientid") REFERENCES "clients"("clientid") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "invoices" ADD CONSTRAINT "invoices_earningid_fkey" FOREIGN KEY ("earningid") REFERENCES "earnings"("earningid") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "patients" ADD CONSTRAINT "patients_clientid_fkey" FOREIGN KEY ("clientid") REFERENCES "clients"("clientid") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "patients_allergies" ADD CONSTRAINT "patients_allergies_allergyid_fkey" FOREIGN KEY ("allergyid") REFERENCES "allergies"("allergyid") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "patients_allergies" ADD CONSTRAINT "patients_allergies_patientid_fkey" FOREIGN KEY ("patientid") REFERENCES "patients"("patientid") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "prescriptions" ADD CONSTRAINT "prescriptions_patientid_fkey" FOREIGN KEY ("patientid") REFERENCES "patients"("patientid") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_producttypeid_fkey" FOREIGN KEY ("producttypeid") REFERENCES "product_types"("producttypeid") ON DELETE NO ACTION ON UPDATE NO ACTION;
