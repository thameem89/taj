const fs = require('fs');
const path = require('path');

const categories = [
    { id: 'foods', name: 'Foods & Beverages', dir: 'foods-and-beverages', placeholder: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=400&q=80' },
    { id: 'cleaning', name: 'Cleaning Products', dir: 'cleaning', placeholder: 'https://images.unsplash.com/photo-1584622781564-1d9876a13d00?auto=format&fit=crop&w=400&q=80' },
    { id: 'cosmetics', name: 'Cosmetics', dir: 'cosmetics', placeholder: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=400&q=80' },
    { id: 'diapers', name: 'Diapers & Tissues', dir: 'diapers-and-tissues', placeholder: 'https://images.unsplash.com/photo-1563811771046-ba984ff30900?auto=format&fit=crop&w=400&q=80' },
    { id: 'household', name: 'Household Items', dir: 'household-items', placeholder: 'https://images.unsplash.com/photo-1517705008128-361805f42e86?auto=format&fit=crop&w=400&q=80' }
];

const template = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>{{NAME}} — Taj Middleeast</title>
  <link rel="stylesheet" href="style.css" />
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=DM+Sans:wght@300;400;500;600&display=swap" rel="stylesheet" />
  <style>
    :root {
      --theme-bg: #FFFFFF;
      --theme-primary: #1a6b3a;
      --theme-secondary: #c0392b;
      --theme-text: #1a1a1a;
      --theme-text-light: #444444;
      --theme-accent-soft: #e8f5ee;
    }
    .product-page-hero {
      background: var(--theme-accent-soft);
      padding: 100px 24px 60px;
      text-align: center;
    }
    .product-page-hero h1 {
      font-family: 'Playfair Display', serif;
      font-size: 48px;
      color: var(--theme-primary);
      margin-bottom: 16px;
    }
    .product-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      gap: 30px;
      padding: 60px 24px;
      max-width: 1200px;
      margin: 0 auto;
    }
    .product-item {
      background: white;
      border: 1px solid #eee;
      border-radius: 8px;
      overflow: hidden;
      transition: transform 0.3s ease, box-shadow 0.3s ease;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 20px;
      text-align: center;
    }
    .product-item:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 20px rgba(0,0,0,0.05);
      border-color: var(--theme-primary);
    }
    .product-img-box {
      width: 100%;
      height: 180px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 15px;
    }
    .product-img-box img {
      max-width: 100%;
      max-height: 100%;
      object-fit: contain;
    }
    .product-name {
      font-weight: 600;
      color: var(--theme-text);
      font-size: 16px;
    }
  </style>
</head>
<body>
  <nav>
    <a href="index.html" class="nav-logo">
      <div class="nav-logo-icon"><span>T</span></div>
      <div class="nav-logo-text">
        <strong>Taj Middleeast</strong>
        <em>Group of Companies</em>
      </div>
    </a>
    <ul class="nav-links">
      <li class="nav-item-dropdown">
        <a href="divisions.html">Our Divisions ▾</a>
        <div class="dropdown-menu">
          <a href="foods.html">Taj Foods</a>
          <a href="recycle.html">Taj Recycle</a>
          <a href="opticals.html">Taj Opticals</a>
          <a href="packaging.html">Taj Packaging</a>
          <a href="electronics.html">Taj Electronics</a>
          <a href="zivo.html">Zivo Perfumes</a>
        </div>
      </li>
      <li class="nav-item-dropdown">
        <a href="products.html">Our Products ▾</a>
        <div class="dropdown-menu">
          <a href="products-foods.html">Foods & Beverages</a>
          <a href="products-cleaning.html">Cleaning Products</a>
          <a href="products-cosmetics.html">Cosmetics</a>
          <a href="products-diapers.html">Diapers & Tissues</a>
          <a href="products-household.html">Household Items</a>
        </div>
      </li>
      <li><a href="about.html">About Us</a></li>
      <li><a href="contact.html">Contact</a></li>
      <li><a href="contact.html" class="nav-cta">Get in Touch</a></li>
    </ul>
  </nav>

  <section class="product-page-hero">
    <h1>{{NAME}}</h1>
    <p>Premium quality products sourced and distributed by Taj Middleeast.</p>
  </section>

  <div class="product-grid">
    {{PRODUCTS}}
  </div>

  <footer>
    <div class="footer-top">
      <div class="footer-brand">
        <strong>Taj Middleeast</strong>
        <em>Group of Companies</em>
      </div>
    </div>
  </footer>
  <script src="script.js"></script>
</body>
</html>`;

categories.forEach(cat => {
    const txtPath = path.join('taj_products', cat.dir, 'products.txt');
    let productNames = [];
    
    if (fs.existsSync(txtPath)) {
        productNames = fs.readFileSync(txtPath, 'utf8')
            .split('\n')
            .map(line => line.trim())
            .filter(line => line.length > 0);
    }

    // Fallback if txt is empty but images exist
    if (productNames.length === 0) {
        const dirPath = path.join('taj_products', cat.dir);
        if (fs.existsSync(dirPath)) {
            productNames = fs.readdirSync(dirPath)
                .filter(f => f.match(/\.(jpg|jpeg|png|webp)$/i))
                .map(f => path.parse(f).name);
        }
    }

    const productHtml = productNames.map(name => {
        // Since original images are broken HTML files, we use placeholders
        // but we keep the structure so the user can easily swap them later.
        return `
    <div class="product-item">
      <div class="product-img-box">
        <img src="${cat.placeholder}" alt="${name}" loading="lazy">
      </div>
      <div class="product-name">${name}</div>
    </div>`;
    }).join('');

    const pageContent = template
        .split('{{NAME}}').join(cat.name)
        .split('{{PRODUCTS}}').join(productHtml);

    fs.writeFileSync(`products-${cat.id}.html`, pageContent);
    console.log(`Created products-${cat.id}.html with placeholders`);
});
