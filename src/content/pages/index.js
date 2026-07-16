const contactForms = require('./contact');

const en = {
  hero:{eyebrow:'Private Label · OEM · ODM',title:'Private Label Perfume Manufacturer in China',text:'Custom fragrance development, bottle sourcing, filling, packaging and dangerous-goods export support—all managed through one manufacturing partner.',proof:['Typical private label MOQ: {{fact("privateLabelMoq")}}','Samples in {{fact("sampleDaysShort")}}','Global DG shipping support'],primary:'Get Factory Quote',secondary:'Request Sample Kit'},
  metricLabels:['Factory Area','Established','Controlled Workshop','Fragrance Formulas'],
  categories:{kicker:'What We Manufacture',title:'Fragrance Products Built for Your Brand',text:'Choose a product direction and tell us your target market, quantity and customization needs. Our team will recommend the right formula, packaging and production route.',items:[
    ['fine-fragrance','fine-fragrance.webp','Unbranded glass perfume bottles for private label fine fragrance manufacturing','EDP · EDT · Extrait','Fine Fragrance','Custom scent development and private label collections for retail fragrance brands.'],
    ['home-fragrance','home-fragrance.webp','Unbranded reed diffuser, room spray and candle for home fragrance manufacturing','Diffusers · Room Sprays · Candles','Home Fragrance','Coordinated scent and packaging systems for home and lifestyle collections.'],
    ['body-fragrance','body-fragrance.webp','Unbranded fine mist spray bottles for body and hair fragrance manufacturing','Body Mist · Hair Mist','Body Fragrance','Fine-mist formats developed for beauty, personal care and lifestyle brands.'],
    ['packaging-solutions','packaging-solutions.webp','Unbranded perfume bottles, pumps, caps and folding cartons for packaging customization','Bottles · Pumps · Caps · Boxes','Packaging Solutions','Stock and customized components coordinated into a production-ready pack.']],link:'Discuss Your Project',question:'Not sure which production route fits your brand?',cta:'Request Product Recommendations'},
  models:{kicker:'Choose Your Production Route',title:'Three Ways to Build Your Fragrance Line',text:'Start with a ready-to-customize collection, develop a product from the ground up, or bring us your existing formula and packaging.',items:[
    {badge:'Fastest Route',title:'Private Label',text:'Choose from existing fragrance directions, stock bottles and proven packaging formats, then customize the decoration for your brand.',specs:[['Typical MOQ','{{fact("privateLabelMoq")}}'],['Sampling','{{fact("sampleDays")}}'],['Best for','Launches and market tests']],link:'Start a Private Label Project'},
    {badge:'Most Flexible',title:'Full-Service ODM',text:'Develop an original scent and a coordinated packaging system with support from creative brief through production documentation.',specs:[['Typical MOQ','{{fact("customMoq")}}'],['Development','Multiple sample rounds'],['Best for','Original branded collections']],link:'Develop an ODM Collection',featured:true},
    {badge:'Factory Partnership',title:'OEM / Contract Filling',text:'Supply your approved formula, packaging or both. We coordinate compounding, filling, crimping, assembly and batch control.',specs:[['Typical Quantity','Project-based'],['Inputs','Your formula or components'],['Best for','Established fragrance brands']],link:'Discuss Contract Production'}]},
  process:{kicker:'From Brief to Shipment',title:'A Clear Path to Finished Product',text:'Each project follows defined approval points so fragrance, packaging, quality and production expectations stay aligned.',items:[['Brief & Positioning','Share your target market, product format, scent direction, quantity and budget.'],['Fragrance Sampling','Review initial scent directions and refine the selected formula through feedback.'],['Packaging Selection','Confirm bottles, pumps, caps, decoration, labels and outer packaging.'],['Testing & Production','Complete compatibility checks, approvals, filling, crimping and final assembly.'],['DG Export & Delivery','Prepare batch and dangerous-goods documents for specialist freight handling.']],cta:'View Full OEM/ODM Process'},
  extended:{
    fragrance:{kicker:'Fragrance Development',title:'Turn a Direction into a Signature Scent',text:'Begin with a reference, an olfactory family or a brand story. Our sampling workflow translates your brief into fragrance directions ready for evaluation.',families:['Floral','Citrus','Woody','Amber','Fruity','Green','Aquatic','Gourmand'],checks:['Three initial fragrance directions for evaluation','EDP, EDT and extrait concentration planning','Formula refinement based on structured feedback'],cta:'Build Your Fragrance Brief'},
    manufacturing:{kicker:'Manufacturing Capability',title:'Built for Consistent, Scalable Production',text:'From trial launches to recurring wholesale orders, production moves through defined preparation, filling and packing stages.',items:['Fragrance compounding and maceration','Chilling and filtration','Automated filling and pump crimping','Labeling, coding and box assembly','Cellophane wrapping and export packing'],cta:'Request Factory Presentation',caption:'Controlled Production Environment',meta:'Compounding · Filling · Assembly'},
    quality:{kicker:'Quality Control',title:'Quality Checks from Formula to Final Pack',text:'Testing plans are matched to the formula, components and destination requirements before mass production approval.',items:[['Raw Material Inspection','Incoming fragrance, alcohol and packaging components are checked against project specifications.'],['Stability Testing','Formula appearance, odor and color are observed under defined storage conditions.'],['Compatibility Testing','Formula interaction with bottles, pumps, seals and decoration is evaluated before approval.'],['Temperature & Light','High, low and light-exposure conditions help identify potential performance changes.'],['Leakage & Spray Checks','Crimping integrity, leakage risk and spray performance are reviewed on finished packs.'],['Batch Documentation','Production and quality records support COA, SDS and shipment documentation where applicable.']]},
    caseStudy:{kicker:'Example Launch Scope',title:'From Creative Brief to a Three-Scent Collection',text:'This representative project shows how a multi-SKU launch can be structured. Final quantities, timing and sampling rounds are confirmed against the selected formula and packaging.',label:'Representative Project Structure',stats:[['3','EDP scent directions'],['5,000','Bottles per scent'],['3','Sampling rounds'],['35 days','Illustrative production window']],checks:['Stock glass bottle with customized decoration','Coordinated caps, labels and rigid cartons','Batch documentation and DG sea-freight preparation'],cta:'Plan a Similar Collection'},
    export:{kicker:'Global Export Support',title:'Prepared for International Fragrance Shipping',text:'Alcohol-based perfume requires specialist handling. We coordinate the product, batch and dangerous-goods documents needed for the selected freight route.',regions:['North America','Europe','Middle East','Southeast Asia','Australia & New Zealand'],items:[['DG Freight Coordination','Specialist sea and air options for Class 3 alcohol-based fragrance shipments.'],['SDS & Batch Files','Formula and batch documentation prepared where applicable for freight and import review.'],['Export Packing','Carton configuration, product protection and shipment marks coordinated for the route.'],['Destination Guidance','Support for label, carton and logistics requirements based on the destination brief.']],note:'Freight availability, DDP service and destination requirements are confirmed individually for each country and shipment.'},
    faq:{kicker:'Before You Inquire',title:'Common Sourcing Questions',text:'A few practical answers to help you prepare quantity, product and packaging information before requesting a quote.',cta:'View All Questions',items:[['What is the typical minimum order quantity?','{{config.policies.moq}}'],['How long does fragrance sampling take?','Initial samples are typically prepared in {{config.samples.preparationDays.display}} after the brief and logistics arrangement are confirmed. Basic evaluation samples are free; the customer pays the actual courier cost.'],['Can the bottle, cap and box be customized?','Yes. Projects can use stock components with custom color, decoration and printed packaging, or develop dedicated components when quantity and tooling budget allow.'],['What documents can be supplied?','Available files may include SDS, COA, batch records and fragrance-related compliance documentation. Exact documents depend on the formula and destination market.'],['What is the typical production lead time?','Lead time is confirmed after formula and packaging approval. Stock-component projects are generally faster; customized glass, caps or rigid boxes require additional procurement time.'],['How are alcohol-based perfumes shipped?','They are handled as Class 3 Dangerous Goods (UN 1266) through specialist freight channels. The route is selected according to quantity, destination and delivery requirements.']]},
    inquiry:{kicker:'Start a Project',title:'Request Pricing & Sample Options',text:'Tell us what you plan to make, where it will be sold and your estimated quantity. The form prepares a structured WhatsApp inquiry for the factory sales team.',expectations:[['Include','Product type, quantity and destination'],['Receive','Suggested route, MOQ and sample options'],['Next step','Click WhatsApp to deliver the prepared inquiry']],email:'Prefer email?',form:contactForms.en.form}
  }
};

const zh = {
  hero:{eyebrow:'私人标签 · OEM · ODM',title:'中国香水定制与私人标签制造服务',text:'从香型开发、瓶器采购到灌装、包装和出口项目协调，由同一项目团队推进。',proof:['私人标签典型起订量：{{fact("privateLabelMoq")}}','样品准备：{{fact("sampleDaysShort")}}','服务全球 B2B 客户'],primary:'获取工厂报价',secondary:'申请香型样品'},
  metricLabels:['厂房面积','成立时间','受控生产车间','香型方向'],
  categories:{kicker:'产品能力',title:'围绕品牌需求规划香氛产品',text:'提供目标市场、数量、香型与包装方向，我们将评估合适的配方、组件和生产路径。',items:[['fine-fragrance','fine-fragrance.webp','香水私人标签产品','EDP · EDT · Extrait','精品香水','面向零售香水品牌的香型开发、灌装与成品包装。'],['home-fragrance','home-fragrance.webp','家居香氛产品','扩香 · 空间喷雾 · 香薰','家居香氛','根据具体配方、包装和目标市场评估可行形式。'],['body-fragrance','body-fragrance.webp','身体与发用香氛','Body Mist · Hair Mist','身体与发用香氛','适合美容、个人护理与生活方式品牌的细雾型产品。'],['packaging-solutions','packaging-solutions.webp','香水瓶器和包装组件','瓶 · 泵 · 盖 · 盒','包装解决方案','协调现货或定制组件，形成可执行的生产包装方案。']],link:'咨询项目'},
  models:{kicker:'选择合作方式',title:'三种香水项目路径',text:'根据已有资料、开发范围和目标数量选择合适的合作方式。',items:[{title:'私人标签',text:'从适合的现有香型方向和标准组件中选择，再应用品牌名称与包装设计。',specs:[['典型起订量','{{fact("privateLabelMoq")}}'],['适合','新品测试与快速上市']],link:'了解私人标签'},{title:'ODM 定制开发',text:'根据品牌定位、香型简报、成本与目标市场开发香型和包装。',specs:[['典型起订量','{{fact("customMoq")}}'],['适合','原创品牌系列']],link:'了解 ODM',featured:true},{title:'OEM / 委托加工',text:'客户提供已确认的配方、组件、设计稿或技术规格，工厂按确认范围执行生产。',specs:[['数量','按项目评估'],['适合','已有成熟标准的品牌']],link:'了解 OEM'}]},
  process:{kicker:'从需求到出货',title:'清晰的项目确认流程',text:'香型、包装、质量和生产均设置确认节点，减少批量生产前的信息偏差。',items:[['项目需求','确认市场、产品、香型、数量和预算。'],['香型打样','评估初始方向并提交反馈。'],['包装确认','确认瓶、泵、盖、装饰与外盒。'],['测试与生产','完成相容性评估和生产批准。'],['验货与运输','准备批次和运输所需资料。']],cta:'查看完整合作流程'},
  extended:{
    fragrance:{
      kicker:'香型开发',
      title:'将创意方向转化为品牌专属香型',
      text:'可以从参考香、香调家族或品牌故事开始。我们通过打样流程将需求简报转化为可供评估的香型方向。',
      families:['花香调','柑橘调','木质调','琥珀调','果香调','绿叶调','水生调','美食调'],
      checks:['提供三个初始香型方向用于评估','规划 EDP、EDT 与香精浓度方向','根据结构化反馈调整和优化配方'],
      cta:'提交香型开发需求'
    },
    manufacturing:{
      kicker:'生产能力',
      title:'支持稳定且可扩展的香水生产',
      text:'从试销项目到持续批发订单，生产按照明确的备料、调配、灌装和包装阶段推进。',
      items:['香精调配与熟化','冷却与过滤','自动灌装与泵头轧口','贴标、喷码与装盒','薄膜包装与出口装箱'],
      cta:'申请工厂介绍资料',
      caption:'受控生产环境',
      meta:'调配 · 灌装 · 装配'
    },
    quality:{
      kicker:'质量控制',
      title:'从配方到成品包装的质量检查',
      text:'在批准批量生产前，根据配方、包装组件和目标市场要求制定相应的检查方案。',
      items:[
        ['原料与组件检查','到厂香精、酒精和包装组件按照项目规格进行核对。'],
        ['稳定性评估','在设定的储存条件下观察配方的外观、气味和颜色变化。'],
        ['相容性评估','批量生产前评估配方与瓶器、泵头、密封件和装饰工艺的相容性。'],
        ['温度与光照观察','通过高温、低温和光照条件识别可能的产品表现变化。'],
        ['泄漏与喷雾检查','检查成品轧口密封、泄漏风险和喷雾表现。'],
        ['批次文件','生产与质量记录可用于支持适用的 COA、SDS 和运输资料。']
      ]
    },
    caseStudy:{
      kicker:'项目范围示例',
      title:'从创意简报到三款香型系列',
      text:'该示例展示多 SKU 上市项目可以如何规划。最终数量、周期和打样轮次需根据确认的配方与包装方案确定。',
      label:'代表性项目结构',
      stats:[['3','个 EDP 香型方向'],['5,000','每款香型瓶数'],['3','轮打样'],['35 天','示例生产周期']],
      checks:['使用现货玻璃瓶并定制表面装饰','协调瓶盖、标签和硬盒包装','准备批次文件和危险品海运资料'],
      cta:'规划类似产品系列'
    },
    export:{
      kicker:'全球出口支持',
      title:'为国际香水运输做好准备',
      text:'含酒精香水需要专业运输处理。我们协助准备所选运输路线需要的产品、批次及危险品相关资料。',
      regions:['北美','欧洲','中东','东南亚','澳大利亚与新西兰'],
      items:[
        ['危险品运输协调','为第 3 类含酒精香水货物评估专业海运和空运方案。'],
        ['SDS 与批次资料','在适用情况下准备配方和批次资料，供运输及进口审核使用。'],
        ['出口包装','根据运输路线协调外箱配置、产品防护和运输标识。'],
        ['目的地要求支持','根据目的地需求协助确认标签、外箱和物流相关要求。']
      ],
      note:'具体国家和批次的运输可用性、DDP 服务及目的地要求均需逐单确认。'
    },
    faq:{
      kicker:'询价前准备',
      title:'常见采购问题',
      text:'以下信息可帮助您在询价前准备数量、产品和包装需求。',
      cta:'查看全部常见问题',
      items:[
        ['典型起订量是多少？','使用适合的标准组件时，私人标签项目典型起订量为 {{fact("privateLabelMoq")}}，定制项目典型起订量为 {{fact("customMoq")}}。更低数量可申请个案评估，但不保证可行。'],
        ['香型样品通常需要多久？','确认需求简报和寄送安排后，初始样品通常在 {{fact("sampleDays")}} 内准备。基础评估样品免费，客户承担实际快递费用。'],
        ['香水瓶、瓶盖和外盒可以定制吗？','可以。项目可使用现货组件并定制颜色、表面工艺和印刷包装；当数量和模具预算合适时，也可以开发专用组件。'],
        ['可以提供哪些文件？','根据配方和目标市场，可提供的资料可能包括 SDS、COA、批次记录以及香精相关合规文件。'],
        ['典型生产周期是多久？','生产周期在配方和包装批准后确认。使用现货组件的项目通常更快；定制玻璃瓶、瓶盖或硬盒需要额外采购时间。'],
        ['含酒精香水如何运输？','含酒精香水通常作为第 3 类危险品（UN 1266）通过专业渠道运输，具体路线根据数量、目的地和交付要求确定。']
      ]
    },
    inquiry:{
      kicker:'启动项目',
      title:'获取报价与样品方案',
      text:'请告诉我们计划生产的产品、销售市场和预计数量。表单会为工厂项目团队整理一条结构化 WhatsApp 询盘。',
      expectations:[['需要提供','产品类型、预计数量和目的地'],['您将收到','建议合作路径、起订量和样品方案'],['下一步','通过 WhatsApp 发送整理后的询盘']],
      email:'更习惯使用邮箱？',
      form:contactForms['zh-CN'].form
    }
  },
  final:{title:'准备讨论您的香水项目？',text:'提交产品类型、预计数量和定制需求，我们将先进行可行性评估。',cta:'提交项目需求'}
};

module.exports = { en, 'zh-CN': zh };
