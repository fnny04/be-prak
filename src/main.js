import express from "express";
import { PrismaClient } from "@prisma/client";
// import cors from "cors";

const app = express();
app.use(express.json());
const port = 9000;

const database = new PrismaClient();
// app.use(
//   cors({
//     origin: "*",
//     methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
//   })
// );

app.get("/", (req, res) => {
  res.send({ nama: "Fenny Oktaviani" });
});

app.get("/transportasi", async (req, res) => {
  try {
    const transportasi = await database.transportasi.findMany();
    if (!transportasi) throw new Error("Belum ada Jadwal");
    res.send(transportasi);
  } catch (err) {
    res.send({ status: 404, message: err.message });
  }
});

app.get("/transportasi/:id", async (req, res) => {
  try {
    const transportasi = await database.transportasi.findUnique({
      where: {
        id: parseInt(req.params.id),
      },
    });
    if (!transportasi) throw new Error("Tidak Ada Data");

    res.send(transportasi);
  } catch (err) {
    res.send({ status: 404, message: err.message });
  }
});

app.post("/transportasi/create", async (req, res) => {
  try {
    const transportasi = await database.transportasi.create({
      data: {
        keberangkatan: req.body.keberangkatan,
        jadwal: req.body.jadwal,
        harga: req.body.harga,
      },
    });
    res.send({ message: "Belum berhasil menambah data", data: transportasi });
  } catch (err) {}
});

app.put("/transportasi/update/", async (req, res) => {
  try {
    const transportasi = await database.transportasi.update({
      where: {
        id: req.body.id,
      },
      data: {
        keberangkatan: req.body.keberangkatan,
        jadwal: req.body.jadwal,
        harga: req.body.harga,
      },
    });
    res.send({ message: "Data berhasil diubah", data: transportasi });
  } catch (err) {}
});

app.delete("/transportasi/delete", async (req, res) => {
  await database.transportasi.delete({
    where: {
      id: req.body.id,
    },
  });
  res.send({ message: "Data Berhasil di hapus" });
});

app.listen(port, () => {
  console.log(`Aplikasi Berjalan di port ${port}`);
});
