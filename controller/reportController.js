import ExcelJS from "exceljs";
import fs from "fs";
import PDFDocument from "pdfkit";
import path from "path";
import { fileURLToPath } from "url";

// ES Modules equivalent for __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path ke template Excel
const templatePath = path.join(__dirname, "../templates/sample_report.xlsx");

// Fungsi untuk generate report
export const generateReport = async (req, res) => {
  try {
    const { Data, format } = req.body; // Data dan format yang diterima dari frontend

    // Load template Excel
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(templatePath);

    const worksheet = workbook.getWorksheet("sheet1"); // Ambil sheet pertama
    if (!worksheet) {
      console.log("Worksheet not found");
      return res.status(404).json({ msg: "Worksheet not found" });
    }

    // Asumsikan sampleData berisi array data sesuai dengan kolom di template Excel
    // Contoh: sampleData = { columnA: "value1", columnB: "value2", ... }
    const inProduct = `: ${Data.product}`;
    const inSn = `: ${Data.sn}`;
    const inDate = `: ${Data.date}`;
    const inCustomer = `: ${Data.customer}`;
    const inValue1 = `${Data.value1} Unit`;
    const inValue2 = `${Data.value2} Unit`;
    const inTester = Data.tester;
    const inChecker = Data.checker;

    // Isi data ke dalam kolom tertentu di Excel
    worksheet.getCell("C2").value = inProduct;
    worksheet.getCell("C3").value = inSn;
    worksheet.getCell("C4").value = inDate;
    worksheet.getCell("C6").value = inCustomer;
    worksheet.getCell("G25").value = inValue1;
    worksheet.getCell("G26").value = inValue2;
    worksheet.getCell("A32").value = inTester;
    worksheet.getCell("G32").value = inChecker;
    // Tambahkan pengisian data lainnya sesuai kebutuhan

    // Masukkan gambar dari pathimage ke dalam Excel di cell A28
    // const imagePath = `${Data.pathimage}/${Data.sn}.png`;
    const imagePath = path.join(
      __dirname,
      `../remark/${Data.sn}.png`
    );

    // Pastikan file gambar ada
    if (fs.existsSync(imagePath)) {
      const imageId = workbook.addImage({
        filename: imagePath,
        extension: path.extname(imagePath).slice(1), // ekstensi file tanpa titik
      });

      // Tentukan posisi gambar di Excel (A29)
      worksheet.addImage(imageId, {
        tl: { col: 0, row: 28 }, // Posisi di A28 (row 28, col A)
        ext: { width: 600, height: 300 }, // Ukuran gambar
        editAs: "oneCell", // Memastikan gambar menyesuaikan ukuran cell
      });
    } else {
      console.log("Gambar tidak ditemukan pada path:", imagePath);
      return res.status(404).json({ msg: "Image not found" });
    }

    // Simpan hasil sesuai format yang dipilih (PDF atau XLSX)
    if (format === "xlsx") {
      const filePath = path.join(__dirname, `../uploads/${Data.sn}.xlsx`);
      await workbook.xlsx.writeFile(filePath);
      res.download(filePath);
    } else if (format === "pdf") {
      const pdfPath = path.join(__dirname, `../uploads/${Data.sn}.pdf`);
      const pdfDoc = new PDFDocument();
      pdfDoc.pipe(fs.createWriteStream(pdfPath));

      pdfDoc.text(`Product: ${Data.product}`);
      pdfDoc.text(`SN: ${Data.sn}`);
      pdfDoc.text(`Date: ${Data.date}`);
      pdfDoc.text(`Customer: ${Data.customer}`);
      pdfDoc.text(`Value 1: ${Data.value1}`);
      pdfDoc.text(`Value 2: ${Data.value2}`);
      pdfDoc.text(`Tester: ${Data.tester}`);
      pdfDoc.text(`Checker: ${Data.checker}`);
      // Tambahkan pengisian lainnya untuk PDF

      pdfDoc.end();
      res.download(pdfPath);
    } else {
      res.status(400).json({ msg: "Invalid format" });
    }
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
