import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { TESTS, TestDefinition, TestQuestion } from '../content';
import { API_URL } from '../data';
import { BTN } from './ui';

interface Step {
  title: string | null;
  questions: TestQuestion[];
}

/** Regroupe les questions par dimension ; sans dimensions : une question par étape */
const buildSteps = (test: TestDefinition): Step[] => {
  if (!test.dimensions?.length) return test.questions.map((q) => ({ title: null, questions: [q] }));
  const byId = new Map(test.questions.map((q) => [q.id, q]));
  const used = new Set<string>();
  const steps: Step[] = [];
  for (const d of test.dimensions) {
    const questions = d.questionIds.flatMap((id) => {
      const q = byId.get(id);
      if (!q || used.has(id)) return [];
      used.add(id);
      return [q];
    });
    if (questions.length) steps.push({ title: d.label, questions });
  }
  const rest = test.questions.filter((q) => !used.has(q.id));
  if (rest.length) steps.push({ title: 'Autres questions', questions: rest });
  return steps;
};

// Classes écrites en entier pour que Tailwind les génère
const ROW_COLS: Record<number, string> = { 2: 'sm:grid-cols-2', 3: 'sm:grid-cols-3', 4: 'sm:grid-cols-4', 5: 'sm:grid-cols-5' };

/** Réponses : une rangée de choix de même largeur (étapes groupées) ou une pile de lignes (question seule) */
const ScaleButtons: React.FC<{
  q: TestQuestion;
  value?: number;
  onAnswer: (v: number) => void;
  row?: boolean;
}> = ({ q, value, onAnswer, row = false }) => {
  const entries = Object.entries(q.scale.labels);
  return (
    <div className={row ? `grid grid-cols-2 ${ROW_COLS[entries.length] ?? 'sm:grid-cols-5'} gap-2` : 'flex flex-col gap-3'}>
      {entries.map(([k, label]) => {
        const n = Number(k);
        const selected = value === n;
        return (
          <button
            key={k}
            type="button"
            aria-pressed={selected}
            onClick={() => onAnswer(n)}
            className={`cursor-pointer rounded-[14px] border-2 text-[15px] leading-tight font-atkinson ${
              row ? 'px-3 py-3.5 text-center' : 'px-5 py-4 text-left text-[1.05rem]'
            } ${
              selected
                ? 'border-[#15173D] bg-[#15173D] text-[#F3F1F8] font-semibold'
                : 'border-[#15173D]/15 bg-[#F3F1F8] text-[#15173D] hover:border-[#D98268]'
            }`}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
};

export const TestRunner: React.FC = () => {
  const { programId = '', testId = '' } = useParams();
  const navigate = useNavigate();
  const test = TESTS[testId];
  const headingRef = useRef<HTMLHeadingElement>(null);

  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [stage, setStage] = useState<'questions' | 'email'>('questions');
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const steps = useMemo(() => (test ? buildSteps(test) : []), [test]);

  useEffect(() => {
    headingRef.current?.focus();
    window.scrollTo(0, 0);
  }, [stepIndex, stage]);

  if (!test) {
    return (
      <section className="py-24 bg-[#F3F1F8]">
        <div className="max-w-[640px] mx-auto px-6">
          <h1 className="font-bricolage text-[2rem] text-[#15173D]">Ce test n'existe pas</h1>
          <p className="mt-3 text-[#15173D]/80">Le lien est peut-être incomplet. Choisissez un test dans la liste.</p>
          <Link to="/tests" className={`${BTN.primary} mt-6`}>
            Voir les tests gratuits
          </Link>
        </div>
      </section>
    );
  }

  const total = test.questions.length;
  const grouped = steps.some((s) => s.title !== null);
  const step = steps[Math.min(stepIndex, steps.length - 1)];
  const answeredInStep = step.questions.filter((q) => answers[q.id] !== undefined).length;
  const stepComplete = answeredInStep === step.questions.length;
  const isLast = stepIndex === steps.length - 1;
  const progress = (Object.keys(answers).length / total) * 100;
  const firstNumber = steps.slice(0, stepIndex).reduce((n, s) => n + s.questions.length, 0) + 1;
  const lastNumber = firstNumber + step.questions.length - 1;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email.trim())) {
      setError('Adresse e-mail invalide.');
      return;
    }
    setError(null);
    setSubmitting(true);
    try {
      const res = await fetch(`${API_URL}/evaluation-programs/${programId}/tests/${testId}/attempts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email.trim(),
          answers: Object.entries(answers).map(([questionId, value]) => ({ questionId, value })),
        }),
      });
      if (!res.ok) throw new Error(String(res.status));
      const data = await res.json();
      navigate('/evaluation-results', {
        state: {
          attemptId: data.attemptId,
          score: data.score,
          scoreRange: data.scoreRange,
          interpretation: data.interpretation,
          breakdown: data.breakdown ?? null,
          testName: test.name,
        },
      });
    } catch {
      setError('Une erreur est survenue. Vérifiez votre connexion et réessayez.');
      setSubmitting(false);
    }
  };

  if (stage === 'email') {
    return (
      <section className="py-14 lg:py-20 bg-[#F3F1F8]">
        <div className="max-w-[560px] mx-auto px-6">
          <div className="bg-white rounded-[28px] border border-[#15173D]/10 p-8 sm:p-10 flex flex-col gap-6">
            <h1
              ref={headingRef}
              tabIndex={-1}
              className="font-bricolage text-[clamp(1.8rem,4vw,2.3rem)] leading-tight text-[#15173D] outline-none"
            >
              Où envoyons-nous votre résultat ?
            </h1>
            <p className="text-[1.05rem] leading-[1.65] text-[#15173D]/75">
              Votre résultat s'affiche tout de suite ici, et nous vous l'envoyons aussi par e-mail pour que vous puissiez le
              retrouver.
            </p>
            <form onSubmit={submit} noValidate className="flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <label htmlFor="eval-email" className="font-bricolage text-[15px] text-[#15173D]">
                  E-mail
                </label>
                <input
                  id="eval-email"
                  type="email"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-[54px] px-4 rounded-[14px] bg-[#F3F1F8] border-2 border-[#15173D]/15 text-[16px] text-[#15173D] focus:outline-none focus:border-[#D98268]"
                />
              </div>
              {error && (
                <p role="alert" className="text-[14px] text-red-700">
                  {error}
                </p>
              )}
              <div className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3">
                <button type="button" onClick={() => setStage('questions')} className={`${BTN.outline} cursor-pointer`}>
                  Retour aux questions
                </button>
                <button type="submit" disabled={submitting} className={`${BTN.primary} cursor-pointer disabled:opacity-60`}>
                  {submitting ? 'Envoi…' : 'Voir mon résultat'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-10 lg:py-14 bg-[#F3F1F8]">
      <div className="max-w-[760px] mx-auto px-6 flex flex-col gap-8">
        {/* En-tête du test */}
        <div>
          <Link to="/tests" className="inline-flex items-center gap-2 text-[15px] text-[#5A5D7E] hover:text-[#15173D]">
            <span aria-hidden="true">←</span> Tous les tests
          </Link>
          <h1 className="mt-5 font-bricolage text-[clamp(1.9rem,4.4vw,2.9rem)] leading-[1.12] text-[#15173D]">
            {test.name}
          </h1>
          <p className="mt-2 text-[15px] text-[#5A5D7E]">{test.duration} · Confidentiel</p>
        </div>

        {/* Progression */}
        <div className="bg-white rounded-[20px] border border-[#15173D]/10 px-6 py-5 flex flex-col gap-3">
          <div className="flex justify-between gap-4 text-[15px] text-[#15173D]">
            <span>
              {grouped
                ? `Partie ${stepIndex + 1} sur ${steps.length} · questions ${firstNumber} à ${lastNumber} sur ${total}`
                : `Question ${stepIndex + 1} sur ${total}`}
            </span>
            <span className="shrink-0 font-semibold">{Math.round(progress)} %</span>
          </div>
          <div
            className="h-2.5 overflow-hidden rounded-full bg-[#E9D5E4]"
            role="progressbar"
            aria-valuenow={Math.round(progress)}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Progression du test"
          >
            <div className="h-full rounded-full bg-[#D98268] transition-[width] duration-300" style={{ width: `${progress}%` }} />
          </div>
        </div>

        {/* Questions */}
        {step.title === null ? (
          <fieldset className="bg-white rounded-[28px] border border-[#15173D]/10 p-7 sm:p-10 flex flex-col gap-8">
            <legend className="sr-only">Question {stepIndex + 1}</legend>
            <h2
              ref={headingRef}
              tabIndex={-1}
              className="font-bricolage text-[clamp(1.4rem,3vw,1.9rem)] leading-[1.3] text-[#15173D] outline-none"
            >
              {step.questions[0].text}
            </h2>
            <ScaleButtons
              q={step.questions[0]}
              value={answers[step.questions[0].id]}
              onAnswer={(v) => setAnswers((a) => ({ ...a, [step.questions[0].id]: v }))}
            />
          </fieldset>
        ) : (
          <section className="flex flex-col gap-5" aria-labelledby="page-title">
            <h2
              id="page-title"
              ref={headingRef}
              tabIndex={-1}
              className="font-bricolage text-[clamp(1.6rem,3.4vw,2.2rem)] leading-tight text-[#15173D] outline-none"
            >
              {step.title}
            </h2>
            <ol className="flex flex-col gap-4">
              {step.questions.map((q, i) => (
                <li key={q.id}>
                  <fieldset className="bg-white rounded-[24px] border border-[#15173D]/10 p-6 sm:p-8 flex flex-col gap-5">
                    <legend className="sr-only">Question {firstNumber + i}</legend>
                    <p className="flex gap-4 text-[1.1rem] leading-[1.5] text-[#15173D]">
                      <span className="shrink-0 font-bricolage text-[1.6rem] leading-none text-[#D98268] tabular-nums">
                        {firstNumber + i}
                      </span>
                      {q.text}
                    </p>
                    <ScaleButtons
                      row
                      q={q}
                      value={answers[q.id]}
                      onAnswer={(v) => setAnswers((a) => ({ ...a, [q.id]: v }))}
                    />
                  </fieldset>
                </li>
              ))}
            </ol>
          </section>
        )}

        {/* Navigation */}
        <div className="flex justify-between gap-3">
          <button
            type="button"
            disabled={stepIndex === 0}
            onClick={() => setStepIndex(stepIndex - 1)}
            className={`${BTN.outline} cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed`}
          >
            Précédent
          </button>
          <button
            type="button"
            disabled={!stepComplete}
            onClick={() => (isLast ? setStage('email') : setStepIndex(stepIndex + 1))}
            className={`${BTN.primary} cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed`}
          >
            {isLast ? 'Terminer' : 'Continuer'}
          </button>
        </div>

        {grouped && !stepComplete && (
          <p className="-mt-4 text-right text-[14px] text-[#5A5D7E]" aria-live="polite">
            {answeredInStep} réponse{answeredInStep > 1 ? 's' : ''} sur {step.questions.length} dans cette partie
          </p>
        )}

        <p className="text-center text-[14px] leading-relaxed text-[#5A5D7E]">
          Répondez avec sincérité, il n'y a pas de bonne ou de mauvaise réponse. Votre résultat est envoyé à l'adresse
          e-mail que vous indiquerez à la fin.
        </p>
      </div>
    </section>
  );
};
