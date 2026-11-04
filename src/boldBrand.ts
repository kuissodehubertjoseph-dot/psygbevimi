// Met en gras et en majuscules chaque occurrence de « Gbevimi » / « Gbèvimi » dans le texte affiché du site ;
// quand le nom complet suit (« C. F. Houénon »), la suite est mise en gras aussi
const BRAND = /(gb[eè]vimi)(\s+c\.\s*f\.\s+ho[uü]?[eé]non)?/gi;
const SKIP_TAGS = new Set(['STRONG', 'B', 'SCRIPT', 'STYLE', 'TEXTAREA', 'INPUT', 'TITLE', 'NOSCRIPT']);

function boldIn(node: Text) {
  const parent = node.parentElement;
  if (!parent || SKIP_TAGS.has(parent.tagName) || parent.closest('strong, b')) return;

  const text = node.nodeValue ?? '';
  BRAND.lastIndex = 0;
  if (!BRAND.test(text)) return;

  const frag = document.createDocumentFragment();
  let last = 0;
  BRAND.lastIndex = 0;
  for (let m = BRAND.exec(text); m; m = BRAND.exec(text)) {
    frag.append(text.slice(last, m.index));
    const strong = document.createElement('strong');
    strong.style.fontWeight = '700';
    strong.style.textTransform = 'uppercase';
    strong.textContent = m[1];
    frag.append(strong);
    if (m[2]) {
      const rest = document.createElement('strong');
      rest.style.fontWeight = '700';
      rest.textContent = m[2];
      frag.append(rest);
    }
    last = m.index + m[0].length;
  }
  frag.append(text.slice(last));
  node.replaceWith(frag);
}

function boldAll(root: Node) {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  const found: Text[] = [];
  for (let n = walker.nextNode(); n; n = walker.nextNode()) found.push(n as Text);
  found.forEach(boldIn);
}

export function startBoldBrand() {
  let queued = false;
  const run = () => {
    queued = false;
    boldAll(document.body);
  };
  new MutationObserver(() => {
    if (!queued) {
      queued = true;
      setTimeout(run, 50);
    }
  }).observe(document.body, { childList: true, subtree: true, characterData: true });
  run();
}
