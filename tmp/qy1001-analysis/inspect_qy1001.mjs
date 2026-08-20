import fs from "node:fs/promises";
import { FileBlob, SpreadsheetFile } from "@oai/artifact-tool";

const workbookPath = "/Users/dodo/Project/AROMAMATRIX/tmp/qy1001-analysis/产品型号表9.26.xlsx";
const input = await FileBlob.load(workbookPath);
const workbook = await SpreadsheetFile.importXlsx(input);

const sheets = await workbook.inspect({
  kind: "sheet",
  include: "id,name",
  maxChars: 12000,
});
console.log("SHEETS");
console.log(sheets.ndjson);

const detail = await workbook.inspect({
  kind: "table",
  sheetId: "产品型号表",
  range: "A1:I130",
  include: "values,formulas",
  tableMaxRows: 140,
  tableMaxCols: 12,
  tableMaxCellChars: 300,
  maxChars: 120000,
});
console.log("DETAIL");
console.log(detail.ndjson);

await fs.writeFile(
  "/Users/dodo/Project/AROMAMATRIX/tmp/qy1001-analysis/full-table.ndjson",
  detail.ndjson,
  "utf8",
);

const sheet = workbook.worksheets.getItem("产品型号表");
const values = sheet.getRange("A1:I130").values;
await fs.writeFile(
  "/Users/dodo/Project/AROMAMATRIX/tmp/qy1001-analysis/full-table.json",
  JSON.stringify(values, null, 2),
  "utf8",
);

const drawings = await workbook.inspect({
  kind: "drawing",
  sheetId: "产品型号表",
  maxChars: 120000,
});
console.log("DRAWINGS");
console.log(drawings.ndjson);

await fs.writeFile(
  "/Users/dodo/Project/AROMAMATRIX/tmp/qy1001-analysis/drawings.ndjson",
  drawings.ndjson,
  "utf8",
);

const preview = await workbook.render({
  sheetName: "产品型号表",
  range: "A1:I130",
  scale: 0.75,
  format: "png",
});
await fs.writeFile(
  "/Users/dodo/Project/AROMAMATRIX/tmp/qy1001-analysis/full-preview.png",
  new Uint8Array(await preview.arrayBuffer()),
);
