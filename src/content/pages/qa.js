module.exports = {
  "en": {
    "hero": {
      "kicker": "Buyer Knowledge Base",
      "title": "Perfume Manufacturing FAQ",
      "description": "Practical answers for brand owners, importers and sourcing teams evaluating private label, OEM and ODM fragrance production.",
      "links": [
        {
          "href": "#faq-directory",
          "className": "btn-gold",
          "label": "Browse Questions"
        },
        {
          "href": "contact.html",
          "className": "btn-outline",
          "label": "Ask the Factory"
        }
      ]
    },
    "search": {
      "label": "Search all questions",
      "placeholder": "Try: MOQ, free sample, IFRA, bottle or shipping",
      "clearLabel": "Clear",
      "filters": [
        {
          "value": "all",
          "label": "All"
        },
        {
          "value": "getting-started",
          "label": "Getting Started"
        },
        {
          "value": "moq-pricing",
          "label": "MOQ &amp; Pricing"
        },
        {
          "value": "fragrance-samples",
          "label": "Fragrance &amp; Samples"
        },
        {
          "value": "packaging",
          "label": "Packaging"
        },
        {
          "value": "production-quality",
          "label": "Production &amp; QC"
        },
        {
          "value": "compliance",
          "label": "Compliance"
        },
        {
          "value": "shipping",
          "label": "Shipping"
        }
      ],
      "ariaLabel": "FAQ categories"
    },
    "groups": [
      {
        "id": "getting-started",
        "category": "getting-started",
        "number": "01",
        "title": "Getting Started &amp; Cooperation Models",
        "description": "Understand what we manufacture and how to prepare a useful project brief.",
        "questions": [
          {
            "question": "What fragrance products can {{config.brand.name}} manufacture?",
            "answerHtml": "<p>We support fine fragrance formats such as EDP, EDT and extrait, together with body and hair mists, selected home-fragrance formats and perfume packaging projects. Final feasibility depends on the formula, components, quantity and destination market. See our <a href=\"index.html#product-capabilities\">manufacturing categories</a>.</p>"
          },
          {
            "question": "What is the difference between private label, OEM and ODM?",
            "answerHtml": "<p>Private label starts with existing fragrance directions and suitable standard components. ODM develops a product from your brand brief, while OEM or contract processing uses a formula, materials, artwork, specification or reference supplied by you. Compare the routes on our <a href=\"process.html#service-models\">services page</a>.</p>"
          },
          {
            "question": "Which cooperation model is right for my project?",
            "answerHtml": "<p>Private label is normally the fastest route for a smaller market test. ODM fits brands needing fragrance and packaging development, while OEM suits buyers with established inputs or technical standards. Share what you already have and we will recommend a route after review.</p>"
          },
          {
            "question": "Is {{config.brand.name}} a manufacturer or a trading company?",
            "answerHtml": "<p>{{config.brand.name}} is an international B2B perfume manufacturing program. The project team coordinates international inquiries, development, manufacturing and export preparation, while production is carried out by {{config.manufacturer.legalName}} at the Guangzhou facility shown on this website. Qualified buyers can review protected certificate previews and request full verification documents through <a href=\"about.html\">About Us</a>.</p>"
          },
          {
            "question": "Can startups and first-time fragrance brands work with you?",
            "answerHtml": "<p>Yes. We can help first-time buyers define the product format, quantity, fragrance direction and packaging route. A clear budget, destination market and launch objective help us recommend realistic standard-component options without forcing unnecessary custom tooling.</p>"
          },
          {
            "question": "What information should I provide to receive a quotation?",
            "answerHtml": "<p>Please provide the product category, estimated quantity, destination country, scent direction, bottle or packaging preference, target launch date and any supplied formula, artwork or reference sample. Missing details can be marked as undecided in our <a href=\"contact.html#inquiry-form\">project inquiry form</a>.</p>"
          }
        ]
      },
      {
        "id": "moq-pricing",
        "category": "moq-pricing",
        "number": "02",
        "title": "MOQ, Pricing &amp; Commercial Terms",
        "description": "Starting quantities are guidelines, not automatic approval or rejection rules.",
        "questions": [
          {
            "question": "What is your typical minimum order quantity?",
            "answerHtml": "<p>{{config.policies.moq}}</p>"
          },
          {
            "question": "Can you review a project below the standard MOQ?",
            "answerHtml": "<p>Yes, our team can assess a smaller pilot request. Feasible options may require an existing fragrance direction, stock bottle, simplified decoration or standard box. Lower quantities can also affect unit cost and component choice. Select “Below {{config.services.privateLabel.moq.pcs}}” in the <a href=\"contact.html#inquiry-form\">inquiry form</a> to request review.</p>"
          },
          {
            "question": "Can different fragrances or bottle designs be combined to meet the MOQ?",
            "answerHtml": "<p>MOQ is normally evaluated by approved SKU, fragrance batch and packaging configuration. Combining variants may be possible when they share compatible components and production requirements, but it is not automatic. Send the planned SKU breakdown so we can confirm the workable quantity for each item.</p>"
          },
          {
            "question": "What factors affect the perfume unit price?",
            "answerHtml": "<p>Key factors include fragrance concentration, bottle and pump, cap material, decoration method, box structure, order quantity, supplied materials, testing requirements and export packing. A lower MOQ generally produces a higher unit cost because setup and procurement are spread across fewer units.</p>"
          },
          {
            "question": "Are fragrance development, packaging setup or mold fees charged separately?",
            "answerHtml": "<p>They may be. Custom formulation work, additional sample rounds, print setup, decoration fixtures, bottle or cap molds and special packaging prototypes are reviewed separately. Any applicable development or tooling charge is identified in the quotation before the project proceeds.</p>"
          },
          {
            "question": "How are payment terms and quotation validity confirmed?",
            "answerHtml": "<p>Payment stages, approved currency, beneficiary details and quotation validity are stated in the formal quotation or proforma invoice for the project. Terms can vary with development scope, custom tooling, supplied materials and production value, so the website does not publish one universal payment schedule.</p>"
          }
        ]
      },
      {
        "id": "fragrance-samples",
        "category": "fragrance-samples",
        "number": "03",
        "title": "Fragrance Development &amp; Samples",
        "description": "Evaluate fragrance direction before committing to mass production.",
        "questions": [
          {
            "question": "Are fragrance evaluation samples free?",
            "answerHtml": "<p>Yes. Basic fragrance evaluation samples are free; you only pay the actual courier cost to your destination. Special formulations, extra revision rounds or customized packaging samples are reviewed separately if additional costs apply. See the complete <a href=\"process.html#free-samples\">sample policy</a>.</p>"
          },
          {
            "question": "What is included in the sample kit and how long does preparation take?",
            "answerHtml": "<p>{{config.policies.samples}}</p>"
          },
          {
            "question": "Can you develop a fragrance from our brand brief?",
            "answerHtml": "<p>Yes. A useful brief includes target customer, price position, olfactive family, reference notes, concentration, destination market and packaging concept. We translate the direction into samples for evaluation, then define the revision scope and approval points for the project.</p>"
          },
          {
            "question": "Can we choose from an existing fragrance formula library?",
            "answerHtml": "<p>Yes. Existing fragrance directions can shorten development and work well for private label projects. Availability, intended use, concentration and destination requirements are checked before selection. Existing library formulas are not automatically exclusive to one brand.</p>"
          },
          {
            "question": "Can you work from a reference perfume or supplied fragrance sample?",
            "answerHtml": "<p>We can evaluate a supplied reference to understand the olfactive direction, performance target and budget. The goal is to develop an achievable, lawful product specification rather than promise an exact copy of a third-party branded fragrance or protected presentation.</p>"
          },
          {
            "question": "How many fragrance revision rounds are available?",
            "answerHtml": "<p>The included revision scope is confirmed in the sampling proposal. It depends on whether the project uses an existing direction or a new custom brief, and on how substantially the feedback changes the original target. Additional rounds may affect timing or cost and are approved before work continues.</p>"
          },
          {
            "question": "Can you produce EDP, EDT, extrait or alcohol-free formats?",
            "answerHtml": "<p>EDP, EDT and extrait concentration planning is available subject to formula and intended use. Alcohol-free or alternative-base formats require a separate feasibility, stability, packaging and destination review. Concentration names alone do not guarantee longevity; formula, dosage and application also matter.</p>"
          },
          {
            "question": "Who owns the custom formula and how is confidentiality handled?",
            "answerHtml": "<p>Confidentiality, formula use and any exclusivity are agreed in writing for the specific project. NDAs can be reviewed where appropriate. Existing library formulas are generally non-exclusive; custom-development ownership or exclusivity applies only when expressly included in the signed commercial agreement.</p>"
          }
        ]
      },
      {
        "id": "packaging",
        "category": "packaging",
        "number": "04",
        "title": "Bottles, Packaging &amp; Decoration",
        "description": "Match the packaging route to quantity, budget and launch timing.",
        "questions": [
          {
            "question": "What is the difference between stock packaging and a custom bottle mold?",
            "answerHtml": "<p>Stock packaging uses existing bottle, pump and cap formats and normally offers lower starting quantities and shorter sourcing time. A custom mold creates a project-specific component but requires tooling, development samples, higher quantities and a longer schedule confirmed with the component supplier.</p>"
          },
          {
            "question": "Which bottle, pump, cap and box elements can be customized?",
            "answerHtml": "<p>Depending on quantity and compatibility, options may include bottle color or coating, pump and collar finish, cap material, label, direct printing and outer box structure. Dedicated bottle or cap shapes require technical review and custom tooling rather than simple decoration.</p>"
          },
          {
            "question": "Which decoration processes are available?",
            "answerHtml": "<p>Common options include color coating, frosting, screen printing, labels, foil stamping and selected secondary-packaging finishes. Availability depends on component material, artwork, quantity and supplier capability. We confirm achievable color, adhesion and registration standards through samples where required.</p>"
          },
          {
            "question": "What artwork and label files should the customer provide?",
            "answerHtml": "<p>Vector artwork such as AI, editable PDF or EPS is preferred for logos and print layouts. Please include brand text, net contents, barcode, required market wording and color references. The buyer or destination-market responsible party remains responsible for final legal label approval.</p>"
          },
          {
            "question": "Can customers supply their own bottles, packaging or components?",
            "answerHtml": "<p>Yes, customer-supplied components can be considered under an OEM or contract-processing model. They must arrive in the agreed quantity, condition and schedule, and may require incoming inspection, filling trials and compatibility checks before mass production is approved.</p>"
          },
          {
            "question": "How do you test bottle, pump and fragrance compatibility?",
            "answerHtml": "<p>Checks can include fit, crimping or closure integrity, leakage, spray performance, appearance and formula interaction with seals, pumps and decoration. The test plan is matched to the selected formula and components; no package should be treated as approved solely from a catalog image.</p>"
          }
        ]
      },
      {
        "id": "production-quality",
        "category": "production-quality",
        "number": "05",
        "title": "Production, Lead Time &amp; Quality Control",
        "description": "Defined approval points reduce avoidable production risk.",
        "questions": [
          {
            "question": "What are the main production stages for a perfume order?",
            "answerHtml": "<p>A typical project moves through brief review, quotation, sampling, formula and packaging approval, material procurement, compounding, conditioning or filtration where specified, filling, sealing, assembly, inspection and shipment preparation. The exact route depends on the cooperation model.</p>"
          },
          {
            "question": "Does the 5-day raw-material procurement period mean total delivery time?",
            "answerHtml": "<p>No. Approximately five days refers only to purchasing suitable standard raw materials after project confirmation. Customized bottles, caps, printed boxes, special decoration, production, inspection and shipping are scheduled separately and may require substantially more time.</p>"
          },
          {
            "question": "How is the bulk production lead time calculated?",
            "answerHtml": "<p>Lead time is confirmed after the formula, components, artwork, quantity and quality requirements are approved. Stock-component projects are generally faster; custom molds, decoration, rigid boxes, customer-supplied materials and peak production periods can extend the schedule.</p>"
          },
          {
            "question": "Which quality checks are performed during production?",
            "answerHtml": "<p>The applicable plan may cover incoming materials, formula appearance and odor, filling volume, crimp or closure integrity, leakage, spray function, coding, decoration, assembly and final packing. Test scope is defined against the approved product specification.</p>"
          },
          {
            "question": "Is a pre-production sample approved before mass production?",
            "answerHtml": "<p>Projects normally require approval of the relevant fragrance direction, packaging components, artwork and finished presentation before mass production. The approval format may be a physical sample, digital artwork, component sample or signed specification depending on the item.</p>"
          },
          {
            "question": "How do you manage batch consistency and repeat orders?",
            "answerHtml": "<p>Approved specifications, batch records and retained references help guide repeat production. Raw-material or packaging changes are reviewed when they affect the approved standard. Buyers should provide the prior order or SKU reference when requesting a repeat order.</p>"
          }
        ]
      },
      {
        "id": "compliance",
        "category": "compliance",
        "number": "06",
        "title": "Certifications, Documents &amp; Market Compliance",
        "description": "Separate factory documentation from destination-market responsibilities.",
        "questions": [
          {
            "question": "Which factory certificates can buyers verify?",
            "answerHtml": "<p>Protected previews of available manufacturing and quality documents are displayed on our <a href=\"about.html#certificates\">certificate verification section</a>. Qualified buyers can request relevant full copies through WhatsApp for supplier onboarding. Document scope and validity should be checked against the legal entity shown on each certificate.</p>"
          },
          {
            "question": "Which SDS, COA, batch and fragrance documents can be supplied?",
            "answerHtml": "<p>Available documents may include SDS, COA, batch-related records and fragrance documentation relevant to the approved formula. The exact pack depends on product type, ingredient supplier, destination and commercial agreement, so not every document is automatically available for every SKU or market.</p>"
          },
          {
            "question": "What does an IFRA Certificate of Conformity mean?",
            "answerHtml": "<p>It is a supplier-issued statement that a fragrance mixture conforms to applicable IFRA Standards for an intended use. It is not issued by IFRA, does not replace a product safety assessment and does not remove the need to comply with local law. See the <a href=\"https://ifrafragrance.org/initiatives-positions/safe-use-fragrance-science/ifra-standards\" target=\"_blank\" rel=\"noopener noreferrer\">IFRA explanation</a>.</p>"
          },
          {
            "question": "Can you support products intended for the United States?",
            "answerHtml": "<p>We can review available factory and product information needed for the project, but the U.S. Responsible Person and other parties must confirm MoCRA facility registration, product listing, safety substantiation and labeling responsibilities. Registration or listing is not FDA product approval. See the <a href=\"https://www.fda.gov/cosmetics/registration-listing-cosmetic-product-facilities-and-products\" target=\"_blank\" rel=\"noopener noreferrer\">FDA guidance</a>.</p>"
          },
          {
            "question": "Can you support products intended for the European Union?",
            "answerHtml": "<p>We can prepare or coordinate available formula and manufacturing information for review, but the EU Responsible Person must confirm the safety assessment, Product Information File, labeling and CPNP notification before market placement. CPNP is a notification system, not a factory certificate. See the <a href=\"https://single-market-economy.ec.europa.eu/sectors/cosmetics/cosmetic-product-notification-portal_en\" target=\"_blank\" rel=\"noopener noreferrer\">European Commission guidance</a>.</p>"
          },
          {
            "question": "Who is responsible for destination-market registration and final label compliance?",
            "answerHtml": "<p>The brand owner, importer, distributor or appointed Responsible Person normally retains final responsibility for market access and label approval, depending on local law. The factory can supply available technical and manufacturing information, but the buyer should identify the destination and regulatory pathway before production.</p>"
          }
        ]
      },
      {
        "id": "shipping",
        "category": "shipping",
        "number": "07",
        "title": "Shipping, Delivery &amp; After-Sales",
        "description": "Plan the freight route before finalizing product and carton specifications.",
        "questions": [
          {
            "question": "Why is alcohol-based perfume classified as dangerous goods?",
            "answerHtml": "<p>Perfume containing flammable solvents is commonly transported as UN 1266, Class 3 dangerous goods. The exact classification, packing group and route depend on the formula, concentration, package size and transport rules. See the <a href=\"https://unece.org/fileadmin/DAM/trans/danger/publi/unrec/rev18/English/Rev18_Volume1_Part2.pdf\" target=\"_blank\" rel=\"noopener noreferrer\">UNECE dangerous-goods list</a>.</p>"
          },
          {
            "question": "How are fragrance samples and bulk orders shipped internationally?",
            "answerHtml": "<p>Samples are sent through a suitable specialist channel after the actual courier cost is approved. Bulk orders may use dangerous-goods air or sea freight depending on destination, quantity and delivery requirement. Route availability is confirmed for each shipment rather than assumed globally.</p>"
          },
          {
            "question": "What happens if goods are damaged, leaking or inconsistent on arrival?",
            "answerHtml": "<p>Notify the project team promptly and retain the cartons, labels and affected goods. Provide the order number, batch reference, quantities, photographs and video so the factory and logistics parties can investigate. Any replacement, credit or other remedy follows the evidence, agreed specification and signed commercial terms.</p>"
          }
        ]
      }
    ],
    "empty": {
      "title": "No matching questions found",
      "text": "Try a broader keyword or send your project question directly to our team.",
      "href": "contact.html",
      "label": "Ask {{config.brand.name}}"
    },
    "cta": {
      "kicker": "Still evaluating your project?",
      "title": "Send Us the Details You Already Have",
      "text": "We will review your product, quantity, destination and customization requirements before recommending the next step.",
      "href": "contact.html#inquiry-form",
      "label": "Start Project Inquiry"
    }
  },
  "zh-CN": {
    "hero": {
      "kicker": "采购方知识库",
      "title": "香水 OEM / ODM 常见问题",
      "description": "关于合作方式、起订量、样品、包装、生产、合规和国际运输的实用说明。",
      "links": [
        {
          "href": "#faq-directory",
          "className": "btn-gold",
          "label": "浏览常见问题"
        },
        {
          "href": "/zh/contact.html",
          "className": "btn-outline",
          "label": "提交项目问题"
        }
      ]
    },
    "search": {
      "label": "搜索问题",
      "placeholder": "输入起订量、样品、包装或运输等关键词",
      "clearLabel": "清除",
      "filters": [
        {
          "value": "all",
          "label": "全部"
        },
        {
          "value": "projects",
          "label": "项目方式"
        },
        {
          "value": "moq",
          "label": "起订量与样品"
        },
        {
          "value": "production",
          "label": "生产与包装"
        },
        {
          "value": "shipping",
          "label": "合规与运输"
        }
      ],
      "ariaLabel": "FAQ categories"
    },
    "groups": [
      {
        "id": "projects",
        "category": "projects",
        "number": "01",
        "title": "项目与合作方式",
        "description": "根据已有资料和需要开发的范围选择合适路径。",
        "questions": [
          {
            "question": "{{ site.brand.name }} 是制造商还是贸易公司？",
            "answerHtml": "<p>{{ site.brand.name }} 是国际 B2B 香水制造项目，项目团队统一协调海外询盘、产品开发、生产和出口准备；香水生产由 {{ site.manufacturer.legalName }}在广州生产场地完成。</p>"
          },
          {
            "question": "私人标签、ODM 和 OEM 有什么区别？",
            "answerHtml": "<p>私人标签通常使用适合的现有香型和标准组件；ODM 根据品牌简报开发香型和包装；OEM 适合客户已有配方、组件、设计或技术标准的项目。</p>"
          },
          {
            "question": "你们支持哪些香氛产品？",
            "answerHtml": "<p>支持 EDP、EDT、Extrait 等精品香水方向，以及身体和发用香氛、部分家居香氛和香水包装项目。最终可行性取决于配方、组件、数量与目标市场。</p>"
          }
        ]
      },
      {
        "id": "moq",
        "category": "moq",
        "number": "02",
        "title": "起订量与样品",
        "description": "典型数量用于项目规划，实际要求取决于香型和包装。",
        "questions": [
          {
            "question": "典型起订量是多少？",
            "answerHtml": "<p>使用合适标准组件的私人标签项目典型起订量为 {{ fact(locale, 'privateLabelMoq') }}；定制香型项目通常从 {{ fact(locale, 'customMoq') }}开始。实际数量取决于配方、瓶器、装饰、包装和客户提供的材料。</p>"
          },
          {
            "question": "低于标准起订量可以生产吗？",
            "answerHtml": "<p>可以提交个案评估，但不保证可行。较低数量通常需要现有香型、现货瓶、简化装饰和标准包装，也可能提高单位成本。</p>"
          },
          {
            "question": "样品是否免费？",
            "answerHtml": "<p>基础香型评估样品免费，典型套装为 {{ fact(locale, 'sampleSet') }}。客户承担按目的地确认的实际快递或物流费用。</p>"
          },
          {
            "question": "样品准备需要多久？",
            "answerHtml": "<p>在需求、香型方向和寄送安排确认后，通常需要 {{ fact(locale, 'sampleDays') }}。特殊配方或定制包装样品需要另行评估。</p>"
          }
        ]
      },
      {
        "id": "production",
        "category": "production",
        "number": "03",
        "title": "生产、质量与包装",
        "description": "批量生产前应锁定产品标准和双方责任范围。",
        "questions": [
          {
            "question": "批量生产前会确认什么？",
            "answerHtml": "<p>应确认香型或配方方向、包装组件、设计稿、产品规格、批准样以及双方责任范围后再安排批量生产。</p>"
          },
          {
            "question": "客户可以提供瓶器或配方吗？",
            "answerHtml": "<p>可以。工厂会评估材料规格、数量、相容性、损耗和责任边界，确认可以执行的加工工序。</p>"
          },
          {
            "question": "如何控制批次一致性？",
            "answerHtml": "<p>通过确认的原料和配方资料、批次记录、工艺参数、灌装和包装检验，以及保留的批准标准进行控制。</p>"
          }
        ]
      },
      {
        "id": "shipping",
        "category": "shipping",
        "number": "04",
        "title": "合规与运输",
        "description": "区分工厂文件、市场准入责任和危险品运输要求。",
        "questions": [
          {
            "question": "工厂证书是否等于产品在所有市场合规？",
            "answerHtml": "<p>不是。工厂文件用于供应商和生产体系核验；品牌方、进口商或责任人仍需根据目标市场完成产品安全、标签、注册和声明审核。</p>"
          },
          {
            "question": "酒精香水如何国际运输？",
            "answerHtml": "<p>酒精香水可能属于危险品。实际分类、包装、标签、文件和承运路线应根据配方、闪点、单瓶容量、总量和运输方式逐票确认。</p>"
          }
        ]
      }
    ],
    "empty": {
      "title": "没有找到匹配问题",
      "text": "请尝试更宽泛的关键词，或直接联系项目团队。",
      "href": "/zh/contact.html",
      "label": "提交问题"
    },
    "cta": {
      "kicker": "仍在评估项目？",
      "title": "发送您已经确认的项目资料",
      "text": "我们会先评估产品、数量、目标市场和定制要求，再建议下一步。",
      "href": "/zh/contact.html#inquiry-form",
      "label": "提交项目需求"
    }
  }
};

// Keep the Chinese knowledge base at the same coverage level as English.
module.exports['zh-CN'].search.filters = [
  {value:'all',label:'全部'},
  {value:'getting-started',label:'项目入门'},
  {value:'moq-pricing',label:'起订量与价格'},
  {value:'fragrance-samples',label:'香型与样品'},
  {value:'packaging',label:'瓶器与包装'},
  {value:'production-quality',label:'生产与质量'},
  {value:'compliance',label:'证书与合规'},
  {value:'shipping',label:'运输与售后'}
];

module.exports['zh-CN'].groups = [
  {id:'getting-started',category:'getting-started',number:'01',title:'项目入门与合作方式',description:'了解可生产的产品，以及如何准备有效的项目需求。',questions:[
    {question:'{{config.brand.name}} 可以生产哪些香氛产品？',answerHtml:'<p>我们支持 EDP、EDT、Extrait 等精品香水，以及身体和发用香氛、部分家居香氛及香水包装项目。最终可行性取决于配方、组件、数量和目标市场。可查看<a href="/zh/#product-capabilities">产品能力</a>。</p>'},
    {question:'私人标签、OEM 和 ODM 有什么区别？',answerHtml:'<p>私人标签从现有香型方向和合适标准组件开始；ODM 根据品牌需求开发产品；OEM 或委托加工则使用客户提供的配方、材料、设计稿、规格或参考样品。可在<a href="/zh/process.html#service-models">服务页面</a>比较不同路径。</p>'},
    {question:'哪种合作方式适合我的项目？',answerHtml:'<p>私人标签通常最适合较小规模的市场测试；ODM 适合需要香型和包装开发的品牌；OEM 适合已有成熟资料或技术标准的采购方。提供您现有的资料后，我们会在审核后建议合适路径。</p>'},
    {question:'{{config.brand.name}} 是怎样的业务项目？',answerHtml:'<p>{{config.brand.name}} 是面向全球品牌方、进口商和分销商的国际 B2B 香水制造项目。项目团队统一协调海外询盘、产品开发、生产和出口准备；香水生产由 {{config.manufacturer.legalName}} 在网站展示的广州生产场地完成。合格采购方可在<a href="/zh/about.html">关于我们</a>页面查看受保护的证书预览并申请完整核验文件。</p>'},
    {question:'初创企业和首次创建香水品牌的客户可以合作吗？',answerHtml:'<p>可以。我们可以协助首次采购方明确产品形式、数量、香型方向和包装路径。清晰的预算、目标市场和上市目标有助于推荐现实的标准组件方案，避免不必要的定制模具。</p>'},
    {question:'申请报价需要提供哪些信息？',answerHtml:'<p>请提供产品类别、预计数量、目标国家、香型方向、瓶器或包装偏好、计划上市时间，以及任何客供配方、设计稿或参考样品。尚未确定的内容可在<a href="/zh/contact.html#inquiry-form">项目询盘表单</a>中标记。</p>'}
  ]},
  {id:'moq-pricing',category:'moq-pricing',number:'02',title:'起订量、价格与商业条件',description:'起始数量是项目指引，并非自动批准或拒绝规则。',questions:[
    {question:'典型最低订购数量是多少？',answerHtml:'<p>采用合适标准组件时，私人标签项目的典型起订量为 {{fact("privateLabelMoq")}}，定制香型项目通常从 {{fact("customMoq")}} 开始。实际数量取决于配方、瓶器、装饰、包装和客供材料。</p>'},
    {question:'可以审核低于标准起订量的项目吗？',answerHtml:'<p>可以，团队可以评估较小的试单。可行方案可能需要现有香型、现货瓶、简化装饰或标准彩盒。较低数量也会影响单位成本和组件选择。请在<a href="/zh/contact.html#inquiry-form">询盘表单</a>中选择低数量评估。</p>'},
    {question:'不同香型或瓶型可以合并达到起订量吗？',answerHtml:'<p>起订量通常按批准的 SKU、香精批次和包装配置评估。共用兼容组件和生产要求时，部分款式可能合并，但不会自动适用。请提供计划的 SKU 数量拆分，以便确认每款可执行数量。</p>'},
    {question:'哪些因素会影响香水单价？',answerHtml:'<p>主要因素包括香精浓度、瓶器和泵头、瓶盖材料、装饰方式、彩盒结构、订单数量、客供材料、测试要求和出口包装。较低起订量通常单价更高，因为设置和采购成本分摊在更少产品上。</p>'},
    {question:'香型开发、包装设置或模具费用是否单独收取？',answerHtml:'<p>有可能。定制配方、额外打样轮次、印刷设置、装饰治具、瓶器或瓶盖模具和特殊包装样品会分别评估。任何适用的开发或模具费用都会在项目推进前列入报价。</p>'},
    {question:'付款条件和报价有效期如何确认？',answerHtml:'<p>付款节点、币种、收款信息和报价有效期会在正式报价或形式发票中说明。条件会随开发范围、定制模具、客供材料和生产金额变化，因此网站不提供统一付款计划。</p>'}
  ]},
  {id:'fragrance-samples',category:'fragrance-samples',number:'03',title:'香型开发与样品',description:'在投入量产前先评估香型方向。',questions:[
    {question:'香型评估样品免费吗？',answerHtml:'<p>基础香型评估样品免费，客户只承担寄往目的地的实际快递费用。特殊配方、额外修改轮次或定制包装样品如产生额外费用，会另行评估。详见<a href="/zh/process.html#free-samples">样品政策</a>。</p>'},
    {question:'样品套装包含什么，准备需要多久？',answerHtml:'<p>典型评香套装包含 {{fact("sampleSet")}} 香型样品。确认需求和香型方向后，通常需要 {{fact("sampleDays")}} 准备。快递费用按目的地计算，并在寄出前确认。</p>'},
    {question:'可以根据品牌需求开发香型吗？',answerHtml:'<p>可以。有效需求应包含目标顾客、价格定位、香调家族、参考香调、浓度、目标市场和包装概念。我们会将方向转化为评估样品，并明确修改范围和批准节点。</p>'},
    {question:'可以从现有香精配方库中选择吗？',answerHtml:'<p>可以。现有香型方向能够缩短开发时间，适合私人标签项目。选择前会核对供应情况、预期用途、浓度和目标市场要求。现有配方库中的香型不会自动成为某个品牌独家使用。</p>'},
    {question:'可以按照参考香水或客户提供的香氛样品开发吗？',answerHtml:'<p>我们可以评估参考样品，以理解嗅觉方向、表现目标和预算。目标是形成可执行且合法的产品规格，而不是承诺完全复制第三方品牌香水或受保护的产品呈现。</p>'},
    {question:'可以进行多少轮香型修改？',answerHtml:'<p>包含的修改范围会在打样方案中确认，取决于项目使用现有方向还是全新定制需求，以及反馈对原目标的改变程度。额外轮次可能影响时间或费用，并会在继续前确认。</p>'},
    {question:'可以生产 EDP、EDT、Extrait 或无酒精产品吗？',answerHtml:'<p>可根据配方和用途规划 EDP、EDT 与 Extrait 浓度。无酒精或替代载体形式需要单独进行可行性、稳定性、包装和目标市场审核。浓度名称本身不能保证留香，配方、用量和使用方式同样重要。</p>'},
    {question:'定制配方归谁所有，如何处理保密？',answerHtml:'<p>保密、配方使用及任何独家安排会针对具体项目书面约定，适用时可审核保密协议。现有配方库通常非独家；定制开发的所有权或独家权仅在签署的商业协议明确列入时适用。</p>'}
  ]},
  {id:'packaging',category:'packaging',number:'04',title:'瓶器、包装与装饰',description:'根据数量、预算和上市时间选择包装路径。',questions:[
    {question:'现货包装与定制瓶器模具有何区别？',answerHtml:'<p>现货包装使用现有瓶器、泵头和瓶盖，通常起始数量较低、采购时间较短。定制模具可形成项目专属组件，但需要模具、开发样品、更高数量和由组件供应商确认的更长周期。</p>'},
    {question:'瓶器、泵头、瓶盖和彩盒哪些部分可以定制？',answerHtml:'<p>根据数量和兼容性，可选择瓶器颜色或喷涂、泵头和肩套表面、瓶盖材料、标签、直接印刷和彩盒结构。专属瓶型或瓶盖形状需要技术审核和定制模具，并非简单装饰。</p>'},
    {question:'可以提供哪些装饰工艺？',answerHtml:'<p>常见选项包括喷涂、磨砂、丝印、标签、烫箔和部分二次包装工艺。可用性取决于组件材料、设计稿、数量和供应商能力；需要时会通过样品确认可实现的颜色、附着力和套位标准。</p>'},
    {question:'客户应提供哪些设计稿和标签文件？',answerHtml:'<p>标志和印刷版面建议提供 AI、可编辑 PDF 或 EPS 等矢量文件，并包含品牌文字、净含量、条码、市场必需文字和颜色标准。最终法律标签仍由采购方或目标市场责任方批准。</p>'},
    {question:'客户可以提供自有瓶器、包装或组件吗？',answerHtml:'<p>可以，可在 OEM 或委托加工模式下评估。组件必须按约定数量、状态和时间到货，并可能在量产批准前进行来料检验、灌装试验和兼容性测试。</p>'},
    {question:'如何测试瓶器、泵头和香水的兼容性？',answerHtml:'<p>检查可包括配合、压口或封口完整性、泄漏、喷雾表现、外观，以及配方与密封件、泵头和装饰的相互作用。测试方案会对应所选配方和组件，不能只凭目录图片批准包装。</p>'}
  ]},
  {id:'production-quality',category:'production-quality',number:'05',title:'生产、交期与质量控制',description:'明确批准节点可以减少可避免的生产风险。',questions:[
    {question:'香水订单的主要生产阶段有哪些？',answerHtml:'<p>典型项目依次进行需求审核、报价、打样、配方与包装批准、材料采购、调配、按要求静置或过滤、灌装、封口、装配、检验和出货准备。准确路径取决于合作方式。</p>'},
    {question:'5 天原料采购期是否代表总交期？',answerHtml:'<p>不是。约 5 天仅指项目确认后采购适用的常规原料。定制瓶器、瓶盖、印刷彩盒、特殊装饰、生产、检验和运输需要分别排期，可能需要更长时间。</p>'},
    {question:'大货生产周期如何计算？',answerHtml:'<p>配方、组件、设计稿、数量和质量要求批准后才会确认交期。现货组件项目通常更快；定制模具、装饰、硬盒、客供材料和生产旺季会延长排期。</p>'},
    {question:'生产中会执行哪些质量检查？',answerHtml:'<p>适用方案可能覆盖来料、配方外观和气味、灌装量、压口或封口完整性、泄漏、喷雾功能、编码、装饰、装配和最终包装。测试范围以批准的产品规格为依据。</p>'},
    {question:'量产前是否需要批准产前样品？',answerHtml:'<p>项目通常需要在量产前批准相关香型方向、包装组件、设计稿和成品呈现。根据项目内容，批准形式可能是实物样品、数码设计稿、组件样品或签署规格。</p>'},
    {question:'如何管理批次一致性和补单？',answerHtml:'<p>批准规格、批次记录和留存标准用于指导重复生产。原料或包装变更影响批准标准时会重新审核。申请补单时，采购方应提供上一订单或 SKU 编号。</p>'}
  ]},
  {id:'compliance',category:'compliance',number:'06',title:'证书、文件与市场合规',description:'区分工厂文件与目标市场责任。',questions:[
    {question:'采购方可以核验哪些工厂证书？',answerHtml:'<p>现有生产及质量文件的受保护预览展示在<a href="/zh/about.html#certificates">证书核验区域</a>。合格采购方可通过 WhatsApp 申请相关完整副本。应将文件范围和有效期与证书列示的法律主体核对。</p>'},
    {question:'可以提供哪些 SDS、COA、批次和香精文件？',answerHtml:'<p>可用资料可能包括 SDS、COA、批次记录和与批准配方相关的香精文件。准确文件包取决于产品类型、原料供应商、目的地和商业协议，并非每款 SKU 或市场都自动具备所有文件。</p>'},
    {question:'IFRA 符合性证书代表什么？',answerHtml:'<p>它是供应商针对预期用途出具的香精混合物符合适用 IFRA 标准的声明，并非由 IFRA 出具，不能替代产品安全评估或当地法规义务。参见 <a href="https://ifrafragrance.org/initiatives-positions/safe-use-fragrance-science/ifra-standards" target="_blank" rel="noopener noreferrer">IFRA 说明</a>。</p>'},
    {question:'可以支持计划在美国销售的产品吗？',answerHtml:'<p>我们可以整理项目所需的现有工厂和产品资料，但美国责任人及相关方必须确认 MoCRA 设施注册、产品列名、安全证明和标签责任。注册或列名不代表 FDA 产品批准。参见 <a href="https://www.fda.gov/cosmetics/registration-listing-cosmetic-product-facilities-and-products" target="_blank" rel="noopener noreferrer">FDA 指南</a>。</p>'},
    {question:'可以支持计划在欧盟销售的产品吗？',answerHtml:'<p>我们可以准备或协调现有配方和生产资料，但欧盟责任人必须在产品上市前确认安全评估、产品信息档案、标签和 CPNP 通报。CPNP 是通报系统，不是工厂证书。参见<a href="https://single-market-economy.ec.europa.eu/sectors/cosmetics/cosmetic-product-notification-portal_en" target="_blank" rel="noopener noreferrer">欧盟委员会指南</a>。</p>'},
    {question:'谁负责目标市场注册和最终标签合规？',answerHtml:'<p>根据当地法律，品牌方、进口商、经销商或指定责任人通常承担市场准入和标签批准的最终责任。工厂可以提供现有技术和生产资料，但采购方应在生产前确定目的地和法规路径。</p>'}
  ]},
  {id:'shipping',category:'shipping',number:'07',title:'运输、交付与售后',description:'在最终确定产品和外箱规格前规划运输路线。',questions:[
    {question:'为什么含酒精香水被归类为危险品？',answerHtml:'<p>含易燃溶剂的香水通常按 UN 1266、第 3 类危险品运输。准确分类、包装类别和路线取决于配方、浓度、包装容量和运输规则。参见 <a href="https://unece.org/fileadmin/DAM/trans/danger/publi/unrec/rev18/English/Rev18_Volume1_Part2.pdf" target="_blank" rel="noopener noreferrer">UNECE 危险品清单</a>。</p>'},
    {question:'香型样品和大货如何进行国际运输？',answerHtml:'<p>实际快递费获批后，样品通过适合的专业渠道寄送。大货可根据目的地、数量和交付要求选择危险品空运或海运。每票货物单独确认路线，而不能假定全球通用。</p>'},
    {question:'货物到达后损坏、泄漏或不一致怎么办？',answerHtml:'<p>请及时通知项目团队，并保留外箱、标签和受影响产品。提供订单号、批次编号、数量、照片和视频，以便工厂与物流方调查。补货、抵扣或其他处理将依据证据、约定规格和签署的商业条款执行。</p>'}
  ]}
];
