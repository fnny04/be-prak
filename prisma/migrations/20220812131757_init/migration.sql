/*
  Warnings:

  - You are about to drop the `Mahasiswa` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `Mahasiswa`;

-- CreateTable
CREATE TABLE `Transportasi` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `keberangkatan` VARCHAR(191) NOT NULL,
    `jadwal` VARCHAR(191) NULL,
    `harga` INTEGER NOT NULL,

    UNIQUE INDEX `Transportasi_keberangkatan_key`(`keberangkatan`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
