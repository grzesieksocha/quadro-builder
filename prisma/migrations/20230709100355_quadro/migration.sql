-- CreateTable
CREATE TABLE "Design" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "picture" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "time_to_build" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "Set" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "url" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "picture" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Design_code_key" ON "Design"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Design_name_key" ON "Design"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Design_url_key" ON "Design"("url");

-- CreateIndex
CREATE UNIQUE INDEX "Design_picture_key" ON "Design"("picture");

-- CreateIndex
CREATE UNIQUE INDEX "Set_url_key" ON "Set"("url");

-- CreateIndex
CREATE UNIQUE INDEX "Set_name_key" ON "Set"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Set_picture_key" ON "Set"("picture");
