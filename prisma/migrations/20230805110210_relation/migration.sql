-- CreateTable
CREATE TABLE "_DesignToSet" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_DesignToSet_A_fkey" FOREIGN KEY ("A") REFERENCES "Design" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_DesignToSet_B_fkey" FOREIGN KEY ("B") REFERENCES "Set" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "_DesignToSet_AB_unique" ON "_DesignToSet"("A", "B");

-- CreateIndex
CREATE INDEX "_DesignToSet_B_index" ON "_DesignToSet"("B");
