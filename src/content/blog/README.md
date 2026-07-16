# Multilingual blog content

Each article uses a stable directory ID:

```text
articles/{article-id}/
  article.js
  en.njk
  zh-CN.njk
  es.njk
```

`article.js` contains facts shared by every translation: `id`, `coverImage`, `author`, stable category key and `datePublished`.

Each `{locale}.njk` contains JSON-literal front matter followed by the localized article body:

```njk
---
locale: "zh-CN"
status: "draft"
slug: "stable-ascii-slug"
title: "文章标题"
description: "列表摘要"
coverAlt: "本地化图片说明"
seoTitle: "SEO 标题"
seoDescription: "SEO 描述"
primaryKeyword: "主要关键词"
secondaryKeywords: []
dateModified: "2026-07-16"
---
<p>本地化正文……</p>
```

Use `draft`, `review` or `published` for `status`. Only `published` translations for enabled locales are generated. Do not publish a translated navigation shell with an untranslated article body.
