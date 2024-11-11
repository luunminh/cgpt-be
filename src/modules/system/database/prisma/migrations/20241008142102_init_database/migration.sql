-- CreateExtension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- CreateEnum
CREATE TYPE "UserType" AS ENUM ('ADMIN', 'USER');

-- CreateEnum
CREATE TYPE "UserStatus" AS ENUM ('ACTIVE', 'INACTIVE');

-- CreateEnum
CREATE TYPE "TransactionType" AS ENUM ('EXPENSE', 'SETTLEMENT');

-- CreateEnum
CREATE TYPE "SplitType" AS ENUM ('EQUALLY', 'EXACTAMOUNT', 'PERCENTAGE', 'SHARE');

-- CreateEnum
CREATE TYPE "GroupType" AS ENUM ('TRIP', 'FAMILY', 'FRIENDS', 'WORK', 'OTHER');

-- CreateEnum
CREATE TYPE "CategoryGroupType" AS ENUM ('ENTERTAINMENT', 'FOOD', 'HOME', 'LIFE', 'TRANSPORTATION', 'UNCATEGORIZED', 'UTILIZED');

-- CreateTable
CREATE TABLE "user" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_by_id" UUID,
    "first_name" VARCHAR(100) NOT NULL,
    "last_name" VARCHAR(100) NOT NULL,
    "middle_name" VARCHAR(50),
    "email" VARCHAR(255) NOT NULL,
    "full_name" VARCHAR(255),
    "status" "UserStatus" NOT NULL DEFAULT 'ACTIVE',
    "user_type" "UserType" NOT NULL DEFAULT 'USER',

    CONSTRAINT "pk_user" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "identity" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_by_id" UUID,
    "user_id" UUID NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "email_verified" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "pk_identity" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "profile" (
    "id" UUID NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_by_id" UUID,
    "phone_number" VARCHAR(20),
    "avatar_url" VARCHAR(1000),
    "qr_url" VARCHAR(1000),
    "address" VARCHAR(500),

    CONSTRAINT "pk_profile" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "role" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_by_id" UUID,
    "name" VARCHAR(50) NOT NULL,
    "display_name" VARCHAR(50) NOT NULL,
    "description" VARCHAR(255),
    "can_be_updated" BOOLEAN NOT NULL DEFAULT true,
    "can_be_deleted" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "pk_role" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_to_role" (
    "user_id" UUID NOT NULL,
    "role_id" UUID NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_to_role_pkey" PRIMARY KEY ("user_id","role_id")
);

-- CreateTable
CREATE TABLE "permission" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_by_id" UUID,
    "resource_name" VARCHAR(50) NOT NULL,
    "display_name" VARCHAR(50) NOT NULL,
    "description" VARCHAR(255),
    "can_create" BOOLEAN NOT NULL DEFAULT false,
    "can_read" BOOLEAN NOT NULL DEFAULT false,
    "can_update" BOOLEAN NOT NULL DEFAULT false,
    "can_delete" BOOLEAN NOT NULL DEFAULT false,
    "permission_group_id" INTEGER,

    CONSTRAINT "pk_permission" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "permission_group" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_by_id" UUID,
    "resource_name" VARCHAR(50) NOT NULL,
    "description" VARCHAR(255),

    CONSTRAINT "pk_permission_info" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "role_to_permission" (
    "role_id" UUID NOT NULL,
    "permission_id" INTEGER NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_by_id" UUID,

    CONSTRAINT "role_to_permission_pkey" PRIMARY KEY ("role_id","permission_id")
);

-- CreateTable
CREATE TABLE "group" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_by_id" UUID,
    "group_name" VARCHAR(100) NOT NULL,
    "description" VARCHAR(255),
    "avatar_url" VARCHAR(1000),
    "group_type" "GroupType" NOT NULL,
    "owner_id" UUID NOT NULL,
    "lk_currency_id" VARCHAR(100),

    CONSTRAINT "pk_group" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "group_member" (
    "member_id" UUID NOT NULL,
    "group_id" UUID NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_by_id" UUID,

    CONSTRAINT "group_member_pkey" PRIMARY KEY ("member_id","group_id")
);

-- CreateTable
CREATE TABLE "transaction" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_by_id" UUID,
    "transaction_type" "TransactionType" NOT NULL,
    "group_id" UUID NOT NULL,
    "owner_user_id" UUID NOT NULL,

    CONSTRAINT "pk_transaction" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "expense_transaction" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_by_id" UUID,
    "split_type" "SplitType" NOT NULL,
    "lk_category_id" UUID,
    "transaction_id" UUID NOT NULL,

    CONSTRAINT "pk_expense_transaction" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "transaction_comment" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_by_id" UUID,
    "transaction_id" UUID NOT NULL,
    "owner_user_id" UUID NOT NULL,
    "content" JSON NOT NULL,

    CONSTRAINT "pk_transaction_comment" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "transaction_participant" (
    "user_id" UUID NOT NULL,
    "transaction_id" UUID NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_by_id" UUID,

    CONSTRAINT "transaction_participant_pkey" PRIMARY KEY ("user_id","transaction_id")
);

-- CreateTable
CREATE TABLE "ledger" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_by_id" UUID,
    "amount" MONEY NOT NULL,
    "user_id_from" UUID NOT NULL,
    "user_id_to" UUID NOT NULL,
    "transaction_id" UUID NOT NULL,

    CONSTRAINT "pk_ledger" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lk_country" (
    "id" VARCHAR(100) NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_by_id" UUID,
    "name" VARCHAR(100) NOT NULL,
    "currency_code" VARCHAR(3) NOT NULL,
    "currency_symbol" VARCHAR(5) NOT NULL,

    CONSTRAINT "pk_country" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lk_expense_category" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_by_id" UUID,
    "type" "CategoryGroupType" NOT NULL,
    "name" VARCHAR(100) NOT NULL,

    CONSTRAINT "pk_expense_category" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ixuq_user_email" ON "user"("email");

-- CreateIndex
CREATE INDEX "ixuq_identity_email" ON "identity"("email");

-- CreateIndex
CREATE INDEX "ixuq_group_id" ON "group"("owner_id");

-- CreateIndex
CREATE INDEX "ixuq_group_group_name" ON "group"("group_name");

-- CreateIndex
CREATE INDEX "ixuq_group_member" ON "group_member"("member_id");

-- CreateIndex
CREATE INDEX "ixid_transaction_group_id" ON "transaction"("group_id");

-- CreateIndex
CREATE INDEX "ixid_ledger_user_id_from" ON "ledger"("user_id_from" ASC);

-- CreateIndex
CREATE INDEX "ixid_ledger_user_id_to" ON "ledger"("user_id_to" ASC);

-- AddForeignKey
ALTER TABLE "identity" ADD CONSTRAINT "fk_identity_user" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "profile" ADD CONSTRAINT "fk_profile_user" FOREIGN KEY ("id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_to_role" ADD CONSTRAINT "fk_user_to_role_user" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_to_role" ADD CONSTRAINT "fk_user_to_role_role" FOREIGN KEY ("role_id") REFERENCES "role"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "permission" ADD CONSTRAINT "fk_permission_permission_group" FOREIGN KEY ("permission_group_id") REFERENCES "permission_group"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "role_to_permission" ADD CONSTRAINT "fk_role_to_permission_role" FOREIGN KEY ("role_id") REFERENCES "role"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "role_to_permission" ADD CONSTRAINT "fk_role_to_permission_permission" FOREIGN KEY ("permission_id") REFERENCES "permission"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "group" ADD CONSTRAINT "fk_group_country" FOREIGN KEY ("lk_currency_id") REFERENCES "lk_country"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "group" ADD CONSTRAINT "fk_group_owner" FOREIGN KEY ("owner_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "group_member" ADD CONSTRAINT "fk_group_member_member" FOREIGN KEY ("member_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "group_member" ADD CONSTRAINT "fk_group_member_group" FOREIGN KEY ("group_id") REFERENCES "group"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transaction" ADD CONSTRAINT "fk_transaction_group" FOREIGN KEY ("group_id") REFERENCES "group"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transaction" ADD CONSTRAINT "fk_transaction_owner" FOREIGN KEY ("owner_user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "expense_transaction" ADD CONSTRAINT "fk_expense_transaction_transaction" FOREIGN KEY ("transaction_id") REFERENCES "transaction"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "expense_transaction" ADD CONSTRAINT "fk_expense_transaction_category" FOREIGN KEY ("lk_category_id") REFERENCES "lk_expense_category"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transaction_comment" ADD CONSTRAINT "fk_transaction_comment_transaction" FOREIGN KEY ("transaction_id") REFERENCES "transaction"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transaction_comment" ADD CONSTRAINT "fk_transaction_comment_owner" FOREIGN KEY ("owner_user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transaction_participant" ADD CONSTRAINT "fk_transaction_participant_user" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transaction_participant" ADD CONSTRAINT "fk_transaction_participant_transaction" FOREIGN KEY ("transaction_id") REFERENCES "transaction"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ledger" ADD CONSTRAINT "fk_ledger_transaction" FOREIGN KEY ("transaction_id") REFERENCES "transaction"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ledger" ADD CONSTRAINT "fk_ledger_user_from" FOREIGN KEY ("user_id_from") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ledger" ADD CONSTRAINT "fk_ledger_user_to" FOREIGN KEY ("user_id_to") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
