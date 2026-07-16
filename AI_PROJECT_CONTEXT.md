# AROMAMATRIX Website — AI Quick Context

Last updated: 2026-07-15

This file contains editorial, compliance and implementation guardrails for AI assistants working on the website. All changeable business facts are defined in `config/site.config.js`, which is the authoritative source when this document or old website copy differs.

## 1. Brand and factory identity

- Brand identity and descriptor: `brand.name`, `brand.descriptor`
- Brand and international-sales entities: `brand.legalEntity`
- Legal manufacturing entity and public locations: `manufacturer.legalName`, `manufacturer.location`
- Entity-relationship wording: `policies.entityRelationship`
- Founding date and factory facts: `brand.founded`, `manufacturer`
- Contact location and time zone: `contact.projectDeskLocation`, `contact.timeZone`
- Primary audience: overseas fragrance brand owners, startups, importers, distributors and sourcing teams
- Positioning: a real, practical manufacturing partner—not a consumer perfume brand

Do not invent years of experience or wording that predates `brand.founded`.

## 2. Factory facts currently used on the website

- Use `manufacturer.factoryArea`, `manufacturer.controlledWorkshop` and `manufacturer.fragranceFormulaLibrary` exactly as configured.
- Visible factory areas include compounding, filling, inspection, packaging assembly, sample showroom, warehouse/staging and project office.
- Main production stages: material preparation, compounding, maceration/conditioning where applicable, filtration, filling, crimping or closure assembly, inspection, coding, secondary packaging and shipment staging.

Use these figures only as stated. Do not invent annual capacity, number of employees, number of production lines, export countries, customer count or sales volume.

## 3. Service models

### Private label

- Uses suitable existing fragrance directions and standard/available components.
- Buyer supplies brand name, artwork, target market and commercial requirements.
- Factory can support sourcing, filling, labeling, assembly and packing within the confirmed scope.
- Typical starting MOQ: `services.privateLabel.moq`.

### ODM / customized fragrance project

- Development based on a brand brief, scent direction, price position and target market.
- Can include fragrance sampling, component selection, sourcing, compounding, filling and finished packing.
- Typical starting MOQ: `services.odm.moq`.

### OEM / contract processing

- Buyer may supply a formula, materials, components, artwork, technical specification or reference sample.
- Factory performs only the stages confirmed after feasibility and compatibility review.
- Possible cooperation formats include contract processing, full-package production, build-to-artwork/specification and build-to-reference-sample.

## 4. MOQ policy

Approved reusable public wording is stored in `policies.moq`.

- Always describe configured MOQ values as **typical**, not absolute.
- Projects below `services.lowQuantityReview.threshold` require a WhatsApp feasibility review.
- Never guarantee that a below-500 order can be produced.
- Smaller runs may restrict fragrance, bottle, decoration and packaging choices and may increase unit price.
- Do not assume different fragrances or artwork versions can automatically be combined to meet MOQ.

## 5. Free sample policy

- Basic fragrance evaluation samples are free.
- Typical set and preparation time: `samples.setDisplay` and `samples.preparationDays`.
- Customer pays the **actual courier/logistics cost**.
- Courier quotation is confirmed with the customer before dispatch.
- Special formulations, extra revision rounds or customized packaging samples may require separate review and pricing.

Never use `$150 sample fee`, `sample fee credited back`, `sample fee confirmed` or wording that suggests the factory always pays international sample freight.

## 6. Timing and production statements

- Approximately **5 days** refers only to typical standard raw-material procurement after project confirmation.
- It is not the complete sampling, production, delivery or import timeline.
- Final lead time depends on formula, components, decoration, packaging, quantity, approval speed, production scheduling, inspection and freight route.
- Do not promise a fixed bulk-production or international-delivery time before project review.

## 7. Product and capability scope

Current public categories:

- Fine fragrance: EDP, EDT and extrait directions subject to formula review
- Body and hair fragrance/mist
- Selected home-fragrance formats
- Perfume bottles, pumps, caps, labels, cartons and packaging solutions
- Fragrance formulation and evaluation samples
- Compounding, filling, film sealing where specified, component assembly, manual boxing, final inspection and packing

Do not present the website as a fixed consumer-product catalog. AROMAMATRIX sells customized manufacturing services; product categories demonstrate capability and starting directions.

## 8. Certificates and compliance wording

Current protected certificate previews on the About page:

- ISO 22716 cosmetics GMP system certificate; use `certificates.iso22716` for the current public validity wording.
- SGS cosmetic GMP assessment against U.S. FDA CFSAN Cosmetic GMP Guidelines; this is **not FDA product approval**.
- Cosmetics Manufacturing License issued by the Guangdong provincial regulator; use `certificates.manufacturingLicense` for the current validity wording.

Certificate policy:

- Public pages show blurred/low-resolution previews only.
- Qualified buyers are directed to WhatsApp to request full verification copies.
- Verify certificate scope, legal-entity name and validity before making new claims.

Regulatory guardrails:

- An IFRA Certificate of Conformity is normally issued by the fragrance-mixture supplier for an intended use. IFRA itself does not approve each certificate, and it does not replace a safety assessment or local law.
- FDA facility registration or product listing is not product approval.
- For the EU, CPNP notification is normally handled by the EU Responsible Person or applicable distributor; it does not replace the safety assessment, PIF or compliant labeling.
- The brand owner, importer or appointed Responsible Person remains responsible for destination-market registration, final claims and label compliance unless a separate qualified service is explicitly agreed.
- Alcohol-based perfume may fall under dangerous-goods transport requirements, commonly including UN 1266/Class 3 depending on the actual product and route. Confirm every shipment individually.

Do not claim “FDA approved,” “IFRA certified by IFRA,” unconditional CPNP support, universal DDP shipping, guaranteed market compliance or “99% copy/replica” of branded perfume.

## 9. Marketing and visual direction

- Desired feeling: trustworthy, tangible, calm, professional and factory-direct.
- Prioritize real factory photography, production details, people, equipment, samples and verifiable process information.
- Avoid consumer-facing luxury theatrics, overly dark styling, exaggerated metallic effects and unsupported superlatives.
- Use a clean light B2B style with restrained dark blue/green accents.
- Do not place Chinese promotional graphics directly on English pages. Extract the information, translate it and rebuild it as native HTML/CSS content.
- Certificate images remain blurred and protected.
- Brand-first contact presentation is preferred; the full legal address does not need to dominate marketing pages. Factory visit details can be provided by appointment.

## 10. Contact information currently in the project

- Public email: `contact.email`
- WhatsApp account, display, links and messages: `contact.whatsapp`
- Location labels: `contact.projectDeskLocation` and `manufacturer.location`

Do not change configured contact details unless the website owner provides a replacement.

## 11. Website structure and maintenance

- Static site generator: Eleventy 3 with Nunjucks templates
- Required runtime: Node.js 22 or newer
- Core page generator: `src/generators/core-pages.njk`
- One shared structure per core page: `src/_includes/pages/{page}.njk`
- Localized core-page data: `src/content/pages/{page}.js`
- Core route registry: `config/routes.js`
- Shared layouts and components: `src/_includes/`
- Site facts: `config/site.config.js`
- Locale registry: `config/locales.js`
- Interface translations and localized SEO metadata: `src/i18n/{locale}.json`
- Shared Eleventy data: `src/_data/`
- Main styles: `assets/css/global.css` and `assets/css/pages.css`
- Main JavaScript: `assets/js/main.js`
- Eleventy configuration: `.eleventy.js`
- Eleventy build and SEO helpers: `eleventy/helpers.js`
- Deployment output: `docs/`
- Build command: `npm run build`
- Development command: `npm run dev`
- Test command: `npm test`
- Blog article root: `src/content/blog/articles/{article-id}/`
- Shared article data: `src/content/blog/articles/{article-id}/article.js`
- Localized article metadata and body: `src/content/blog/articles/{article-id}/{locale}.njk`
- Blog detail generator: `src/generators/blog-posts.njk`
- Sitemap and robots generators: `src/generators/sitemap.njk` and `src/generators/robots.njk`
- Unified blog images: `assets/images/blog/`
- Blog articles are edited individually. Do not use a shared body template or batch generator to overwrite article content.

The header and footer must continue to be included through Nunjucks. Do not edit generated `docs/` pages as the primary source because the next build will overwrite them.

English (`en`) and Simplified Chinese (`zh-CN`) are enabled. Spanish (`es`), Arabic (`ar`) and Russian (`ru`) are registered but disabled until their dictionaries and page data are complete. Arabic must use RTL direction when enabled. Add localized content under the locale key in every `src/content/pages/{page}.js`, add its interface/SEO dictionary, and then enable it through `config/locales.js`; do not copy core templates or duplicate routing rules.

Blog writing rule: each article must answer one specific buyer search intent with its own outline, examples and decision guidance. Reusing a page shell is acceptable; repeating the same introduction, MOQ/sample paragraph, checklist, factory note or CTA across article bodies is not.

SEO maintenance rules:

- The canonical production origin is `https://www.aromamatrix.com`.
- Every new public base page must have a route in `config/routes.js`, a shared template and localized data for every enabled locale, plus localized metadata in each locale dictionary; do not hand-copy canonical, Open Graph, Twitter or JSON-LD tags into page templates.
- Every blog translation must provide a unique locale slug, SEO title, complete SEO description, modification date and reviewed body. Shared cover image, category, author and publication date belong in the article's `article.js`.
- Blog detail canonical, hreflang, language switching and sitemap alternates must include only translations that exist, are marked `published` and belong to enabled locales.
- Canonical URLs, hreflang links, social tags, JSON-LD, `sitemap.xml` and `robots.txt` are generated by Eleventy. Rebuild and validate the generated output after changing page, locale or blog metadata.
- Keep the two public entities distinct in visible copy and structured data: the Xiamen company operates the AROMAMATRIX brand and international sales; the Guangzhou company carries out confirmed manufacturing.
- Do not add `Product`, `Review`, `AggregateRating` or `LocalBusiness` schema without verified page-visible evidence.

## 12. Current core pages

- `index.html`: service-led homepage and capability overview
- `about.html`: real factory, legal entity, workflow, gallery, video and protected certificates
- `process.html`: private label/OEM/ODM models, customization process, free samples and operations
- `contact.html`: structured project inquiry and WhatsApp handoff
- `qa.html`: 41-question B2B FAQ with search and filters
- `blog.html`: multi-article buyer knowledge base with search and categories
- `terms.html`: Terms and Conditions
- `privacy.html`: Privacy Policy

## 13. AI writing checklist

Before publishing new copy, confirm that it:

1. Uses `brand.founded` and `manufacturer.factoryArea` rather than copied literals.
2. Uses “typical MOQ” rather than an absolute minimum.
3. States that basic samples are free and the customer pays actual courier cost.
4. Does not treat five-day procurement as total lead time.
5. Avoids unsupported capacity, experience, customer and compliance claims.
6. Separates factory document support from the buyer’s destination-market responsibilities.
7. Uses English for public website content unless the user explicitly requests another language.
8. Directs uncertain or below-standard projects to WhatsApp for case-by-case review.
9. Uses real factory evidence and practical B2B language rather than consumer luxury hype.
10. Updates source files and rebuilds `docs/` with `npm run build`.
