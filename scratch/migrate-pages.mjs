/**
 * Migration Script: Transforms sub-pages to use the unified design system.
 * 
 * This script reads each page.tsx file, extracts its hero section data
 * (badge text, title, subtitle, CTA links), and rewrites the file to use
 * PageHero + SectionHeader + ContentCard with the home page's container pattern.
 * 
 * Usage: node scratch/migrate-pages.mjs
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PUBLIC_DIR = path.join(__dirname, '..', 'src', 'app', '(public)');

// Pages that DON'T need the hero+section transformation because:
// - Already updated (about, green-campus, naac, nirf)
// - Have special client-side rendering (departments/page.tsx delegates to DepartmentsClient)
// - Are dynamic route pages that need careful handling
const SKIP_FILES = new Set([
  'about/page.tsx',
  'about/green-campus/page.tsx',
  'naac/page.tsx',
  'nirf/page.tsx',
]);

/**
 * Extract hero info from the old-style sparkle hero banner pattern:
 * 
 * <section className="w-full bg-white/50 border...">
 *   <div className="inline-flex..."><Sparkles.../><span>BADGE</span></div>
 *   <h1>TITLE</h1>
 *   <p>SUBTITLE</p>
 *   <Link href="...">CTA</Link>
 * </section>
 */
function extractHeroInfo(content) {
  // Extract badge text from <span> after Sparkles icon
  const badgeMatch = content.match(/<Sparkles[^/]*\/>\s*\n?\s*<span>(.*?)<\/span>/);
  const badge = badgeMatch ? badgeMatch[1] : null;

  // Extract title from <h1> inside the hero section
  const titleMatch = content.match(/<h1[^>]*>\s*\n?\s*([\s\S]*?)\s*\n?\s*<\/h1>/);
  let title = titleMatch ? titleMatch[1].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim() : null;

  // Extract subtitle from <p> after title  
  const subtitleMatch = content.match(/<\/h1>\s*\n?\s*<p[^>]*>([\s\S]*?)<\/p>/);
  let subtitle = subtitleMatch ? subtitleMatch[1].replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').replace(/\s+/g, ' ').trim() : null;

  return { badge, title, subtitle };
}

/**
 * Replace the old hero section with PageHero component
 * and wrap <main> content in unified containers
 */
function transformPage(content, filePath) {
  const heroInfo = extractHeroInfo(content);
  
  if (!heroInfo.badge) {
    console.log(`  ⚠ No sparkle hero found, skipping hero transform`);
    return null; // Signal that we couldn't transform
  }

  // Step 1: Add PageHero and SectionHeader imports
  let result = content;
  
  // Check if imports already exist
  if (!result.includes('PageHero')) {
    // Add import after UnifiedPageLayout import
    result = result.replace(
      /import UnifiedPageLayout from "@\/components\/UnifiedPageLayout";/,
      `import UnifiedPageLayout from "@/components/UnifiedPageLayout";\nimport PageHero from "@/components/ui/PageHero";\nimport SectionHeader from "@/components/ui/SectionHeader";`
    );
  }

  // Step 2: Replace the old hero section with PageHero
  // Match the entire hero section from <section className="w-full bg-white/50..."> to </section>
  const heroSectionRegex = /\{\/\*\s*Hero\s*(?:Banner)?\s*\*\/\}\s*\n?\s*<section className="w-full bg-white\/50[^]*?<\/section>/;
  
  if (heroSectionRegex.test(result)) {
    // Extract any CTA links from the hero
    const ctaLinksMatch = content.match(/<div className="flex flex-wrap items-center gap-4 mt-8">([\s\S]*?)<\/div>\s*\n?\s*<\/div>\s*\n?\s*<\/div>/);
    
    let ctaBlock = '';
    if (ctaLinksMatch) {
      // Transform CTA links to use unified button styling
      const links = [...ctaLinksMatch[1].matchAll(/<Link\s+href="([^"]+)"[^>]*>\s*\n?\s*([\s\S]*?)<\/Link>/g)];
      if (links.length > 0) {
        const transformedLinks = links.map((l, i) => {
          const href = l[1];
          const innerText = l[2].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
          if (i === 0) {
            return `          <Link\n            href="${href}"\n            className="inline-flex items-center gap-2 border border-white/30 rounded-full px-6 py-3 text-white font-medium hover:bg-white/10 transition-colors"\n          >\n            ${innerText} <ArrowRight size={16} />\n          </Link>`;
          }
          return `          <Link\n            href="${href}"\n            className="inline-flex items-center gap-2 border border-white/20 rounded-full px-6 py-3 text-white/80 font-medium hover:bg-white/10 transition-colors"\n          >\n            ${innerText}\n          </Link>`;
        });
        ctaBlock = `\n      >\n        <div className="flex flex-wrap items-center gap-4">\n${transformedLinks.join('\n')}\n        </div>\n      </PageHero>`;
      }
    }

    if (!ctaBlock) {
      ctaBlock = '\n      />';
    }

    const escapedTitle = heroInfo.title.replace(/"/g, '\\"');
    const escapedSubtitle = heroInfo.subtitle ? heroInfo.subtitle.replace(/"/g, '\\"') : '';
    const escapedBadge = heroInfo.badge.replace(/"/g, '\\"').replace(/&amp;/g, '&');

    const newHero = `{/* Hero */}\n      <PageHero\n        badge="${escapedBadge}"\n        title="${escapedTitle}"\n        subtitle="${escapedSubtitle}"${ctaBlock}`;
    
    result = result.replace(heroSectionRegex, newHero);
  }

  // Step 3: Transform <main> content sections  
  // Wrap the main content in unified container pattern
  // Replace: <main className="flex-1 w-full max-w-7xl mx-auto px-6 py-12 space-y-12">
  // With:    <main className="flex-1 w-full flex flex-col items-center">
  result = result.replace(
    /<main className="flex-1 w-full max-w-7xl mx-auto px-6 py-12 space-y-\d+">/g,
    '<main className="flex-1 w-full flex flex-col items-center">'
  );
  result = result.replace(
    /<main className="flex-1 w-full max-w-7xl mx-auto px-6 py-12 space-y-\d+">/g,
    '<main className="flex-1 w-full flex flex-col items-center">'
  );

  // Step 4: Transform section headers
  // Replace old-style inline badges + h2 with SectionHeader
  const sectionHeaderRegex = /<div className="(?:space-y-2|space-y-3|inline-flex[^"]*)">\s*\n?\s*<div className="inline-flex items-center gap-1\.5 px-3 py-1 rounded-md bg-blue-50 text-\[#2E5C9E\][^"]*">\s*\n?\s*([^<]+)\s*\n?\s*<\/div>\s*\n?\s*<h2[^>]*>\s*\n?\s*([\s\S]*?)\s*\n?\s*<\/h2>\s*\n?\s*<\/div>/g;

  result = result.replace(sectionHeaderRegex, (match, badge, title) => {
    const cleanBadge = badge.trim();
    const cleanTitle = title.replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').replace(/\s+/g, ' ').trim();
    return `<SectionHeader\n                badge="${cleanBadge}"\n                title="${cleanTitle}"\n                align="left"\n              />`;
  });

  // Remove unused Sparkles import if no longer used
  if (!result.includes('<Sparkles') && result.includes('Sparkles')) {
    result = result.replace(/,?\s*Sparkles,?/g, (match) => {
      // Keep commas correct
      if (match.startsWith(',') && match.endsWith(',')) return ',';
      return '';
    });
  }

  return result;
}

// Get all page.tsx files recursively
function getAllPageFiles(dir, base = '') {
  const results = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  
  for (const entry of entries) {
    const relativePath = base ? `${base}/${entry.name}` : entry.name;
    const fullPath = path.join(dir, entry.name);
    
    if (entry.isDirectory()) {
      results.push(...getAllPageFiles(fullPath, relativePath));
    } else if (entry.name === 'page.tsx') {
      results.push({ relativePath, fullPath });
    }
  }
  
  return results;
}

// Main
console.log('🔄 Starting page migration to unified design system...\n');

const pages = getAllPageFiles(PUBLIC_DIR);
let transformed = 0;
let skipped = 0;
let failed = 0;

for (const { relativePath, fullPath } of pages) {
  if (SKIP_FILES.has(relativePath)) {
    console.log(`⏭ Skipping (already done): ${relativePath}`);
    skipped++;
    continue;
  }

  console.log(`📝 Processing: ${relativePath}`);
  
  const content = fs.readFileSync(fullPath, 'utf-8');
  
  // Only transform files that use UnifiedPageLayout
  if (!content.includes('UnifiedPageLayout')) {
    console.log(`  ⏭ No UnifiedPageLayout usage, skipping`);
    skipped++;
    continue;
  }

  // Only transform files with the old sparkle hero pattern
  if (!content.includes('bg-white/50 border border-slate-200/60')) {
    console.log(`  ⏭ No sparkle hero pattern found, needs manual update`);
    skipped++;
    continue;
  }

  const result = transformPage(content, relativePath);
  
  if (result) {
    fs.writeFileSync(fullPath, result, 'utf-8');
    console.log(`  ✅ Transformed successfully`);
    transformed++;
  } else {
    console.log(`  ❌ Transformation failed`);
    failed++;
  }
}

console.log(`\n📊 Migration Complete:`);
console.log(`  ✅ Transformed: ${transformed}`);
console.log(`  ⏭ Skipped: ${skipped}`);
console.log(`  ❌ Failed: ${failed}`);
console.log(`  📄 Total pages: ${pages.length}`);
