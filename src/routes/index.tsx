import { createFileRoute } from "@tanstack/react-router";
import { useState, createContext, useContext } from "react";
import { Phone, MessageCircle, Star, MapPin, Mail, Menu, X, Scale, ShieldCheck, Clock } from "lucide-react";

const HERO_IMG = "https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&q=70&w=1600&fm=webp";
const JUSTICE_IMG = "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=70&w=900&fm=webp";

const WHATSAPP = "https://wa.me/17184140102";
const PHONE_MAIN = "(833) 384-7375";
const PHONE_LOCAL = "(718) 414-0102";

type Lang = "es" | "en";

const translations = {
  es: {
    nav: { services: "Servicios", reviews: "Reseñas", contact: "Contacto" },
    hero: {
      eyebrow: "Team Abogados",
      title1: "Millones de Dólares",
      title2: "Recuperados",
      subtitle: "Nuestro equipo se encargará de lograr la máxima compensación para usted en New York.",
      call: "Llamar",
    },
    accident: {
      eyebrow: "Casos",
      title: "¿Accidente de Auto?",
      body: "Team Abogados está aquí para ayudarle. Sabemos que puede estar confundido o no saber qué hacer frente a esas situaciones. Nosotros lo acompañamos en todo el proceso y disputamos la compensación que realmente merece.",
      f1: "Sin pago por adelantado",
      f2: "Atención 24/7",
      f3: "Hablamos español",
      cardEyebrow: "Revisamos su caso gratis",
      cardTitle: "Consulta Gratis y Confidencial",
      cardCta: "Chat por WhatsApp",
      cardNote: "Atención 24/7 en el Bronx y todo NY",
    },
    reviews: {
      eyebrow: "Testimonios",
      title: "Lo que dicen nuestros clientes",
      basedOn: "Basado en reseñas de Google",
      writeReview: "Escribir una reseña",
      items: [
        { initial: "A", name: "Anónimo", time: "hace 2 semanas", text: "Excelente servicio. Me ayudaron con mi caso de accidente en el Bronx y logramos una compensación mucho mayor de la que esperaba." },
        { initial: "C", name: "Cliente Satisfecho", time: "hace 1 mes", text: "Profesionales y directos. El equipo de Team Abogados habla español perfectamente y me explicaron todo el proceso legal." },
        { initial: "U", name: "Usuario de Google", time: "hace 3 meses", text: "Los mejores en New York. No tuve que pagar nada por adelantado y siempre respondieron mis mensajes de WhatsApp rápido." },
      ],
    },
    contact: {
      eyebrow: "Contacto",
      title: "Hablemos de su caso",
      office: "Oficina",
      officeAddr1: "2322 Arthur Avenue #207",
      officeAddr2: "Bronx, New York 10458",
      phone: "Teléfono",
      attention: "Atención",
      attentionVal: "24/7 en el Bronx y todo New York",
      formTitle: "Envíenos un mensaje",
      name: "Nombre completo",
      email: "Email",
      tel: "Teléfono",
      area: "Área legal...",
      areas: ["Accidente de tráfico", "Derecho laboral", "Derecho familiar", "Derecho penal", "Inmigración", "Otro"],
      message: "Cuéntenos sobre su caso...",
      send: "Enviar",
      received: "¡Mensaje Recibido!",
      receivedBody: "Un abogado le contactará dentro de las próximas 24 horas.",
    },
    footer: "Todos los derechos reservados.",
    fab: "Team Abogados",
  },
  en: {
    nav: { services: "Services", reviews: "Reviews", contact: "Contact" },
    hero: {
      eyebrow: "Team Abogados",
      title1: "Millions of Dollars",
      title2: "Recovered",
      subtitle: "Our team will fight to get you the maximum compensation in New York.",
      call: "Call",
    },
    accident: {
      eyebrow: "Cases",
      title: "Car Accident?",
      body: "Team Abogados is here to help. We understand you may be confused or unsure what to do in these situations. We guide you through the entire process and fight for the compensation you truly deserve.",
      f1: "No upfront payment",
      f2: "24/7 availability",
      f3: "We speak Spanish",
      cardEyebrow: "We review your case for free",
      cardTitle: "Free & Confidential Consultation",
      cardCta: "Chat on WhatsApp",
      cardNote: "24/7 service in the Bronx and all NY",
    },
    reviews: {
      eyebrow: "Testimonials",
      title: "What our clients say",
      basedOn: "Based on Google reviews",
      writeReview: "Write a review",
      items: [
        { initial: "A", name: "Anonymous", time: "2 weeks ago", text: "Excellent service. They helped me with my accident case in the Bronx and got a much higher compensation than I expected." },
        { initial: "C", name: "Satisfied Client", time: "1 month ago", text: "Professional and straightforward. The Team Abogados team speaks perfect Spanish and explained the whole legal process." },
        { initial: "U", name: "Google User", time: "3 months ago", text: "The best in New York. I didn't have to pay anything upfront and they always answered my WhatsApp messages quickly." },
      ],
    },
    contact: {
      eyebrow: "Contact",
      title: "Let's talk about your case",
      office: "Office",
      officeAddr1: "2322 Arthur Avenue #207",
      officeAddr2: "Bronx, New York 10458",
      phone: "Phone",
      attention: "Service",
      attentionVal: "24/7 in the Bronx and all New York",
      formTitle: "Send us a message",
      name: "Full name",
      email: "Email",
      tel: "Phone",
      area: "Legal area...",
      areas: ["Traffic accident", "Labor law", "Family law", "Criminal law", "Immigration", "Other"],
      message: "Tell us about your case...",
      send: "Send",
      received: "Message Received!",
      receivedBody: "An attorney will contact you within the next 24 hours.",
    },
    footer: "All rights reserved.",
    fab: "Team Abogados",
  },
};

type T = typeof translations.es;

const LangContext = createContext<{ lang: Lang; setLang: (l: Lang) => void; t: T }>({
  lang: "es",
  setLang: () => {},
  t: translations.es,
});
const useLang = () => useContext(LangContext);

export const Route = createFileRoute("/")({
  head: () => ({
    links: [{ rel: "preload", as: "image", href: HERO_IMG, fetchpriority: "high" } as any],
    meta: [{ property: "og:image", content: HERO_IMG }],
  }),
  component: Index,
});

function LangSwitch({ className = "" }: { className?: string }) {
  const { lang, setLang } = useLang();
  return (
    <div className={`flex gap-3 text-sm font-medium tracking-wider ${className}`}>
      <button
        onClick={() => setLang("en")}
        className={lang === "en" ? "text-gold underline underline-offset-4" : "text-cream/70 hover:text-gold"}
      >
        EN
      </button>
      <span className="text-cream/40">|</span>
      <button
        onClick={() => setLang("es")}
        className={lang === "es" ? "text-gold underline underline-offset-4" : "text-cream/70 hover:text-gold"}
      >
        ES
      </button>
    </div>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  const { t } = useLang();
  const links = [
    { href: "#servicios", label: t.nav.services },
    { href: "#resenas", label: t.nav.reviews },
    { href: "#contacto", label: t.nav.contact },
  ];
  return (
    <header className="absolute top-0 left-0 right-0 z-30">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <a href="#top" className="flex items-center gap-2 text-cream">
          <Scale className="h-6 w-6 text-gold" strokeWidth={1.5} />
          <span className="font-serif text-lg tracking-wide">TEAM ABOGADOS</span>
        </a>
        <nav className="hidden items-center gap-10 md:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-sm font-medium tracking-wider text-cream/90 uppercase hover:text-gold transition-colors">
              {l.label}
            </a>
          ))}
          <span className="text-sm text-cream/40">|</span>
          <LangSwitch />
        </nav>
        <button onClick={() => setOpen(!open)} className="md:hidden text-cream" aria-label="Menu">
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>
      {open && (
        <div className="md:hidden bg-navy-deep/95 backdrop-blur border-t border-cream/10">
          <div className="px-6 py-4 flex flex-col gap-4">
            {links.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="text-cream/90 uppercase text-sm tracking-wider">
                {l.label}
              </a>
            ))}
            <div className="pt-3 border-t border-cream/10">
              <LangSwitch />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

function Hero() {
  const { t } = useLang();
  return (
    <section id="top" className="relative min-h-[100svh] flex items-center justify-center text-center overflow-hidden">
      <img src={HERO_IMG} alt="New York skyline" width={1600} height={1066} fetchPriority="high" decoding="async" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-b from-navy-deep/85 via-navy-deep/65 to-navy-deep/90" />
      <div className="relative z-10 mx-auto max-w-4xl px-6 py-32">
        <div className="inline-flex flex-col items-center">
          <span className="text-xs sm:text-sm font-semibold tracking-[0.3em] text-gold uppercase">{t.hero.eyebrow}</span>
          <span className="mt-2 block h-px w-16 bg-gold" />
        </div>
        <h1 className="mt-8 font-serif text-5xl sm:text-6xl md:text-7xl leading-[1.05] text-cream">
          {t.hero.title1}<br />{t.hero.title2}
        </h1>
        <p className="mt-8 text-base sm:text-lg text-cream/80 max-w-xl mx-auto leading-relaxed">{t.hero.subtitle}</p>
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <a href="tel:8333847375" className="inline-flex items-center justify-center gap-2 bg-gold text-navy-deep px-8 py-4 font-semibold tracking-wider text-sm uppercase hover:bg-gold-soft transition-colors">
            <Phone className="h-4 w-4" />
            {t.hero.call}: {PHONE_MAIN}
          </a>
          <a href={WHATSAPP} target="_blank" rel="noopener" className="inline-flex items-center justify-center gap-2 bg-whatsapp text-white px-8 py-4 font-semibold tracking-wider text-sm uppercase hover:opacity-90 transition-opacity">
            <MessageCircle className="h-4 w-4" />
            WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}

function AccidentSection() {
  const { t } = useLang();
  const features = [
    { icon: ShieldCheck, label: t.accident.f1 },
    { icon: Clock, label: t.accident.f2 },
    { icon: Scale, label: t.accident.f3 },
  ];
  return (
    <section id="servicios" className="bg-cream py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6 grid md:grid-cols-2 gap-12 md:gap-16 items-center">
        <div>
          <span className="text-xs font-semibold tracking-[0.3em] text-gold uppercase">{t.accident.eyebrow}</span>
          <h2 className="mt-4 font-serif text-4xl md:text-5xl text-navy-deep leading-tight">{t.accident.title}</h2>
          <div className="mt-6 h-px w-16 bg-gold" />
          <p className="mt-6 text-navy/80 leading-relaxed text-lg">{t.accident.body}</p>
          <div className="mt-8 grid sm:grid-cols-3 gap-6">
            {features.map((f) => (
              <div key={f.label} className="flex flex-col items-start gap-2">
                <f.icon className="h-6 w-6 text-gold" strokeWidth={1.5} />
                <span className="text-sm font-medium text-navy-deep">{f.label}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="relative">
          <img src={JUSTICE_IMG} alt="Legal justice" width={900} height={1125} loading="lazy" decoding="async" className="w-full h-[500px] object-cover shadow-xl" />
          <div className="absolute -bottom-8 -left-8 right-8 md:right-auto md:w-[320px] bg-navy-deep text-cream p-8 shadow-2xl">
            <span className="text-xs font-semibold tracking-[0.25em] text-gold uppercase">{t.accident.cardEyebrow}</span>
            <h3 className="mt-3 font-serif text-2xl">{t.accident.cardTitle}</h3>
            <a href="tel:7184140102" className="mt-4 block text-2xl font-serif text-gold">{PHONE_LOCAL}</a>
            <a href={WHATSAPP} target="_blank" rel="noopener" className="mt-4 inline-flex items-center gap-2 bg-whatsapp text-white px-5 py-3 text-sm font-semibold tracking-wider uppercase hover:opacity-90">
              <MessageCircle className="h-4 w-4" /> {t.accident.cardCta}
            </a>
            <p className="mt-4 text-xs text-cream/70">{t.accident.cardNote}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Reviews() {
  const { t } = useLang();
  return (
    <section id="resenas" className="bg-navy-deep text-cream py-20 md:py-28 mt-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-semibold tracking-[0.3em] text-gold uppercase">{t.reviews.eyebrow}</span>
          <h2 className="mt-4 font-serif text-4xl md:text-5xl">{t.reviews.title}</h2>
          <div className="mt-6 flex items-center justify-center gap-3">
            <div className="flex">{[...Array(5)].map((_, i) => <Star key={i} className="h-5 w-5 fill-gold text-gold" />)}</div>
            <span className="font-serif text-2xl text-gold">4.9 / 5</span>
          </div>
          <p className="mt-2 text-sm text-cream/60">{t.reviews.basedOn}</p>
        </div>
        <div className="mt-14 grid md:grid-cols-3 gap-6">
          {t.reviews.items.map((r) => (
            <div key={r.name} className="bg-navy border border-cream/10 p-8 hover:border-gold/40 transition-colors">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-gold text-navy-deep flex items-center justify-center font-serif text-xl font-semibold">{r.initial}</div>
                <div>
                  <h3 className="font-semibold">{r.name}</h3>
                  <p className="text-xs text-cream/60">{r.time}</p>
                </div>
              </div>
              <div className="mt-4 flex">{[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-gold text-gold" />)}</div>
              <p className="mt-4 text-cream/80 leading-relaxed text-sm">"{r.text}"</p>
            </div>
          ))}
        </div>
        <div className="mt-10 text-center">
          <a href={WHATSAPP} target="_blank" rel="noopener" className="inline-flex items-center gap-2 border border-gold text-gold px-6 py-3 text-sm font-semibold tracking-wider uppercase hover:bg-gold hover:text-navy-deep transition-colors">
            {t.reviews.writeReview}
          </a>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const { t } = useLang();
  const [sent, setSent] = useState(false);
  const onSubmit = (e: React.FormEvent) => { e.preventDefault(); setSent(true); };
  return (
    <section id="contacto" className="bg-cream py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6 grid md:grid-cols-2 gap-12">
        <div>
          <span className="text-xs font-semibold tracking-[0.3em] text-gold uppercase">{t.contact.eyebrow}</span>
          <h2 className="mt-4 font-serif text-4xl md:text-5xl text-navy-deep">{t.contact.title}</h2>
          <div className="mt-6 h-px w-16 bg-gold" />
          <div className="mt-10 space-y-8">
            <div className="flex gap-4">
              <MapPin className="h-6 w-6 text-gold flex-shrink-0 mt-1" strokeWidth={1.5} />
              <div>
                <h3 className="font-semibold text-navy-deep">{t.contact.office}</h3>
                <p className="mt-1 text-navy/70">{t.contact.officeAddr1}<br />{t.contact.officeAddr2}</p>
              </div>
            </div>
            <div className="flex gap-4">
              <Phone className="h-6 w-6 text-gold flex-shrink-0 mt-1" strokeWidth={1.5} />
              <div>
                <h3 className="font-semibold text-navy-deep">{t.contact.phone}</h3>
                <a href="tel:8333847375" className="mt-1 block text-navy/70 hover:text-gold">{PHONE_MAIN}</a>
              </div>
            </div>
            <div className="flex gap-4">
              <Mail className="h-6 w-6 text-gold flex-shrink-0 mt-1" strokeWidth={1.5} />
              <div>
                <h3 className="font-semibold text-navy-deep">{t.contact.attention}</h3>
                <p className="mt-1 text-navy/70">{t.contact.attentionVal}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white p-8 md:p-10 shadow-lg">
          <h3 className="font-serif text-2xl text-navy-deep">{t.contact.formTitle}</h3>
          {sent ? (
            <div className="mt-8 text-center py-12">
              <div className="text-4xl">✅</div>
              <h4 className="mt-4 font-serif text-2xl text-navy-deep">{t.contact.received}</h4>
              <p className="mt-2 text-navy/70 text-sm">{t.contact.receivedBody}</p>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="mt-6 space-y-4">
              <input required placeholder={t.contact.name} className="w-full border border-border bg-white px-4 py-3 text-sm focus:outline-none focus:border-gold" />
              <input required type="email" placeholder={t.contact.email} className="w-full border border-border bg-white px-4 py-3 text-sm focus:outline-none focus:border-gold" />
              <input required type="tel" placeholder={t.contact.tel} className="w-full border border-border bg-white px-4 py-3 text-sm focus:outline-none focus:border-gold" />
              <select required defaultValue="" className="w-full border border-border bg-white px-4 py-3 text-sm focus:outline-none focus:border-gold">
                <option value="" disabled>{t.contact.area}</option>
                {t.contact.areas.map((a) => <option key={a}>{a}</option>)}
              </select>
              <textarea required rows={4} placeholder={t.contact.message} className="w-full border border-border bg-white px-4 py-3 text-sm focus:outline-none focus:border-gold" />
              <button type="submit" className="w-full bg-navy-deep text-cream py-4 text-sm font-semibold tracking-wider uppercase hover:bg-navy transition-colors">{t.contact.send}</button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const { t } = useLang();
  return (
    <footer className="bg-navy-deep text-cream/70 py-10 border-t border-cream/10">
      <div className="mx-auto max-w-7xl px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Scale className="h-5 w-5 text-gold" strokeWidth={1.5} />
          <span className="font-serif text-lg text-cream">Team Abogados</span>
        </div>
        <p className="text-xs">© {new Date().getFullYear()} Team Abogados. {t.footer}</p>
      </div>
    </footer>
  );
}

function WhatsAppFab() {
  const { t } = useLang();
  return (
    <a href={WHATSAPP} target="_blank" rel="noopener" aria-label="WhatsApp"
      className="fixed bottom-6 right-6 z-40 inline-flex items-center gap-2 bg-gold text-navy-deep px-5 py-3 rounded-full shadow-2xl font-semibold text-sm hover:bg-gold-soft transition-colors">
      <span className="h-2 w-2 rounded-full bg-navy-deep animate-pulse" />
      {t.fab}
    </a>
  );
}

function Index() {
  const [lang, setLang] = useState<Lang>("es");
  const t = translations[lang];
  return (
    <LangContext.Provider value={{ lang, setLang, t }}>
      <div className="bg-cream">
        <Header />
        <Hero />
        <AccidentSection />
        <Reviews />
        <Contact />
        <Footer />
        <WhatsAppFab />
      </div>
    </LangContext.Provider>
  );
}
