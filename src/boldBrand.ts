// Met en gras chaque occurrence de « Gbevimi » / « Gbèvimi » dans le texte affiché du site
const BRAND = /gb[eè]vimi/gi;
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
    strong.textContent = m[0];
    frag.append(strong);
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
