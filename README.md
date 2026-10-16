# Right to Arms LLC: website concepts

Three different designs with the same content, so the client can compare styles side by side. Each folder is a separate static site deployed as its own Cloudflare Worker on its own subdomain.

| Folder | Subdomain | Style | How services open |
| --- | --- | --- | --- |
| `site-1-classic/` | `1.yourdomain.com` | The mentor's layout, upgraded: tabbed menu, mission-style hero, "Choose your service" banner, photo cards with Book Now. | Each card opens its own class page (`/classes/...`) |
| `site-2-handmade/` | `2.yourdomain.com` | Handmade poster style from the logo: paper, brush lettering, taped photo prints toned black and orange. One page. | Services list styled as a receipt; tap a row to open its photo and details |
| `site-3-guided/` | `3.yourdomain.com` | Bright and modern, like a booking app, with full-color photos. One page. | "Where are you starting?" picker shows only the classes for that path (including VIP at home) |

All three are plain HTML and CSS with no build step and no dependencies. Site 3 uses a small script for the picker, and still works without it.

## Deploying to Cloudflare Workers

Repeat these steps for each of the three folders.

1. In the Cloudflare dashboard go to **Workers & Pages → Create → Import a repository** and pick this repo.
2. Set:
   - **Project name:** `right2arms-1` (or `-2`, `-3`). It must match `name` in that folder's `wrangler.jsonc`.
   - **Root directory:** `site-1-classic` (or `site-2-handmade`, `site-3-guided`)
   - **Build command:** leave empty
   - **Deploy command:** `npx wrangler deploy`
   - **Branch:** the branch these files are on, or merge them into `main` first.
3. Once it deploys, open the Worker, go to **Settings → Domains & Routes → Add → Custom domain**, and enter `1.yourdomain.com`. Cloudflare creates the DNS record for you.

Alternatively, deploy from your own machine with `cd site-1-classic && npx wrangler deploy`. To set the subdomain there instead of in the dashboard, uncomment the `routes` line in `wrangler.jsonc`.

To preview locally, run `cd site-1-classic && npx wrangler dev` and open http://localhost:8787.

## Hidden from search engines (for now)

While these are concepts, every page sends `noindex` (in `public/_headers` and a `<meta name="robots">` tag), and `robots.txt` blocks crawlers. When the client picks a design:

1. Delete the `X-Robots-Tag` line in `public/_headers`, the `<meta name="robots">` tags, and `public/robots.txt`.
2. Add the main domain (`yourdomain.com` and `www`) as custom domains on the chosen Worker.
3. Delete the other two Workers and remove their folders.

## Content

All copy comes from the client's texts: services, prices, the free extras with the CCW course, family and group rates, the slogan, the email, and the `@right2armsllc` handle. Short service descriptions were written to fill out the details and need the client's sign-off.

All three sites use free stock photos from Unsplash as stand-ins, a different set for each. They're listed in each folder's `PHOTO-CREDITS.md` and should be replaced with the client's own photos.

Booking is done by email for now. Every **Book** button opens an email with the class name already in the subject line. A scheduler (Calendly, Square Appointments) or Stripe payment links can be added later.

In `site-1-classic`, each price and description appears in up to three places: the home page card, `/classes/`, and the class's own page. Update all three when something changes.

### Added in the second round of feedback (all three sites)

- **Bigger company name** in the header.
- **Who's teaching:** the instructor and the RSO (range safety officer), each with a photo slot, name and short bio. Placeholders until the client sends details.
- **USCCA link:** a "USCCA certified instructor" button in the instructor's card, plus a footer link. It points to the USCCA home page for now. Search for `TODO: replace with the instructor's own USCCA link` and swap in the real profile link.
- **VIP in-home training:** any class, taught at the client's home, priced by quote. Site 1 has a home page section and its own page (`/classes/vip-in-home/`); site 2 has a receipt row and a section; site 3 has a fourth "Train me at home" choice in the picker.
- **Refund & rescheduling policy:** deposits and all other fees are non-refundable; the CCW/HGP Class can be rescheduled with 48 hours' notice and mini classes (every other class) with 24 hours'. Site 1 has a `/refund-policy/` page, a policy box on the home, Classes and Contact pages, and a one-line note in every booking box. Sites 2 and 3 have it near the booking section, and site 3's opens like the price list.

In site 1 the policy wording lives in several places: the home, Classes, Contact and Refund Policy pages, plus the note in each class page's booking box.

### Still needed from the client

- **Who's teaching:** names, photos, certifications and a short bio for the instructor and the RSO. Marked as a placeholder on every site.
- **USCCA link:** the instructor's own USCCA profile or instructor page URL.
- **VIP pricing:** a price or travel fee, or keep it as "quote on request". Also confirm that live fire still happens at the range for VIP clients (the sites say so).
- **Refund policy:** confirm that CCW Renewal counts as a "mini class" (24 hours' notice). Right now only the CCW/HGP Class needs 48 hours.
- **Location:** service area and which range is used.
- **Phone number:** should one be on the site?
- **HGP Only:** what does it include, and how is it different from the CCW/HGP Class?
- **Class details:** class lengths and how dates are scheduled.
- **Photos:** the client is sending their own photos to replace the stock ones, including the instructor and RSO.
- **Logo:** the original logo file. The current one was cut from a screenshot.
