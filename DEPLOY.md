# راهنمای انتشار روی Cloudflare Pages

سایت کاملاً استاتیک است (HTML/CSS/JS بدون build) — پس تنظیمات خیلی ساده است.

---

## روش ۱ (پیشنهادی): اتصال مستقیم به GitHub

۱. اول تغییرات این پوشه را روی ریپوی گیت‌هاب push کن:

```bash
git add -A
git commit -m "Prepare for Cloudflare Pages: local images, clean URLs, headers, SEO"
git push origin main
```

۲. وارد شو به <https://dash.cloudflare.com> → از منوی چپ **Workers & Pages** → **Create** → تب **Pages** → **Connect to Git**.

۳. حساب گیت‌هاب را وصل کن و ریپوی `fatemeh-karimi-Portfolio` را انتخاب کن.

۴. تنظیمات build را دقیقاً این‌طور بگذار:

| فیلد | مقدار |
|---|---|
| Project name | `fatemeh-karimi` |
| Production branch | `main` |
| Framework preset | **None** |
| Build command | **خالی بگذار** |
| Build output directory | `/` |

۵. **Save and Deploy**. بعد از ~۳۰ ثانیه سایت روی آدرس زیر بالا می‌آید:
`https://fatemeh-karimi.pages.dev`

از این به بعد هر `git push` روی `main` خودکار دیپلوی می‌شود (و هر برنچ دیگر یک preview URL می‌گیرد).

---

## روش ۲: آپلود مستقیم با Wrangler (بدون گیت‌هاب)

```bash
npm install -g wrangler
wrangler login
wrangler pages deploy . --project-name=fatemeh-karimi
```

---

## دامنه اختصاصی (اختیاری)

در پروژه Pages → تب **Custom domains** → **Set up a domain** → مثلاً `fatemehkarimi.art`.
اگر دامنه داخل خود Cloudflare باشد، رکورد DNS خودکار ساخته می‌شود و SSL رایگان فعال می‌گردد.
اگر دامنه جای دیگری است، یک رکورد `CNAME` به `fatemeh-karimi.pages.dev` بساز.

> بعد از گرفتن دامنه اختصاصی، آدرس‌های داخل `sitemap.xml`، `robots.txt` و تگ‌های `og:url` / `canonical` در فایل‌های HTML را با دامنه جدید عوض کن.

---

## چیزهایی که برای Cloudflare آماده شد

| فایل / تغییر | کاربرد |
|---|---|
| عکس‌ها از `raw.githubusercontent.com` به مسیر لوکال `/images/...` منتقل شد | سرعت بیشتر، وابسته‌نبودن به گیت‌هاب، سرو شدن از CDN کلادفلر |
| `Restless Sunset.jpg` → `images/restless-sunset.jpg`، `man.jpg` → `images/portrait.jpg` | حذف فاصله از نام فایل (مشکل‌ساز در URL) |
| حذف کارت تکراری «Restless Sunset» | باگ ظاهری گالری |
| `_headers` | هدرهای امنیتی + کش یک‌ساله برای عکس‌ها |
| `_redirects` | ریدایرکت `about.html` → `/about` (URL تمیز) |
| `404.html` | صفحه ۴۰۴ هم‌استایل با سایت |
| `favicon.svg` | آیکون تب مرورگر |
| `robots.txt` + `sitemap.xml` | ایندکس شدن در گوگل |
| متا تگ‌های description/OpenGraph/Twitter | پیش‌نمایش درست موقع اشتراک لینک در اینستاگرام/تلگرام/واتساپ |
| `loading="lazy"` روی عکس‌ها | لود سریع‌تر صفحه |
| لینک‌های منو به `/`، `/about`، `/contact` | آدرس‌های تمیز |

---

## کارهایی که هنوز باقی مانده (محتوایی)

- ۸ اثر آخر گالری هنوز عکس **placeholder** از Unsplash هستند → در `script.js` لیست `works` را با عکس‌های واقعی فاطمه عوض کن (عکس را در `images/` بگذار و مسیر `/images/نام-فایل.jpg` بده).
- قیمت‌ها هنوز `[Price]` هستند.
- `images/portrait.jpg` عکس واقعی فاطمه نیست.
- متن بیوگرافی در `about.html` هنوز placeholder داخل `[ ]` است.
- لینک‌های اینستاگرام/تلگرام/واتساپ/لینکدین در `contact.html` خالی‌اند (`https://t.me/`, `https://wa.me/` ...).
