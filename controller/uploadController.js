import path from "path";
import multer from "multer";
import { fileURLToPath } from "url";

// ES Modules equivalent for __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Konfigurasi penyimpanan file menggunakan Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../remark")); // Direktori penyimpanan file
  },
  filename: (req, file, cb) => {
    const originalName = req.body.sn || file.fieldname; // Ambil nama dari body atau gunakan fieldname
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    // cb(
    //   null,
    //   originalName + "-" + uniqueSuffix + path.extname(file.originalname)
    // ); // Simpan dengan nama yang ditentukan
    cb(null, originalName + path.extname(file.originalname)); // Simpan dengan nama yang ditentukan
  },
});

// Inisialisasi Multer dengan storage
export const upload = multer({ storage });

// Fungsi untuk menangani upload gambar
export const uploadImage = (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ msg: "No file uploaded" });
    }

    const imagePath = path.join(__dirname, "../remark/", req.file.filename);

    // Kirim respons sukses dengan path file
    return res.status(200).json({
      msg: "File uploaded successfully",
      filename: req.file.filename,
      path: imagePath,
    });
  } catch (error) {
    res.status(500).json({ msg: error.message });
    console.error(error);
  }
};
