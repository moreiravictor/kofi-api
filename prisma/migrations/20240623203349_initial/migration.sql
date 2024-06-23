-- CreateExtension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "public";

-- CreateEnum
CREATE TYPE "PostType" AS ENUM ('tip', 'review', 'comparison', 'recipe');

-- CreateEnum
CREATE TYPE "GrinderType" AS ENUM ('hand', 'electric');

-- CreateEnum
CREATE TYPE "CafeteriaType" AS ENUM ('regular', 'specialty');

-- CreateTable
CREATE TABLE "coffees" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(6),
    "name" TEXT NOT NULL,
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
    "profile_photo_id" UUID NOT NULL,

    CONSTRAINT "coffees_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "brands" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(6),
    "legal_name" TEXT NOT NULL,
    "trading_name" TEXT NOT NULL,
    "cnpj" TEXT NOT NULL,
    "addressId" UUID NOT NULL,
    "profile_photo_id" UUID NOT NULL,

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
    "user_id" UUID NOT NULL,
    "coffee_id" UUID,

    CONSTRAINT "posts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "grinders" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(6),
    "type" "GrinderType" NOT NULL,
    "name" TEXT NOT NULL,
    "clicks" INTEGER NOT NULL,
    "build_material" TEXT NOT NULL,
    "weight" INTEGER NOT NULL,
    "cutter" TEXT,
    "bean_volume" INTEGER,
    "size" TEXT,
    "color" TEXT,
    "profilePhotoId" UUID NOT NULL,
    "brandId" UUID NOT NULL,

    CONSTRAINT "grinders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "brewing_methods" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(6),
    "name" TEXT NOT NULL,
    "profilePhotoId" UUID NOT NULL,
    "brandId" UUID NOT NULL,

    CONSTRAINT "brewing_methods_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cafeterias" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(6),
    "name" TEXT NOT NULL,
    "type" "CafeteriaType" NOT NULL,
    "addressId" UUID NOT NULL,

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
    "postId" UUID,

    CONSTRAINT "photos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(6),
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "phone" TEXT,
    "address_id" UUID,
    "profile_photo_id" UUID,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CoffeeToPost" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateTable
CREATE TABLE "_GrinderToPost" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateTable
CREATE TABLE "_BrewingMethodToPost" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateTable
CREATE TABLE "_CafeteriaToPost" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "_CoffeeToPost_AB_unique" ON "_CoffeeToPost"("A", "B");

-- CreateIndex
CREATE INDEX "_CoffeeToPost_B_index" ON "_CoffeeToPost"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_GrinderToPost_AB_unique" ON "_GrinderToPost"("A", "B");

-- CreateIndex
CREATE INDEX "_GrinderToPost_B_index" ON "_GrinderToPost"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_BrewingMethodToPost_AB_unique" ON "_BrewingMethodToPost"("A", "B");

-- CreateIndex
CREATE INDEX "_BrewingMethodToPost_B_index" ON "_BrewingMethodToPost"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_CafeteriaToPost_AB_unique" ON "_CafeteriaToPost"("A", "B");

-- CreateIndex
CREATE INDEX "_CafeteriaToPost_B_index" ON "_CafeteriaToPost"("B");

-- AddForeignKey
ALTER TABLE "coffees" ADD CONSTRAINT "coffee_brand_id_foreign" FOREIGN KEY ("brand_id") REFERENCES "brands"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "coffees" ADD CONSTRAINT "coffees_profile_photo_id_fkey" FOREIGN KEY ("profile_photo_id") REFERENCES "photos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "brands" ADD CONSTRAINT "brands_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "addresses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "brands" ADD CONSTRAINT "brands_profile_photo_id_fkey" FOREIGN KEY ("profile_photo_id") REFERENCES "photos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "posts" ADD CONSTRAINT "review_user_id_foreign" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "grinders" ADD CONSTRAINT "grinders_profilePhotoId_fkey" FOREIGN KEY ("profilePhotoId") REFERENCES "photos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "grinders" ADD CONSTRAINT "grinders_brandId_fkey" FOREIGN KEY ("brandId") REFERENCES "brands"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "brewing_methods" ADD CONSTRAINT "brewing_methods_profilePhotoId_fkey" FOREIGN KEY ("profilePhotoId") REFERENCES "photos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "brewing_methods" ADD CONSTRAINT "brewing_methods_brandId_fkey" FOREIGN KEY ("brandId") REFERENCES "brands"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cafeterias" ADD CONSTRAINT "cafeterias_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "addresses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comment_post_id_foreign" FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comment_user_id_foreign" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "photos" ADD CONSTRAINT "photos_postId_fkey" FOREIGN KEY ("postId") REFERENCES "posts"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_address_id_fkey" FOREIGN KEY ("address_id") REFERENCES "addresses"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_profile_photo_id_fkey" FOREIGN KEY ("profile_photo_id") REFERENCES "photos"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CoffeeToPost" ADD CONSTRAINT "_CoffeeToPost_A_fkey" FOREIGN KEY ("A") REFERENCES "coffees"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CoffeeToPost" ADD CONSTRAINT "_CoffeeToPost_B_fkey" FOREIGN KEY ("B") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GrinderToPost" ADD CONSTRAINT "_GrinderToPost_A_fkey" FOREIGN KEY ("A") REFERENCES "grinders"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GrinderToPost" ADD CONSTRAINT "_GrinderToPost_B_fkey" FOREIGN KEY ("B") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BrewingMethodToPost" ADD CONSTRAINT "_BrewingMethodToPost_A_fkey" FOREIGN KEY ("A") REFERENCES "brewing_methods"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BrewingMethodToPost" ADD CONSTRAINT "_BrewingMethodToPost_B_fkey" FOREIGN KEY ("B") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CafeteriaToPost" ADD CONSTRAINT "_CafeteriaToPost_A_fkey" FOREIGN KEY ("A") REFERENCES "cafeterias"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CafeteriaToPost" ADD CONSTRAINT "_CafeteriaToPost_B_fkey" FOREIGN KEY ("B") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;
