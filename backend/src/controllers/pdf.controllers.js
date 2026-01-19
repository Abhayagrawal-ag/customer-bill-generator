import PDFDocument from "pdfkit";
import Sale from "../models/sale.models.js";
import fs from "fs";
import path from "path"
const generateBill = async (req, res) => {
  try {
    const { customerId } = req.params;
    console.log(customerId);
    const sale = await Sale.findOne({ customer: customerId })
      .sort({ soldOn: -1 })
      .populate("products.product")
      .populate({
        path: "shop",
        populate: { path: "owner", model: "User" },
      })
      .populate("customer");
    if (!sale) {
      return res
        .status(400)
        .json({ message: "no sale found for this customer" });
    }
    const customer = sale.customer;
    const shop = sale.shop;
    const shopkeeper = shop.owner;
    // pdf setup
    const doc = new PDFDocument({ margin: 50 });
    const billsFolder = path.resolve("./bills");
    if (!fs.existsSync(billsFolder)) fs.mkdirSync(billsFolder);
    const filePath = path.join(billsFolder, `bill-${sale._id}.pdf`);
    // Pipe to file (keep server record)
    doc.pipe(fs.createWriteStream(filePath));

    // Pipe to response (client download) - Set headers FIRST
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="bill-${customer.customerName}.pdf"`
    );
    doc.pipe(res);

    // shopdetails
    doc
      .fontSize(20)
      .text(shop.shopName.toUpperCase(), {
        align: "center",
        underline: "true",
      });
    doc.moveDown(0.5);
    doc
      .fontSize(12)
      .text(`Address: ${shop.shopAddress}`, { align: "center" });

    doc.text(`Mobile no.: ${shop.shopPhoneNumber}`, { align: "center" });
    doc.text(`GST number: ${shop.GST_number}`, { align: "center" });
    doc.text(`Shopkeeper Name: ${shopkeeper.username}`, { align: "center" });
    doc.moveDown(1);

    // customerdetails
    doc.fontSize(12).text(`Customer Name: ${customer.customerName}`);
    doc.text(`Phone number: ${customer.mobileNumber}`);
    doc.text(`Date: ${sale.soldOn.toLocaleDateString()}`);
    doc.moveDown(1);

    const tableTop = doc.y;
    doc
      .font("Helvetica-Bold")
      .text("S.No", 50, tableTop)
      .text("Products", 120, tableTop)
      .text("Qty", 300, tableTop, { width: 50, align: "right" })
      .text("Price", 370, tableTop, { width: 60, align: "right" })
      .text("Total", 440, tableTop, { width: 60, align: "right" });
    doc.moveDown(0.5);
    doc.font("Helvetica").text("-".repeat(95));
    doc.moveDown(0.5);

    let totalAmount = 0;
    let yPos = doc.y;
    const lineHeight = 20;
    sale.products.forEach((p, i) => {
      const lineTotal = p.amount;
      totalAmount += lineTotal;

      doc
        .font("Helvetica")
        .text(i + 1, 50, yPos)
        .text(p.product.productName, 120, yPos, { width: 170 }) // Added width to prevent overlap
        .text(String(p.quantity), 300, yPos, { width: 50, align: "right" })
        .text(`Rs. ${p.product.productPrice}`, 370, yPos, { width: 50, align: "right" }) // Changed ₹ to Rs.
        .text(`Rs. ${lineTotal}`, 450, yPos, { width: 50, align: "right" }); // Changed ₹ to Rs.
      yPos += lineHeight;
    });
    doc.moveTo(50, yPos + 5).lineTo(510, yPos + 5).stroke();
    yPos += 20;

    doc
      .fontSize(13)
      .font("Helvetica-Bold")
      .text(`Total Amount: Rs. ${totalAmount}`, 370, yPos, { align: "right" }); // Changed ₹ to Rs.
    yPos += 30;

    doc
      .fontSize(11)
      .font("Helvetica-Oblique")
      .text("Thank you for shopping with us!", 0, yPos, { align: "center" });
    doc.moveDown(0.3).text("Visit Again!", { align: "center" });



    // Send PDF
    // Finalize PDF file
    doc.end();


  } catch (error) {
    console.error("Error generating bill:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
export default generateBill;
