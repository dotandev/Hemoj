-- CreateTable
CREATE TABLE "Emoji" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "emoji" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "shortcodes" TEXT NOT NULL,
    "keywords" TEXT NOT NULL,
    "locale" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Emoji_emoji_locale_key" ON "Emoji"("emoji", "locale");
