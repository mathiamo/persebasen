-- CreateTable
CREATE TABLE "Runner" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "image" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "PersonalBest" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "timeString" TEXT,
    "location" TEXT,
    "date" DATETIME,
    "runnerId" INTEGER NOT NULL,
    "distanceId" INTEGER NOT NULL,
    "timeId" INTEGER NOT NULL,
    CONSTRAINT "PersonalBest_distanceId_fkey" FOREIGN KEY ("distanceId") REFERENCES "Distance" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "PersonalBest_timeId_fkey" FOREIGN KEY ("timeId") REFERENCES "Time" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "PersonalBest_runnerId_fkey" FOREIGN KEY ("runnerId") REFERENCES "Runner" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Distance" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "value" INTEGER NOT NULL,
    "unit" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Time" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "seconds" INTEGER NOT NULL,
    "minutes" INTEGER NOT NULL,
    "hours" INTEGER NOT NULL,
    "hundredths" INTEGER NOT NULL
);
