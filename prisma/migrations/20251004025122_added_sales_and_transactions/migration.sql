-- CreateTable
CREATE TABLE "SalesMaster" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "SODateTime" DATETIME NOT NULL,
    "grandTotalPrice" REAL NOT NULL,
    "paymentMode" TEXT NOT NULL,
    "paymentDetails" TEXT,
    "bId" INTEGER NOT NULL,
    CONSTRAINT "SalesMaster_bId_fkey" FOREIGN KEY ("bId") REFERENCES "BuyerMaster" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "SalesTransaction" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "productId" INTEGER NOT NULL,
    "productName" TEXT NOT NULL,
    "unitPrice" REAL NOT NULL,
    "qtyPurchased" INTEGER NOT NULL,
    "total" REAL NOT NULL,
    "SMOid" TEXT NOT NULL,
    CONSTRAINT "SalesTransaction_SMOid_fkey" FOREIGN KEY ("SMOid") REFERENCES "SalesMaster" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
