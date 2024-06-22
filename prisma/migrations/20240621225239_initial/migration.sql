-- CreateEnum
CREATE TYPE "PostType" AS ENUM ('TIP', 'REVIEW');

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
    "internal_grade" INTEGER,
    "acidity" INTEGER NOT NULL,
    "body" INTEGER NOT NULL,
    "sweetness" INTEGER,
    "after_taste" TEXT,
    "category" TEXT NOT NULL,
    "brand_id" UUID NOT NULL,

    CONSTRAINT "coffees_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "brands" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "legal_name" TEXT NOT NULL,
    "trading_name" TEXT NOT NULL,
    "cnpj" TEXT NOT NULL,

    CONSTRAINT "brands_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "posts" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "like_amount" INTEGER NOT NULL,
    "author_id" UUID NOT NULL,
    "type" "PostType" NOT NULL,

    CONSTRAINT "posts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "comments" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "content" TEXT NOT NULL,
    "review_id" UUID NOT NULL,
    "author_id" UUID NOT NULL,

    CONSTRAINT "comments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "photos" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "url" TEXT NOT NULL,
    "relation_id" UUID NOT NULL,
    "reviewId" UUID,
    "review_id" UUID NOT NULL,

    CONSTRAINT "photos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "phone" TEXT,
    "uf" TEXT,
    "city" TEXT,
    "photo" TEXT,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "coffees" ADD CONSTRAINT "coffee_brand_id_foreign" FOREIGN KEY ("brand_id") REFERENCES "brands"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "posts" ADD CONSTRAINT "review_user_id_foreign" FOREIGN KEY ("author_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comment_post_id_foreign" FOREIGN KEY ("review_id") REFERENCES "posts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comment_user_id_foreign" FOREIGN KEY ("author_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "photos" ADD CONSTRAINT "comment_post_id_foreign" FOREIGN KEY ("review_id") REFERENCES "posts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
