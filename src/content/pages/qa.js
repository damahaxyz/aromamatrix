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
            "answerHtml": "<p>{{config.brand.name}} is operated by {{config.brand.legalEntity.en}} as the brand and international sales entity. Confirmed production is carried out by {{config.manufacturer.legalName}} at the Guangzhou manufacturing facility shown on this website. Qualified buyers can review protected certificate previews and request full verification documents through <a href=\"about.html\">About Us</a>.</p>"
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
            "answerHtml": "<p>{{ site.brand.name }} 由 {{ site.brand.legalEntity.zh }}运营，负责品牌和国际销售沟通；确认的生产由 {{ site.manufacturer.legalName }}在广州生产场地完成。</p>"
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
