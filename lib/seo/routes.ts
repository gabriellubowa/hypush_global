/** Canonical indexable routes for sitemap + SEO helpers. */
export const SITE_ROUTES: ReadonlyArray<{
  path: string;
  changefreq: "weekly" | "monthly" | "yearly";
  priority: number;
  title: string;
}> = [
  { path: "/", changefreq: "weekly", priority: 1.0, title: "Home" },
  { path: "/services", changefreq: "monthly", priority: 0.9, title: "Services" },
  { path: "/quote", changefreq: "monthly", priority: 0.9, title: "Get a Quote" },
  { path: "/talents", changefreq: "weekly", priority: 0.85, title: "Talents" },
  { path: "/case-study", changefreq: "weekly", priority: 0.8, title: "Case Study" },
  { path: "/about", changefreq: "monthly", priority: 0.8, title: "About" },
  { path: "/contact", changefreq: "monthly", priority: 0.75, title: "Contact" },
  { path: "/faq", changefreq: "monthly", priority: 0.7, title: "FAQ" },
  { path: "/privacy", changefreq: "yearly", priority: 0.3, title: "Privacy Policy" },
  { path: "/terms", changefreq: "yearly", priority: 0.3, title: "Terms of Service" },
];
