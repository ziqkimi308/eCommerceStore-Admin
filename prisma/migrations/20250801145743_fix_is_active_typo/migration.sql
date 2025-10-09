/*
  Warnings:

  - You are about to drop the column `isActice` on the `Product` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Product" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "mrp" REAL NOT NULL,
    "sellPrice" REAL NOT NULL,
    "image" TEXT NOT NULL,
    "productTypeId" INTEGER NOT NULL,
    "currentStock" INTEGER NOT NULL,
    "rating" REAL DEFAULT 0,
    "smallSize" INTEGER NOT NULL DEFAULT 0,
    "mediumSize" INTEGER NOT NULL DEFAULT 0,
    "largeSize" INTEGER NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Product_productTypeId_fkey" FOREIGN KEY ("productTypeId") REFERENCES "ProductType" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Product" ("createdAt", "currentStock", "description", "id", "image", "largeSize", "mediumSize", "mrp", "name", "productTypeId", "rating", "sellPrice", "smallSize", "updatedAt") SELECT "createdAt", "currentStock", "description", "id", "image", "largeSize", "mediumSize", "mrp", "name", "productTypeId", "rating", "sellPrice", "smallSize", "updatedAt" FROM "Product";
DROP TABLE "Product";
ALTER TABLE "new_Product" RENAME TO "Product";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
