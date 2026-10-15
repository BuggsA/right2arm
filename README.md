# Right to Arms LLC: website concepts

Three different designs with the same content, so the client can compare styles side by side. Each folder is a separate static site deployed as its own Cloudflare Worker on its own subdomain.

| Folder | Subdomain | Style | How services open |
| --- | --- | --- | --- |
| `site-1-classic/` | `1.yourdomain.com` | The mentor's layout, upgraded: tabbed menu, mission-style hero, "Choose your service" banner, photo cards with Book Now. | Each card opens its own class page (`/classes/...`) |
| `site-2-handmade/` | `2.yourdomain.com` | Handmade poster style from the logo: paper, brush lettering, taped photo prints toned black and orange. One page. | Services list styled as a receipt; tap a row to open its photo and details |
| `site-3-guided/` | `3.yourdomain.com` | Bright and modern, like a booking app. One page. | "Where are you starting?" picker shows only the classes for that path |

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

Sites 1 and 2 use free stock photos from Unsplash as stand-ins, a different set for each. They're listed in each folder's `PHOTO-CREDITS.md` and should be replaced with the client's own photos.

Booking is done by email for now. Every **Book** button opens an email with the class name already in the subject line. A scheduler (Calendly, Square Appointments) or Stripe payment links can be added later.

In `site-1-classic`, each price and description appears in up to three places: the home page card, `/classes/`, and the class's own page. Update all three when something changes.

### Still needed from the client

- **About section:** instructor name, photo, certifications and a short bio. It's marked as a placeholder on every site.
- **Location:** service area and which range is used.
- **Phone number:** should one be on the site?
- **HGP Only:** what does it include, and how is it different from the CCW/HGP Class?
- **Class details:** class lengths and how dates are scheduled.
- **Photos:** class and range photos, including the instructor. These would replace the stock photos on sites 1 and 2.
- **Logo:** the original logo file. The current one was cut from a screenshot.
