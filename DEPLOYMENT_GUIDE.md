# Deployment & Monetization Guide

## 📦 DEPLOYMENT (Free)

### Option 1: Vercel (RECOMMENDED)
1. **Push to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/YOUR_USERNAME/resume-builder.git
   git push -u origin main
   ```

2. **Deploy to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New" → "Project"
   - Import your GitHub repo
   - Click "Deploy"
   - ✅ Your app is live!

3. **Custom Domain** (optional):
   - In Vercel dashboard → Settings → Domains
   - Add your domain (or buy one for ~$10-15/year)

---

### Option 2: Netlify
- Connect GitHub repo at [netlify.com](https://netlify.com)
- Same process, equally free

---

### Option 3: Render
- [render.com](https://render.com) (good if you add backend later)

---

## 💰 MONETIZATION

### 1. Google AdSense (EASIEST)

**Step 1: Verify Domain**
- Deploy first (get your Vercel domain)
- Go to [google.com/adsense](https://www.google.com/adsense)
- Sign up and add your domain
- Verification takes 24-48 hours

**Step 2: Get Your Client ID**
- After approval, go to AdSense → Settings → Account
- Find your Publisher ID (looks like `ca-pub-1234567890`)

**Step 3: Update Code**
In `index.html`, replace:
```html
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX" crossorigin="anonymous"></script>
```

In `src/components/AdUnit.tsx`, replace:
```tsx
data-ad-client="ca-pub-YOUR-CLIENT-ID-HERE"
```

**Expected Revenue**: $100-500/month (if you get ~10k-50k users)

---

### 2. Premium Features (FUTURE)

Add a freemium model:
- **Free**: 1 resume template, PDF export
- **Premium** ($2.99/month): 5+ templates, ATS-optimized, export as DOCX

Use Stripe or Gumroad for payments.

---

### 3. Affiliate Marketing

Add commission links:
- LinkedIn Premium
- Grammarly
- Resume review services
- Job boards

---

## 🔍 SEO OPTIMIZATION (DONE!)

### ✅ What I Added:
- Canonical tags
- Structured data (JSON-LD schema)
- Enhanced meta descriptions
- Open Graph tags
- Google Analytics placeholder

### 📝 Next Steps:

1. **Create sitemap.xml** in public folder:
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://yourdomain.com/</loc>
    <lastmod>2024-01-01</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
```

2. **Create robots.txt** in public folder:
```
User-agent: *
Allow: /
Sitemap: https://yourdomain.com/sitemap.xml
```

3. **Add to Google Search Console**:
   - [google.com/webmasters](https://search.google.com/search-console)
   - Add your domain
   - Upload sitemap

4. **Add Google Analytics**:
   - Get tracking ID from [analytics.google.com](https://analytics.google.com)
   - Replace `G-XXXXXXXXXX` in `index.html`

5. **Create blog posts** (future):
   - "How to Format Your Resume"
   - "Best Resume Keywords"
   - Drives organic traffic

---

## 🚀 QUICK CHECKLIST

- [ ] Push to GitHub
- [ ] Deploy to Vercel
- [ ] Test on live domain
- [ ] Apply for Google AdSense
- [ ] Wait for AdSense approval (24-48h)
- [ ] Add your Client ID to code
- [ ] Add to Google Search Console
- [ ] Add to Google Analytics
- [ ] Monitor traffic and earnings

---

## 📊 EXPECTED EARNINGS

| Users/Month | CPM | Expected/Month |
|-----------|-----|-----------------|
| 1,000     | $1-3 | $1-3 |
| 10,000    | $1-3 | $10-30 |
| 50,000    | $2-5 | $100-250 |
| 100,000   | $2-5 | $200-500 |

**Note**: AdSense CPM varies by country and traffic quality.

---

## 💡 MARKETING TIPS

1. **Reddit**: r/jobs, r/resumes - Share your tool
2. **ProductHunt**: Launch on [producthunt.com](https://producthunt.com)
3. **Twitter/X**: Thread about building a resume
4. **LinkedIn**: Post resume tips with link
5. **HackerNews**: Post on [news.ycombinator.com](https://news.ycombinator.com)
6. **SEO**: Blog posts targeting "free resume builder" keywords

---

Good luck! 🚀
