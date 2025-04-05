-- CreateExtension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "public";

-- CreateEnum
CREATE TYPE "PostType" AS ENUM ('tip', 'review', 'comparison', 'recipe');

-- CreateEnum
CREATE TYPE "TopicType" AS ENUM ('coffee', 'grinder', 'brewingMethod', 'cafeteria');

-- CreateEnum
CREATE TYPE "GrinderType" AS ENUM ('hand', 'electric');

-- CreateEnum
CREATE TYPE "CafeteriaType" AS ENUM ('regular', 'specialty');

-- CreateTable
CREATE TABLE "brands" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(6),
    "name" TEXT NOT NULL,
    "cnpj" TEXT NOT NULL,
    "address_id" UUID,
    "profile_photo_id" UUID,

    CONSTRAINT "brands_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "posts" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(6),
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "likes_amount" INTEGER NOT NULL,
    "type" "PostType" NOT NULL,
    "writer_id" UUID NOT NULL,

    CONSTRAINT "posts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "topics" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(6),
    "name" TEXT NOT NULL,
    "profile_photo_id" UUID NOT NULL,
    "type" "TopicType" NOT NULL,

    CONSTRAINT "topics_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "coffees" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "roast" TEXT NOT NULL,
    "taste_notes" TEXT NOT NULL,
    "elevation" INTEGER,
    "processing_method" TEXT,
    "general_grade" DECIMAL(10,2),
    "internal_grade" INTEGER NOT NULL,
    "acidity" INTEGER NOT NULL,
    "body" INTEGER NOT NULL,
    "sweetness" INTEGER NOT NULL,
    "after_taste" TEXT,
    "category" TEXT NOT NULL,
    "brand_id" UUID NOT NULL,
    "topicId" UUID NOT NULL,

    CONSTRAINT "coffees_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "grinders" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "type" "GrinderType" NOT NULL,
    "clicks" INTEGER NOT NULL,
    "build_material" TEXT NOT NULL,
    "weight" INTEGER NOT NULL,
    "cutter" TEXT,
    "bean_volume" INTEGER,
    "size" TEXT,
    "color" TEXT,
    "brand_id" UUID NOT NULL,
    "topic_id" UUID NOT NULL,

    CONSTRAINT "grinders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "brewing_methods" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "brand_id" UUID NOT NULL,
    "topic_id" UUID NOT NULL,

    CONSTRAINT "brewing_methods_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cafeterias" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "type" "CafeteriaType" NOT NULL,
    "address_id" UUID NOT NULL,
    "topic_id" UUID NOT NULL,

    CONSTRAINT "cafeterias_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "addresses" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(6),
    "street_name" TEXT,
    "number" TEXT,
    "zip_code" TEXT,
    "complement" TEXT,
    "city" TEXT NOT NULL,
    "neighborhood" TEXT,
    "uf" TEXT NOT NULL,

    CONSTRAINT "addresses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "comments" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(6),
    "content" TEXT NOT NULL,
    "post_id" UUID NOT NULL,
    "user_id" UUID NOT NULL,

    CONSTRAINT "comments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "photos" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(6),
    "url" TEXT NOT NULL,
    "post_id" UUID,

    CONSTRAINT "photos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(6),
    "email" TEXT NOT NULL,
    "username" TEXT,
    "password" TEXT,
    "phone" TEXT,
    "address_id" UUID,
    "profile_photo_id" UUID,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_PostToTopic" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "coffees_topicId_key" ON "coffees"("topicId");

-- CreateIndex
CREATE UNIQUE INDEX "grinders_topic_id_key" ON "grinders"("topic_id");

-- CreateIndex
CREATE UNIQUE INDEX "brewing_methods_topic_id_key" ON "brewing_methods"("topic_id");

-- CreateIndex
CREATE UNIQUE INDEX "cafeterias_topic_id_key" ON "cafeterias"("topic_id");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "_PostToTopic_AB_unique" ON "_PostToTopic"("A", "B");

-- CreateIndex
CREATE INDEX "_PostToTopic_B_index" ON "_PostToTopic"("B");

-- AddForeignKey
ALTER TABLE "brands" ADD CONSTRAINT "brands_address_id_fkey" FOREIGN KEY ("address_id") REFERENCES "addresses"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "brands" ADD CONSTRAINT "brands_profile_photo_id_fkey" FOREIGN KEY ("profile_photo_id") REFERENCES "photos"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "posts" ADD CONSTRAINT "review_user_id_foreign" FOREIGN KEY ("writer_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "topics" ADD CONSTRAINT "topics_profile_photo_id_fkey" FOREIGN KEY ("profile_photo_id") REFERENCES "photos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "coffees" ADD CONSTRAINT "coffee_brand_id_foreign" FOREIGN KEY ("brand_id") REFERENCES "brands"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "coffees" ADD CONSTRAINT "coffees_topicId_fkey" FOREIGN KEY ("topicId") REFERENCES "topics"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "grinders" ADD CONSTRAINT "grinders_brand_id_fkey" FOREIGN KEY ("brand_id") REFERENCES "brands"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "grinders" ADD CONSTRAINT "grinders_topic_id_fkey" FOREIGN KEY ("topic_id") REFERENCES "topics"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "brewing_methods" ADD CONSTRAINT "brewing_methods_brand_id_fkey" FOREIGN KEY ("brand_id") REFERENCES "brands"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "brewing_methods" ADD CONSTRAINT "brewing_methods_topic_id_fkey" FOREIGN KEY ("topic_id") REFERENCES "topics"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cafeterias" ADD CONSTRAINT "cafeterias_address_id_fkey" FOREIGN KEY ("address_id") REFERENCES "addresses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cafeterias" ADD CONSTRAINT "cafeterias_topic_id_fkey" FOREIGN KEY ("topic_id") REFERENCES "topics"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comment_post_id_foreign" FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comment_user_id_foreign" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "photos" ADD CONSTRAINT "photos_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_address_id_fkey" FOREIGN KEY ("address_id") REFERENCES "addresses"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_profile_photo_id_fkey" FOREIGN KEY ("profile_photo_id") REFERENCES "photos"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PostToTopic" ADD CONSTRAINT "_PostToTopic_A_fkey" FOREIGN KEY ("A") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PostToTopic" ADD CONSTRAINT "_PostToTopic_B_fkey" FOREIGN KEY ("B") REFERENCES "topics"("id") ON DELETE CASCADE ON UPDATE CASCADE;
