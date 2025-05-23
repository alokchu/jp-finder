import os
import json
import shutil
import argparse
import datetime
import re
import logging
import time
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
        self.root_dir = Path(__file__).parent
        self.templates_dir = self.root_dir / "templates"
        self.build_dir = self.root_dir / "build"
        self.data_dir = self.root_dir / "data"
        self.template_file = self.templates_dir / "index.html"
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

        # Create necessary directories
        (self.build_dir / "css").mkdir()
        (self.build_dir / "js").mkdir()
        (self.build_dir / "images").mkdir()
        (self.build_dir / "data").mkdir(parents=True, exist_ok=True)

        # Copy Google Search Console verification file if it exists
        gsc_file = self.templates_dir / "google-site-verification.html"
        if gsc_file.exists():
            shutil.copy2(gsc_file, self.build_dir)
            logger.info("Copied Google Search Console verification file")

        # Copy static files
        self.copy_static_files()

    def copy_static_files(self):
        """Copy static files to build directory"""
        # Create data directory if it doesn't exist
        data_dir = self.build_dir / "data"
        data_dir.mkdir(exist_ok=True)
        
        # Copy favicon if it exists
        favicon_src = self.templates_dir / "favicon.ico"
        if favicon_src.exists():
            shutil.copy2(favicon_src, self.build_dir / "favicon.ico")
            logger.info("Copied favicon.ico")
        else:
            logger.warning("favicon.ico not found in templates directory")
        
        # Copy JS files
        js_src = self.templates_dir / "js" / "main.js"
        js_dest = self.build_dir / "js" / "main.js"
        shutil.copy2(js_src, js_dest)

        # Copy CSS files
        css_src = self.templates_dir / "css" / "style.css"
        if css_src.exists():
            css_dest = self.build_dir / "css" / "style.css"
            shutil.copy2(css_src, css_dest)

        # Copy suburbs.json with logging
        suburbs_src = self.data_dir / "suburbs.json"
        if suburbs_src.exists():
            suburbs_dest = data_dir / "suburbs.json"
            logger.info(f"Copying suburbs.json from {suburbs_src} to {suburbs_dest}")
            shutil.copy2(suburbs_src, suburbs_dest)
            logger.info(f"Successfully copied suburbs.json. File size: {os.path.getsize(suburbs_dest)} bytes")
        else:
            logger.error(f"suburbs.json not found at {suburbs_src}")

        # Copy and process index.html
        self.process_html_file()

    def process_html_file(self):
        """Process and copy index.html with cache busting"""
        with open(self.template_file, "r", encoding="utf-8") as f:
            html_content = f.read()

        # Add cache busting to CSS and JS files
        timestamp = int(time.time())
        html_content = html_content.replace('href="/css/style.css"', f'href="/css/style.css?v={timestamp}"')
        html_content = html_content.replace('src="js/main.js"', f'src="js/main.js?v={timestamp}"')

        with open(self.build_dir / "index.html", "w", encoding="utf-8") as f:
            f.write(html_content)

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

        # Add timestamp for cache busting
        timestamp = int(datetime.datetime.now().timestamp())

        # Convert JP data to JavaScript
        jp_data_js = json.dumps(jp_data, indent=2)

        # Replace placeholder in template with actual data
        pattern = re.compile(r"const jpLocations = \[([\s\S]*?)\];", re.DOTALL)

        def repl(match):
            return f"const jpLocations = {jp_data_js};"

        html_with_data = re.sub(pattern, repl, template)

        # Update last updated date
        today = datetime.datetime.now().strftime("%B %d, %Y")
        html_with_data = html_with_data.replace(
            '<span id="lastUpdated">April 12, 2025</span>',
            f'<span id="lastUpdated">{today}</span>'
        )

        # Add cache busting to JavaScript file
        html_with_data = html_with_data.replace(
            '<script src="/js/main.js"></script>',
            f'<script src="/js/main.js?v={timestamp}"></script>'
        )

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
    <!-- Google Analytics -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-1MEP8KQ1D9"></script>
    <script>
        window.dataLayer = window.dataLayer || [];
        function gtag(){{dataLayer.push(arguments);}}
        gtag('js', new Date());
        gtag('config', 'G-1MEP8KQ1D9');
    </script>

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
        
        # Add timestamp for cache busting
        timestamp = int(datetime.datetime.now().timestamp())

        if css_match:
            css_content = css_match.group(1)

            # Write CSS to file
            with open(self.build_dir / "css" / "style.css", "w", encoding="utf-8") as f:
                f.write(css_content)

            # Replace inline CSS with link to CSS file (with cache busting)
            html_content = re.sub(
                r"<style>[\s\S]*?</style>",
                f'<link rel="stylesheet" href="/css/style.css?v={timestamp}">',
                html_content
            )

            logger.info("Extracted CSS to separate file with cache busting")

        return html_content

    def extract_and_create_js(self, html_content):
        """Extract safe inline JavaScript from HTML and save as separate file, preserving critical scripts"""
        timestamp = int(datetime.datetime.now().timestamp())
        js_pattern = r"<script\b(?![^>]*\bsrc=)[^>]*>([\s\S]*?)</script>"

        matches = list(re.finditer(js_pattern, html_content, re.IGNORECASE))

        extracted_scripts = []
        
        # Define patterns to skip (critical inline scripts)
        skip_keywords = ['gtag(', 'googletagmanager', 'dataLayer.push', 'type="application/ld+json"']

        for match in matches:
            script_tag = match.group(0)
            js_content = match.group(1).strip()

            # Skip script tags with specific keywords or structured data
            if any(kw in script_tag.lower() or kw in js_content for kw in skip_keywords):
                continue

            if js_content:
                extracted_scripts.append((script_tag, js_content))

        # Write to JS file if any scripts found
        if extracted_scripts:
            js_code = "\n\n".join(js for _, js in extracted_scripts)
            js_path = self.build_dir / "js" / "main.js"
            js_path.parent.mkdir(parents=True, exist_ok=True)

            with open(js_path, "w", encoding="utf-8") as f:
                f.write(js_code)

            # Remove only the matched inline <script> tags
            modified_html = html_content
            for script_tag, _ in extracted_scripts:
                modified_html = modified_html.replace(script_tag, '')

            # Add <script src="..."> before </body>
            modified_html = modified_html.replace(
                "</body>",
                f'<script src="/js/main.js?v={timestamp}"></script>\n</body>'
            )

            logger.info("Successfully extracted and replaced inline JS.")
            return modified_html

        return html_content

    def create_404_page(self):
        """Create a custom 404 page"""
        content = """<!DOCTYPE html>
<html lang="en-AU">
<head>
    <!-- Google Analytics -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-1MEP8KQ1D9"></script>
    <script>
        window.dataLayer = window.dataLayer || [];
        function gtag(){{dataLayer.push(arguments);}}
        gtag('js', new Date());
        gtag('config', 'G-1MEP8KQ1D9');
    </script>

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

    # In deploy.py, make sure we're copying both JS files
    shutil.copy('templates/js/main.js', 'build/js/main.js')
    shutil.copy('templates/js/jp-locations.js', 'build/js/jp-locations.js')