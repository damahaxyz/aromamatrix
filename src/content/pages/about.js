const galleryImages = [
  ['compounding-workshop.webp', 1400, 1050, true],
  ['filling-line.webp', 1400, 637, false],
  ['quality-inspection.webp', 1400, 637, false],
  ['packing-team.webp', 1400, 637, false],
  ['compounding-tanks.webp', 1400, 637, true],
  ['team-office.webp', 1400, 637, false],
  ['sample-showroom.webp', 1400, 637, false],
  ['warehouse.webp', 1400, 1050, false]
];

function gallery(items) {
  return items.map((item, index) => ({
    ...item,
    image: galleryImages[index][0], width: galleryImages[index][1], height: galleryImages[index][2], wide: galleryImages[index][3]
  }));
}

module.exports = {
  en: {
    hero: { location: '', title: 'A Real Manufacturing Partner Behind Your Fragrance Brand', text: 'From fragrance compounding and filling to packaging assembly and export preparation, our facility supports private label, OEM and ODM fragrance projects.', cta: 'Request a Factory Video Call', alt: '{brand} manufacturing facility building in Guangzhou' },
    entity: { kicker: 'Who We Are', title: 'An International B2B Program Built on Real Production', paragraphs: ['Founded in {{config.brand.founded.long}}, {{config.brand.name}} is an international B2B perfume manufacturing program for brand owners, importers and distributors worldwide.', 'Our project team coordinates international inquiries, fragrance direction, component selection, manufacturing and export preparation through one workflow. Production is carried out by {{config.manufacturer.legalName}} at its perfume manufacturing facility in Baiyun District, Guangzhou.', '{{config.transaction.entityNotice.en}}'], facts: [['Business Program', '{{config.brand.name}}'], ['Program Positioning', 'International B2B Perfume Manufacturing'], ['Manufacturing Entity', '{{config.manufacturer.legalName}}'], ['Established', '{{config.brand.founded.long}}'], ['Manufacturing Location', '{{config.manufacturer.location.full}}'], ['Service Models', 'Private Label · OEM · ODM']] },
    metricLabels: ['Factory Area', 'Established', 'Controlled Workshop', 'Fragrance Formula Library'],
    video: { kicker: 'Factory Walkthrough', title: 'See the Facility Behind the Website', text: 'Watch a short walkthrough of our production environment. For a live view of current equipment and capacity, request a scheduled video call with our team.', fallback: 'Your browser does not support embedded video.', label: 'Factory Walkthrough', meta: 'Real production environment · Guangzhou' },
    gallery: {
      kicker: 'Inside the Facility', title: 'A Practical View of How We Work', text: 'Real photographs from our office, production, filling, inspection, sample and storage areas.', items: gallery([
        { alt: 'Stainless-steel fragrance compounding equipment in the production workshop', title: 'Compounding Workshop', text: 'Stainless-steel preparation equipment' },
        { alt: 'Perfume filling and component assembly equipment', title: 'Filling Equipment', text: 'Product filling and component handling' },
        { alt: 'Production team conducting packaging and quality inspection', title: 'Quality Inspection', text: 'In-process checking and coding' },
        { alt: 'Factory team completing perfume packaging assembly', title: 'Packaging Assembly', text: 'Manual inspection and secondary packing' },
        { alt: 'Large stainless-steel processing tanks in a controlled workshop', title: 'Processing Tanks', text: 'Controlled batch preparation' },
        { alt: '{brand} project and business support team at work', title: 'Project Support', text: 'Quoting, sampling and order coordination' },
        { alt: 'Fragrance and packaging sample display area', title: 'Sample Showroom', text: 'Bottle and product reference library' },
        { alt: 'Packaging materials and finished goods staging warehouse', title: 'Storage & Staging', text: 'Packaging materials and shipment preparation' }
      ])
    },
    workflow: { kicker: 'Production Workflow', title: 'Defined Stages, Visible Responsibility', text: 'Automated equipment is combined with manual inspection and secondary packaging, giving each project clear approval and control points.', items: [['Material Preparation', 'Formula, alcohol and approved components are prepared against the project specification.'], ['Compounding', 'Fragrance batches are mixed in stainless-steel processing equipment.'], ['Maceration & Filtration', 'The batch is conditioned and filtered according to the production plan.'], ['Filling & Crimping', 'Bottles move through filling, pump placement and sealing operations.'], ['Inspection & Packing', 'Finished packs receive visual, coding and assembly checks.'], ['Shipment Staging', 'Goods are packed and prepared for the confirmed freight route.']] },
    certificates: { kicker: 'Certification & Licensing', title: 'Documents Available for Buyer Verification', intro: 'To prevent unauthorized reuse, the previews below are intentionally low-resolution and blurred. Full copies are supplied to qualified buyers on request.', protected: 'Protected Preview', request: 'Full Copy on Request', cards: [['SGS · System Certification', 'ISO 22716', 'Cosmetics Good Manufacturing Practices. Current certificate period shown in our verification copy: {{config.certificates.iso22716.validityDisplay}}.', 'iso-22716-preview.webp', 'Protected blurred preview of ISO 22716 certificate', 480, 679], ['SGS · GMP Assessment', 'Cosmetic GMP Compliance', 'SGS-audited assessment against U.S. FDA CFSAN Cosmetic GMP Guidelines. This is not presented as FDA product approval.', 'gmp-preview.webp', 'Protected blurred preview of cosmetic GMP assessment document', 480, 679], ['Guangdong Medical Products Administration', 'Cosmetics Manufacturing License', 'Manufacturing license issued by the provincial regulator. Current license validity shown in our verification copy extends through {{config.certificates.manufacturingLicense.validThroughDisplay}}.', 'production-license-preview.webp', 'Protected blurred preview of cosmetics manufacturing license', 560, 396]], ctaTitle: 'Need Documents for Supplier Approval?', ctaText: 'Send your company name, destination market and planned product category. Our team will provide the relevant full documents for verification.', cta: 'Request Full Certificates' }
  },
  'zh-CN': {
    hero: { location: '', title: '了解 {brand} 的生产工厂', text: '从香精调配、灌装到包装组装和出口准备，为私人标签、OEM 与 ODM 香氛项目提供可核验的生产支持。', cta: '预约工厂视频沟通', alt: '广州香水生产场地外观' },
    entity: { kicker: '我们是谁', title: '立足真实生产的国际 B2B 项目', paragraphs: ['{{site.brand.name}} 是面向全球品牌方、进口商和分销商的国际 B2B 香水制造项目。', '项目团队通过统一流程协调海外询盘、香型方向、组件选择、生产和出口准备。香水生产由 {{site.manufacturer.legalName}} 在广州白云区生产场地完成。', '{{site.transaction.entityNotice.zh}}'], facts: [['业务项目', '{{site.brand.name}}'], ['项目定位', '国际 B2B 香水制造'], ['生产主体', '{{site.manufacturer.legalName}}'], ['成立时间', '{{fact("founded")}}'], ['生产地点', '{{site.manufacturer.location.full}}'], ['合作方式', '私人标签 · OEM · ODM']] },
    metricLabels: ['厂房面积', '成立时间', '受控车间', '香精配方库'],
    video: { kicker: '工厂实景', title: '查看网站背后的生产场地', text: '通过短片了解实际生产环境。如需实时查看当前设备和产能，可预约与项目团队进行工厂视频沟通。', fallback: '您的浏览器不支持嵌入视频。', label: '工厂实景短片', meta: '真实生产环境 · 广州' },
    gallery: {
      kicker: '走进工厂', title: '了解我们的实际工作环境', text: '展示办公室、生产、灌装、检验、样品和仓储区域的真实照片。', items: gallery([
        { alt: '生产车间内的不锈钢香水调配设备', title: '调配车间', text: '不锈钢配制设备' },
        { alt: '香水灌装和组件装配设备', title: '灌装设备', text: '产品灌装与组件处理' },
        { alt: '生产团队进行包装和质量检查', title: '质量检验', text: '过程检查与喷码' },
        { alt: '工厂团队完成香水包装装配', title: '包装装配', text: '人工检查与二次包装' },
        { alt: '受控车间内的大型不锈钢处理罐', title: '工艺罐体', text: '受控批次配制' },
        { alt: '{brand} 项目和业务支持团队工作现场', title: '项目支持', text: '报价、打样与订单协调' },
        { alt: '香型和包装样品展示区域', title: '样品展示区', text: '瓶器与产品参考资料库' },
        { alt: '包装材料和成品暂存仓库', title: '仓储与暂存', text: '包装材料与出货准备' }
      ])
    },
    workflow: { kicker: '生产流程', title: '明确阶段与清晰责任', text: '自动化设备结合人工检验和二次包装，为每个项目设置清晰的批准与控制节点。', items: [['材料准备', '按照项目规格准备配方、酒精和批准组件。'], ['调配', '使用不锈钢工艺设备混合香水批次。'], ['熟化与过滤', '按照生产计划对批次进行静置和过滤。'], ['灌装与压口', '瓶器依次完成灌装、泵头安装和封口。'], ['检验与包装', '检查成品外观、编码和装配。'], ['出货暂存', '完成装箱，并为确认的运输路线做好准备。']] },
    certificates: { kicker: '供应商核验', title: '可供采购方核验的证书文件', intro: '为避免证书被未经授权复用，公开页面仅展示模糊或低分辨率预览。合格采购方可联系项目团队申请完整副本。', protected: '受保护预览', request: '完整副本需申请', cards: [['SGS · 体系认证', 'ISO 22716', '当前核验副本显示的有效期为 {{site.certificates.iso22716.validityDisplayZh}}。', 'iso-22716-preview.webp', 'ISO 22716 证书受保护预览', 480, 679], ['SGS · GMP 评估', '化妆品 GMP 评估', '该评估不代表 FDA 对具体产品的批准。', 'gmp-preview.webp', 'GMP 评估文件受保护预览', 480, 679], ['广东省药品监督管理部门', '化妆品生产许可证', '当前核验副本显示有效期至 {{site.certificates.manufacturingLicense.validThroughDisplayZh}}。', 'production-license-preview.webp', '化妆品生产许可证受保护预览', 560, 396]], ctaTitle: '供应商审核需要完整文件？', ctaText: '请提供公司名称、目标市场和计划产品类别，项目团队将发送相关文件供核验。', cta: '申请完整核验文件' }
  }
};
