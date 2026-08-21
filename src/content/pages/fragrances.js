const copy = {
  en: {
    hero: { kicker: 'Fragrance Direction Library', title: 'Explore 100 Fragrance Directions', text: 'A static B2B reference library for evaluating scent directions before a private-label, OEM or ODM perfume project.' },
    directory: { searchLabel: 'Search fragrance directions', searchPlaceholder: 'Search by name, note or scent character', filterLabel: 'Filter by fragrance family', all: 'All directions', details: 'Fragrance Profile', top: 'Top', heart: 'Heart', base: 'Base', families: 'Fragrance family', character: 'Scent character', tags: 'Key notes', ctaTitle: 'Found a direction for your collection?', ctaText: 'Tell us the fragrance directions, target market and estimated volume. Our team will recommend a sampling and development path.', cta: 'Discuss your fragrance project', emptyTitle: 'No fragrance directions found', emptyText: 'Try a different search term or choose another fragrance family.' }
  },
  'zh-CN': {
    hero: { kicker: '香型方向库', title: '探索 100 款香型方向', text: '为私人标签、OEM 或 ODM 香水项目提供的静态 B2B 香型参考目录，便于筛选和评估香味方向。' },
    directory: { searchLabel: '搜索香型方向', searchPlaceholder: '按名称、香材或气味性格搜索', filterLabel: '按香调家族筛选', all: '全部香型', details: '查看香调结构', top: '前调', heart: '中调', base: '后调', families: '香调家族', character: '气味性格', tags: '关键香材', ctaTitle: '找到适合系列的香型方向？', ctaText: '告诉我们香型方向、目标市场和预计数量，项目团队将建议合适的打样与开发路径。', cta: '咨询香型项目', emptyTitle: '未找到匹配的香型', emptyText: '请尝试其他关键词或选择另一个香调家族。' }
  },
  es: {
    hero: { kicker: 'Biblioteca de Direcciones Olfativas', title: 'Explore 100 Direcciones Olfativas', text: 'Una biblioteca estática B2B para evaluar direcciones olfativas antes de un proyecto de perfumería de marca privada, OEM u ODM.' },
    directory: { searchLabel: 'Buscar direcciones olfativas', searchPlaceholder: 'Buscar por nombre, nota o carácter', filterLabel: 'Filtrar por familia olfativa', all: 'Todas las direcciones', details: 'Ver perfil olfativo', top: 'Salida', heart: 'Corazón', base: 'Fondo', families: 'Familia olfativa', character: 'Carácter olfativo', tags: 'Notas clave', ctaTitle: '¿Encontró una dirección para su colección?', ctaText: 'Indíquenos las direcciones olfativas, el mercado objetivo y el volumen estimado.', cta: 'Hablar de su proyecto', emptyTitle: 'No se encontraron direcciones', emptyText: 'Pruebe otra búsqueda o familia olfativa.' }
  },
  ar: {
    hero: { kicker: 'مكتبة الاتجاهات العطرية', title: 'استكشف 100 اتجاه عطري', text: 'مكتبة مرجعية B2B ثابتة لتقييم الاتجاهات العطرية قبل مشروع عطور بعلامة خاصة أو OEM أو ODM.' },
    directory: { searchLabel: 'ابحث عن اتجاهات عطرية', searchPlaceholder: 'ابحث بالاسم أو النوتات أو الطابع', filterLabel: 'التصفية حسب العائلة العطرية', all: 'كل الاتجاهات', details: 'عرض الملف العطري', top: 'المقدمة', heart: 'القلب', base: 'القاعدة', families: 'العائلة العطرية', character: 'الطابع العطري', tags: 'النوتات الرئيسية', ctaTitle: 'هل وجدت اتجاهاً لمجموعتك؟', ctaText: 'أخبرنا بالاتجاهات العطرية والسوق المستهدف والكمية التقديرية.', cta: 'ناقش مشروعك العطري', emptyTitle: 'لم يتم العثور على اتجاهات', emptyText: 'جرّب بحثاً أو عائلة عطرية مختلفة.' }
  },
  fr: {
    hero: { kicker: 'Bibliothèque des Directions Olfactives', title: 'Explorez 100 Directions Olfactives', text: 'Une bibliothèque de référence B2B statique pour évaluer des directions olfactives avant un projet de parfumerie en marque blanche, OEM ou ODM.' },
    directory: { searchLabel: 'Rechercher des directions olfactives', searchPlaceholder: 'Rechercher par nom, note ou caractère', filterLabel: 'Filtrer par famille olfactive', all: 'Toutes les directions', details: 'Voir le profil olfactif', top: 'Tête', heart: 'Cœur', base: 'Fond', families: 'Famille olfactive', character: 'Caractère olfactif', tags: 'Notes clés', ctaTitle: 'Une direction pour votre collection ?', ctaText: 'Indiquez-nous les directions olfactives, le marché visé et le volume estimé.', cta: 'Discuter de votre projet', emptyTitle: 'Aucune direction trouvée', emptyText: 'Essayez une autre recherche ou famille olfactive.' }
  }
};

const counts = {
  en: ['{count} fragrance direction', '{count} fragrance directions'],
  'zh-CN': ['{count} 款香型', '{count} 款香型'],
  es: ['{count} dirección olfativa', '{count} direcciones olfativas'],
  ar: ['{count} اتجاه عطري', '{count} اتجاهات عطرية'],
  fr: ['{count} direction olfactive', '{count} directions olfactives']
};

for (const [locale, values] of Object.entries(counts)) {
  copy[locale].directory.countOne = values[0];
  copy[locale].directory.countMany = values[1];
}

for (const content of Object.values(copy)) {
  content.directory.sku = 'SKU';
}

module.exports = copy;
