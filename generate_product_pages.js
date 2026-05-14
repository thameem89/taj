const fs = require('fs');
const path = require('path');

const categories = [
    { id: 'foods', name: 'Foods & Beverages', dir: 'foods-and-beverages' },
    { id: 'cleaning', name: 'Cleaning Products', dir: 'cleaning' },
    { id: 'cosmetics', name: 'Cosmetics', dir: 'cosmetics' },
    { id: 'diapers', name: 'Diapers & Tissues', dir: 'diapers-and-tissues' },
    { id: 'household', name: 'Household Items', dir: 'household-items' }
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
      height: 200px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 15px;
      background: #fdfdfd;
      border-radius: 4px;
      padding: 10px;
    }
    .product-img-box img {
      max-width: 100%;
      max-height: 100%;
      object-fit: contain;
    }
    .product-name {
      font-weight: 600;
      color: var(--theme-text);
      font-size: 15px;
      line-height: 1.4;
      margin-top: auto;
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
    const dirPath = path.join('taj-products', cat.dir);
    if (!fs.existsSync(dirPath)) {
        console.log(`Directory ${dirPath} not found, skipping.`);
        return;
    }

    const files = fs.readdirSync(dirPath).filter(f => f.match(/\.(jpg|jpeg|png|webp)$/i));
    
    // Sort files to keep them somewhat organized
    files.sort();

    const productHtml = files.map(file => {
        const name = path.parse(file).name;
        // encodeURI to handle spaces in filenames
        const imgSrc = encodeURI(`taj-products/${cat.dir}/${file}`);
        return `
    <div class="product-item">
      <div class="product-img-box">
        <img src="${imgSrc}" alt="${name}" loading="lazy">
      </div>
      <div class="product-name">${name}</div>
    </div>`;
    }).join('');

    const pageContent = template
        .split('{{NAME}}').join(cat.name)
        .split('{{PRODUCTS}}').join(productHtml);

    fs.writeFileSync(`products-${cat.id}.html`, pageContent);
    console.log(`Created products-${cat.id}.html with real assets`);
});
