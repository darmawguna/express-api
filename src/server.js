const express = require("express");
const path = require("path");

function createApp() {
  const app = express();

  // serve static images
  app.use("/uploads/product", express.static(path.join(process.cwd(), "public", "uploads", "product")));

  const products = [
    {
      id: 3,
      user_id: 2,
      title: "Beras super",
      description: "Beras Super Berkualitas Terbaik Di Galaxy Bima Sakti",
      location: "Tata surya",
      category: "Bahan Pokok",
      price: 120000,
      stock: 200,
      satuan: "kg",
      image: ["kentang.jpg", "kopi.jpg"],
      created_at: "2025-09-29T08:11:14.000000Z",
      updated_at: "2025-09-29T11:33:56.000000Z",
      average_rating: null,
    },
  ];

  const withFullUrl = (req, item) => {
    const proto = req.headers["x-forwarded-proto"] || "https";
    const host = req.headers.host;
    const image_url = item.image.map((img) => `${proto}://${host}/uploads/product/${img}`);
    return { ...item, image_url };
  };

  app.get("/product/getall", (req, res) => {
    const data = products.map((p) => withFullUrl(req, p));
    res.json({ success: true, message: "List Semua Product", data });
  });

  app.get("/product/show/:id", (req, res) => {
    const product = products.find((p) => String(p.id) === req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found", data: null });
    }
    res.json({
      success: true,
      message: "Detail Product!",
      data: withFullUrl(req, product),
    });
  });

  app.get("/", (_, res) => res.json({ ok: true }));

  return app;
}

module.exports = { createApp };
