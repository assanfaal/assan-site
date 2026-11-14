import fs from "fs";
import path from "path";
import matter from "gray-matter";

const ARTICLES_DIR = path.join(process.cwd(), "content", "articles");

function ensureDir() {
  try {
    if (!fs.existsSync(ARTICLES_DIR)) {
      fs.mkdirSync(ARTICLES_DIR, { recursive: true });
    }
  } catch (error) {
    // Directory creation can fail in read-only environments. Ignore.
  }
}

function normaliseDate(value) {
  if (!value) return "";
  if (value instanceof Date) {
    return value.toISOString().slice(0, 10);
  }
  return String(value);
}

function readFile(fileName) {
  const slug = fileName.replace(/\.md$/, "");
  const fullPath = path.join(ARTICLES_DIR, fileName);
  const raw = fs.readFileSync(fullPath, "utf8");
  const parsed = matter(raw);

  return {
    slug,
    content: parsed.content,
    title: typeof parsed.data.title === "string" ? parsed.data.title : slug,
    date: normaliseDate(parsed.data.date),
    summary:
      typeof parsed.data.summary === "string" ? parsed.data.summary : "",
    tags: Array.isArray(parsed.data.tags) ? parsed.data.tags : [],
  };
}

export function getAllArticles() {
  ensureDir();
  try {
    const files = fs
      .readdirSync(ARTICLES_DIR)
      .filter((file) => file.endsWith(".md"));
    const articles = files.map(readFile);
    return articles.sort((a, b) => {
      if (a.date === b.date) return a.title.localeCompare(b.title);
      return a.date < b.date ? 1 : -1;
    });
  } catch (error) {
    return [];
  }
}

export function getArticleSlugs() {
  return getAllArticles().map((article) => article.slug);
}

export function getArticleBySlug(slug) {
  if (typeof slug !== "string" || slug.length === 0) return null;
  if (slug.includes("/") || slug.includes("\\") || slug.includes("..")) {
    return null;
  }
  const fullPath = path.join(ARTICLES_DIR, `${slug}.md`);
  if (!fs.existsSync(fullPath)) return null;
  try {
    return readFile(`${slug}.md`);
  } catch (error) {
    return null;
  }
}

export function getAdjacentArticles(slug) {
  const all = getAllArticles();
  const index = all.findIndex((article) => article.slug === slug);
  if (index === -1) return { previous: null, next: null };

  const newer = index > 0 ? all[index - 1] : null;
  const older = index < all.length - 1 ? all[index + 1] : null;

  return { previous: older, next: newer };
}

export function formatArticleDate(value) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}