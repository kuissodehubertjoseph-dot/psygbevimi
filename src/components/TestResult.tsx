import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, Info, Lightbulb, Mail, MessageCircle, Star, Target, TriangleAlert } from 'lucide-react';
import { createWhatsAppUrl } from '../data';

interface Range {
  min: number;
  max: number;
}

interface DimensionResult {
  id: string;
  label: string;
  score: number;
  scoreRange: Range;
  recommendation?: string | null;
}

interface Breakdown {
  dimensions: DimensionResult[];
  strengths: DimensionResult[];
  priorities: DimensionResult[];
}

interface ResultState {
  score: number;
  scoreRange: Range;
  interpretation: {
    level: 'fragile' | 'a-consolider' | 'solide';
    label: string;
    description: string;
    needsCrisisNotice: boolean;
    recommendations: string[];
  };
  breakdown: Breakdown | null;
  testName: string;
}

const LEVEL_LABEL = { fragile: 'Fragile', 'a-consolider': 'À consolider', solide: 'Solide' } as const;
const LEVEL_STYLE = {
  fragile: { chip: 'bg-[#e11d48]/10 text-[#e11d48]', bar: 'bg-[#e11d48]' },
  'a-consolider': { chip: 'bg-amber-100 text-amber-800', bar: 'bg-amber-500' },
  solide: { chip: 'bg-[#16a34a]/10 text-[#16a34a]', bar: 'bg-[#16a34a]' },
} as const;

const fmt = (n: number) => new Intl.NumberFormat('fr-FR', { maximumFractionDigits: 2 }).format(n);
const pct = (v: number, r: Range) => {
  const span = r.max - r.min;
  return Math.min(100, Math.max(0, span > 0 ? ((v - r.min) / span) * 100 : 0));
};

const BTN_BASE =
  'inline-flex items-center justify-center gap-2 rounded-full font-semibold leading-tight transition-colors whitespace-nowrap px-6 py-3.5 text-[0.95rem]';
const BTN_PRIMARY = `${BTN_BASE} bg-[#2563eb] text-white hover:bg-[#2563eb]/90`;
const BTN_WHATSAPP = `${BTN_BASE} bg-[#16a34a] text-white hover:bg-[#16a34a]/90`;
const BTN_GHOST = `${BTN_BASE} border border-[#0f1b33]/15 bg-white/60 text-[#0f1b33] hover:bg-white`;

const DimList: React.FC<{ title: string; icon: React.ReactNode; tone: string; items: DimensionResult[] }> = ({
  title,
  icon,
  tone,
  items,
}) => (
  <div className="flex flex-col gap-3 rounded-2xl bg-[#f3f6fb] p-5">
    <p className={`flex items-center gap-2 text-xs font-semibold tracking-wider uppercase ${tone}`}>
      {icon}
      {title}
    </p>
    <ol className="flex flex-col gap-2">
      {items.map((d) => (
        <li key={d.id} className="flex items-baseline justify-between gap-3">
          <span className="leading-snug">{d.label}</span>
          <span className="shrink-0 text-sm tabular-nums text-[#0f1b33]/60">{fmt(d.score)}</span>
        </li>
      ))}
    </ol>
  </div>
);

export const TestResult: React.FC = () => {
  const state = useLocation().state as ResultState | null;

  if (!state) {
    return (
      <div className="old-skin flex min-h-[70vh] items-center justify-center bg-[#f3f6fb] px-6">
        <div className="flex max-w-md flex-col items-start gap-4 rounded-2xl border border-[#0f1b33]/10 bg-white p-8 text-[#0f1b33]">
          <h1 className="text-3xl">Aucun résultat à afficher</h1>
          <p className="text-[#0f1b33]/70">Faites un test pour voir votre résultat ici. Cela prend environ 5 minutes.</p>
          <Link to="/tests" className={BTN_PRIMARY}>
            Voir les tests gratuits
          </Link>
        </div>
      </div>
    );
  }

  const { score, scoreRange, interpretation: it, breakdown, testName } = state;
  const style = LEVEL_STYLE[it.level];
  const whatsappUrl = createWhatsAppUrl(
    `Bonjour Psy Gbevimi, je viens de faire le test « ${testName} ». Mon résultat : ${it.label} (${fmt(score)}/${scoreRange.max}). J'aimerais recevoir mon analyse complète et en parler.`,
  );
  const bookingUrl = createWhatsAppUrl(
    `Bonjour Psy Gbevimi, je souhaite réserver mon appel découverte gratuit. Je viens de la page « Résultat du test : ${testName} ».`,
  );
  const withAdvice = breakdown?.dimensions.filter((d) => d.recommendation) ?? [];

  return (
    <div className="old-skin min-h-screen bg-[#f3f6fb] px-6 pt-16 pb-20 text-[#0f1b33]">
      <div className="mx-auto flex max-w-3xl flex-col gap-8">
        <Link to="/tests" className="inline-flex w-fit items-center gap-1.5 text-sm text-[#0f1b33]/60 hover:text-[#0f1b33]">
          <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Tous les tests
        </Link>

        {it.needsCrisisNotice && (
          <div role="alert" className="flex gap-4 rounded-2xl border border-[#e11d48]/30 bg-white p-5">
            <TriangleAlert className="mt-0.5 h-6 w-6 shrink-0 text-[#e11d48]" aria-hidden="true" />
            <div className="flex flex-col gap-1">
              <p className="font-semibold">Vous traversez peut-être une période difficile.</p>
              <p className="text-sm leading-relaxed text-[#0f1b33]/70">
                Si vous êtes en danger ou en détresse intense, contactez sans attendre les services d'urgence ou une
                personne de confiance. Vous pouvez aussi nous écrire dès maintenant sur WhatsApp.
              </p>
            </div>
          </div>
        )}

        <div className="flex flex-col gap-5 rounded-2xl border border-[#0f1b33]/10 bg-white p-6 md:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#0f1b33]/60">
            Votre résultat · {testName}
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-3xl leading-tight md:text-4xl">{it.label}</h1>
            <span className={`rounded-full px-3 py-1 text-sm font-semibold ${style.chip}`}>{LEVEL_LABEL[it.level]}</span>
          </div>
          <p className="text-lg leading-relaxed text-[#0f1b33]/75">{it.description}</p>
          <div className="flex flex-col gap-2">
            <div className="relative h-2 rounded-full bg-[#e6edf7]">
              <div
                className={`absolute top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white ${style.bar}`}
                style={{ left: `${pct(score, scoreRange)}%` }}
                aria-hidden="true"
              />
            </div>
            <p className="text-sm text-[#0f1b33]/60">
              Score : {fmt(score)} sur {scoreRange.max}
            </p>
          </div>
        </div>

        <aside
          aria-labelledby="disclaimer-title"
          className="flex gap-4 rounded-2xl border border-[#0f1b33]/15 border-l-4 border-l-[#2563eb] bg-white p-5 md:p-6"
        >
          <Info className="mt-0.5 h-6 w-6 shrink-0 text-[#2563eb]" aria-hidden="true" />
          <div className="flex flex-col gap-2">
            <h2 id="disclaimer-title" className="old-sans font-semibold">
              À lire avant d'interpréter votre résultat
            </h2>
            <p className="leading-relaxed text-[#0f1b33]/75">
              Ce test est un outil d'auto-évaluation. Il ne constitue pas un diagnostic et ne remplace pas un entretien
              avec un psychologue ou un médecin.
            </p>
            <p className="leading-relaxed text-[#0f1b33]/75">
              Un score élevé n'exclut pas une souffrance que ce test n'explore pas, et un score faible ne signifie pas que
              vous souffrez d'un trouble. Votre score ne définit pas qui vous êtes : il reflète votre perception actuelle
              et peut évoluer.
            </p>
          </div>
        </aside>

        <div className="flex items-center gap-3 rounded-2xl bg-[#2563eb]/[0.08] p-5">
          <Mail className="h-5 w-5 shrink-0 text-[#2563eb]" aria-hidden="true" />
          <p className="text-sm leading-relaxed text-[#0f1b33]/75">
            Nous venons aussi de vous envoyer ce résultat par e-mail, pour que vous puissiez le retrouver facilement.
          </p>
        </div>

        {breakdown && (
          <div className="flex flex-col gap-6 rounded-2xl border border-[#0f1b33]/10 bg-white p-6 md:p-10">
            <div className="flex flex-col gap-1">
              <h2 className="text-2xl">Votre profil</h2>
              <p className="text-[#0f1b33]/65">
                Votre score dans chaque dimension. Le score global ne se lit jamais seul : c'est l'ensemble du profil qui
                compte.
              </p>
            </div>
            <ul className="flex flex-col gap-4">
              {breakdown.dimensions.map((d) => (
                <li key={d.id} className="flex flex-col gap-1.5">
                  <div className="flex items-baseline justify-between gap-3">
                    <span className="leading-snug">{d.label}</span>
                    <span className="shrink-0 text-sm tabular-nums text-[#0f1b33]/60">
                      <span className="font-semibold text-[#0f1b33]">{fmt(d.score)}</span> / {d.scoreRange.max}
                    </span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-[#e6edf7]" aria-hidden="true">
                    <div
                      className={`h-full rounded-full ${d.recommendation ? 'bg-amber-500' : 'bg-[#2563eb]'}`}
                      style={{ width: `${pct(d.score, d.scoreRange)}%` }}
                    />
                  </div>
                </li>
              ))}
            </ul>
            <p className="flex items-center gap-2 text-xs text-[#0f1b33]/55">
              <span className="inline-block h-2 w-4 rounded-full bg-amber-500" aria-hidden="true" />
              En orange : les dimensions pour lesquelles nous avons un conseil ci-dessous.
            </p>
            <div className="grid gap-4 md:grid-cols-2">
              <DimList
                title="Vos 3 forces"
                tone="text-[#16a34a]"
                icon={<Star className="h-4 w-4" aria-hidden="true" />}
                items={breakdown.strengths}
              />
              <DimList
                title="Vos 3 priorités"
                tone="text-amber-700"
                icon={<Target className="h-4 w-4" aria-hidden="true" />}
                items={breakdown.priorities}
              />
            </div>
          </div>
        )}

        {it.recommendations.length > 0 && (
          <div className="flex flex-col gap-4">
            <h2 className="text-2xl">Nos conseils pour vous</h2>
            <ul className="grid gap-3 md:grid-cols-2">
              {it.recommendations.map((r) => (
                <li key={r} className="flex gap-3 rounded-2xl border border-[#0f1b33]/10 bg-white p-5">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#16a34a]" aria-hidden="true" />
                  <span className="leading-relaxed text-[#0f1b33]/80">{r}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {withAdvice.length > 0 && (
          <div className="flex flex-col gap-4">
            <h2 className="text-2xl">Par où commencer</h2>
            <ul className="grid gap-3 md:grid-cols-2">
              {withAdvice.map((d) => (
                <li key={d.id} className="flex gap-3 rounded-2xl border border-[#0f1b33]/10 bg-white p-5">
                  <Lightbulb className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" aria-hidden="true" />
                  <div className="flex flex-col gap-1">
                    <span className="font-semibold">{d.label}</span>
                    <span className="leading-relaxed text-[#0f1b33]/75">{d.recommendation}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="flex flex-col gap-4 rounded-2xl bg-[#16a34a]/[0.08] p-6 md:p-8">
          <h2 className="text-2xl">Parlons de votre résultat</h2>
          <p className="leading-relaxed text-[#0f1b33]/75">
            Envoyez votre résultat à l'équipe sur WhatsApp : nous vous répondons avec une analyse plus détaillée et vous
            proposons un premier échange gratuit si vous le souhaitez.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className={BTN_WHATSAPP}>
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              Recevoir mon analyse sur WhatsApp
            </a>
            <a href={bookingUrl} target="_blank" rel="noopener noreferrer" className={BTN_GHOST}>
              <MessageCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
              Réserver mon appel gratuit
            </a>
          </div>
          <p className="text-xs leading-relaxed text-[#0f1b33]/60">
            Le message contient votre résultat ; c'est vous qui choisissez de l'envoyer. Voir notre{' '}
            <Link to="/confidentialite" className="underline underline-offset-2">
              politique de confidentialité
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
};
