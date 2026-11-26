"""Generate static /jp/<area>/ landing pages from templates/js/jp-locations.js.

Data only: nothing is scraped or invented. Pages exist for
  * every council area with 2+ listed locations (council name as shown in the data), and
  * every suburb with 2+ listed locations.
Output: build/jp/index.html (hub), build/jp/<slug>/index.html.
Called from deploy.py after the main build. Existing pages are not touched.
"""
import json
import re
from html import escape
from pathlib import Path

SITE = "https://jpfinder.com.au"
MIN_LOCATIONS = 2
ADSENSE_LOADER = (
    '<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js'
    '?client=ca-pub-6111084230980098" crossorigin="anonymous"></script>'
)
INTERNAL_NOTE = re.compile(r"needs? verification|asked that listings", re.I)
COUNCIL_ALIASES = {"City of Parramatta Council": "City of Parramatta"}
SKIP_COUNCILS = {"N/A", "", None}


def load_locations(js_path):
    text = Path(js_path).read_text(encoding="utf-8")
    return json.loads(text[text.index("["): text.rindex("]") + 1])


def slugify(s):
    return re.sub(r"[^a-z0-9]+", "-", s.lower()).strip("-")


def suburb_of(loc):
    """Suburb from the last address line ('Chatswood NSW 2067'). None if it is not a clean suburb name."""
    last = loc["address"].split("\n")[-1].strip()
    m = re.match(r"^([A-Za-z' .-]+?)\s+(NSW|ACT)\s+\d{4}$", last)
    if not m:
        return None
    sub = m.group(1).strip()
    if len(sub.split()) > 3 or "," in sub:
        return None
    return sub.title().replace("St ", "St ")


def display_name(loc):
    name = loc["name"].strip()
    if re.search(r"\b(NSW|ACT)\s+\d{4}$", name):
        return loc["address"].split("\n")[0].strip()
    return name


def hours_html(loc):
    rows = []
    for day, hrs in loc.get("hours", {}).items():
        rows.append("<tr><th scope=\"row\">%s</th><td>%s</td></tr>" % (escape(day), escape(hrs)))
    return '<table class="jp-hours"><tbody>%s</tbody></table>' % "".join(rows) if rows else ""


def card_html(loc):
    lines = [p.strip() for p in loc["address"].split("\n") if p.strip()]
    if len(lines) > 1 and lines[0].lower() == display_name(loc).lower():
        lines = lines[1:]
    addr = ", ".join(lines)
    parts = ['<article class="jp-card"><h3>%s</h3><p class="jp-addr">%s</p>' % (escape(display_name(loc)), escape(addr))]
    parts.append(hours_html(loc))
    if loc.get("notes") and not INTERNAL_NOTE.search(loc["notes"]):
        parts.append('<p class="jp-note">%s</p>' % escape(loc["notes"]))
    if loc.get("source_url"):
        parts.append('<p class="jp-src"><a href="%s" rel="noopener" target="_blank">Check the latest times on the official page</a></p>' % escape(loc["source_url"], quote=True))
    parts.append("</article>")
    return "".join(parts)


CSS = """
.jp-card{border:1px solid #e3e7e7;border-radius:10px;padding:1rem 1.1rem;margin:1rem 0;background:#fff}
.jp-card h3{margin:0 0 .25rem;font-size:1.1rem}
.jp-addr{margin:.1rem 0 .6rem;color:#444}
.jp-hours{border-collapse:collapse;width:100%;max-width:420px;font-size:.95rem}
.jp-hours th,.jp-hours td{text-align:left;padding:.25rem .5rem .25rem 0;border-bottom:1px solid #f0f2f2;vertical-align:top}
.jp-hours th{font-weight:600;width:7.5em}
.jp-note{margin:.6rem 0 0;font-size:.92rem;color:#444}
.jp-src{margin:.6rem 0 0;font-size:.9rem}
.jp-before li{margin:.35rem 0}
.jp-links{columns:2;column-gap:2rem;padding-left:1.1rem}
@media (max-width:480px){.jp-links{columns:1}.jp-hours th{width:6em}}
""".strip()

FOOTER = """<footer class="footer-container" style="margin-top: 3rem; padding: 2rem 0; background: #f9fafb;">
<div class="container footer-links" style="text-align: center; font-weight: 500; margin-bottom: 1rem;">
<a href="/" style="margin: 0 .8rem; color: #3e6b6b; text-decoration: none;">Home</a>
<a href="/jp/" style="margin: 0 .8rem; color: #3e6b6b; text-decoration: none;">JP by area</a>
<a href="/about.html" style="margin: 0 .8rem; color: #3e6b6b; text-decoration: none;">About</a>
<a href="/councils.html" style="margin: 0 .8rem; color: #3e6b6b; text-decoration: none;">Council Directory</a>
<a href="/jp-info.html" style="margin: 0 .8rem; color: #3e6b6b; text-decoration: none;">JP Information</a>
<a href="/privacy.html" style="margin: 0 .8rem; color: #3e6b6b; text-decoration: none;">Privacy Policy</a>
<a href="/contact.html" style="margin: 0 .8rem; color: #3e6b6b; text-decoration: none;">Contact</a>
</div>
<div class="container" style="text-align: center; color: #555; font-size: 0.875rem;">
<p>&copy; NSW JP Finder</p>
<p>This is an independent service and is not affiliated with the NSW Government.</p>
</div>
</footer>"""


def page(title, desc, path, h1, body, ads=True):
    url = SITE + path
    return """<!DOCTYPE html>
<html lang="en-AU">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>%(title)s</title>
<meta name="description" content="%(desc)s" />
<link rel="canonical" href="%(url)s" />
<meta property="og:title" content="%(title)s" />
<meta property="og:description" content="%(desc)s" />
<meta property="og:url" content="%(url)s" />
<meta property="og:type" content="website" />
<link rel="stylesheet" href="/css/style.css" />
<style>%(css)s</style>
%(ads)s
<script async src="https://www.googletagmanager.com/gtag/js?id=G-HJCWGPKCZ2"></script>
<script>
window.dataLayer = window.dataLayer || [];
function gtag(){window.dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-HJCWGPKCZ2');
</script>
</head>
<body>
<header class="header-container"><div class="container">
<h1>%(h1)s</h1>
<p class="subtitle tagline">Free Justice of the Peace services in New South Wales</p>
</div></header>
<main class="container" style="max-width:900px; margin:auto; padding: 1rem;">
%(body)s
</main>
%(footer)s
</body>
</html>
""" % dict(title=escape(title), desc=escape(desc, quote=True), url=url, css=CSS,
           ads=ADSENSE_LOADER if ads else "", h1=escape(h1), body=body, footer=FOOTER)


BEFORE_YOU_GO = """<h2>Before you go</h2>
<ul class="jp-before">
<li>JP witnessing at these desks is free. Take the original documents and photo ID.</li>
<li>Do not sign anything before you are with the JP.</li>
<li>JP desks run on set days and can change at short notice, so check the official page linked on each listing, or call ahead.</li>
</ul>"""


def crumbs(label):
    return ('<p class="breadcrumbs"><a href="/">Home</a> &rsaquo; <a href="/jp/">JP by area</a> &rsaquo; %s</p>' % escape(label))


def build_pages(locations):
    """Return list of dicts: slug, kind, label, title, desc, html, count."""
    by_council, by_suburb = {}, {}
    for loc in locations:
        c = COUNCIL_ALIASES.get(loc.get("council"), loc.get("council"))
        if c not in SKIP_COUNCILS:
            by_council.setdefault(c, []).append(loc)
        s = suburb_of(loc)
        if s:
            by_suburb.setdefault(s, []).append(loc)
    pages = []
    council_slugs = set()
    for c, locs in sorted(by_council.items()):
        if len(locs) < MIN_LOCATIONS:
            continue
        slug = slugify(c)
        council_slugs.add(slug)
        subs = sorted({s for s in (suburb_of(l) for l in locs) if s})
        n = len(locs)
        title = "JP Near Me in %s | JP Locations & Hours" % c
        desc = "%d Justice of the Peace service%s in %s%s. Addresses, days and hours from council and library pages. Free, check before you go." % (
            n, "" if n == 1 else "s", c, (" (" + ", ".join(subs[:3]) + ")") if subs else "")
        intro = "<p>%d JP service%s listed in the %s area%s Times come from the official council, library or centre pages and can change, so use the link on each listing to confirm before you travel.</p>" % (
            n, "" if n == 1 else "s", escape(c), (": " + escape(", ".join(subs)) + ".") if subs else ".")
        body = crumbs(c) + intro + "".join(card_html(l) for l in locs) + BEFORE_YOU_GO + \
            '<p><a href="/">Search all NSW JP locations near you</a> &middot; <a href="/jp-info.html">What a JP can do</a></p>'
        pages.append(dict(slug=slug, kind="council", label=c, title=title, desc=desc, count=n,
                          html=page(title, desc, "/jp/%s/" % slug, "JP near me in %s" % c, body)))
    council_sets = [frozenset(id(l) for l in v) for v in by_council.values() if len(v) >= MIN_LOCATIONS]
    for s, locs in sorted(by_suburb.items()):
        if len(locs) < MIN_LOCATIONS:
            continue
        if frozenset(id(l) for l in locs) in council_sets:
            continue  # identical to a council page, avoid duplicate content
        slug = slugify(s)
        if slug in council_slugs:
            slug += "-suburb"
        n = len(locs)
        title = "JP Near Me in %s | Justice of the Peace Locations & Hours" % s
        desc = "%d free Justice of the Peace service%s in %s, NSW. Addresses, days and hours from council and library pages. Check before you go." % (n, "" if n == 1 else "s", s)
        councils = sorted({COUNCIL_ALIASES.get(l.get("council"), l.get("council")) for l in locs} - SKIP_COUNCILS)
        intro = "<p>%d JP service%s listed in %s. Times come from the official pages and can change, so confirm with the link on each listing.</p>" % (n, "" if n == 1 else "s", escape(s))
        body = crumbs(s) + intro + "".join(card_html(l) for l in locs) + BEFORE_YOU_GO
        for c in councils:
            if slugify(c) in council_slugs:
                body += '<p>More in the area: <a href="/jp/%s/">%s</a></p>' % (slugify(c), escape(c))
        body += '<p><a href="/">Search all NSW JP locations near you</a></p>'
        pages.append(dict(slug=slug, kind="suburb", label=s, title=title, desc=desc, count=n,
                          html=page(title, desc, "/jp/%s/" % slug, "JP near me in %s" % s, body)))
    return pages


def write_pages(root_dir, build_dir, log=print):
    root_dir, build_dir = Path(root_dir), Path(build_dir)
    locations = load_locations(root_dir / "templates" / "js" / "jp-locations.js")
    pages = build_pages(locations)
    out = build_dir / "jp"
    out.mkdir(parents=True, exist_ok=True)
    seen = set()
    for p in pages:
        assert p["slug"] not in seen, "duplicate slug " + p["slug"]
        seen.add(p["slug"])
        d = out / p["slug"]
        d.mkdir(parents=True, exist_ok=True)
        (d / "index.html").write_text(p["html"], encoding="utf-8")
    councils = [p for p in pages if p["kind"] == "council"]
    suburbs = [p for p in pages if p["kind"] == "suburb"]
    def links(ps):
        return '<ul class="jp-links">%s</ul>' % "".join(
            '<li><a href="/jp/%s/">%s</a> (%d)</li>' % (p["slug"], escape(p["label"]), p["count"]) for p in ps)
    body = ('<p class="breadcrumbs"><a href="/">Home</a> &rsaquo; JP by area</p>'
            "<p>Free JP services across NSW, grouped by council area and suburb. Counts show listed locations.</p>"
            "<h2>By council area</h2>" + links(councils) + "<h2>By suburb</h2>" + links(suburbs) +
            '<p><a href="/">Search by your own address or postcode</a></p>')
    title = "JP Services in NSW by Council Area and Suburb | NSW JP Finder"
    desc = "Browse free Justice of the Peace services in NSW by council area and suburb, with addresses, days and hours."
    (out / "index.html").write_text(page(title, desc, "/jp/", "NSW JP services by area", body), encoding="utf-8")
    log("jp area pages: %d council, %d suburb, hub at /jp/ (from %d locations)" % (len(councils), len(suburbs), len(locations)))
    return pages


def sitemap_entries(root_dir):
    pages = build_pages(load_locations(Path(root_dir) / "templates" / "js" / "jp-locations.js"))
    return ["/jp/"] + ["/jp/%s/" % p["slug"] for p in pages]


if __name__ == "__main__":
    import sys
    pgs = build_pages(load_locations(sys.argv[1]))
    for p in pgs:
        print(p["kind"], p["slug"], p["count"], len(p["title"]), len(p["desc"]))
