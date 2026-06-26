import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import axios from "axios";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, "..", ".env") });

const API_URL = process.env.VITE_API_URL;
const FRONTEND_URL = process.env.FRONTEND_URL || "https://www.afzalhajjagency.com";

async function fetchAllPaginated(endpoint, dataKey) {
  let items = [];
  let page = 1;
  const limit = 100;
  let hasMore = true;

  while (hasMore) {
    try {
      const { data } = await axios.get(`${API_URL}${endpoint}`, {
        params: { page, limit },
      });
      const fetched = data[dataKey] || [];
      if (fetched.length > 0) {
        items = items.concat(fetched);
        page++;
        if (fetched.length < limit) hasMore = false;
      } else {
        hasMore = false;
      }
    } catch (error) {
      console.warn(`Warning: Could not fetch ${endpoint} page ${page}: ${error.message}`);
      hasMore = false;
    }
  }
  return items;
}

const generateRobotsTxt = () => {
  const robotsTxt = `User-agent: *
Allow: /
Disallow: /admin/
Disallow: /user/
Disallow: /checkout
Disallow: /thank-you/
Sitemap: ${FRONTEND_URL}/sitemap.xml
`;
  const publicDir = path.join(__dirname, "..", "public");
  fs.writeFileSync(path.join(publicDir, "robots.txt"), robotsTxt);
  console.log("robots.txt generated");
};

const generateSitemap = async () => {
  let products = [];
  let categories = [];
  let blogs = [];
  let packages = [];

  try {
    console.log("Fetching data from API...");

    const [productsRes, categoriesRes, blogsRes, packagesRes] = await Promise.all([
      axios.get(`${API_URL}/getAllProducts?isActive=true`),
      axios.get(`${API_URL}/category`),
      axios.get(`${API_URL}/activeblog`),
      axios.get(`${API_URL}/packages`),
    ]);

    products = productsRes.data?.products || [];
    categories = categoriesRes.data?.categories || [];
    blogs = blogsRes.data?.data || blogsRes.data || [];
    packages = Array.isArray(packagesRes.data) ? packagesRes.data : [];
  } catch (error) {
    console.warn(
      `Warning: Could not fetch from API (${error.message}). Generating sitemap with static pages only.`,
    );
  }

  console.log(
    `Found ${products.length} products, ${categories.length} categories, ${blogs.length} blogs, ${packages.length} packages`,
  );

  const today = new Date().toISOString().split("T")[0];

  const staticPages = [
    { loc: "/", changefreq: "daily", priority: 1.0 },
    { loc: "/shop", changefreq: "daily", priority: 0.9 },
    { loc: "/services", changefreq: "monthly", priority: 0.7 },
    { loc: "/contact-us", changefreq: "monthly", priority: 0.7 },
    { loc: "/about-us", changefreq: "monthly", priority: 0.7 },
    { loc: "/faqs", changefreq: "monthly", priority: 0.6 },
    { loc: "/track-order", changefreq: "monthly", priority: 0.5 },
    { loc: "/login", changefreq: "monthly", priority: 0.3 },
    { loc: "/register", changefreq: "monthly", priority: 0.3 },
    { loc: "/blog", changefreq: "weekly", priority: 0.7 },
    { loc: "/terms-and-conditions", changefreq: "monthly", priority: 0.5 },
    { loc: "/privacy-policy", changefreq: "monthly", priority: 0.5 },
    { loc: "/refundpolicy", changefreq: "monthly", priority: 0.5 },
    { loc: "/shippinpolicy", changefreq: "monthly", priority: 0.5 },
    { loc: "/image-gallery", changefreq: "weekly", priority: 0.6 },
    { loc: "/video-gallery", changefreq: "weekly", priority: 0.6 },
    { loc: "/packages", changefreq: "weekly", priority: 0.8 },
  ];

  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`;

  staticPages.forEach((page) => {
    sitemap += `  <url>
    <loc>${FRONTEND_URL}${page.loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>
`;
  });

  categories.forEach((cat) => {
    if (cat.isActive !== false) {
      sitemap += `  <url>
    <loc>${FRONTEND_URL}/shop?category=${encodeURIComponent(cat.name)}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
`;
    }
  });

  products.forEach((product) => {
    if (product.isActive !== false) {
      const updatedAt = product.updatedAt
        ? new Date(product.updatedAt).toISOString().split("T")[0]
        : today;
      sitemap += `  <url>
    <loc>${FRONTEND_URL}/product/${product.slug}</loc>
    <lastmod>${updatedAt}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
`;
    }
  });

  blogs.forEach((blog) => {
    if (blog.isActive !== false) {
      const updatedAt = blog.updatedAt
        ? new Date(blog.updatedAt).toISOString().split("T")[0]
        : today;
      sitemap += `  <url>
    <loc>${FRONTEND_URL}/blogs/${blog.slug}</loc>
    <lastmod>${updatedAt}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
`;
    }
  });

  packages.forEach((pkg) => {
    if (pkg.isActive !== false && pkg.slug) {
      const updatedAt = pkg.updatedAt
        ? new Date(pkg.updatedAt).toISOString().split("T")[0]
        : today;
      sitemap += `  <url>
    <loc>${FRONTEND_URL}/package/${pkg.slug}</loc>
    <lastmod>${updatedAt}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
`;
    }
  });

  sitemap += `</urlset>`;

  const publicDir = path.join(__dirname, "..", "public");
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  fs.writeFileSync(path.join(publicDir, "sitemap.xml"), sitemap);
  console.log(`Sitemap generated at public/sitemap.xml`);
  console.log(
    `Total URLs: ${staticPages.length + categories.length + products.length + blogs.length + packages.length}`,
  );
};

generateRobotsTxt();
generateSitemap();
