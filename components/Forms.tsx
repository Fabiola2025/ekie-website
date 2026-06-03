'use client';
import { useState } from 'react';
import { useLang } from '@/lib/LanguageProvider';
import { Mail, MessageSquare, Briefcase } from 'lucide-react';

const FORM_ENDPOINT = 'https://formsubmit.co/ajax/hello@myekie.com';

async function submitToFormsubmit(payload: Record<string, unknown>): Promise<boolean> {
  try {
    const res = await fetch(FORM_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(payload),
    });
    return res.ok;
  } catch {
    return false;
  }
}

// ============ WAITLIST FORM ============
export function WaitlistForm() {
  const { t } = useLang();
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const onSubmit = async () => {
    if (!email || !email.includes('@')) { alert(t.waitlist.invalidEmail); return; }
    setSubmitting(true);
    await submitToFormsubmit({
      email,
      subject: 'New Ékié Waitlist Signup',
      message: `New waitlist signup: ${email}`,
    });
    setSubmitting(false);
    setDone(true);
    setEmail('');
    setTimeout(() => setDone(false), 6000);
  };

  return (
    <div className="bg-white border border-border rounded-2xl p-6 shadow-soft">
      <h3 className="text-green font-bold text-sm mb-1">{t.waitlist.title}</h3>
      <p className="text-muted text-xs mb-4 leading-relaxed">{t.waitlist.sub}</p>
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={t.waitlist.placeholder}
          className="flex-1 bg-cream border border-border text-ink placeholder-muted rounded-full px-5 py-3 text-sm focus:outline-none focus:border-green focus:bg-white transition-colors"
          onKeyDown={(e) => e.key === 'Enter' && onSubmit()}
        />
        <button
          onClick={onSubmit}
          disabled={submitting}
          className="bg-gold text-green rounded-full px-6 py-3 text-sm font-bold hover:scale-[1.02] active:scale-95 transition-transform disabled:opacity-60"
        >
          {submitting ? '...' : t.waitlist.submit}
        </button>
      </div>
      {done && <p className="text-green text-xs mt-3 font-medium">{t.waitlist.success}</p>}
    </div>
  );
}

// ============ VENDOR APPLICATION FORM ============
export function VendorForm() {
  const { t } = useLang();
  const [form, setForm] = useState({
    name: '', business: '', phone: '', email: '', type: '', city: '', description: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const onSubmit = async () => {
    if (!form.name || !form.business || !form.phone || !form.email) { alert(t.vendor.required); return; }
    setSubmitting(true);
    await submitToFormsubmit({
      subject: `New Ékié Vendor Application: ${form.business}`,
      ...form,
    });
    setSubmitting(false);
    setDone(true);
    setForm({ name: '', business: '', phone: '', email: '', type: '', city: '', description: '' });
    setTimeout(() => setDone(false), 8000);
  };

  return (
    <div className="bg-white rounded-3xl shadow-soft border border-border p-8 lg:p-10">
      <div className="flex items-center gap-3 mb-2">
        <Briefcase className="text-green w-6 h-6" />
        <h3 className="font-display text-2xl text-green font-bold">{t.vendor.heading}</h3>
      </div>
      <p className="text-muted text-sm mb-6">{t.vendor.sub}</p>

      <div className="grid sm:grid-cols-2 gap-4">
        <input className="input-base" placeholder={t.vendor.name} value={form.name}
          onChange={e => setForm({...form, name: e.target.value})} />
        <input className="input-base" placeholder={t.vendor.business} value={form.business}
          onChange={e => setForm({...form, business: e.target.value})} />
        <input className="input-base" placeholder={t.vendor.phone} value={form.phone}
          onChange={e => setForm({...form, phone: e.target.value})} />
        <input className="input-base" type="email" placeholder={t.vendor.email} value={form.email}
          onChange={e => setForm({...form, email: e.target.value})} />
        <select className="input-base" value={form.type} onChange={e => setForm({...form, type: e.target.value})}>
          {t.vendor.typeOptions.map((o, i) => <option key={i} value={i === 0 ? '' : o}>{o}</option>)}
        </select>
        <input className="input-base" placeholder={t.vendor.city} value={form.city}
          onChange={e => setForm({...form, city: e.target.value})} />
      </div>
      <textarea className="input-base mt-4" placeholder={t.vendor.description}
        value={form.description} onChange={e => setForm({...form, description: e.target.value})} />

      <button onClick={onSubmit} disabled={submitting}
        className="mt-5 w-full sm:w-auto bg-green text-white rounded-full px-8 py-3.5 text-sm font-bold hover:bg-green-2 transition-colors disabled:opacity-60">
        {submitting ? '...' : t.vendor.submit}
      </button>
      {done && <p className="text-green text-sm mt-4 font-medium">{t.vendor.success}</p>}
    </div>
  );
}

// ============ CONTACT FORM ============
export function ContactForm() {
  const { t } = useLang();
  const [form, setForm] = useState({ name: '', email: '', type: '', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const onSubmit = async () => {
    if (!form.name || !form.email || !form.message) { alert(t.contact.required); return; }
    setSubmitting(true);
    await submitToFormsubmit({
      subject: `Ékié Contact: ${form.type || 'General'} — ${form.name}`,
      ...form,
    });
    setSubmitting(false);
    setDone(true);
    setForm({ name: '', email: '', type: '', message: '' });
    setTimeout(() => setDone(false), 8000);
  };

  return (
    <div className="bg-white rounded-3xl shadow-soft border border-border p-8 lg:p-10">
      <div className="flex items-center gap-3 mb-2">
        <MessageSquare className="text-green w-6 h-6" />
        <h3 className="font-display text-2xl text-green font-bold">{t.contact.heading}</h3>
      </div>
      <p className="text-muted text-sm mb-6">{t.contact.sub}</p>

      <div className="grid sm:grid-cols-2 gap-4">
        <input className="input-base" placeholder={t.contact.name} value={form.name}
          onChange={e => setForm({...form, name: e.target.value})} />
        <input className="input-base" type="email" placeholder={t.contact.email} value={form.email}
          onChange={e => setForm({...form, email: e.target.value})} />
      </div>
      <select className="input-base mt-4" value={form.type} onChange={e => setForm({...form, type: e.target.value})}>
        {t.contact.typeOptions.map((o, i) => <option key={i} value={i === 0 ? '' : o}>{o}</option>)}
      </select>
      <textarea className="input-base mt-4" placeholder={t.contact.message}
        value={form.message} onChange={e => setForm({...form, message: e.target.value})} />

      <button onClick={onSubmit} disabled={submitting}
        className="mt-5 w-full sm:w-auto bg-green text-white rounded-full px-8 py-3.5 text-sm font-bold hover:bg-green-2 transition-colors disabled:opacity-60">
        {submitting ? '...' : t.contact.submit}
      </button>
      {done && <p className="text-green text-sm mt-4 font-medium">{t.contact.success}</p>}

      <div className="mt-8 pt-6 border-t border-border grid sm:grid-cols-3 gap-4 text-sm">
        <a href="mailto:hello@myekie.com" className="flex items-center gap-2 text-muted hover:text-green transition-colors">
          <Mail className="w-4 h-4" /> hello@myekie.com
        </a>
        <a href="mailto:support@myekie.com" className="flex items-center gap-2 text-muted hover:text-green transition-colors">
          <Mail className="w-4 h-4" /> support@myekie.com
        </a>
        <a href="mailto:partners@myekie.com" className="flex items-center gap-2 text-muted hover:text-green transition-colors">
          <Mail className="w-4 h-4" /> partners@myekie.com
        </a>
      </div>
    </div>
  );
}
