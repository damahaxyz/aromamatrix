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

function buildTranslatedFaq(locale) {
  const english = module.exports.en;
  return {
    hero: {
      ...english.hero,
      kicker: locale.hero[0],
      title: locale.hero[1],
      description: locale.hero[2],
      links: english.hero.links.map((link, index) => ({...link, label: locale.hero[3 + index]}))
    },
    search: {
      ...english.search,
      label: locale.search[0],
      placeholder: locale.search[1],
      clearLabel: locale.search[2],
      filters: english.search.filters.map((filter, index) => ({...filter, label: locale.filters[index]})),
      ariaLabel: locale.search[3]
    },
    groups: english.groups.map((group, groupIndex) => ({
      ...group,
      title: locale.groups[groupIndex].title,
      description: locale.groups[groupIndex].description,
      questions: group.questions.map((question, questionIndex) => ({
        question: locale.groups[groupIndex].questions[questionIndex][0],
        answerHtml: locale.groups[groupIndex].questions[questionIndex][1]
      }))
    })),
    empty: {
      ...english.empty,
      title: locale.empty[0],
      text: locale.empty[1],
      label: locale.empty[2]
    },
    cta: {
      ...english.cta,
      kicker: locale.cta[0],
      title: locale.cta[1],
      text: locale.cta[2],
      label: locale.cta[3]
    }
  };
}

module.exports.es = buildTranslatedFaq({
  hero: ['Base de conocimientos para compradores', 'Preguntas frecuentes sobre fabricación de perfumes', 'Respuestas prácticas para propietarios de marcas, importadores y equipos de compras que evalúan la producción de fragancias de marca privada, OEM y ODM.', 'Consultar preguntas', 'Preguntar a la fábrica'],
  search: ['Buscar en todas las preguntas', 'Pruebe: MOQ, muestra gratuita, IFRA, frasco o envío', 'Borrar', 'Categorías de preguntas frecuentes'],
  filters: ['Todas', 'Primeros pasos', 'MOQ y precios', 'Fragancias y muestras', 'Envases', 'Producción y control de calidad', 'Cumplimiento normativo', 'Envíos'],
  groups: [
    {title: 'Primeros pasos y modelos de cooperación', description: 'Conozca qué fabricamos y cómo preparar un briefing de proyecto útil.', questions: [
      ['¿Qué productos de perfumería puede fabricar {{config.brand.name}}?', '<p>Trabajamos con formatos de perfumería fina como EDP, EDT y extrait, además de brumas corporales y capilares, determinados formatos de ambientación y proyectos de envases para perfumes. La viabilidad final depende de la fórmula, los componentes, la cantidad y el mercado de destino. Consulte nuestras <a href="index.html#product-capabilities">categorías de fabricación</a>.</p>'],
      ['¿Cuál es la diferencia entre marca privada, OEM y ODM?', '<p>La marca privada parte de perfiles olfativos existentes y componentes estándar adecuados. El ODM desarrolla un producto a partir del briefing de su marca, mientras que el OEM o procesamiento por contrato utiliza una fórmula, materiales, artes finales, especificaciones o una referencia aportados por usted. Compare las modalidades en nuestra <a href="process.html#service-models">página de servicios</a>.</p>'],
      ['¿Qué modelo de cooperación es adecuado para mi proyecto?', '<p>La marca privada suele ser la vía más rápida para una prueba de mercado de menor escala. El ODM es apropiado para marcas que necesitan desarrollar la fragancia y el envase, mientras que el OEM se adapta a compradores con insumos o normas técnicas ya establecidos. Comparta lo que ya tiene y le recomendaremos una modalidad tras revisarlo.</p>'],
      ['¿{{config.brand.name}} es un fabricante o una empresa comercializadora?', '<p>{{config.brand.name}} es un programa internacional de fabricación B2B de perfumes. El equipo del proyecto coordina las consultas internacionales, el desarrollo, la fabricación y la preparación para exportación, mientras que la producción corre a cargo de {{config.manufacturer.legalName}} en las instalaciones de Guangzhou mostradas en este sitio web. Los compradores cualificados pueden consultar vistas protegidas de certificados y solicitar documentos completos de verificación en <a href="about.html">Quiénes somos</a>.</p>'],
      ['¿Pueden trabajar con ustedes empresas emergentes y marcas de fragancias primerizas?', '<p>Sí. Podemos ayudar a compradores primerizos a definir el formato del producto, la cantidad, la dirección olfativa y la modalidad de envase. Un presupuesto, mercado de destino y objetivo de lanzamiento claros nos permiten recomendar opciones realistas con componentes estándar sin imponer utillajes personalizados innecesarios.</p>'],
      ['¿Qué información debo facilitar para recibir una cotización?', '<p>Indique la categoría del producto, cantidad estimada, país de destino, dirección olfativa, preferencia de frasco o envase, fecha prevista de lanzamiento y cualquier fórmula, arte final o muestra de referencia que aporte. Los datos pendientes pueden marcarse como no decididos en nuestro <a href="contact.html#inquiry-form">formulario de consulta del proyecto</a>.</p>']
    ]},
    {title: 'MOQ, precios y condiciones comerciales', description: 'Las cantidades iniciales son orientativas, no reglas automáticas de aprobación o rechazo.', questions: [
      ['¿Cuál es su cantidad mínima de pedido habitual?', '<p>{{config.policies.moq}}</p>'],
      ['¿Pueden evaluar un proyecto por debajo del MOQ estándar?', '<p>Sí, nuestro equipo puede evaluar una solicitud piloto de menor volumen. Las opciones viables pueden exigir una dirección olfativa existente, un frasco en stock, una decoración simplificada o una caja estándar. Las cantidades menores también pueden afectar al coste unitario y a la elección de componentes. Seleccione “Por debajo de {{config.services.privateLabel.moq.pcs}}” en el <a href="contact.html#inquiry-form">formulario de consulta</a> para solicitar una evaluación.</p>'],
      ['¿Se pueden combinar distintas fragancias o diseños de frasco para alcanzar el MOQ?', '<p>El MOQ se evalúa normalmente por SKU aprobado, lote de fragancia y configuración de envase. Puede ser posible combinar variantes cuando comparten componentes compatibles y requisitos de producción, pero no se admite automáticamente. Envíe el desglose previsto por SKU para que confirmemos la cantidad viable de cada artículo.</p>'],
      ['¿Qué factores afectan al precio unitario del perfume?', '<p>Los factores principales incluyen la concentración de fragancia, el frasco y la bomba, el material del tapón, el método de decoración, la estructura de la caja, la cantidad del pedido, los materiales aportados, los requisitos de ensayo y el embalaje de exportación. Un MOQ menor suele generar un coste unitario mayor porque los costes de preparación y compra se reparten entre menos unidades.</p>'],
      ['¿El desarrollo de la fragancia, la preparación del envase o los moldes se cobran por separado?', '<p>Es posible. La formulación personalizada, las rondas adicionales de muestras, la preparación de impresión, los útiles de decoración, los moldes de frasco o tapón y los prototipos de envases especiales se evalúan por separado. Cualquier coste aplicable de desarrollo o utillaje se identifica en la cotización antes de continuar el proyecto.</p>'],
      ['¿Cómo se confirman las condiciones de pago y la validez de la cotización?', '<p>Las etapas de pago, la moneda aprobada, los datos del beneficiario y la validez de la cotización se indican en la cotización formal o factura proforma del proyecto. Las condiciones pueden variar según el alcance del desarrollo, el utillaje personalizado, los materiales aportados y el valor de producción, por lo que el sitio web no publica un calendario de pagos universal.</p>']
    ]},
    {title: 'Desarrollo de fragancias y muestras', description: 'Evalúe la dirección olfativa antes de comprometerse con la producción en serie.', questions: [
      ['¿Las muestras de evaluación olfativa son gratuitas?', '<p>Sí. Las muestras básicas de evaluación olfativa son gratuitas; solo paga el coste real de mensajería hasta su destino. Las formulaciones especiales, rondas adicionales de revisión o muestras de envases personalizados se evalúan por separado si conllevan costes adicionales. Consulte la <a href="process.html#free-samples">política completa de muestras</a>.</p>'],
      ['¿Qué incluye el kit de muestras y cuánto tarda en prepararse?', '<p>{{config.policies.samples}}</p>'],
      ['¿Pueden desarrollar una fragancia a partir del briefing de nuestra marca?', '<p>Sí. Un briefing útil incluye cliente objetivo, posicionamiento de precio, familia olfativa, notas de referencia, concentración, mercado de destino y concepto de envase. Convertimos estas indicaciones en muestras para evaluación y después definimos el alcance de las revisiones y los puntos de aprobación del proyecto.</p>'],
      ['¿Podemos elegir de una biblioteca de fórmulas de fragancias existente?', '<p>Sí. Las direcciones olfativas existentes pueden acortar el desarrollo y funcionan bien para proyectos de marca privada. Antes de la selección se comprueban la disponibilidad, el uso previsto, la concentración y los requisitos del destino. Las fórmulas existentes de la biblioteca no son automáticamente exclusivas de una marca.</p>'],
      ['¿Pueden trabajar a partir de un perfume de referencia o una muestra de fragancia aportada?', '<p>Podemos evaluar una referencia aportada para comprender la dirección olfativa, el objetivo de rendimiento y el presupuesto. El objetivo es desarrollar una especificación de producto viable y lícita, no prometer una copia exacta de una fragancia de marca de terceros o de una presentación protegida.</p>'],
      ['¿Cuántas rondas de revisión de la fragancia están disponibles?', '<p>El alcance de revisión incluido se confirma en la propuesta de muestreo. Depende de si el proyecto utiliza una dirección existente o un nuevo briefing personalizado, y de cuánto modifiquen los comentarios el objetivo original. Las rondas adicionales pueden afectar al plazo o al coste y se aprueban antes de continuar.</p>'],
      ['¿Pueden producir formatos EDP, EDT, extrait o sin alcohol?', '<p>La planificación de concentraciones EDP, EDT y extrait está disponible según la fórmula y el uso previsto. Los formatos sin alcohol o con bases alternativas requieren una evaluación independiente de viabilidad, estabilidad, envase y destino. La denominación de la concentración por sí sola no garantiza la duración; también importan la fórmula, la dosificación y la aplicación.</p>'],
      ['¿A quién pertenece la fórmula personalizada y cómo se gestiona la confidencialidad?', '<p>La confidencialidad, el uso de la fórmula y cualquier exclusividad se acuerdan por escrito para el proyecto específico. Pueden revisarse acuerdos de confidencialidad cuando proceda. Las fórmulas existentes de la biblioteca suelen ser no exclusivas; la propiedad o exclusividad de un desarrollo personalizado solo se aplica cuando se incluye expresamente en el acuerdo comercial firmado.</p>']
    ]},
    {title: 'Frascos, envases y decoración', description: 'Ajuste la modalidad de envase a la cantidad, el presupuesto y el calendario de lanzamiento.', questions: [
      ['¿Cuál es la diferencia entre un envase en stock y un molde de frasco personalizado?', '<p>El envase en stock utiliza formatos existentes de frasco, bomba y tapón, y normalmente ofrece cantidades iniciales menores y plazos de compra más cortos. Un molde personalizado crea un componente específico del proyecto, pero requiere utillaje, muestras de desarrollo, cantidades mayores y un calendario más largo confirmado con el proveedor del componente.</p>'],
      ['¿Qué elementos del frasco, bomba, tapón y caja pueden personalizarse?', '<p>Según la cantidad y la compatibilidad, las opciones pueden incluir color o recubrimiento del frasco, acabado de la bomba y el collarín, material del tapón, etiqueta, impresión directa y estructura de la caja exterior. Las formas específicas de frasco o tapón requieren revisión técnica y utillaje personalizado, no una simple decoración.</p>'],
      ['¿Qué procesos de decoración están disponibles?', '<p>Las opciones habituales incluyen recubrimiento de color, esmerilado, serigrafía, etiquetas, estampación con foil y determinados acabados de envase secundario. La disponibilidad depende del material del componente, el arte final, la cantidad y la capacidad del proveedor. Cuando sea necesario, confirmamos mediante muestras los estándares alcanzables de color, adherencia y registro.</p>'],
      ['¿Qué archivos de arte final y etiqueta debe proporcionar el cliente?', '<p>Para logotipos y diseños de impresión se prefieren archivos vectoriales como AI, PDF editable o EPS. Incluya el texto de marca, contenido neto, código de barras, textos exigidos por el mercado y referencias de color. El comprador o la parte responsable en el mercado de destino conserva la responsabilidad de la aprobación legal final de la etiqueta.</p>'],
      ['¿Pueden los clientes aportar sus propios frascos, envases o componentes?', '<p>Sí, los componentes aportados por el cliente pueden considerarse bajo un modelo OEM o de procesamiento por contrato. Deben llegar en la cantidad, estado y plazo acordados, y pueden requerir inspección de entrada, pruebas de llenado y controles de compatibilidad antes de aprobar la producción en serie.</p>'],
      ['¿Cómo comprueban la compatibilidad entre frasco, bomba y fragancia?', '<p>Los controles pueden incluir ajuste, integridad del engaste o cierre, fugas, rendimiento de pulverización, apariencia e interacción de la fórmula con juntas, bombas y decoración. El plan de ensayo se adapta a la fórmula y los componentes seleccionados; ningún envase debe considerarse aprobado únicamente a partir de una imagen de catálogo.</p>']
    ]},
    {title: 'Producción, plazo y control de calidad', description: 'Unos puntos de aprobación definidos reducen riesgos de producción evitables.', questions: [
      ['¿Cuáles son las principales etapas de producción de un pedido de perfume?', '<p>Un proyecto típico pasa por revisión del briefing, cotización, muestreo, aprobación de fórmula y envase, compra de materiales, mezcla, acondicionamiento o filtrado cuando se especifique, llenado, sellado, montaje, inspección y preparación del envío. La ruta exacta depende del modelo de cooperación.</p>'],
      ['¿El periodo de 5 días para comprar materias primas equivale al plazo total de entrega?', '<p>No. Los aproximadamente cinco días se refieren únicamente a la compra de materias primas estándar adecuadas tras la confirmación del proyecto. Los frascos y tapones personalizados, cajas impresas, decoraciones especiales, producción, inspección y transporte se programan por separado y pueden requerir bastante más tiempo.</p>'],
      ['¿Cómo se calcula el plazo de producción en serie?', '<p>El plazo se confirma una vez aprobados la fórmula, los componentes, el arte final, la cantidad y los requisitos de calidad. Los proyectos con componentes en stock suelen ser más rápidos; los moldes personalizados, la decoración, las cajas rígidas, los materiales aportados por el cliente y los periodos de máxima producción pueden ampliar el calendario.</p>'],
      ['¿Qué controles de calidad se realizan durante la producción?', '<p>El plan aplicable puede abarcar materiales entrantes, apariencia y olor de la fórmula, volumen de llenado, integridad del engaste o cierre, fugas, función de pulverización, codificación, decoración, montaje y embalaje final. El alcance de los ensayos se define con respecto a la especificación de producto aprobada.</p>'],
      ['¿Se aprueba una muestra de preproducción antes de la producción en serie?', '<p>Los proyectos suelen requerir la aprobación de la dirección olfativa pertinente, los componentes del envase, el arte final y la presentación terminada antes de la producción en serie. Según el elemento, la aprobación puede adoptar la forma de muestra física, arte final digital, muestra de componente o especificación firmada.</p>'],
      ['¿Cómo gestionan la consistencia entre lotes y los pedidos repetidos?', '<p>Las especificaciones aprobadas, los registros de lote y las referencias conservadas ayudan a orientar la producción repetida. Los cambios de materias primas o envases se revisan cuando afectan al estándar aprobado. Al solicitar una repetición, los compradores deben facilitar la referencia del pedido o SKU anterior.</p>']
    ]},
    {title: 'Certificados, documentos y cumplimiento del mercado', description: 'Distinga la documentación de fábrica de las responsabilidades del mercado de destino.', questions: [
      ['¿Qué certificados de fábrica pueden verificar los compradores?', '<p>En nuestra <a href="about.html#certificates">sección de verificación de certificados</a> se muestran vistas protegidas de los documentos disponibles de fabricación y calidad. Los compradores cualificados pueden solicitar por WhatsApp copias completas pertinentes para la homologación del proveedor. El alcance y la vigencia del documento deben comprobarse con la entidad jurídica indicada en cada certificado.</p>'],
      ['¿Qué documentos SDS, COA, de lote y de fragancia pueden suministrarse?', '<p>Los documentos disponibles pueden incluir SDS, COA, registros relacionados con el lote y documentación de fragancias correspondiente a la fórmula aprobada. El paquete exacto depende del tipo de producto, el proveedor de ingredientes, el destino y el acuerdo comercial, por lo que no todos los documentos están disponibles automáticamente para cada SKU o mercado.</p>'],
      ['¿Qué significa un Certificado de Conformidad IFRA?', '<p>Es una declaración emitida por el proveedor de que una mezcla de fragancia cumple las Normas IFRA aplicables para un uso previsto. No la emite IFRA, no sustituye una evaluación de seguridad del producto ni elimina la obligación de cumplir la legislación local. Consulte la <a href="https://ifrafragrance.org/initiatives-positions/safe-use-fragrance-science/ifra-standards" target="_blank" rel="noopener noreferrer">explicación de IFRA</a>.</p>'],
      ['¿Pueden prestar apoyo a productos destinados a Estados Unidos?', '<p>Podemos revisar la información disponible de fábrica y producto necesaria para el proyecto, pero la Persona Responsable en EE. UU. y las demás partes deben confirmar el registro de instalaciones conforme a MoCRA, el listado del producto, la justificación de seguridad y las responsabilidades de etiquetado. El registro o listado no constituye aprobación del producto por la FDA. Consulte la <a href="https://www.fda.gov/cosmetics/registration-listing-cosmetic-product-facilities-and-products" target="_blank" rel="noopener noreferrer">guía de la FDA</a>.</p>'],
      ['¿Pueden prestar apoyo a productos destinados a la Unión Europea?', '<p>Podemos preparar o coordinar la información disponible de fórmula y fabricación para su revisión, pero la Persona Responsable de la UE debe confirmar la evaluación de seguridad, el Expediente de Información del Producto, el etiquetado y la notificación CPNP antes de la comercialización. CPNP es un sistema de notificación, no un certificado de fábrica. Consulte la <a href="https://single-market-economy.ec.europa.eu/sectors/cosmetics/cosmetic-product-notification-portal_en" target="_blank" rel="noopener noreferrer">guía de la Comisión Europea</a>.</p>'],
      ['¿Quién es responsable del registro en el mercado de destino y del cumplimiento final de la etiqueta?', '<p>El propietario de la marca, importador, distribuidor o Persona Responsable designada suele conservar la responsabilidad final del acceso al mercado y de la aprobación de la etiqueta, según la legislación local. La fábrica puede facilitar la información técnica y de fabricación disponible, pero el comprador debe identificar el destino y la vía regulatoria antes de la producción.</p>']
    ]},
    {title: 'Envío, entrega y posventa', description: 'Planifique la ruta de transporte antes de cerrar las especificaciones del producto y las cajas.', questions: [
      ['¿Por qué el perfume con alcohol se clasifica como mercancía peligrosa?', '<p>El perfume que contiene disolventes inflamables se transporta habitualmente como mercancía peligrosa UN 1266, Clase 3. La clasificación exacta, el grupo de embalaje y la ruta dependen de la fórmula, la concentración, el tamaño del envase y las normas de transporte. Consulte la <a href="https://unece.org/fileadmin/DAM/trans/danger/publi/unrec/rev18/English/Rev18_Volume1_Part2.pdf" target="_blank" rel="noopener noreferrer">lista de mercancías peligrosas de UNECE</a>.</p>'],
      ['¿Cómo se envían internacionalmente las muestras de fragancia y los pedidos a granel?', '<p>Las muestras se envían por un canal especializado adecuado una vez aprobado el coste real de mensajería. Los pedidos a granel pueden transportarse por vía aérea o marítima como mercancía peligrosa, según el destino, la cantidad y el requisito de entrega. La disponibilidad de la ruta se confirma para cada envío, no se presupone a escala mundial.</p>'],
      ['¿Qué ocurre si la mercancía llega dañada, con fugas o presenta inconsistencias?', '<p>Informe de inmediato al equipo del proyecto y conserve las cajas, etiquetas y productos afectados. Facilite el número de pedido, referencia de lote, cantidades, fotografías y vídeo para que la fábrica y las partes logísticas puedan investigar. Cualquier reposición, abono u otra solución se regirá por las pruebas, la especificación acordada y las condiciones comerciales firmadas.</p>']
    ]}
  ],
  empty: ['No se encontraron preguntas coincidentes', 'Pruebe con una palabra clave más general o envíe directamente la pregunta de su proyecto a nuestro equipo.', 'Preguntar a {{config.brand.name}}'],
  cta: ['¿Aún está evaluando su proyecto?', 'Envíenos los datos que ya tenga', 'Revisaremos su producto, cantidad, destino y requisitos de personalización antes de recomendar el siguiente paso.', 'Iniciar consulta del proyecto']
});

module.exports.ar = buildTranslatedFaq({
  hero: ['قاعدة معرفة المشترين', 'الأسئلة الشائعة حول تصنيع العطور', 'إجابات عملية لأصحاب العلامات التجارية والمستوردين وفرق التوريد الذين يقيّمون إنتاج العطور بالعلامة الخاصة ونظامي OEM وODM.', 'تصفّح الأسئلة', 'اسأل المصنع'],
  search: ['البحث في جميع الأسئلة', 'جرّب: MOQ، عينة مجانية، IFRA، زجاجة أو شحن', 'مسح', 'فئات الأسئلة الشائعة'],
  filters: ['الكل', 'البدء', 'MOQ والأسعار', 'العطور والعينات', 'التعبئة والتغليف', 'الإنتاج ومراقبة الجودة', 'الامتثال', 'الشحن'],
  groups: [
    {title: 'البدء ونماذج التعاون', description: 'تعرّف على ما نصنّعه وكيفية إعداد موجز مشروع مفيد.', questions: [
      ['ما منتجات العطور التي تستطيع {{config.brand.name}} تصنيعها؟', '<p>ندعم صيغ العطور الراقية مثل EDP وEDT وextrait، إلى جانب رذاذ الجسم والشعر، وبعض صيغ العطور المنزلية ومشروعات تعبئة العطور. تعتمد الجدوى النهائية على التركيبة والمكوّنات والكمية والسوق المستهدفة. راجع <a href="index.html#product-capabilities">فئات التصنيع</a> لدينا.</p>'],
      ['ما الفرق بين العلامة الخاصة وOEM وODM؟', '<p>تبدأ العلامة الخاصة من توجهات عطرية موجودة ومكوّنات قياسية مناسبة. يطوّر ODM منتجًا انطلاقًا من موجز علامتك التجارية، بينما يستخدم OEM أو التصنيع التعاقدي تركيبة أو مواد أو تصميمًا فنيًا أو مواصفة أو مرجعًا تقدمه أنت. قارن بين المسارات في <a href="process.html#service-models">صفحة الخدمات</a>.</p>'],
      ['أي نموذج تعاون يناسب مشروعي؟', '<p>تكون العلامة الخاصة عادةً أسرع مسار لاختبار سوق محدود. يناسب ODM العلامات التي تحتاج إلى تطوير العطر والتعبئة، بينما يناسب OEM المشترين الذين لديهم مدخلات أو معايير فنية محددة بالفعل. شاركنا ما لديك وسنوصي بالمسار المناسب بعد المراجعة.</p>'],
      ['هل {{config.brand.name}} جهة مصنّعة أم شركة تجارية؟', '<p>{{config.brand.name}} برنامج دولي لتصنيع العطور بين الشركات B2B. ينسّق فريق المشروع الاستفسارات الدولية والتطوير والتصنيع والتحضير للتصدير، بينما تتولى {{config.manufacturer.legalName}} الإنتاج في منشأة Guangzhou المعروضة على هذا الموقع. يمكن للمشترين المؤهلين مراجعة معاينات محمية للشهادات وطلب وثائق التحقق الكاملة عبر <a href="about.html">من نحن</a>.</p>'],
      ['هل يمكن للشركات الناشئة والعلامات التي تطلق عطرها للمرة الأولى العمل معكم؟', '<p>نعم. يمكننا مساعدة المشترين للمرة الأولى في تحديد صيغة المنتج والكمية والتوجه العطري ومسار التعبئة. تساعدنا الميزانية والسوق المستهدفة وهدف الإطلاق الواضحة على اقتراح خيارات واقعية بمكوّنات قياسية من دون فرض قوالب مخصصة غير ضرورية.</p>'],
      ['ما المعلومات التي ينبغي تقديمها للحصول على عرض سعر؟', '<p>يرجى تقديم فئة المنتج والكمية التقديرية وبلد الوجهة والتوجه العطري وتفضيل الزجاجة أو العبوة وتاريخ الإطلاق المستهدف وأي تركيبة أو تصميم فني أو عينة مرجعية مقدمة من جانبك. يمكن وضع علامة «غير محدد» على التفاصيل الناقصة في <a href="contact.html#inquiry-form">نموذج استفسار المشروع</a>.</p>']
    ]},
    {title: 'MOQ والأسعار والشروط التجارية', description: 'الكميات الابتدائية إرشادية وليست قواعد تلقائية للقبول أو الرفض.', questions: [
      ['ما الحد الأدنى المعتاد لكمية الطلب؟', '<p>{{config.policies.moq}}</p>'],
      ['هل يمكنكم مراجعة مشروع يقل عن MOQ القياسي؟', '<p>نعم، يمكن لفريقنا تقييم طلب تجريبي بكمية أصغر. قد تتطلب الخيارات القابلة للتنفيذ توجهًا عطريًا موجودًا أو زجاجة متوفرة أو زخرفة مبسطة أو علبة قياسية. وقد تؤثر الكميات الأقل أيضًا في تكلفة الوحدة واختيار المكوّنات. اختر «أقل من {{config.services.privateLabel.moq.pcs}}» في <a href="contact.html#inquiry-form">نموذج الاستفسار</a> لطلب المراجعة.</p>'],
      ['هل يمكن جمع عطور أو تصاميم زجاجات مختلفة لاستيفاء MOQ؟', '<p>يُقيَّم MOQ عادةً لكل SKU معتمد ودفعة عطر وتكوين تعبئة. قد يكون جمع المتغيرات ممكنًا عندما تشترك في مكوّنات ومتطلبات إنتاج متوافقة، لكنه ليس تلقائيًا. أرسل توزيع SKU المخطط له كي نؤكد الكمية القابلة للتنفيذ لكل صنف.</p>'],
      ['ما العوامل التي تؤثر في سعر وحدة العطر؟', '<p>تشمل العوامل الرئيسية تركيز العطر والزجاجة والمضخة ومادة الغطاء وطريقة الزخرفة وهيكل العلبة وكمية الطلب والمواد المقدمة ومتطلبات الاختبار وتغليف التصدير. يؤدي MOQ الأقل عمومًا إلى ارتفاع تكلفة الوحدة لأن تكاليف الإعداد والتوريد تتوزع على عدد أقل من الوحدات.</p>'],
      ['هل تُحتسب رسوم تطوير العطر أو إعداد العبوة أو القالب بصورة منفصلة؟', '<p>قد يحدث ذلك. تُراجع بصورة منفصلة أعمال التركيب المخصص وجولات العينات الإضافية وإعداد الطباعة وتجهيزات الزخرفة وقوالب الزجاجات أو الأغطية والنماذج الأولية للعبوات الخاصة. تُحدَّد أي رسوم تطوير أو تجهيز مطبقة في عرض السعر قبل متابعة المشروع.</p>'],
      ['كيف يتم تأكيد شروط الدفع وصلاحية عرض السعر؟', '<p>تُذكر مراحل الدفع والعملة المعتمدة وبيانات المستفيد وصلاحية عرض السعر في عرض السعر الرسمي أو الفاتورة الأولية للمشروع. قد تختلف الشروط بحسب نطاق التطوير والقوالب المخصصة والمواد المقدمة وقيمة الإنتاج، لذلك لا ينشر الموقع جدول دفع موحدًا.</p>']
    ]},
    {title: 'تطوير العطور والعينات', description: 'قيّم التوجه العطري قبل الالتزام بالإنتاج الكمي.', questions: [
      ['هل عينات تقييم العطر مجانية؟', '<p>نعم. عينات تقييم العطر الأساسية مجانية؛ ولا تدفع سوى تكلفة الشحن الفعلية إلى وجهتك. تُراجع التركيبات الخاصة أو جولات التعديل الإضافية أو عينات العبوات المخصصة بصورة منفصلة إذا ترتبت عليها تكاليف إضافية. راجع <a href="process.html#free-samples">سياسة العينات الكاملة</a>.</p>'],
      ['ماذا تتضمن مجموعة العينات وكم يستغرق إعدادها؟', '<p>{{config.policies.samples}}</p>'],
      ['هل يمكنكم تطوير عطر انطلاقًا من موجز علامتنا التجارية؟', '<p>نعم. يتضمن الموجز المفيد العميل المستهدف والموقع السعري والعائلة العطرية والنفحات المرجعية والتركيز والسوق المستهدفة ومفهوم العبوة. نحوّل هذا التوجه إلى عينات للتقييم، ثم نحدد نطاق التعديلات ونقاط اعتماد المشروع.</p>'],
      ['هل يمكننا الاختيار من مكتبة تركيبات عطرية موجودة؟', '<p>نعم. يمكن للتوجهات العطرية الموجودة اختصار مدة التطوير، وهي مناسبة لمشروعات العلامة الخاصة. يجري التحقق من التوفر والاستخدام المقصود والتركيز ومتطلبات الوجهة قبل الاختيار. لا تكون تركيبات المكتبة الموجودة حصرية تلقائيًا لعلامة واحدة.</p>'],
      ['هل يمكنكم العمل انطلاقًا من عطر مرجعي أو عينة عطر نقدمها؟', '<p>يمكننا تقييم مرجع مقدم لفهم التوجه العطري وهدف الأداء والميزانية. الغاية هي تطوير مواصفة منتج قابلة للتنفيذ ومشروعة، لا التعهد بنسخة مطابقة لعطر تابع لعلامة خارجية أو لتقديم محمي.</p>'],
      ['كم جولة متاحة لتعديل العطر؟', '<p>يُحدَّد نطاق التعديل المشمول في مقترح العينات. ويعتمد على استخدام المشروع توجهًا موجودًا أو موجزًا مخصصًا جديدًا، وعلى مدى تغيير الملاحظات للهدف الأصلي. قد تؤثر الجولات الإضافية في الوقت أو التكلفة، وتُعتمد قبل مواصلة العمل.</p>'],
      ['هل يمكنكم إنتاج صيغ EDP أو EDT أو extrait أو خالية من الكحول؟', '<p>يتوفر تخطيط تركيزات EDP وEDT وextrait بحسب التركيبة والاستخدام المقصود. تتطلب الصيغ الخالية من الكحول أو ذات القواعد البديلة مراجعة منفصلة للجدوى والثبات والعبوة والوجهة. لا تضمن أسماء التركيز وحدها مدة الثبات؛ فالتركيبة والجرعة وطريقة الاستخدام عوامل مهمة أيضًا.</p>'],
      ['لمن تعود ملكية التركيبة المخصصة وكيف تُدار السرية؟', '<p>يُتفق كتابيًا على السرية واستخدام التركيبة وأي حصرية لكل مشروع محدد. ويمكن مراجعة اتفاقيات عدم الإفصاح NDAs عند الاقتضاء. تكون تركيبات المكتبة الموجودة عمومًا غير حصرية؛ ولا تسري ملكية التطوير المخصص أو حصريته إلا إذا نُص عليها صراحةً في الاتفاق التجاري الموقّع.</p>']
    ]},
    {title: 'الزجاجات والتعبئة والزخرفة', description: 'واءم مسار التعبئة مع الكمية والميزانية وموعد الإطلاق.', questions: [
      ['ما الفرق بين العبوة الجاهزة وقالب الزجاجة المخصص؟', '<p>تستخدم العبوة الجاهزة أشكالًا موجودة للزجاجة والمضخة والغطاء، وتتيح عادةً كميات ابتدائية أقل ومدة توريد أقصر. ينشئ القالب المخصص مكوّنًا خاصًا بالمشروع، لكنه يتطلب تجهيزات وعينات تطوير وكميات أعلى وجدولًا أطول يؤكده مورّد المكوّن.</p>'],
      ['ما عناصر الزجاجة والمضخة والغطاء والعلبة التي يمكن تخصيصها؟', '<p>بحسب الكمية والتوافق، قد تشمل الخيارات لون الزجاجة أو طلاءها وتشطيب المضخة والطوق ومادة الغطاء والملصق والطباعة المباشرة وهيكل العلبة الخارجية. تتطلب أشكال الزجاجات أو الأغطية الخاصة مراجعة فنية وتجهيزات مخصصة، لا مجرد زخرفة بسيطة.</p>'],
      ['ما عمليات الزخرفة المتاحة؟', '<p>تشمل الخيارات الشائعة الطلاء اللوني والتعتيم والطباعة بالشاشة الحريرية والملصقات والطباعة بالرقائق وبعض تشطيبات العبوات الثانوية. يعتمد التوفر على مادة المكوّن والتصميم الفني والكمية وقدرة المورّد. ونؤكد عبر العينات، عند الحاجة، معايير اللون والالتصاق ومحاذاة الطباعة الممكنة.</p>'],
      ['ما ملفات التصميم والملصق التي ينبغي أن يقدمها العميل؟', '<p>يُفضَّل تقديم الرسومات المتجهية مثل AI أو PDF القابل للتحرير أو EPS للشعارات وتخطيطات الطباعة. يرجى تضمين نص العلامة التجارية وصافي المحتوى والرمز الشريطي والعبارات المطلوبة في السوق ومراجع الألوان. يظل المشتري أو الجهة المسؤولة في السوق المستهدفة مسؤولًا عن الاعتماد القانوني النهائي للملصق.</p>'],
      ['هل يمكن للعملاء تقديم زجاجاتهم أو عبواتهم أو مكوّناتهم الخاصة؟', '<p>نعم، يمكن النظر في المكوّنات المقدمة من العميل ضمن نموذج OEM أو التصنيع التعاقدي. يجب أن تصل بالكمية والحالة والموعد المتفق عليها، وقد تتطلب فحصًا عند الاستلام وتجارب تعبئة واختبارات توافق قبل اعتماد الإنتاج الكمي.</p>'],
      ['كيف تختبرون توافق الزجاجة والمضخة والعطر؟', '<p>قد تشمل الفحوص الملاءمة وسلامة الكبس أو الإغلاق والتسرب وأداء الرش والمظهر وتفاعل التركيبة مع الحشيات والمضخات والزخرفة. تُواءم خطة الاختبار مع التركيبة والمكوّنات المختارة؛ ولا ينبغي اعتماد أي عبوة استنادًا إلى صورة في كتالوج فقط.</p>']
    ]},
    {title: 'الإنتاج والمدة ومراقبة الجودة', description: 'تقلل نقاط الاعتماد المحددة مخاطر الإنتاج التي يمكن تجنبها.', questions: [
      ['ما مراحل الإنتاج الرئيسية لطلب عطر؟', '<p>يمر المشروع المعتاد بمراجعة الموجز وعرض السعر وأخذ العينات واعتماد التركيبة والعبوة وتوريد المواد والخلط والتكييف أو الترشيح عند تحديده والتعبئة والإغلاق والتجميع والفحص والتحضير للشحن. يعتمد المسار الدقيق على نموذج التعاون.</p>'],
      ['هل تعني مدة 5 أيام لتوريد المواد الخام إجمالي مدة التسليم؟', '<p>لا. تشير الأيام الخمسة تقريبًا فقط إلى شراء المواد الخام القياسية المناسبة بعد تأكيد المشروع. تُجدول الزجاجات والأغطية المخصصة والعلب المطبوعة والزخرفة الخاصة والإنتاج والفحص والشحن بصورة منفصلة، وقد تتطلب وقتًا أطول بكثير.</p>'],
      ['كيف تُحتسب مدة الإنتاج الكمي؟', '<p>تُؤكَّد المدة بعد اعتماد التركيبة والمكوّنات والتصميم الفني والكمية ومتطلبات الجودة. تكون مشروعات المكوّنات المتوفرة أسرع عمومًا؛ وقد تمدد القوالب المخصصة والزخرفة والعلب الصلبة والمواد المقدمة من العميل وفترات ذروة الإنتاج الجدول الزمني.</p>'],
      ['ما فحوص الجودة التي تُجرى أثناء الإنتاج؟', '<p>قد تشمل الخطة المطبقة المواد الواردة ومظهر التركيبة ورائحتها وحجم التعبئة وسلامة الكبس أو الإغلاق والتسرب ووظيفة الرش والترميز والزخرفة والتجميع والتغليف النهائي. يُحدَّد نطاق الاختبار وفق مواصفة المنتج المعتمدة.</p>'],
      ['هل تُعتمد عينة ما قبل الإنتاج قبل الإنتاج الكمي؟', '<p>تتطلب المشروعات عادةً اعتماد التوجه العطري المعني ومكوّنات العبوة والتصميم الفني والشكل النهائي قبل الإنتاج الكمي. وقد يكون الاعتماد عينة مادية أو تصميمًا رقميًا أو عينة مكوّن أو مواصفة موقعة بحسب العنصر.</p>'],
      ['كيف تديرون ثبات الدفعات والطلبات المتكررة؟', '<p>تساعد المواصفات المعتمدة وسجلات الدفعات والمراجع المحفوظة في توجيه الإنتاج المتكرر. وتُراجع تغييرات المواد الخام أو العبوات عندما تؤثر في المعيار المعتمد. ينبغي للمشترين تقديم مرجع الطلب السابق أو SKU عند طلب إعادة الإنتاج.</p>']
    ]},
    {title: 'الشهادات والوثائق والامتثال للسوق', description: 'ميّز بين وثائق المصنع ومسؤوليات السوق المستهدفة.', questions: [
      ['ما شهادات المصنع التي يمكن للمشترين التحقق منها؟', '<p>تُعرض معاينات محمية لوثائق التصنيع والجودة المتاحة في <a href="about.html#certificates">قسم التحقق من الشهادات</a>. يمكن للمشترين المؤهلين طلب النسخ الكاملة ذات الصلة عبر WhatsApp لإجراءات اعتماد المورّد. ينبغي التحقق من نطاق الوثيقة وصلاحيتها مقابل الكيان القانوني المبين في كل شهادة.</p>'],
      ['ما وثائق SDS وCOA والدفعات والعطور التي يمكن توفيرها؟', '<p>قد تشمل الوثائق المتاحة SDS وCOA وسجلات مرتبطة بالدفعات ووثائق عطرية تخص التركيبة المعتمدة. تعتمد الحزمة الدقيقة على نوع المنتج ومورّد المكوّنات والوجهة والاتفاق التجاري، لذلك لا تتوفر كل وثيقة تلقائيًا لكل SKU أو سوق.</p>'],
      ['ماذا تعني شهادة مطابقة IFRA؟', '<p>هي بيان يصدره المورّد بأن مزيجًا عطريًا يطابق معايير IFRA المطبقة للاستخدام المقصود. ولا تصدرها IFRA، ولا تحل محل تقييم سلامة المنتج، ولا تلغي ضرورة الامتثال للقانون المحلي. راجع <a href="https://ifrafragrance.org/initiatives-positions/safe-use-fragrance-science/ifra-standards" target="_blank" rel="noopener noreferrer">شرح IFRA</a>.</p>'],
      ['هل يمكنكم دعم المنتجات المخصصة للولايات المتحدة؟', '<p>يمكننا مراجعة معلومات المصنع والمنتج المتاحة اللازمة للمشروع، لكن يجب على الشخص المسؤول في الولايات المتحدة والأطراف الأخرى تأكيد تسجيل المنشأة وإدراج المنتج وإثبات السلامة ومسؤوليات وضع الملصقات بموجب MoCRA. لا يُعد التسجيل أو الإدراج موافقة من FDA على المنتج. راجع <a href="https://www.fda.gov/cosmetics/registration-listing-cosmetic-product-facilities-and-products" target="_blank" rel="noopener noreferrer">إرشادات FDA</a>.</p>'],
      ['هل يمكنكم دعم المنتجات المخصصة للاتحاد الأوروبي؟', '<p>يمكننا إعداد معلومات التركيبة والتصنيع المتاحة أو تنسيقها للمراجعة، لكن يجب على الشخص المسؤول في الاتحاد الأوروبي تأكيد تقييم السلامة وملف معلومات المنتج ووضع الملصقات وإخطار CPNP قبل طرح المنتج في السوق. CPNP نظام إخطار وليس شهادة مصنع. راجع <a href="https://single-market-economy.ec.europa.eu/sectors/cosmetics/cosmetic-product-notification-portal_en" target="_blank" rel="noopener noreferrer">إرشادات المفوضية الأوروبية</a>.</p>'],
      ['من المسؤول عن التسجيل في السوق المستهدفة والامتثال النهائي للملصق؟', '<p>يحتفظ مالك العلامة التجارية أو المستورد أو الموزّع أو الشخص المسؤول المعيّن عادةً بالمسؤولية النهائية عن دخول السوق واعتماد الملصق، وفق القانون المحلي. يمكن للمصنع توفير المعلومات الفنية والتصنيعية المتاحة، لكن ينبغي للمشتري تحديد الوجهة والمسار التنظيمي قبل الإنتاج.</p>']
    ]},
    {title: 'الشحن والتسليم وخدمة ما بعد البيع', description: 'خطط لمسار الشحن قبل اعتماد مواصفات المنتج والكرتون النهائية.', questions: [
      ['لماذا يُصنَّف العطر الكحولي ضمن البضائع الخطرة؟', '<p>يُنقل العطر المحتوي على مذيبات قابلة للاشتعال عادةً بوصفه بضائع خطرة UN 1266، الفئة 3. يعتمد التصنيف الدقيق ومجموعة التعبئة والمسار على التركيبة والتركيز وحجم العبوة وقواعد النقل. راجع <a href="https://unece.org/fileadmin/DAM/trans/danger/publi/unrec/rev18/English/Rev18_Volume1_Part2.pdf" target="_blank" rel="noopener noreferrer">قائمة UNECE للبضائع الخطرة</a>.</p>'],
      ['كيف تُشحن عينات العطور والطلبات الكمية دوليًا؟', '<p>تُرسل العينات عبر قناة متخصصة مناسبة بعد اعتماد تكلفة الشحن الفعلية. وقد تستخدم الطلبات الكمية الشحن الجوي أو البحري للبضائع الخطرة بحسب الوجهة والكمية ومتطلبات التسليم. يُؤكَّد توفر المسار لكل شحنة ولا يُفترض أنه متاح عالميًا.</p>'],
      ['ماذا يحدث إذا وصلت البضائع تالفة أو متسربة أو غير متسقة؟', '<p>أبلغ فريق المشروع فورًا واحتفظ بالكرتون والملصقات والبضائع المتأثرة. قدّم رقم الطلب ومرجع الدفعة والكميات والصور والفيديو كي يتمكن المصنع وأطراف الخدمات اللوجستية من التحقيق. يخضع أي استبدال أو رصيد أو حل آخر للأدلة والمواصفة المتفق عليها والشروط التجارية الموقعة.</p>']
    ]}
  ],
  empty: ['لم يتم العثور على أسئلة مطابقة', 'جرّب كلمة مفتاحية أوسع أو أرسل سؤال مشروعك مباشرةً إلى فريقنا.', 'اسأل {{config.brand.name}}'],
  cta: ['هل ما زلت تقيّم مشروعك؟', 'أرسل إلينا التفاصيل المتوفرة لديك', 'سنراجع المنتج والكمية والوجهة ومتطلبات التخصيص قبل اقتراح الخطوة التالية.', 'ابدأ استفسار المشروع']
});

module.exports.fr = buildTranslatedFaq({
  hero: ['Base de connaissances des acheteurs', 'FAQ sur la fabrication de parfums', 'Des réponses pratiques pour les propriétaires de marques, importateurs et équipes achats qui évaluent la production de parfums en marque blanche, OEM et ODM.', 'Parcourir les questions', 'Interroger l’usine'],
  search: ['Rechercher dans toutes les questions', 'Essayez : MOQ, échantillon gratuit, IFRA, flacon ou expédition', 'Effacer', 'Catégories de FAQ'],
  filters: ['Toutes', 'Bien démarrer', 'MOQ et prix', 'Parfums et échantillons', 'Conditionnement', 'Production et contrôle qualité', 'Conformité', 'Expédition'],
  groups: [
    {title: 'Bien démarrer et modèles de coopération', description: 'Découvrez ce que nous fabriquons et comment préparer un brief de projet utile.', questions: [
      ['Quels produits parfumés {{config.brand.name}} peut-elle fabriquer ?', '<p>Nous prenons en charge les formats de parfumerie fine tels que l’EDP, l’EDT et l’extrait, ainsi que les brumes pour le corps et les cheveux, certains formats de parfum d’intérieur et les projets de conditionnement de parfums. La faisabilité finale dépend de la formule, des composants, de la quantité et du marché de destination. Consultez nos <a href="index.html#product-capabilities">catégories de fabrication</a>.</p>'],
      ['Quelle est la différence entre marque blanche, OEM et ODM ?', '<p>La marque blanche s’appuie sur des orientations olfactives existantes et des composants standard adaptés. L’ODM développe un produit à partir du brief de votre marque, tandis que l’OEM ou la fabrication à façon utilise une formule, des matériaux, des fichiers graphiques, une spécification ou une référence fournis par vos soins. Comparez les options sur notre <a href="process.html#service-models">page des services</a>.</p>'],
      ['Quel modèle de coopération convient à mon projet ?', '<p>La marque blanche est généralement la voie la plus rapide pour un test de marché à petite échelle. L’ODM convient aux marques qui ont besoin de développer le parfum et le conditionnement, tandis que l’OEM s’adresse aux acheteurs disposant déjà d’éléments établis ou de normes techniques. Transmettez-nous ce que vous avez déjà et nous vous recommanderons une voie après examen.</p>'],
      ['{{config.brand.name}} est-elle un fabricant ou une société de négoce ?', '<p>{{config.brand.name}} est un programme international de fabrication B2B de parfums. L’équipe projet coordonne les demandes internationales, le développement, la fabrication et la préparation à l’exportation, tandis que la production est réalisée par {{config.manufacturer.legalName}} dans le site de Guangzhou présenté sur ce site. Les acheteurs qualifiés peuvent consulter des aperçus protégés des certificats et demander les documents complets de vérification via la page <a href="about.html">À propos</a>.</p>'],
      ['Les start-up et les nouvelles marques de parfums peuvent-elles travailler avec vous ?', '<p>Oui. Nous pouvons aider les primo-acheteurs à définir le format du produit, la quantité, l’orientation olfactive et la solution de conditionnement. Un budget, un marché de destination et un objectif de lancement clairs nous permettent de recommander des options réalistes avec des composants standard, sans imposer d’outillage personnalisé inutile.</p>'],
      ['Quelles informations dois-je fournir pour recevoir un devis ?', '<p>Veuillez indiquer la catégorie de produit, la quantité estimée, le pays de destination, l’orientation olfactive, vos préférences de flacon ou de conditionnement, la date de lancement visée, ainsi que toute formule, tout fichier graphique ou tout échantillon de référence fourni. Les informations manquantes peuvent être indiquées comme non définies dans notre <a href="contact.html#inquiry-form">formulaire de demande de projet</a>.</p>']
    ]},
    {title: 'MOQ, prix et conditions commerciales', description: 'Les quantités initiales sont des indications, et non des règles automatiques d’acceptation ou de refus.', questions: [
      ['Quelle est votre quantité minimale de commande habituelle ?', '<p>{{config.policies.moq}}</p>'],
      ['Pouvez-vous étudier un projet inférieur au MOQ standard ?', '<p>Oui, notre équipe peut évaluer une demande pilote de plus faible volume. Les solutions réalisables peuvent nécessiter une orientation olfactive existante, un flacon en stock, une décoration simplifiée ou une boîte standard. Les quantités réduites peuvent également influer sur le coût unitaire et le choix des composants. Sélectionnez « Moins de {{config.services.privateLabel.moq.pcs}} » dans le <a href="contact.html#inquiry-form">formulaire de demande</a> pour solliciter une étude.</p>'],
      ['Peut-on combiner plusieurs parfums ou modèles de flacons pour atteindre le MOQ ?', '<p>Le MOQ est normalement évalué par SKU approuvé, lot de parfum et configuration de conditionnement. Il peut être possible de combiner des variantes lorsqu’elles partagent des composants compatibles et les mêmes exigences de production, mais ce n’est pas automatique. Envoyez la répartition prévue par SKU afin que nous confirmions la quantité réalisable pour chaque article.</p>'],
      ['Quels facteurs influencent le prix unitaire d’un parfum ?', '<p>Les principaux facteurs comprennent la concentration du parfum, le flacon et la pompe, le matériau du capot, la méthode de décoration, la structure de la boîte, la quantité commandée, les matériaux fournis, les exigences d’essai et l’emballage export. Un MOQ plus faible entraîne généralement un coût unitaire plus élevé, car les frais de mise en place et d’approvisionnement sont répartis sur moins d’unités.</p>'],
      ['Le développement du parfum, la mise en place du conditionnement ou les moules sont-ils facturés séparément ?', '<p>Cela peut être le cas. La formulation sur mesure, les séries d’échantillons supplémentaires, la préparation de l’impression, les montages de décoration, les moules de flacon ou de capot et les prototypes de conditionnements spéciaux sont étudiés séparément. Tous frais de développement ou d’outillage applicables sont indiqués dans le devis avant la poursuite du projet.</p>'],
      ['Comment les conditions de paiement et la validité du devis sont-elles confirmées ?', '<p>Les échéances de paiement, la devise approuvée, les coordonnées du bénéficiaire et la durée de validité du devis figurent dans le devis officiel ou la facture pro forma du projet. Les conditions peuvent varier selon le périmètre de développement, l’outillage personnalisé, les matériaux fournis et la valeur de production ; le site ne publie donc pas d’échéancier de paiement universel.</p>']
    ]},
    {title: 'Développement du parfum et échantillons', description: 'Évaluez l’orientation olfactive avant de vous engager dans la production en série.', questions: [
      ['Les échantillons d’évaluation olfactive sont-ils gratuits ?', '<p>Oui. Les échantillons d’évaluation olfactive de base sont gratuits ; vous ne payez que les frais réels de transport jusqu’à votre destination. Les formulations spéciales, les séries de révision supplémentaires ou les échantillons de conditionnement personnalisés sont étudiés séparément si des coûts additionnels s’appliquent. Consultez la <a href="process.html#free-samples">politique complète relative aux échantillons</a>.</p>'],
      ['Que contient le kit d’échantillons et combien de temps faut-il pour le préparer ?', '<p>{{config.policies.samples}}</p>'],
      ['Pouvez-vous développer un parfum à partir du brief de notre marque ?', '<p>Oui. Un brief utile précise la clientèle cible, le positionnement prix, la famille olfactive, les notes de référence, la concentration, le marché de destination et le concept de conditionnement. Nous traduisons cette orientation en échantillons d’évaluation, puis définissons le périmètre des révisions et les étapes d’approbation du projet.</p>'],
      ['Pouvons-nous choisir dans une bibliothèque de formules de parfums existantes ?', '<p>Oui. Les orientations olfactives existantes peuvent raccourcir le développement et conviennent bien aux projets de marque blanche. La disponibilité, l’usage prévu, la concentration et les exigences de destination sont vérifiés avant la sélection. Les formules existantes de la bibliothèque ne sont pas automatiquement exclusives à une marque.</p>'],
      ['Pouvez-vous travailler à partir d’un parfum de référence ou d’un échantillon fourni ?', '<p>Nous pouvons évaluer une référence fournie afin de comprendre l’orientation olfactive, l’objectif de performance et le budget. Le but est de développer une spécification de produit réalisable et licite, et non de promettre une copie exacte d’un parfum de marque tierce ou d’une présentation protégée.</p>'],
      ['Combien de séries de révision du parfum sont disponibles ?', '<p>Le périmètre de révision inclus est confirmé dans la proposition d’échantillonnage. Il dépend du recours à une orientation existante ou à un nouveau brief sur mesure, ainsi que de l’ampleur avec laquelle les retours modifient l’objectif initial. Les séries supplémentaires peuvent influer sur le délai ou le coût et sont approuvées avant la poursuite du travail.</p>'],
      ['Pouvez-vous produire des formats EDP, EDT, extrait ou sans alcool ?', '<p>La planification des concentrations EDP, EDT et extrait est possible sous réserve de la formule et de l’usage prévu. Les formats sans alcool ou à base alternative nécessitent une étude distincte de faisabilité, de stabilité, de conditionnement et de destination. Le nom de la concentration ne garantit pas à lui seul la tenue ; la formule, le dosage et l’application comptent également.</p>'],
      ['À qui appartient la formule personnalisée et comment la confidentialité est-elle gérée ?', '<p>La confidentialité, l’utilisation de la formule et toute exclusivité sont convenues par écrit pour le projet concerné. Des accords de confidentialité NDAs peuvent être examinés lorsque cela est approprié. Les formules existantes de la bibliothèque sont généralement non exclusives ; la propriété ou l’exclusivité d’un développement sur mesure ne s’applique que lorsqu’elle figure expressément dans l’accord commercial signé.</p>']
    ]},
    {title: 'Flacons, conditionnement et décoration', description: 'Adaptez la solution de conditionnement à la quantité, au budget et au calendrier de lancement.', questions: [
      ['Quelle est la différence entre un conditionnement en stock et un moule de flacon personnalisé ?', '<p>Le conditionnement en stock utilise des formats existants de flacon, de pompe et de capot, et offre normalement des quantités initiales plus faibles ainsi qu’un délai d’approvisionnement plus court. Un moule personnalisé crée un composant propre au projet, mais exige un outillage, des échantillons de développement, des quantités plus élevées et un calendrier plus long confirmé avec le fournisseur du composant.</p>'],
      ['Quels éléments du flacon, de la pompe, du capot et de la boîte peuvent être personnalisés ?', '<p>Selon la quantité et la compatibilité, les options peuvent inclure la couleur ou le revêtement du flacon, la finition de la pompe et de la bague, le matériau du capot, l’étiquette, l’impression directe et la structure de la boîte extérieure. Les formes spécifiques de flacon ou de capot nécessitent une étude technique et un outillage personnalisé, et non une simple décoration.</p>'],
      ['Quels procédés de décoration sont disponibles ?', '<p>Les options courantes comprennent le revêtement coloré, le dépolissage, la sérigraphie, les étiquettes, le marquage à chaud et certaines finitions de conditionnement secondaire. La disponibilité dépend du matériau du composant, des fichiers graphiques, de la quantité et des capacités du fournisseur. Lorsque nécessaire, nous confirmons par des échantillons les normes réalisables de couleur, d’adhérence et de repérage.</p>'],
      ['Quels fichiers graphiques et d’étiquette le client doit-il fournir ?', '<p>Les fichiers vectoriels tels que AI, PDF modifiable ou EPS sont privilégiés pour les logos et les mises en page d’impression. Veuillez inclure le texte de la marque, le contenu net, le code-barres, les mentions requises par le marché et les références de couleur. L’acheteur ou la partie responsable sur le marché de destination reste responsable de l’approbation juridique finale de l’étiquette.</p>'],
      ['Les clients peuvent-ils fournir leurs propres flacons, conditionnements ou composants ?', '<p>Oui, les composants fournis par le client peuvent être envisagés dans le cadre d’un modèle OEM ou de fabrication à façon. Ils doivent arriver dans la quantité, l’état et le délai convenus, et peuvent nécessiter un contrôle à réception, des essais de remplissage et des vérifications de compatibilité avant l’approbation de la production en série.</p>'],
      ['Comment testez-vous la compatibilité entre le flacon, la pompe et le parfum ?', '<p>Les contrôles peuvent porter sur l’ajustement, l’intégrité du sertissage ou de la fermeture, les fuites, la qualité de pulvérisation, l’aspect et l’interaction de la formule avec les joints, les pompes et la décoration. Le plan d’essai est adapté à la formule et aux composants sélectionnés ; aucun conditionnement ne doit être considéré comme approuvé sur la seule base d’une image de catalogue.</p>']
    ]},
    {title: 'Production, délais et contrôle qualité', description: 'Des étapes d’approbation définies réduisent les risques de production évitables.', questions: [
      ['Quelles sont les principales étapes de production d’une commande de parfum ?', '<p>Un projet type passe par l’examen du brief, le devis, l’échantillonnage, l’approbation de la formule et du conditionnement, l’approvisionnement en matériaux, la composition, le conditionnement ou la filtration lorsque cela est prévu, le remplissage, la fermeture, l’assemblage, l’inspection et la préparation de l’expédition. Le parcours exact dépend du modèle de coopération.</p>'],
      ['La période de 5 jours d’approvisionnement en matières premières correspond-elle au délai total de livraison ?', '<p>Non. Les cinq jours environ concernent uniquement l’achat de matières premières standard adaptées après confirmation du projet. Les flacons et capots personnalisés, les boîtes imprimées, les décorations spéciales, la production, l’inspection et l’expédition sont planifiés séparément et peuvent demander beaucoup plus de temps.</p>'],
      ['Comment le délai de production en série est-il calculé ?', '<p>Le délai est confirmé après approbation de la formule, des composants, des fichiers graphiques, de la quantité et des exigences qualité. Les projets utilisant des composants en stock sont généralement plus rapides ; les moules personnalisés, la décoration, les boîtes rigides, les matériaux fournis par le client et les périodes de pointe peuvent allonger le calendrier.</p>'],
      ['Quels contrôles qualité sont effectués pendant la production ?', '<p>Le plan applicable peut couvrir les matériaux entrants, l’aspect et l’odeur de la formule, le volume de remplissage, l’intégrité du sertissage ou de la fermeture, les fuites, la fonction de pulvérisation, le marquage, la décoration, l’assemblage et l’emballage final. Le périmètre des essais est défini par rapport à la spécification de produit approuvée.</p>'],
      ['Un échantillon de préproduction est-il approuvé avant la production en série ?', '<p>Les projets exigent normalement l’approbation de l’orientation olfactive concernée, des composants du conditionnement, des fichiers graphiques et de la présentation finale avant la production en série. Selon l’élément, l’approbation peut prendre la forme d’un échantillon physique, d’un fichier graphique numérique, d’un échantillon de composant ou d’une spécification signée.</p>'],
      ['Comment gérez-vous la régularité des lots et les commandes répétées ?', '<p>Les spécifications approuvées, les dossiers de lot et les références conservées contribuent à guider les productions répétées. Les changements de matières premières ou de conditionnement sont examinés lorsqu’ils affectent la norme approuvée. Les acheteurs doivent fournir la référence de la commande précédente ou du SKU lorsqu’ils demandent une nouvelle production.</p>']
    ]},
    {title: 'Certificats, documents et conformité au marché', description: 'Distinguez la documentation de l’usine des responsabilités propres au marché de destination.', questions: [
      ['Quels certificats d’usine les acheteurs peuvent-ils vérifier ?', '<p>Des aperçus protégés des documents de fabrication et de qualité disponibles sont présentés dans notre <a href="about.html#certificates">section de vérification des certificats</a>. Les acheteurs qualifiés peuvent demander via WhatsApp les copies intégrales pertinentes pour l’homologation du fournisseur. Le périmètre et la validité du document doivent être vérifiés par rapport à l’entité juridique indiquée sur chaque certificat.</p>'],
      ['Quels documents SDS, COA, de lot et de parfum peuvent être fournis ?', '<p>Les documents disponibles peuvent comprendre des SDS, des COA, des dossiers liés aux lots et la documentation parfum correspondant à la formule approuvée. Le dossier exact dépend du type de produit, du fournisseur d’ingrédients, de la destination et de l’accord commercial ; tous les documents ne sont donc pas automatiquement disponibles pour chaque SKU ou marché.</p>'],
      ['Que signifie un certificat de conformité IFRA ?', '<p>Il s’agit d’une déclaration émise par le fournisseur attestant qu’un mélange parfumant respecte les Normes IFRA applicables pour un usage prévu. Elle n’est pas émise par l’IFRA, ne remplace pas une évaluation de la sécurité du produit et ne dispense pas du respect de la législation locale. Consultez l’<a href="https://ifrafragrance.org/initiatives-positions/safe-use-fragrance-science/ifra-standards" target="_blank" rel="noopener noreferrer">explication de l’IFRA</a>.</p>'],
      ['Pouvez-vous accompagner des produits destinés aux États-Unis ?', '<p>Nous pouvons examiner les informations disponibles sur l’usine et le produit nécessaires au projet, mais la Personne Responsable aux États-Unis et les autres parties doivent confirmer l’enregistrement de l’établissement, le référencement du produit, la justification de la sécurité et les responsabilités d’étiquetage au titre de la MoCRA. L’enregistrement ou le référencement ne constitue pas une approbation du produit par la FDA. Consultez les <a href="https://www.fda.gov/cosmetics/registration-listing-cosmetic-product-facilities-and-products" target="_blank" rel="noopener noreferrer">recommandations de la FDA</a>.</p>'],
      ['Pouvez-vous accompagner des produits destinés à l’Union européenne ?', '<p>Nous pouvons préparer ou coordonner les informations disponibles sur la formule et la fabrication en vue de leur examen, mais la Personne Responsable dans l’UE doit confirmer l’évaluation de la sécurité, le Dossier d’Information Produit, l’étiquetage et la notification CPNP avant la mise sur le marché. Le CPNP est un système de notification, et non un certificat d’usine. Consultez les <a href="https://single-market-economy.ec.europa.eu/sectors/cosmetics/cosmetic-product-notification-portal_en" target="_blank" rel="noopener noreferrer">recommandations de la Commission européenne</a>.</p>'],
      ['Qui est responsable de l’enregistrement sur le marché de destination et de la conformité finale de l’étiquette ?', '<p>Le propriétaire de la marque, l’importateur, le distributeur ou la Personne Responsable désignée conserve normalement la responsabilité finale de l’accès au marché et de l’approbation de l’étiquette, selon la législation locale. L’usine peut fournir les informations techniques et de fabrication disponibles, mais l’acheteur doit déterminer la destination et la voie réglementaire avant la production.</p>']
    ]},
    {title: 'Expédition, livraison et service après-vente', description: 'Planifiez l’itinéraire de transport avant de finaliser les spécifications du produit et des cartons.', questions: [
      ['Pourquoi le parfum à base d’alcool est-il classé comme marchandise dangereuse ?', '<p>Le parfum contenant des solvants inflammables est couramment transporté comme marchandise dangereuse UN 1266, Classe 3. La classification exacte, le groupe d’emballage et l’itinéraire dépendent de la formule, de la concentration, de la taille du conditionnement et des règles de transport. Consultez la <a href="https://unece.org/fileadmin/DAM/trans/danger/publi/unrec/rev18/English/Rev18_Volume1_Part2.pdf" target="_blank" rel="noopener noreferrer">liste des marchandises dangereuses de l’UNECE</a>.</p>'],
      ['Comment les échantillons de parfum et les commandes en volume sont-ils expédiés à l’international ?', '<p>Les échantillons sont envoyés par une filière spécialisée appropriée après validation du coût réel de transport. Les commandes en volume peuvent être acheminées par fret aérien ou maritime de marchandises dangereuses selon la destination, la quantité et les exigences de livraison. La disponibilité de l’itinéraire est confirmée pour chaque expédition et n’est pas présumée à l’échelle mondiale.</p>'],
      ['Que se passe-t-il si les marchandises arrivent endommagées, présentent des fuites ou ne sont pas conformes ?', '<p>Prévenez rapidement l’équipe projet et conservez les cartons, les étiquettes et les produits concernés. Fournissez le numéro de commande, la référence du lot, les quantités, des photographies et une vidéo afin que l’usine et les parties logistiques puissent enquêter. Tout remplacement, avoir ou autre recours dépendra des preuves, de la spécification convenue et des conditions commerciales signées.</p>']
    ]}
  ],
  empty: ['Aucune question correspondante trouvée', 'Essayez un mot-clé plus général ou envoyez directement votre question de projet à notre équipe.', 'Interroger {{config.brand.name}}'],
  cta: ['Vous évaluez encore votre projet ?', 'Envoyez-nous les informations dont vous disposez déjà', 'Nous examinerons votre produit, la quantité, la destination et les exigences de personnalisation avant de recommander l’étape suivante.', 'Démarrer une demande de projet']
});
