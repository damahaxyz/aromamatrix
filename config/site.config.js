const whatsappNumber = '85257633378';
const brandName = 'AROMAMATRIX';
const privateLabelMoq = 500;
const customProjectMoq = 1000;

const config = {
  site: {
    origin: 'https://www.aromamatrix.com',
    language: 'en',
    locale: 'en_US',
    defaultOgImage: 'assets/images/brand/aromamatrix-og.webp',
    logoPath: 'assets/images/brand/aromamatrix-logo-square.png'
  },
  brand: {
    name: brandName,
    descriptor: 'B2B Perfume Manufacturing',
    businessType: 'International B2B perfume manufacturing program providing private label, OEM, ODM and contract-processing services',
    positioning: {
      en: 'An international B2B perfume manufacturing program for brand owners, importers and distributors worldwide',
      zh: '面向全球品牌方、进口商和分销商的国际 B2B 香水制造项目'
    },
    founded: {
      iso: '2024-11',
      long: 'November 2024',
      short: 'Nov 2024'
    }
  },
  manufacturer: {
    legalName: 'Guangzhou Zhuoya Biotechnology Cosmetics Co., Ltd.',
    location: {
      full: 'Baiyun District, Guangzhou, China',
      city: 'Guangzhou, China',
      locality: 'Guangzhou',
      region: 'Guangdong',
      countryCode: 'CN'
    },
    factoryArea: {
      value: 6000,
      display: '6,000+ m²'
    },
    controlledWorkshop: {
      display: 'Class 100,000'
    },
    fragranceFormulaLibrary: {
      value: 10000,
      display: '10,000+'
    }
  },
  transaction: {
    entityNotice: {
      en: 'The legal entity responsible for each transaction is specified in the applicable quotation, contract, proforma invoice and payment documents.',
      zh: '正式交易主体以具体项目的报价、合同、形式发票及收款文件为准。'
    }
  },
  contact: {
    email: 'sales@aromamatrix.com',
    timeZone: 'UTC+8',
    projectDeskLocation: 'China · UTC+8',
    whatsapp: {
      number: whatsappNumber,
      display: '+852 5763 3378',
      url: `https://wa.me/${whatsappNumber}`,
      defaultMessage: `Hello ${brandName}, I am interested in your perfume OEM/ODM services and would like to get a quote and samples.`,
      certificateRequestMessage: `Hello ${brandName}, I am evaluating your factory for a perfume manufacturing project. Please send your full ISO 22716, GMP assessment and cosmetics manufacturing license for verification.`
    }
  },
  services: {
    privateLabel: {
      name: 'Private Label',
      positioning: 'Suitable existing fragrance directions and standard or available components',
      moq: {
        value: privateLabelMoq,
        pieces: `${privateLabelMoq} pieces`,
        pcs: `${privateLabelMoq} pcs`,
        typicalPcs: `Typical ${privateLabelMoq} pcs`
      }
    },
    odm: {
      name: 'ODM',
      positioning: 'Customized fragrance and packaging development based on a buyer brief',
      moq: {
        value: customProjectMoq,
        pieces: `${customProjectMoq.toLocaleString('en-US')} pieces`,
        pcs: `${customProjectMoq.toLocaleString('en-US')} pcs`,
        typicalPcs: `Typical ${customProjectMoq.toLocaleString('en-US')} pcs`
      }
    },
    oem: {
      name: 'OEM',
      positioning: 'Contract processing based on confirmed buyer-supplied inputs or specifications'
    },
    lowQuantityReview: {
      threshold: privateLabelMoq,
      optionValue: `Below ${privateLabelMoq} pcs - Feasibility Review`,
      optionLabel: `Below ${privateLabelMoq} pcs — Request Feasibility Review`
    },
    quantityRanges: {
      privateLabel: {
        value: `${privateLabelMoq} - ${customProjectMoq - 1} pcs`,
        label: `${privateLabelMoq}–${(customProjectMoq - 1).toLocaleString('en-US')} pcs`
      },
      customProject: {
        value: `${customProjectMoq.toLocaleString('en-US')} - 3,000 pcs`,
        label: `${customProjectMoq.toLocaleString('en-US')}–3,000 pcs`
      }
    }
  },
  samples: {
    count: 3,
    volumeMl: 10,
    setDisplay: '3 × 10ml',
    preparationDays: {
      min: 5,
      max: 7,
      display: '5–7 business days',
      titleDisplay: '5–7 Business Days',
      shortDisplay: '5–7 days'
    },
    basicSampleCost: 'Free',
    courierPolicy: 'Customer pays the actual courier or logistics cost confirmed before dispatch.'
  },
  certificates: {
    iso22716: {
      name: 'ISO 22716',
      validityDisplay: 'August 2025–August 2028',
      validityDisplayZh: '2025年8月至2028年8月'
    },
    gmpAssessment: {
      name: 'SGS cosmetic GMP assessment'
    },
    manufacturingLicense: {
      name: 'Cosmetics Manufacturing License',
      validThroughDisplay: 'May 2030',
      validThroughDisplayZh: '2030年5月'
    }
  }
};

config.contact.whatsapp.certificateRequestUrl = `${config.contact.whatsapp.url}?text=${encodeURIComponent(config.contact.whatsapp.certificateRequestMessage)}`;

config.policies = {
  projectPositioning: config.brand.positioning.en,
  entityRelationship: `${config.brand.name} is an international B2B perfume manufacturing program. ${config.transaction.entityNotice.en}`,
  moq: `Our typical starting MOQ is ${config.services.privateLabel.moq.pieces} for private label projects using suitable standard components, and ${config.services.odm.moq.pieces} for customized fragrance projects. Actual quantities depend on the formula, bottle, decoration, packaging and supplied materials. If you need a smaller pilot run, contact our team on WhatsApp so we can review the available options. Smaller quantities are evaluated case by case and cannot be guaranteed.`,
  samples: `A typical evaluation set contains ${config.samples.setDisplay} fragrance samples. Preparation normally takes ${config.samples.preparationDays.display} after the brief and sample direction are confirmed. Courier pricing is calculated by destination and approved before dispatch.`
};

module.exports = config;
