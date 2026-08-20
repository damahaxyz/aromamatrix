# AROMAMATRIX 商店商品生成与维护指南

最后更新：2026-08-06

本文是 `https://shop.aromamatrix.com` 的商品内容与数据交接文档，供新的 AI 会话或维护人员快速继续工作。它记录当前已经确认的业务决策、商品字段生成逻辑、图片规范、WordPress/WooCommerce 字段映射及发布检查方法。

网站主站 `www.aromamatrix.com` 的品牌、工厂、合规和营销边界另见 [`AI_PROJECT_CONTEXT.md`](./AI_PROJECT_CONTEXT.md)。本文件只负责商店商品。

## 1. 新会话先记住这些结论

1. 商店面向 B2B 买家，商品用于选择香味方向或包装组件，不是仿牌香水零售目录。
2. `QY1001-1` 这类工厂型号只在后台使用，绝不能出现在公开标题、描述、标签、图片文字、URL 或前台搜索结果中。
3. 公开 SKU 与工厂型号是两个字段：例如 `AM-FR-1001-02` 对应后台工厂型号 `QY1001-2`。
4. 每个不同香味方向建立一个独立的 WooCommerce 简单商品，不使用香味变体。只有工厂确认多个型号使用完全相同的配方时，才考虑合并。
5. 香氛商品名称应简短、原创、易记，默认使用 2 个英文单词；1 个单词也可，最多不超过 3 个单词。
6. 标题不要附加 `Fragrance Sample`、容量、工厂型号、SKU 或第三方品牌名。
7. 香氛内容只帮助买家判断气味：香调、前中后调、气味性格、定位和可能适合的市场方向。
8. MOQ、交期、证书、定制流程、包装选择和合规流程由官网统一说明，不写进每个香氛商品。
9. 香氛样品只有一种标准评香规格，不建立容量选项或变量商品。
10. 商店货币为 USD；当前香氛样品价格为 `$0.00`，但商品必须保持可加入购物车。
11. 香氛商品不填写成品香水的重量、瓶身尺寸、外盒尺寸或箱规。那些数据属于 Excel 中的参考成品，买家尚未选择瓶子时不适用于香氛液。
12. 图片必须是 AROMAMATRIX 自有的原创评香视觉；可使用克制的 `AM` 或 `AROMAMATRIX` 自有标识，但不能直接使用或复刻第三方品牌瓶子、包装、商标和产品摄影。

## 2. 当前项目与数据位置

| 内容 | 位置 |
|---|---|
| 商店域名 | `https://shop.aromamatrix.com` |
| WordPress 项目 | `/Users/dodo/Documents/wordpress-sites/aromamatrix-shop` |
| 自研主题 | `/Users/dodo/Documents/wordpress-sites/aromamatrix-shop/theme/aromamatrix` |
| 自研插件 | `/Users/dodo/Documents/wordpress-sites/aromamatrix-shop/plugin/aromamatrix-plugin` |
| 当前商品上传脚本 | `tmp/qy1001-analysis/upload_products.mjs` |
| 商品审计脚本 | `tmp/qy1001-analysis/audit_live_products.mjs` |
| 分类与属性审计 | `tmp/qy1001-analysis/verify_taxonomy.mjs` |
| 商店交易设置审计 | `tmp/qy1001-analysis/audit_shop_commerce.mjs` |
| 当前处理用 Excel 副本 | `tmp/qy1001-analysis/产品型号表9.26.xlsx` |
| 工厂原始 Excel | `/Users/dodo/Documents/浙江lattafa代工厂/产品型号表9.26.xls` |
| 现有香氛图片 | `assets/images/shop-fragrances/` |

`tmp/qy1001-analysis/upload_products.mjs` 是现有 9 个商品最完整的机器可读字段来源。修改现有商品内容时，应同步更新该脚本，避免下一次执行时把人工修改覆盖回旧值。

## 3. 数据来源与判断顺序

生成内容时按以下优先级处理：

1. 工厂确认的配方资料、香精资料、实体样品和正式 brief。
2. Excel 中的工厂型号及参考产品记录。
3. 可核实的参考香味资料，用于理解气味方向；不要把第三方品牌关系写入公开页面。
4. AI 根据已确认信息整理出的原创英文标题和 B2B 描述。

注意：现有 Excel 记录的是参考成品信息，包含品牌式产品名、颜色、100 ml、包装尺寸、重量和箱规。把一行转成“香氛方向”商品时，只保留其内部型号关联和经确认的气味信息。不要把成品尺寸、重量、品牌名或包装外观复制到香氛商品。

如果只有颜色或包装名、没有足够气味资料，不能凭图片臆造前中后调。应先查证参考香味并与工厂样品核对；不能确认时保留为待审核数据，不要直接发布。

## 4. 一行 Excel 如何变成一个商品

### 4.1 先判断商品类型

- 如果卖点是香味、香精或评香方向：建立 `Fragrances` 下的香氛商品。
- 如果卖点是空瓶、泵头、瓶盖或包装组件：建立 `perfume-bottle` 体系下的瓶子/组件商品。
- 不要把参考成品的瓶子规格写入香氛商品，也不要把香味属性写入空瓶商品。

### 4.2 判断独立商品还是合并

默认规则：一个已确认的独立香味方向 = 一个独立商品。

- `QY1001-1` 至 `QY1001-9` 已确认按 9 个独立商品展示。
- 不使用下拉框把 9 种香味做成同一商品的变体，因为买家需要单独浏览、记忆、搜索和加入样品购物车。
- 如果多个 Excel 行只是相同香味的瓶子/颜色差异，应先让工厂确认是否同一配方。确认相同后才合并香氛商品。

### 4.3 SKU 规则

公开 SKU 推荐格式：

```text
AM-FR-{工厂系列四位数字}-{系列内两位序号}
```

示例：

```text
QY1001-2  -> AM-FR-1001-02
QY1002-4  -> AM-FR-1002-04
```

瓶子使用独立前缀，建议：

```text
AM-BT-{系列四位数字}-{系列内两位序号}
```

SKU 是客户可见的选样识别码，会由主题显示在商品列表和商品详情页。不要在短描述或长描述中再次手写 SKU。

### 4.4 工厂型号规则

工厂型号写入 WooCommerce 私有 meta：

```text
_aromamatrix_factory_reference
```

后台字段名称为 `Factory Model`。自研插件会：

- 在商品编辑页 SKU 附近显示和保存该字段；
- 在 WordPress 商品列表的 SKU 旁增加 `Factory Model` 列；
- 允许管理员用标准商品搜索框搜索工厂型号；
- 不向客户公开。

相关实现：

```text
plugin/aromamatrix-plugin/includes/class-factory-model.php
```

### 4.5 产品备注 `Product Note`

每一行导入时，把 Excel 的 `产品名称` 原文写入 WooCommerce 私有 meta：

```text
_aromamatrix_product_note
```

后台字段名称为 `Product Note`。它与 `Factory Model` 一样只供内部产品管理使用：在商品编辑页和商品列表显示，绝不向客户公开。不要把这个 Excel 参考名翻译、改写或复制到公开标题、描述、标签、图片文字或 URL。

## 5. 香氛商品字段生成规则

### 5.1 产品名称 `name`

目标：短、原创、便于记忆、能暗示主要气味。

- 默认 2 个英文单词；1 个单词可用于特别清晰且不冲突的名称。
- 最多 3 个单词，不使用长句。
- 优先使用“主要气味/质感 + 第二气味/意象”，例如 `Black Amber`、`Pear Jasmine`。
- 不使用第三方品牌、系列名或高度近似的商标名称。
- 不附加 `Fragrance Sample`、`Perfume`、`100 ml`、SKU、型号或性别字样。
- 同一目录中的名称应彼此明显不同，避免只换颜色词。

### 5.2 URL `slug`

- 使用英文小写和连字符。
- 与简短名称直接对应，例如 `Bourbon Vanilla` -> `bourbon-vanilla`。
- 不加入 SKU、工厂型号或 `fragrance-sample`。

### 5.3 简短描述 `short_description`

用途：帮助买家在商品标题附近快速判断香味，不说明操作流程。

写法：

- 一个英文句子，通常约 20–35 个单词。
- 先说明核心气味方向，再写最有辨识度的气味变化和收尾。
- 只使用能由资料或样品支持的香材、质感和结构。
- 不重复标题、SKU、分类、属性或样品申请说明。

推荐句式：

```text
A [character] [family] direction combining [top/heart identity] with [base identity and finish].
```

现有示例：

```text
A warm unisex gourmand direction pairing aromatic lavender and plum with cacao, nutmeg, bourbon vanilla, amber and vetiver.
```

### 5.4 产品详情 `description`

香氛详情固定包含两个对买家有用的部分：

```html
<h3>Fragrance Profile</h3>
<ul>
  <li><strong>Top:</strong> ...</li>
  <li><strong>Heart:</strong> ...</li>
  <li><strong>Base:</strong> ...</li>
</ul>
<h3>Suggested Market Direction</h3>
<p>...</p>
```

`Fragrance Profile`：

- 每层使用简短的已确认香材或 accord。
- 不需要加入故事性广告文案。
- 不写未经样品验证的持香时间、扩散强度或相似度百分比。

`Suggested Market Direction`：

- 是气味风格可能适合的市场方向，不是法规或销售保证。
- 可以写区域、季节、消费风格和产品定位，例如 Gulf、Southeast Asian、European、North American、warm-weather、evening、youth-focused、premium unisex。
- 使用 `Potential fit for ...`、`seeking ...` 等审慎表述。
- 不写“最适合”“一定畅销”“符合某国法规”等保证。

### 5.5 全局属性 `attributes`

香氛当前使用 3 个全局 WooCommerce 属性，并在商品详情的 `Fragrance Attributes` 中显示：

1. `Fragrance Family`：选择 2–3 个标准香调族。
2. `Positioning`：选择 1 个，`Masculine`、`Feminine` 或 `Unisex`。
3. `Scent Character`：选择 2–4 个最有判断价值的性格词。

当前标准词：

```text
Fragrance Family:
Floral, Fruity, Gourmand, Citrus, Aquatic, Amber,
Spicy, Woody, Leather, Aromatic, Musk, Powdery

Positioning:
Masculine, Feminine, Unisex

Scent Character:
Fresh, Sweet, Creamy, Warm, Dark, Clean,
Elegant, Playful, Smoky, Rich
```

不要为了增加关键词而选择不明显的属性。需要新词时，应先确认它适合整个目录并作为全局属性 term 创建，避免自由文本拼写分裂。

### 5.6 二级分类 `categories`

每个香氛至少分配：

1. 父分类 `Fragrances`；
2. 一个最主要的二级分类。

现有二级分类：

| 分类 | Slug | 使用范围 |
|---|---|---|
| Floral | `floral` | 以花香为主要识别 |
| Fruity | `fruity` | 果香为主要识别 |
| Sweet & Gourmand | `sweet-gourmand` | 香草、奶油、可可、糖果等 |
| Fresh & Aquatic | `fresh-aquatic` | 清新、柑橘、海洋、矿物、水生 |
| Amber & Spicy | `amber-spicy` | 琥珀、树脂、辛香、温暖东方感 |
| Woody & Leather | `woody-leather` | 木质、烟草、皮革、乌木等 |
| Green & Aromatic | `green-aromatic` | 绿叶、草本、薰衣草、芳香调 |
| Musk & Powdery | `musk-powdery` | 麝香、粉质、皂感、柔和洁净感 |

二级分类用于浏览，不要把所有相关分类都勾选。交叉特征通过全局属性和标签表达。

### 5.7 产品标签 `tags`

- 使用 4–6 个最能帮助买家判断的关键香材或 accord。
- 标签使用 Title Case 英文，例如 `Black Pepper`、`Sea Lavender`、`Bourbon Vanilla`。
- 优先选择能在多个商品间复用的标准词。
- 不把国家、性别、SKU、型号、颜色、容量或营销词作为标签。

### 5.8 价格与商品类型

当前香氛样品设置：

```json
{
  "type": "simple",
  "status": "publish",
  "catalog_visibility": "visible",
  "regular_price": "0",
  "manage_stock": false,
  "sold_individually": false,
  "weight": "",
  "dimensions": { "length": "", "width": "", "height": "" }
}
```

- 商店货币是 USD。
- `$0.00` 是当前样品商品价格策略，不代表大货或定制项目报价。
- 一个购物车数量对应一份标准评香样品。
- 不建立容量 variation，也不写 2 ml、5 ml、10 ml 等未确认规格。
- 不填写参考成品的 100 ml、0.443 kg 或 15 × 9 × 9 cm。

## 6. 香氛图片生成规则

### 6.1 视觉内容

每张图片应表达“香味方向”，不是展示某个第三方成品：

- 使用原创、清晰可辨的香水瓶，不使用第三方品牌瓶型、标签或包装。可以在瓶身小铭牌上使用克制、清晰的 `AM` 或 `AROMAMATRIX` 自有标识；该标识是唯一可见文字，不做水印。
- 用 3–6 个能代表主要前中后调的原料/意象围绕瓶子构图。
- 主体清晰、背景整洁，符合官网克制、可信、轻奢但偏 B2B 的风格。
- 9 张或同一批次图片保持相同摄影语言、瓶型、光线质量和构图密度。
- 不出现第三方 logo、品牌瓶型、原包装、商标文字、人物代言或虚构认证标识。
- 不把第三方商品图片交给模型做近似复刻。

### 6.2 尺寸与构图安全区

当前源图和 WebP 均为：

```text
1254 × 1254 px，1:1
```

列表卡片会以较高的竖向比例裁切图片，详情页显示更接近方形。因此：

- 样品瓶和关键香材必须放在中央安全区；
- 左右边缘只放次要背景元素；
- 不要让瓶盖、瓶底或核心原料紧贴画面边缘；
- 上传前同时检查方形详情图和竖向卡片裁切效果。

### 6.3 文件规范

保留 PNG 源文件，并上传优化后的 WebP：

```text
assets/images/shop-fragrances/
am-fr-{series}-{index}-{descriptive-slug}.png
am-fr-{series}-{index}-{descriptive-slug}.webp
```

示例：

```text
am-fr-1001-07-bourbon-vanilla-cacao.webp
```

媒体字段：

```text
Media title: {SKU} — {Product Name}
Product image alt: {Product Name} fragrance direction
```

Alt 文本应简洁描述当前商品，不堆砌 SEO 关键词。公开图片不要加文字水印，因为商品名称和 SKU 已由 HTML 显示；瓶身小铭牌可保留克制的 `AM` 或 `AROMAMATRIX` 自有标识。

## 7. 不应出现在香氛商品中的内容

以下内容已被用户明确否定，或属于官网统一信息：

- `What you are selecting`
- `Product focus`
- `A fragrance direction for scent evaluation`
- `Recommended applications`
- `Packaging selection`
- `Available customization`
- MOQ、交期、证书、合规文档、打样流程和报价流程
- `如需获取 B2B 样品或报价，请使用 SKU ...`
- `Internal factory reference: QY...`
- 在描述中重复 `AROMAMATRIX SKU`
- `This page presents an olfactive direction ... No affiliation ...`
- 与第三方品牌关系、仿牌表述、相似度百分比
- 香氛液尚未选择瓶子时的重量、尺寸、100 ml 容量和箱规

主题已经统一提供 `Fragrance Sample` 说明、标准样品数量、加入购物车按钮、SKU、分类和标签。不要把这些内容再次写进商品描述。

## 8. 现有 QY1001 九个商品映射

以下数据已经上线，是继续维护时的基准：

| 后台工厂型号 | 公开 SKU | 名称 | Slug | 主二级分类 | Positioning |
|---|---|---|---|---|---|
| QY1001-1 | AM-FR-1001-01 | Tropical Vanilla | `tropical-vanilla` | Sweet & Gourmand | Feminine |
| QY1001-2 | AM-FR-1001-02 | Black Amber | `black-amber` | Amber & Spicy | Masculine |
| QY1001-3 | AM-FR-1001-03 | Mango Cream | `mango-cream` | Fruity | Feminine |
| QY1001-4 | AM-FR-1001-04 | Pear Jasmine | `pear-jasmine` | Floral | Feminine |
| QY1001-5 | AM-FR-1001-05 | Strawberry Candy | `strawberry-candy` | Sweet & Gourmand | Feminine |
| QY1001-6 | AM-FR-1001-06 | Salted Coconut | `salted-coconut` | Fresh & Aquatic | Masculine |
| QY1001-7 | AM-FR-1001-07 | Bourbon Vanilla | `bourbon-vanilla` | Amber & Spicy | Unisex |
| QY1001-8 | AM-FR-1001-08 | Marine Mineral | `marine-mineral` | Fresh & Aquatic | Unisex |
| QY1001-9 | AM-FR-1001-09 | Velvet Plum | `velvet-plum` | Fruity | Feminine |

每个商品的完整 notes、summary、market direction、attributes、tags 和图片文件名，以 `tmp/qy1001-analysis/upload_products.mjs` 中的 `products` 数组为准。

## 9. 瓶子商品的独立规则

瓶子页面使用同一主题，但内容逻辑与香氛不同。

### 9.1 应提供的信息

- 简短原创名称，优先描述轮廓、材质或视觉风格；
- 公开瓶子 SKU；
- 后台工厂型号；
- 空瓶正面、侧面、瓶口/泵头和可选颜色的真实或准确产品图；
- 经工厂确认的容量、材质、瓶口规格、泵头/盖子兼容性和装饰方式；
- 只有在已确认时才写单瓶尺寸、重量、箱规和装箱数；
- 简短描述应帮助买家判断设计风格和适用产品定位。

### 9.2 不应提供的信息

- 不给空瓶添加前中后调、Fragrance Family 或 Scent Character；
- 不把某个参考成品的香味描述复制给瓶子；
- 不在未确认的情况下推测玻璃厚度、密封性能、材质、容量或泵头规格；
- MOQ、交期和统一定制流程仍由官网统一说明。

### 9.3 主题现有行为

只要商品属于 `perfume-bottle` 父分类或其子分类，主题会自动使用：

- `Perfume Bottle` / `Bottle` 类型标签；
- `Bottle Sample` 样品面板；
- `Add Bottle Sample` 按钮；
- `Bottle Details` 和 `Bottle Specifications` 标题；
- 每个购物车数量默认代表一份空瓶样品。

## 10. WooCommerce 写入逻辑

### 10.1 推荐方式

使用 WooCommerce REST API 按 SKU upsert，不直接修改数据库：

```text
GET  /wp-json/wc/v3/products?sku={SKU}
POST /wp-json/wc/v3/products
PUT  /wp-json/wc/v3/products/{id}
```

媒体使用 WordPress REST API：

```text
POST /wp-json/wp/v2/media
POST /wp-json/wp/v2/media/{id}
```

认证信息必须从环境变量或交互式秘密输入读取。现有脚本使用：

```text
WP_APP_PASSWORD
```

不要把 application password、SSH 密钥、数据库密码或 API secret 写入脚本、本文档、Git 提交或终端输出。

### 10.2 Upsert 顺序

1. 确保父分类和二级分类存在。
2. 确保 3 个全局属性及需要的 terms 存在。
3. 确保产品标签存在。
4. 按 SKU 或媒体标题检查图片是否已上传，避免重复媒体。
5. 上传 WebP，写入 media title 和 alt。
6. 按 SKU 查找商品；存在则 PUT，不存在则 POST。
7. 写入公开字段、分类、标签、属性和私有工厂型号。
8. 审计结果后再继续下一批。

### 10.3 关键 payload 结构

```js
{
  name,
  slug,
  type: "simple",
  status: "publish",
  catalog_visibility: "visible",
  regular_price: "0",
  description,
  short_description: `<p>${summary}</p>`,
  sku,
  manage_stock: false,
  sold_individually: false,
  weight: "",
  dimensions: { length: "", width: "", height: "" },
  categories: [parentCategory, primaryChildCategory],
  tags,
  images: [{ id: mediaId, alt: `${name} fragrance direction` }],
  attributes: [family, positioning, character],
  meta_data: [
    { key: "_aromamatrix_factory_reference", value: factoryModel },
    { key: "_aromamatrix_product_note", value: excelProductName },
    { key: "catalog_purpose", value: "B2B fragrance sample presentation" }
  ]
}
```

## 11. 主题如何展示这些字段

实现位置：

```text
theme/aromamatrix/functions.php
theme/aromamatrix/assets/css/woocommerce.css
```

当前商品列表：

- 4 列桌面布局，每页 12 个商品；
- 卡片顶部显示 `Fragrance` 或 `Bottle`；
- 商品图片铺满卡片宽度；
- 名称在左、价格在同一行右侧；
- SKU 显示在下一行；
- 图片悬浮不缩放越界，只做轻微色彩/对比度变化；
- 按钮显示 `Add Sample` 或 `Add Bottle Sample`。

当前商品详情：

- 左侧图片，右侧类型、标题、价格、短描述和样品购买区；
- SKU、分类和标签由主题单独显示；
- WooCommerce Description 与 Additional Information 已合并为一个详情区域；
- 香氛显示 `Fragrance Details` + `Fragrance Attributes`；
- 瓶子显示 `Bottle Details` + `Bottle Specifications`。

因此，内容生成脚本只负责商品数据，不要在 description 中复制主题已经展示的信息。

## 12. 发布与验证清单

### 12.1 商品数据更新后

商品数据通过 REST API 更新，无需部署主题。至少检查：

- SKU 只对应一个商品；
- 商品为 `publish` 和 `visible`；
- 标题为 1–3 个词，Slug 简洁；
- 短描述只有一段气味判断；
- 详情包含 `Fragrance Profile` 和 `Suggested Market Direction`；
- 3 个买家属性正确；
- 父分类、一个主二级分类和 4–6 个标签正确；
- 工厂型号存在于 `_aromamatrix_factory_reference`；
- 产品备注存在于 `_aromamatrix_product_note`，且等于 Excel 的 `产品名称`；
- 工厂型号没有出现在任何公开文案；
- 香氛 weight 与 dimensions 为空；
- 图片、alt 和裁切正常；
- USD 价格是 `$0.00`，商品可加入购物车；
- 不存在容量 variation；
- 列表、详情、Related products、Cart 和 Checkout 显示正常。

可使用现有脚本：

```bash
WP_APP_PASSWORD='通过安全方式提供' node tmp/qy1001-analysis/audit_live_products.mjs
WP_APP_PASSWORD='通过安全方式提供' node tmp/qy1001-analysis/verify_taxonomy.mjs
WP_APP_PASSWORD='通过安全方式提供' node tmp/qy1001-analysis/audit_shop_commerce.mjs
```

不要把真实密码直接写入命令历史。实际执行时优先使用交互式 `read -rs` 或安全的会话环境变量。

### 12.2 主题或插件代码更新后

在 WordPress 项目目录执行检查，再部署对应组件：

```bash
cd /Users/dodo/Documents/wordpress-sites/aromamatrix-shop

find theme/aromamatrix -name '*.php' -print0 | xargs -0 -n1 php -l
node --check theme/aromamatrix/assets/js/theme.js
git diff --check -- theme/aromamatrix plugin/aromamatrix-plugin

./scripts/deploy-theme.sh
./scripts/deploy-plugin.sh
```

- 只改商品数据：不需要部署主题或插件。
- 改前台模板/CSS/JS：部署主题。
- 改后台工厂型号或其他业务功能：部署插件。
- 部署脚本会备份目标、刷新 Docker 服务并执行健康检查。

### 12.3 视觉验收

至少用 PC 和手机宽度检查：

1. 香氛分类页全部商品卡片；
2. 一个香氛详情页；
3. 一个瓶子详情页（瓶子上线后）；
4. Related products；
5. Cart；
6. Checkout。

特别关注图片裁切、悬浮边界、名称与价格同排、SKU、零价商品按钮和购物车数量。

## 13. 新 AI 的推荐工作顺序

收到“继续导入 Excel 商品”任务时：

1. 阅读本文件和 `AI_PROJECT_CONTEXT.md`。
2. 读取 Excel，而不是只看截图或沿用旧会话记忆。
3. 列出将处理的型号，识别重复配方、缺失香味资料和瓶子/香氛混淆项。
4. 先生成一份结构化产品数据预览，核对 SKU、名称、香调和分类。
5. 对资料不足的型号先查证或请求工厂确认，不编造 notes。
6. 按统一视觉规范生成图片并检查方形/竖向裁切。
7. 使用 REST API 按 SKU upsert，小批量发布。
8. 运行审计脚本并进行前台视觉验收。
9. 如果生成逻辑有新决定，同步更新本文档和上传脚本。
