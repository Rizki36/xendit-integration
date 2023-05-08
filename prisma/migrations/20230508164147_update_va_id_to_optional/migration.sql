-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Transaction" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "status" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "bankCode" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "virtualAccountID" TEXT
);
INSERT INTO "new_Transaction" ("amount", "bankCode", "id", "name", "status", "virtualAccountID") SELECT "amount", "bankCode", "id", "name", "status", "virtualAccountID" FROM "Transaction";
DROP TABLE "Transaction";
ALTER TABLE "new_Transaction" RENAME TO "Transaction";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
