-- CreateIndex
CREATE INDEX "BuyerMaster_createdAt_idx" ON "BuyerMaster"("createdAt");

-- CreateIndex
CREATE INDEX "Product_productTypeId_idx" ON "Product"("productTypeId");

-- CreateIndex
CREATE INDEX "Product_isActive_idx" ON "Product"("isActive");

-- CreateIndex
CREATE INDEX "Product_createdAt_idx" ON "Product"("createdAt");

-- CreateIndex
CREATE INDEX "SalesMaster_bId_idx" ON "SalesMaster"("bId");

-- CreateIndex
CREATE INDEX "SalesMaster_SODateTime_idx" ON "SalesMaster"("SODateTime");
