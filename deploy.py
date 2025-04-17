import os
import json
import shutil
import argparse
import datetime
import re
import logging
from pathlib import Path

# Setup logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler("deploy.log"),
        logging.StreamHandler()
    ]
)
logger = logging.getLogger("JPFinderDeploy")


class JPFinderDeployer:
    def __init__(self, base_domain="jpfinder.com.au"):
        self.base_domain = base_domain
        self.build_dir = Path("build")
        self.data_dir = Path("data")
        self.template_file = Path("templates") / "index.html"
        self.script_dir = Path(os.path.dirname(os.path.abspath(__file__)))

        # Create additional SEO-focused pages
        self.additional_pages = [
            {"filename": "about.html", "title": "About NSW JP Finder | Justice of the Peace Services"},
            {"filename": "councils.html", "title": "NSW Councils with JP Services | Complete Directory"},
            {"filename": "jp-info.html", "title": "Justice of the Peace Information | Services & Requirements"},
            {"filename": "privacy.html", "title": "Privacy Policy | NSW JP Finder"},
            {"filename": "contact.html", "title": "Contact Us | NSW JP Finder"}
        ]

    def run_scraper(self):
        """Run the JP service scraper"""
        logger.info("Running JP service scraper...")
        try:
            from JPScraper import JPScraper
            scraper = JPScraper()
            scraper.scrape_all_councils()
            scraper.save_data()
            logger.info("Scraping completed successfully!")
            return True
        except Exception as e:
            logger.error(f"Error running scraper: {str(e)}")
            return False

    def prepare_build_directory(self):
        """Create or clean the build directory"""
        if self.build_dir.exists():
            logger.info(f"Cleaning build directory: {self.build_dir}")
            shutil.rmtree(self.build_dir)

        logger.info(f"Creating build directory: {self.build_dir}")
        self.build_dir.mkdir(parents=True)

        # Create directories for CSS and JS
        (self.build_dir / "css").mkdir()
        (self.build_dir / "js").mkdir()
        (self.build_dir / "images").mkdir()

    def create_robots_txt(self):
        """Create a robots.txt file for SEO"""
        robots_content = f"""User-agent: *
Allow: /

Sitemap: https://www.{self.base_domain}/sitemap.xml
"""
        with open(self.build_dir / "robots.txt", "w") as f:
            f.write(robots_content)

        logger.info("Created robots.txt")

    def load_jp_data(self):
        """Load JP location data from JSON file"""
        try:
            jp_locations_file = self.data_dir / "jp_locations_out.json"
            if not jp_locations_file.exists():
                logger.error(f"JP locations data file not found: {jp_locations_file}")
                return None

            with open(jp_locations_file, "r") as f:
                jp_data = json.load(f)

            logger.info(f"Loaded {len(jp_data)} JP locations from {jp_locations_file}")
            return jp_data
        except Exception as e:
            logger.error(f"Error loading JP data: {str(e)}")
            return None

    def load_template(self):
        """Load HTML template file"""
        try:
            if not self.template_file.exists():
                logger.error(f"Template file not found: {self.template_file}")
                return None

            with open(self.template_file, "r", encoding="utf-8") as f:
                template = f.read()

            logger.info(f"Loaded template from {self.template_file}")
            return template
        except Exception as e:
            logger.error(f"Error loading template: {str(e)}")
            return None

    def update_html_with_data(self, template, jp_data):
        """Update HTML template with JP data"""
        if not template or not jp_data:
            return None

        # Convert JP data to JavaScript
        jp_data_js = json.dumps(jp_data, indent=2)

        # Replace placeholder in template with actual data
        pattern = re.compile(r"const jpLocations = \[([\s\S]*?)\];", re.DOTALL)

        def repl(match):
            return f"const jpLocations = {jp_data_js};"

        html_with_data = re.sub(pattern, repl, template)

        # Update last updated date
        today = datetime.datetime.now().strftime("%B %d, %Y")
        html_with_data = html_with_data.replace('<span id="lastUpdated">April 12, 2025</span>',
                                                f'<span id="lastUpdated">{today}</span>')

        # Replace placeholder domain with actual domain
        html_with_data = html_with_data.replace("jpfinder.com.au", self.base_domain)

        # Add Netlify form handling if not present
        if '<form name="jp-submission"' not in html_with_data and '<form data-netlify="true"' not in html_with_data:
            # Add a placeholder for the form that can be updated later
            form_html = """
            <div class="feedback-section">
                <h3>Submit a JP Location</h3>
                <form name="jp-submission" method="POST" data-netlify="true">
                    <div class="form-group">
                        <label for="jp-name">JP Name</label>
                        <input type="text" id="jp-name" name="jp-name" required>
                    </div>
                    <div class="form-group">
                        <label for="jp-location">Location</label>
                        <input type="text" id="jp-location" name="jp-location" required>
                    </div>
                    <div class="form-group">
                        <label for="jp-details">Additional Details</label>
                        <textarea id="jp-details" name="jp-details"></textarea>
                    </div>
                    <button type="submit">Submit</button>
                </form>
            </div>
            """

            # Insert before the closing main tag
            html_with_data = html_with_data.replace('</main>', f'{form_html}</main>')

        logger.info("Updated HTML template with JP data")
        return html_with_data

    def create_additional_pages(self):
        """Create additional pages for SEO purposes"""
        for page in self.additional_pages:
            filename = page["filename"]
            title = page["title"]

            # Create a simple page template
            content = f"""<!DOCTYPE html>
<html lang="en-AU">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{title}</title>
    <meta name="description" content="{title} - Find JP services across New South Wales">
    <link rel="stylesheet" href="/css/style.css">
    <!-- SEO tags would go here -->
</head>
<body>
    <header>
        <div class="container">
            <h1>NSW Justice of the Peace Finder</h1>
            <p class="tagline">Find free JP services near you in New South Wales</p>
        </div>
    </header>

    <main class="container">
        <div class="breadcrumbs">
            <a href="/">Home</a> <span class="separator">›</span> <span>{title.split('|')[0].strip()}</span>
        </div>

        <section class="info-section">
            <h2>{title.split('|')[0].strip()}</h2>
            <p>This page is under construction. Please check back soon for more information.</p>

            <p>In the meantime, you can <a href="/">search for JP services</a> on our home page.</p>
        </section>
    </main>

    <footer>
        <div class="container">
            <div class="footer-links">
                <a href="/">Home</a>
                <a href="/about.html">About</a>
                <a href="/councils.html">Council Directory</a>
                <a href="/jp-info.html">JP Information</a>
                <a href="/privacy.html">Privacy Policy</a>
                <a href="/contact.html">Contact</a>
            </div>
            <p>&copy; <script>document.write(new Date().getFullYear())</script> NSW JP Finder</p>
            <p>This is an unofficial service and is not affiliated with the NSW Government.</p>
        </div>
    </footer>
</body>
</html>
"""
            with open(self.build_dir / filename, "w", encoding="utf-8") as f:
                f.write(content)

            logger.info(f"Created additional page: {filename}")

    def extract_and_create_css(self, html_content):
        """Extract CSS from HTML and save as separate file"""
        css_pattern = r"<style>([\s\S]*?)</style>"
        css_match = re.search(css_pattern, html_content)

        if css_match:
            css_content = css_match.group(1)

            # Write CSS to file
            with open(self.build_dir / "css" / "style.css", "w", encoding="utf-8") as f:
                f.write(css_content)

            # Replace inline CSS with link to CSS file
            html_content = re.sub(
                r"<style>[\s\S]*?</style>",
                '<link rel="stylesheet" href="/css/style.css">',
                html_content
            )

            logger.info("Extracted CSS to separate file")

        return html_content

    def extract_and_create_js(self, html_content):
        """Extract JavaScript from HTML and save as separate file"""
        js_pattern = r"<script>([\s\S]*?)</script>"
        js_matches = re.finditer(js_pattern, html_content)

        main_js = []

        for i, match in enumerate(js_matches):
            # Skip any script tags with src attribute or type="application/ld+json"
            if 'src=' in match.group(0) or 'application/ld+json' in match.group(0):
                continue

            js_content = match.group(1)
            main_js.append(js_content)

        if main_js:
            # Write JS to file
            with open(self.build_dir / "js" / "main.js", "w", encoding="utf-8") as f:
                f.write("\n\n".join(main_js))

            # Replace inline JS with link to JS file
            # Keep schema.org and other special scripts
            modified_html = re.sub(
                r"<script>(?!.*?application/ld\+json)[\s\S]*?</script>",
                "",
                html_content
            )

            # Add script tag at the end of body
            modified_html = modified_html.replace(
                "</body>",
                '<script src="/js/main.js"></script>\n</body>'
            )

            logger.info("Extracted JavaScript to separate file")
            return modified_html

        return html_content

    def create_404_page(self):
        """Create a custom 404 error page"""
        content = """<!DOCTYPE html>
<html lang="en-AU">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Page Not Found | NSW JP Finder</title>
    <meta name="robots" content="noindex,follow">
    <link rel="stylesheet" href="/css/style.css">
</head>
<body>
    <header>
        <div class="container">
            <h1>NSW Justice of the Peace Finder</h1>
        </div>
    </header>

    <main class="container">
        <section class="info-section">
            <h2>Page Not Found</h2>
            <p>Sorry, the page you're looking for doesn't exist.</p>
            <p>Please return to our <a href="/">homepage</a> to search for JP services.</p>
        </section>
    </main>

    <footer>
        <div class="container">
            <div class="footer-links">
                <a href="/">Home</a>
                <a href="/about.html">About</a>
                <a href="/councils.html">Council Directory</a>
                <a href="/jp-info.html">JP Information</a>
                <a href="/privacy.html">Privacy Policy</a>
                <a href="/contact.html">Contact</a>
            </div>
            <p>&copy; <script>document.write(new Date().getFullYear())</script> NSW JP Finder</p>
        </div>
    </footer>
</body>
</html>
"""
        with open(self.build_dir / "404.html", "w", encoding="utf-8") as f:
            f.write(content)

        logger.info("Created 404 error page")

    def copy_sitemap(self):
        """Copy sitemap.xml from data directory to build directory"""
        sitemap_file = self.data_dir / "sitemap.xml"
        if sitemap_file.exists():
            shutil.copy(sitemap_file, self.build_dir / "sitemap.xml")
            logger.info("Copied sitemap.xml to build directory")
        else:
            logger.warning("Sitemap file not found in data directory")
            self.generate_sitemap()

    def generate_sitemap(self):
        """Generate a basic sitemap if one doesn't exist"""
        today = datetime.datetime.now().strftime("%Y-%m-%d")
        sitemap_content = f"""<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://www.{self.base_domain}/</loc>
    <lastmod>{today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
"""

        # Add additional pages to sitemap
        for page in self.additional_pages:
            sitemap_content += f"""  <url>
    <loc>https://www.{self.base_domain}/{page['filename']}</loc>
    <lastmod>{today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
"""

        sitemap_content += "</urlset>"

        with open(self.build_dir / "sitemap.xml", "w", encoding="utf-8") as f:
            f.write(sitemap_content)

        logger.info("Generated sitemap.xml")

    def create_netlify_config(self):
        """Create netlify.toml configuration file"""
        netlify_config = """[build]
  publish = "build/"
  command = "python deploy.py --build-only"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
  conditions = {Response = {404}}

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "SAMEORIGIN"
    X-XSS-Protection = "1; mode=block"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"
"""

        # Write to root directory, not build
        with open("netlify.toml", "w", encoding="utf-8") as f:
            f.write(netlify_config)

        logger.info("Created netlify.toml configuration file")

    def build_website(self):
        """Build the JP finder website"""
        logger.info("Building JP Finder website...")

        # Prepare build directory
        self.prepare_build_directory()

        # Load template and data
        template = self.load_template()
        print(f'template is {template}')
        jp_data = self.load_jp_data()

        if not template or not jp_data:
            logger.error("Failed to build website: missing template or data")
            return False

        # Update HTML with data
        html_with_data = self.update_html_with_data(template, jp_data)

        # Extract CSS and JS
        html_with_data = self.extract_and_create_css(html_with_data)
        html_with_data = self.extract_and_create_js(html_with_data)

        # Write the main HTML file
        with open(self.build_dir / "index.html", "w", encoding="utf-8") as f:
            f.write(html_with_data)

        # Create additional files
        self.create_robots_txt()
        self.create_additional_pages()
        self.create_404_page()
        self.copy_sitemap()

        # Create Netlify configuration
        self.create_netlify_config()

        logger.info("Website built successfully!")
        return True


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Deploy JP Finder Website")
    parser.add_argument("--build-only", action="store_true", help="Only build without scraping")
    parser.add_argument("--domain", type=str, default="jpfinder.com.au", help="Base domain for the website")
    args = parser.parse_args()

    deployer = JPFinderDeployer(base_domain=args.domain)

    if not args.build_only:
        # Run scraper to get fresh data
        deployer.run_scraper()

    # Build the website
    deployer.build_website()