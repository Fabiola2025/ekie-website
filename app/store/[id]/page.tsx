'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, MapPin, Phone, Smartphone, Star, ShoppingBag } from 'lucide-react';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { useLang } from '@/lib/LanguageProvider';

interface Provider {
  id: string;
  business_name: string;
  city?: string;
  quartier?: string;
  address?: string;
  phone?: string;
  email?: string;
  cover_photo?: string;
  business_photo?: string;
  categories?: string[];
  avg_rating?: number;
  review_count?: number;
  is_mobile_service?: boolean;
}

interface Service {
  id: string;
  name: string;
  description?: string;
  price: number;
  duration_minutes?: number;
  category?: string;
  photos?: string[];
}

const API_URL = 'https://api.myekie.com';
const APP_STORE_URL = 'https://apps.apple.com/app/ekie';
const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=com.ekie.app';

const formatXAF = (n: number) =>
  Number(n).toLocaleString('en-US') + ' XAF';

export default function StorePage() {
  const params = useParams();
  const { t } = useLang();
  const id = Array.isArray(params.id) ? params.id[0] : (params.id as string);

  const [provider, setProvider] = useState<Provider | null>(null);
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!id) return;
    fetch(`${API_URL}/api/service-providers/detail/${id}`)
      .then(r => r.json())
      .then(data => {
        if (data.success && data.provider) {
          setProvider(data.provider);
          setServices(data.services || []);
        } else {
          setError(true);
        }
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [id]);

  // ── Loading ──────────────────────────────────────────────
  if (loading) {
    return (
      <>
        <Nav />
        <div className="min-h-screen flex items-center justify-center bg-cream pt-20">
          <div className="text-muted">Loading…</div>
        </div>
      </>
    );
  }

  // ── Not found ────────────────────────────────────────────
  if (error || !provider) {
    return (
      <>
        <Nav />
        <div className="min-h-screen flex items-center justify-center bg-cream pt-20 px-6">
          <div className="text-center max-w-md">
            <div className="text-6xl mb-4">🤷🏽‍♀️</div>
            <h1 className="font-display text-2xl font-bold text-green mb-2">{t.store.notFound}</h1>
            <p className="text-muted text-sm mb-6">{t.store.notFoundSub}</p>
            <Link href="/" className="inline-flex items-center gap-2 bg-green text-white rounded-full px-6 py-3 text-sm font-bold">
              <ArrowLeft className="w-4 h-4" /> {t.store.goHome}
            </Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  // ── Found ────────────────────────────────────────────────
  const minPrice = services.length > 0 ? Math.min(...services.map(s => Number(s.price) || 0)) : 0;
  const location = [provider.quartier, provider.city].filter(Boolean).join(', ');
  const categoryEmoji = (c?: string) => {
    if (!c) return '🏪';
    const lc = c.toLowerCase();
    if (lc.includes('bakery') || lc.includes('boulang')) return '🥖';
    if (lc.includes('hair') || lc.includes('beauty') || lc.includes('coiffure')) return '💇🏽‍♀️';
    if (lc.includes('tailor') || lc.includes('fashion') || lc.includes('couture')) return '👗';
    if (lc.includes('wellness') || lc.includes('bien-être')) return '💆🏽‍♀️';
    if (lc.includes('food') || lc.includes('restaurant')) return '🍽';
    return '🏪';
  };
  const emoji = categoryEmoji(provider.categories?.[0]);

  return (
    <>
      <Nav />

      {/* HERO BANNER */}
      <section className="bg-gradient-to-br from-green to-green-2 text-white pt-28 pb-12 relative overflow-hidden">
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-gold/8 blur-3xl" />
        <div className="absolute -bottom-32 -left-32 w-80 h-80 rounded-full bg-gold/5 blur-3xl" />

        <div className="max-w-5xl mx-auto px-6 lg:px-10 relative">
          <Link href="/" className="inline-flex items-center gap-2 text-white/70 hover:text-gold text-sm mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" /> {t.store.back}
          </Link>

          <div className="grid md:grid-cols-[140px_1fr] gap-6 items-start">
            {/* Cover */}
            <div className="aspect-square bg-gold/15 border border-gold/25 rounded-3xl flex items-center justify-center text-7xl shadow-card">
              {emoji}
            </div>

            {/* Info */}
            <div>
              <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-black text-white mb-3 leading-tight">
                {provider.business_name}
              </h1>

              {provider.categories && provider.categories.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {provider.categories.slice(0, 3).map(c => (
                    <span key={c} className="bg-white/8 border border-white/15 rounded-full px-3 py-1 text-xs text-white/80">
                      {c}
                    </span>
                  ))}
                </div>
              )}

              <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-white/70 mb-6">
                {location && (
                  <div className="flex items-center gap-1.5"><MapPin className="w-4 h-4 text-gold" /> {location}</div>
                )}
                {provider.phone && (
                  <a href={`tel:+237${provider.phone}`} className="flex items-center gap-1.5 hover:text-gold transition-colors">
                    <Phone className="w-4 h-4 text-gold" /> {provider.phone}
                  </a>
                )}
                {provider.avg_rating && Number(provider.avg_rating) > 0 && (
                  <div className="flex items-center gap-1.5">
                    <Star className="w-4 h-4 text-gold fill-gold" />
                    <span className="text-gold font-bold">{Number(provider.avg_rating).toFixed(1)}</span>
                    {provider.review_count ? <span className="text-white/55">({provider.review_count})</span> : null}
                  </div>
                )}
              </div>

              {/* Open in Ekie - main CTA */}
              <a href={`ekie://store/${provider.id}`}
                className="inline-flex items-center gap-2 bg-gold text-green rounded-full px-7 py-3.5 text-sm font-bold hover:scale-[1.02] active:scale-95 transition-transform shadow-card">
                <Smartphone className="w-4 h-4" /> {t.store.bookCta}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="py-16 bg-cream">
        <div className="max-w-5xl mx-auto px-6 lg:px-10">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-green mb-2 flex items-center gap-2">
            <ShoppingBag className="w-6 h-6 text-gold" /> {t.store.services}
          </h2>

          {services.length === 0 ? (
            <p className="text-muted py-8">{t.store.noServices}</p>
          ) : (
            <>
              {minPrice > 0 && (
                <p className="text-muted text-sm mb-6">{t.store.from} <span className="text-green font-bold">{formatXAF(minPrice)}</span></p>
              )}

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {services.map((s) => (
                  <div key={s.id} className="bg-white rounded-2xl border border-border p-5 hover:shadow-card transition-shadow">
                    <h3 className="font-bold text-green mb-1">{s.name}</h3>
                    {s.description && <p className="text-xs text-muted line-clamp-2 mb-3">{s.description}</p>}
                    <div className="flex justify-between items-end pt-3 border-t border-border">
                      <span className="text-lg font-black text-gold">{formatXAF(Number(s.price))}</span>
                      {s.duration_minutes ? <span className="text-xs text-muted">{s.duration_minutes} min</span> : null}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* GET THE APP */}
      <section className="py-20 bg-white text-center">
        <div className="max-w-2xl mx-auto px-6 lg:px-10">
          <h3 className="font-display text-2xl md:text-3xl font-bold text-green mb-4">{t.store.getApp}</h3>
          <p className="text-muted mb-8">Get the full Ékié experience to book, save, and shop.</p>
          <div className="flex flex-wrap justify-center gap-3">
            <a href={APP_STORE_URL} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-green text-white rounded-full px-6 py-3.5 text-sm font-bold hover:bg-green-2 transition-colors">
              🍎 {t.store.appStore}
            </a>
            <a href={PLAY_STORE_URL} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-green text-white rounded-full px-6 py-3.5 text-sm font-bold hover:bg-green-2 transition-colors">
              🤖 {t.store.playStore}
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
