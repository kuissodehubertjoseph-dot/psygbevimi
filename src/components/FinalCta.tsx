import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CONTACT_DATA as D, DISPLAY_PHONE, CONTACT_EMAIL, WHATSAPP_PHONE, createWhatsAppUrl, DEFAULT_BOOKING_MESSAGE } from '../data';
import { BTN, PageHeader } from './ui';

const inputCls =
  'h-[52px] px-4 rounded-[8px] bg-white text-[#15173D] font-atkinson text-[16px] border border-[#15173D]/20 focus:outline-none focus:border-[#D98268] w-full';
const labelCls = 'font-bricolage font-semibold text-[15px] text-[#15173D]';

export const FinalCta: React.FC = () => {
  const [form, setForm] = useState({ prenom: '', nom: '', email: '', phone: '', message: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);

  const set = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((f) => ({ ...f, [key]: e.target.value }));
    setErrors((er) => ({ ...er, [key]: '' }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const next: Record<string, string> = {};
    if (!form.prenom.trim()) next.prenom = 'Indiquez votre prénom.';
    if (!form.nom.trim()) next.nom = 'Indiquez votre nom.';
    if (!/^\S+@\S+\.\S+$/.test(form.email.trim())) next.email = 'Indiquez une adresse e-mail valide.';
    if (!form.message.trim()) next.message = 'Écrivez votre message.';
    setErrors(next);
    if (Object.keys(next).length > 0) {
      setSent(false);
      return;
    }

    const text = `Bonjour Psy Gbevimi, je m'appelle ${form.prenom.trim()} ${form.nom.trim()}.\n${form.message.trim()}\nE-mail : ${form.email.trim()}${
      form.phone.trim() ? `\nTéléphone : ${form.phone.trim()}` : ''
    }\nJe viens de la page « Contact ».`;
    window.open(createWhatsAppUrl(text), '_blank', 'noopener,noreferrer');
    setSent(true);
  };

  const field = (
    id: keyof typeof form,
    label: string,
    type = 'text',
    required = true,
  ) => (
    <div className="flex flex-col gap-2">
      <label htmlFor={`field-${id}`} className={labelCls}>
        {label}
      </label>
      <input
        id={`field-${id}`}
        type={type}
        required={required}
        value={form[id]}
        onChange={set(id)}
        aria-invalid={Boolean(errors[id])}
        className={`${inputCls} ${errors[id] ? 'border-red-500' : ''}`}
      />
      {errors[id] && <p className="text-[14px] text-red-700 font-atkinson">{errors[id]}</p>}
    </div>
  );

  return (
    <>
      <PageHeader eyebrow={D.eyebrow} title={D.title} intro={D.intro} />

      <section className="py-16 lg:py-20 bg-[#F3F1F8]">
        <div className="max-w-[1160px] mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Colonne gauche : coordonnées */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            <div className="bg-[#15173D] text-[#F3F1F8] rounded-[8px] p-6 lg:p-8">
              <h2 className="font-bricolage font-bold text-[1.5rem]">{D.whatsappTitle}</h2>
              <p className="mt-2 font-atkinson text-[#C9C8E3] text-[1.05rem]">{D.whatsappText}</p>
              <a
                href={createWhatsAppUrl(DEFAULT_BOOKING_MESSAGE)}
                target="_blank"
                rel="noopener noreferrer"
                className={`${BTN.primaryOnDark} mt-6`}
              >
                {D.whatsappCta}
              </a>
            </div>

            <dl className="divide-y divide-[#15173D]/10 border-t border-b border-[#15173D]/10">
              <div className="py-4">
                <dt className="font-atkinson text-[13px] uppercase tracking-[0.12em] text-[#5A5D7E]">{D.phoneLabel}</dt>
                <dd className="mt-1 font-bricolage font-semibold text-[1.15rem] text-[#15173D]">
                  <a href={`tel:+${WHATSAPP_PHONE}`} className="hover:text-[#5A5D7E]">
                    {DISPLAY_PHONE}
                  </a>
                </dd>
              </div>
              <div className="py-4">
                <dt className="font-atkinson text-[13px] uppercase tracking-[0.12em] text-[#5A5D7E]">{D.emailLabel}</dt>
                <dd className="mt-1 font-bricolage font-semibold text-[1.15rem] text-[#15173D]">
                  <a href={`mailto:${CONTACT_EMAIL}`} className="hover:text-[#5A5D7E]">
                    {CONTACT_EMAIL}
                  </a>
                </dd>
              </div>
              <div className="py-4">
                <dt className="font-atkinson text-[13px] uppercase tracking-[0.12em] text-[#5A5D7E]">{D.whereLabel}</dt>
                <dd className="mt-1 font-bricolage font-semibold text-[1.15rem] text-[#15173D]">{D.where}</dd>
              </div>
            </dl>
          </div>

          {/* Colonne droite : formulaire */}
          <div className="lg:col-span-7 bg-[#E9D5E4]/50 border border-[#15173D]/10 rounded-[8px] p-6 sm:p-10">
            <h2 className="font-bricolage font-bold text-[1.75rem] text-[#15173D]">{D.formTitle}</h2>

            <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {field('prenom', D.fields.prenom)}
                {field('nom', D.fields.nom)}
              </div>
              {field('email', D.fields.email, 'email')}
              {field('phone', D.fields.phone, 'tel', false)}

              <div className="flex flex-col gap-2">
                <label htmlFor="field-message" className={labelCls}>
                  {D.fields.message}
                </label>
                <textarea
                  id="field-message"
                  required
                  rows={5}
                  value={form.message}
                  onChange={set('message')}
                  aria-invalid={Boolean(errors.message)}
                  className={`${inputCls} h-auto py-3 ${errors.message ? 'border-red-500' : ''}`}
                />
                {errors.message && <p className="text-[14px] text-red-700 font-atkinson">{errors.message}</p>}
              </div>

              <p className="font-atkinson text-[14px] text-[#5A5D7E]">
                {D.privacy}{' '}
                <Link to="/confidentialite" className="underline">
                  {D.privacyLink}
                </Link>
              </p>

              <button type="submit" className={`${BTN.primary} cursor-pointer`}>
                {D.submit}
              </button>

              <div aria-live="polite">
                {sent && (
                  <p className="p-4 rounded-[8px] bg-[#12694A]/15 border border-[#12694A]/40 text-[#15173D] font-atkinson text-[15px]">
                    Merci {form.prenom.trim()}. WhatsApp s'ouvre avec votre message déjà rédigé.
                  </p>
                )}
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};
