const express = require("express");
const path = require("path");

function createApp() {
  const app = express();

  // (Opsional) CORS kalau dipanggil dari domain lain
  // app.use((req, res, next) => {
  //   res.setHeader("Access-Control-Allow-Origin", "*");
  //   next();
  // });

  // Di Vercel, folder /public otomatis jadi static di root.
  // Untuk dev lokal, ini memetakan /assets -> ./public/assets
  app.use("/assets", express.static(path.join(process.cwd(), "public", "assets")));

  // Data statis — perhatikan image_path relatif ke / (root domain)
  const products = [
    {
      id: 1,
      shop_id: 101,
      title: "Beras Organik 5kg",
      description: "Beras organik kualitas premium, rendah pestisida.",
      location: "Buleleng, Bali",
      category: "Food",
      price: 120000,
      stock: 25,
      image_path: "/assets/beras-organik-5kg.jpg",
      rating: 4.6,
    },
    {
      id: 2,
      shop_id: 101,
      title: "Pupuk Kompos 10kg",
      description: "Kompos murni, memperbaiki struktur tanah.",
      location: "Tabanan, Bali",
      category: "Fertilizer",
      price: 80000,
      stock: 50,
      image_path: "/assets/pupuk-kompos-10kg.jpg",
      rating: 4.2,
    },
    {
      id: 3,
      shop_id: 102,
      title: "Bibit Cabai Rawit (50 benih)",
      description: "Daya tumbuh >90%, cocok untuk dataran rendah.",
      location: "Malang, Jawa Timur",
      category: "Seeds",
      price: 25000,
      stock: 200,
      image_path: "/assets/benih-cabai-rawit.jpg",
      rating: 4.8,
    },
    {
      id: 4,
      shop_id: 103,
      title: "Cangkul Baja Karbon",
      description: "Gagang kayu jati, kepala baja karbon tahan lama.",
      location: "Sukabumi, Jawa Barat",
      category: "Tools",
      price: 145000,
      stock: 15,
      image_path: "/assets/cangkul-baja.jpg",
      rating: 4.4,
    },
    {
      id: 5,
      shop_id: 104,
      title: "Irigasi Tetes Starter Kit",
      description: "Paket selang + dripper 50 titik, mudah instalasi.",
      location: "Sidoarjo, Jawa Timur",
      category: "Irrigation",
      price: 390000,
      stock: 10,
      image_path: "/assets/irigasi-tetes-starter.jpg",
      rating: 4.7,
    },
  ];

  // Build full URL dari request (otomatis cocok di preview/prod)
  const withFullUrl = (req, item) => {
    const url = new URL(req.url, `${req.headers["x-forwarded-proto"] || "https"}://${req.headers.host}`);
    return { ...item, image_url: `${url.origin}${item.image_path}` };
  };

  // Routes
  app.get("/products", (req, res) => {
    const data = products.map((p) => withFullUrl(req, p));
    res.json({ data });
  });

  app.get("/products/:id", (req, res) => {
    const item = products.find((p) => String(p.id) === String(req.params.id));
    if (!item) return res.status(404).json({ error: "Product not found" });
    res.json({ data: withFullUrl(req, item) });
  });

  // Health check
  app.get("/", (_, res) => res.json({ ok: true }));

  return app;
}

module.exports = { createApp };
