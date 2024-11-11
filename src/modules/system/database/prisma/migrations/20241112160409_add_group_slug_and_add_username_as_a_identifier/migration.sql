/*
  Warnings:

  - You are about to drop the `identity` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[slug]` on the table `group` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[username]` on the table `user` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `user` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `group` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hashed_password` to the `user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "GroupMemberStatus" AS ENUM ('WAITING_APPROVAL', 'ACTIVE', 'INACTIVE');

-- DropForeignKey
ALTER TABLE "identity" DROP CONSTRAINT "fk_identity_user";

-- DropIndex
DROP INDEX "ixuq_group_member";

-- DropIndex
DROP INDEX "ixid_transaction_group_id";

-- AlterTable
ALTER TABLE "group" ADD COLUMN     "slug" VARCHAR(100) NOT NULL;

-- AlterTable
ALTER TABLE "group_member" ADD COLUMN     "status" "GroupMemberStatus" NOT NULL DEFAULT 'WAITING_APPROVAL';

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "hashed_password" VARCHAR(1000) NOT NULL,
ADD COLUMN     "username" VARCHAR(100) NOT NULL;

-- DropTable
DROP TABLE "identity";

-- CreateTable
CREATE TABLE "verification_token" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_by_id" UUID,
    "resource" VARCHAR(255) NOT NULL,
    "token" VARCHAR(50) NOT NULL,
    "expiration" TIMESTAMPTZ(6) NOT NULL,
    "is_verified" BOOLEAN NOT NULL DEFAULT false,
    "is_used" BOOLEAN NOT NULL DEFAULT false,
    "user_id" UUID NOT NULL,

    CONSTRAINT "pk_verification_token" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ixfk_verification_token_user" ON "verification_token"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "group_slug_key" ON "group"("slug");

-- CreateIndex
CREATE INDEX "ixuq_group_member_status" ON "group_member"("status");

-- CreateIndex
CREATE UNIQUE INDEX "user_username_key" ON "user"("username");

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- AddForeignKey
ALTER TABLE "verification_token" ADD CONSTRAINT "fk_verification_token_user" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
