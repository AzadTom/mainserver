-- CreateEnum
CREATE TYPE "PlaylistStatus" AS ENUM ('idle', 'inprogress', 'done');

-- CreateEnum
CREATE TYPE "BlogStatus" AS ENUM ('draft', 'published');

-- CreateTable
CREATE TABLE "trackersplaylist" (
    "id" SERIAL NOT NULL,
    "playlistid" INTEGER NOT NULL,
    "youtube_iframe_url" TEXT NOT NULL,
    "isShortVideo" INTEGER NOT NULL DEFAULT 0,
    "status" "PlaylistStatus" NOT NULL DEFAULT 'idle',

    CONSTRAINT "trackersplaylist_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "trackers" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,

    CONSTRAINT "trackers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "blogs" (
    "id" UUID NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "excerpt" TEXT NOT NULL,
    "content" JSONB NOT NULL,
    "status" "BlogStatus" NOT NULL DEFAULT 'draft',
    "published_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "blogs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Todo" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Todo_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "blogs_slug_key" ON "blogs"("slug");

-- AddForeignKey
ALTER TABLE "trackersplaylist" ADD CONSTRAINT "trackersplaylist_playlistid_fkey" FOREIGN KEY ("playlistid") REFERENCES "trackers"("id") ON DELETE CASCADE ON UPDATE CASCADE;
