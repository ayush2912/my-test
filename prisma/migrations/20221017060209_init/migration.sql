/*
  Warnings:

  - You are about to drop the `Collaborator` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Collaborator";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "AccessPolicy" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER,
    "organizationId" INTEGER,
    "projectId" INTEGER,
    "canRead" BOOLEAN NOT NULL DEFAULT true,
    "canCreate" BOOLEAN,
    "canUpdate" BOOLEAN,
    "canDelete" BOOLEAN,
    CONSTRAINT "AccessPolicy_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "AccessPolicy_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization" ("_id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "AccessPolicy_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
