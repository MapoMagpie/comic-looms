/**
 * Search normalization utilities (Chinese numerals ⇄ Arabic numerals).
 *
 * Makes searching `21` match `第二十一话`, and searching `一` match `第1话`.
 * Approach: normalize numerals in both the title and the search term, then do
 * plain substring matching — no fuzzy matching, no sorting.
 */

/** Chinese numeral characters (including common variants 〇/两/廿/卅) */
const CN_DIGITS: Record<string, number> = {
  零: 0, 〇: 0,
  一: 1, 二: 2, 两: 2, 三: 3, 四: 4, 五: 5, 六: 6, 七: 7, 八: 8, 九: 9,
};

const SMALL_UNITS: Record<string, number> = { 十: 10, 百: 100, 千: 1000 };
const BIG_UNITS: Record<string, number> = { 万: 10000, 亿: 100000000 };

/** A contiguous run of Chinese numeral characters (e.g. "二十一", replaced as a whole) */
const CN_NUM_RUN = /[零〇一二两三四五六七八九十百千万亿廿卅]+/g;

/**
 * Parse a run of Chinese numerals into an integer, e.g. "二十一" → 21, "一千零五十" → 1050.
 * Positional counting: 十/百/千 accumulate into the current section, 万/亿 settle big units.
 */
function parseCnNumber(run: string): number {
  let total = 0;    // settled value (multiplied when hitting 万/亿)
  let section = 0;  // current section value (below 万)
  let current = 0;  // pending unit digit
  for (const ch of run) {
    if (ch === "廿" || ch === "卅") {
      section += (ch === "廿" ? 2 : 3) * 10;
      current = 0;
      continue;
    }
    const big = BIG_UNITS[ch];
    if (big !== undefined) {
      if (big === 10000) {
        // 万 only settles the current section, without touching the settled 亿 part (e.g. 二亿五千万)
        total += (section + current || 1) * big;
      } else {
        total = (total + section + (current || 1)) * big;
      }
      section = 0;
      current = 0;
      continue;
    }
    const small = SMALL_UNITS[ch];
    if (small !== undefined) {
      section += (current || 1) * small; // a bare "十" is treated as "一十"
      current = 0;
      continue;
    }
    current = CN_DIGITS[ch] ?? 0;
  }
  return total + section + current;
}

/** Title normalization: replace runs of Chinese numerals with Arabic digits, "第廿一话" → "第21话" */
export function cnToArabic(text: string): string {
  return text.replace(CN_NUM_RUN, (run) => String(parseCnNumber(run)));
}

const DIG_CN = ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九"];
const POS_CN = ["", "十", "百", "千"];
const BIG_CN = ["", "万", "亿"];

/** Convert a section of 1..9999 to Chinese numerals (with zero placeholders), e.g. 105 → "一百零五" */
function sectionToCn(sec: number): string {
  const slots: Array<[digit: number, pos: number]> = []; // pos: 3=千 2=百 1=十 0=个
  let rem = sec;
  for (let pos = 3; pos >= 0; pos--) {
    const d = Math.floor(rem / 10 ** pos);
    if (d) slots.push([d, pos]);
    rem %= 10 ** pos;
  }
  let out = "";
  slots.forEach(([d, pos], idx) => {
    const isLeadingTen = idx === 0 && pos === 1 && d === 1; // "十一" not "一十一"
    out += (isLeadingTen ? "" : DIG_CN[d]) + POS_CN[pos];
    const next = slots[idx + 1];
    if (next && pos - next[1] > 1) out += "零"; // fill zero for skipped positions, e.g. 一百零五
  });
  return out;
}

/** Convert an Arabic number to Chinese numerals, e.g. 21 → "二十一", 105 → "一百零五" */
function toCnNumber(n: number): string {
  if (n === 0) return "零";
  const sections: number[] = [];
  while (n > 0) {
    sections.push(n % 10000);
    n = Math.floor(n / 10000);
  }
  let out = "";
  let pendingZero = false; // zero across 万/亿 sections, e.g. 一万零五
  for (let i = sections.length - 1; i >= 0; i--) {
    const sec = sections[i];
    if (sec === 0) {
      if (out) pendingZero = true;
      continue;
    }
    if (pendingZero || (out && sec < 1000)) out += "零";
    pendingZero = false;
    out += sectionToCn(sec) + (BIG_CN[i] ?? "");
  }
  return out;
}

/** Search term normalization: replace runs of Arabic digits with Chinese numerals, "第21话" → "第二十一话" */
export function arabicToCn(text: string): string {
  return text.replace(/[0-9]+/g, (run) => toCnNumber(parseInt(run, 10)));
}

/**
 * Parse a special pagination term: of the form %2 (% followed by digits, page number starts at 1).
 * Returns the page number (e.g. %2 → 2), or null when it is not a pagination term
 * (a lone %, %2x, an ordinary search term, etc.).
 */
export function parsePageTerm(term: string): number | null {
  const m = /^%(\d+)$/.exec(term.trim());
  return m ? parseInt(m[1], 10) : null;
}

/**
 * Normalized matching: whether the title matches the given search term.
 * After converting numerals in both directions, check substring inclusion (4 combinations,
 * covering pure Chinese, pure digits and mixed spellings):
 *  - raw title contains raw term
 *  - raw title contains term with digits → Chinese
 *  - title with Chinese → digits contains term with Chinese → digits
 *  - title with Chinese → digits contains term with digits → Chinese
 * Also applies NFKC (full-width → half-width digits) and lowercase folding,
 * so full-width "１" matches "1" as well.
 */
export function matchesSearch(title: string, term: string): boolean {
  const q = term.trim();
  if (!q) return true;
  const t = title.normalize("NFKC").toLowerCase();
  const qn = q.normalize("NFKC").toLowerCase();
  const tAr = cnToArabic(t);
  const qAr = cnToArabic(qn);
  const qCn = arabicToCn(qn);
  return t.includes(qn) || t.includes(qCn) || tAr.includes(qAr) || tAr.includes(qCn);
}