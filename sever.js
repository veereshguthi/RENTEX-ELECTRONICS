const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

const products = [
  {
    id: 1,
    name: "MacBook Air",
    category: "Laptops",
    price: 899,
    image: "https://images.unsplash.com/photo-1517336714739-489689fd1ca8?auto=format&fit=crop&w=900&q=85"
  },
  {
    id: 2,
    name: "Gaming Laptop",
    category: "Laptops",
    price: 1299,
    image: "https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?auto=format&fit=crop&w=900&q=85"
  },
  {
    id: 3,
    name: "Dell XPS",
    category: "Laptops",
    price: 1099,
    image: "https://images.unsplash.com/photo-1593642532400-2682810df593?auto=format&fit=crop&w=900&q=85"
  },
  {
    id: 4,
    name: "iPhone 17 Pro Max",
    category: "iPhones",
    price: 799,
    image: "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?auto=format&fit=crop&w=900&q=85"
  },
  {
    id: 5,
    name: "iPhone 16 Pro",
    category: "iPhones",
    price: 699,
    image: "https://images.unsplash.com/photo-1591337676887-a217a6970a8a?auto=format&fit=crop&w=900&q=85"
  },
  {
    id: 6,
    name: "iPhone 15",
    category: "iPhones",
    price: 499,
    image: "https://images.unsplash.com/photo-1556656793-08538906a9f8?auto=format&fit=crop&w=900&q=85"
  },
  {
    id: 7,
    name: "Sony Alpha Camera",
    category: "Cameras",
    price: 999,
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=900&q=85"
  },
  {
    id: 8,
    name: "Canon EOS Camera",
    category: "Cameras",
    price: 899,
    image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&w=900&q=85"
  },
  {
    id: 9,
    name: "GoPro Camera",
    category: "Cameras",
    price: 599,
    image: "https://images.unsplash.com/photo-1564466809058-bf4114d55352?auto=format&fit=crop&w=900&q=85"
  },
  {
    id: 10,
    name: "iPad Pro",
    category: "Tablets",
    price: 649,
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=900&q=85"
  },
  {
    id: 11,
    name: "PlayStation 5",
    category: "Gaming",
    price: 549,
    image: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=900&q=85"
  }
];

app.get("/api/products", (req, res) => {
  let result = products;

  const category = req.query.category;
  const search = (req.query.search || "").toLowerCase();

  if (category && category !== "All") {
    result = result.filter(product =>
      product.category === category
    );
  }

  if (search) {
    result = result.filter(product =>
      product.name.toLowerCase().includes(search) ||
      product.category.toLowerCase().includes(search)
    );
  }

  res.json(result);
});

app.get("/api/products/:id", (req, res) => {
  const product = products.find(
    p => p.id === Number(req.params.id)
  );

  if (!product) {
    return res.status(404).json({
      message: "Product not found"
    });
  }

  res.json(product);
});

app.get("*", (req, res) => {
  res.sendFile(
    path.join(__dirname, "public", "index.html")
  );
});

app.listen(PORT, () => {
  console.log(`RentX running on port ${PORT}`);
});
