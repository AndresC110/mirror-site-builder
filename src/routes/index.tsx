import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Phone, MessageCircle, Star, MapPin, Mail, Menu, X, Scale, ShieldCheck, Clock } from "lucide-react";

const HERO_IMG = "https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&q=70&w=1600&fm=webp";
const JUSTICE_IMG = "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=70&w=900&fm=webp";

const WHATSAPP = "https://wa.me/17184140102";
const PHONE_MAIN = "(833) 384-7375";
const PHONE_LOCAL = "(718) 414-0102";

export const Route = createFileRoute("/")({
  head: () => ({
    links: [
      { rel: "preload", as: "image", href: HERO_IMG, fetchpriority: "high" } as any,
    ],
    meta: [
      { property: "og:image", content: HERO_IMG },
    ],
  }),
  component: Index,
});

function Header() {
  const [open, setOpen] = useState(false);
  const links = [
    { href: "#servicios", label: "Servicios" },
    { href: "#resenas", label: "Reseñas" },
    { href: "#contacto", label: "Contacto" },
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
          <div className="flex gap-3 text-sm font-medium tracking-wider text-cream/70">
            <button className="hover:text-gold">EN</button>
            <button className="text-gold underline underline-offset-4">ES</button>
          </div>
        </nav>
        <button onClick={() => setOpen(!open)} className="md:hidden text-cream" aria-label="Menú">
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
          </div>
        </div>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="relative min-h-[100svh] flex items-center justify-center text-center overflow-hidden">
      <img
        src={HERO_IMG}
        alt="Skyline de New York"
        width={1600}
        height={1066}
        fetchPriority="high"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-navy-deep/85 via-navy-deep/65 to-navy-deep/90" />
      <div className="relative z-10 mx-auto max-w-4xl px-6 py-32">
        <div className="inline-flex flex-col items-center">
          <span className="text-xs sm:text-sm font-semibold tracking-[0.3em] text-gold uppercase">Team Abogados</span>
          <span className="mt-2 block h-px w-16 bg-gold" />
        </div>
        <h1 className="mt-8 font-serif text-5xl sm:text-6xl md:text-7xl leading-[1.05] text-cream">
          Millones de Dólares<br />Recuperados
        </h1>
        <p className="mt-8 text-base sm:text-lg text-cream/80 max-w-xl mx-auto leading-relaxed">
          Nuestro equipo se encargará de lograr la máxima compensación para usted en New York.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <a href={`tel:8333847375`} className="inline-flex items-center justify-center gap-2 bg-gold text-navy-deep px-8 py-4 font-semibold tracking-wider text-sm uppercase hover:bg-gold-soft transition-colors">
            <Phone className="h-4 w-4" />
            Llamar: {PHONE_MAIN}
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
  return (
    <section id="servicios" className="bg-cream py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6 grid md:grid-cols-2 gap-12 md:gap-16 items-center">
        <div>
          <span className="text-xs font-semibold tracking-[0.3em] text-gold uppercase">Casos</span>
          <h2 className="mt-4 font-serif text-4xl md:text-5xl text-navy-deep leading-tight">
            ¿Accidente de Auto?
          </h2>
          <div className="mt-6 h-px w-16 bg-gold" />
          <p className="mt-6 text-navy/80 leading-relaxed text-lg">
            Team Abogados está aquí para ayudarle. Sabemos que puede estar confundido o no saber qué hacer
            frente a esas situaciones. Nosotros lo acompañamos en todo el proceso y disputamos la
            compensación que realmente merece.
          </p>
          <div className="mt-8 grid sm:grid-cols-3 gap-6">
            {[
              { icon: ShieldCheck, label: "Sin pago por adelantado" },
              { icon: Clock, label: "Atención 24/7" },
              { icon: Scale, label: "Hablamos español" },
            ].map((f) => (
              <div key={f.label} className="flex flex-col items-start gap-2">
                <f.icon className="h-6 w-6 text-gold" strokeWidth={1.5} />
                <span className="text-sm font-medium text-navy-deep">{f.label}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="relative">
          <img
            src={JUSTICE_IMG}
            alt="Justicia legal"
            width={900}
            height={1125}
            loading="lazy"
            decoding="async"
            className="w-full h-[500px] object-cover shadow-xl"
          />
          <div className="absolute -bottom-8 -left-8 right-8 md:right-auto md:w-[320px] bg-navy-deep text-cream p-8 shadow-2xl">
            <span className="text-xs font-semibold tracking-[0.25em] text-gold uppercase">Revisamos su caso gratis</span>
            <h3 className="mt-3 font-serif text-2xl">Consulta Gratis y Confidencial</h3>
            <a href={`tel:7184140102`} className="mt-4 block text-2xl font-serif text-gold">{PHONE_LOCAL}</a>
            <a href={WHATSAPP} target="_blank" rel="noopener" className="mt-4 inline-flex items-center gap-2 bg-whatsapp text-white px-5 py-3 text-sm font-semibold tracking-wider uppercase hover:opacity-90">
              <MessageCircle className="h-4 w-4" /> Chat por WhatsApp
            </a>
            <p className="mt-4 text-xs text-cream/70">Atención 24/7 en el Bronx y todo NY</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Reviews() {
  const reviews = [
    { initial: "A", name: "Anónimo", time: "hace 2 semanas", text: "Excelente servicio. Me ayudaron con mi caso de accidente en el Bronx y logramos una compensación mucho mayor de la que esperaba." },
    { initial: "C", name: "Cliente Satisfecho", time: "hace 1 mes", text: "Profesionales y directos. El equipo de Team Abogados habla español perfectamente y me explicaron todo el proceso legal." },
    { initial: "U", name: "Usuario de Google", time: "hace 3 meses", text: "Los mejores en New York. No tuve que pagar nada por adelantado y siempre respondieron mis mensajes de WhatsApp rápido." },
  ];
  return (
    <section id="resenas" className="bg-navy-deep text-cream py-20 md:py-28 mt-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-semibold tracking-[0.3em] text-gold uppercase">Testimonios</span>
          <h2 className="mt-4 font-serif text-4xl md:text-5xl">Lo que dicen nuestros clientes</h2>
          <div className="mt-6 flex items-center justify-center gap-3">
            <div className="flex">
              {[...Array(5)].map((_, i) => <Star key={i} className="h-5 w-5 fill-gold text-gold" />)}
            </div>
            <span className="font-serif text-2xl text-gold">4.9 / 5</span>
          </div>
          <p className="mt-2 text-sm text-cream/60">Basado en reseñas de Google</p>
        </div>
        <div className="mt-14 grid md:grid-cols-3 gap-6">
          {reviews.map((r) => (
            <div key={r.name} className="bg-navy border border-cream/10 p-8 hover:border-gold/40 transition-colors">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-gold text-navy-deep flex items-center justify-center font-serif text-xl font-semibold">
                  {r.initial}
                </div>
                <div>
                  <h3 className="font-semibold">{r.name}</h3>
                  <p className="text-xs text-cream/60">{r.time}</p>
                </div>
              </div>
              <div className="mt-4 flex">
                {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-gold text-gold" />)}
              </div>
              <p className="mt-4 text-cream/80 leading-relaxed text-sm">"{r.text}"</p>
            </div>
          ))}
        </div>
        <div className="mt-10 text-center">
          <a href={WHATSAPP} target="_blank" rel="noopener" className="inline-flex items-center gap-2 border border-gold text-gold px-6 py-3 text-sm font-semibold tracking-wider uppercase hover:bg-gold hover:text-navy-deep transition-colors">
            Escribir una reseña
          </a>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [sent, setSent] = useState(false);
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };
  return (
    <section id="contacto" className="bg-cream py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6 grid md:grid-cols-2 gap-12">
        <div>
          <span className="text-xs font-semibold tracking-[0.3em] text-gold uppercase">Contacto</span>
          <h2 className="mt-4 font-serif text-4xl md:text-5xl text-navy-deep">Hablemos de su caso</h2>
          <div className="mt-6 h-px w-16 bg-gold" />
          <div className="mt-10 space-y-8">
            <div className="flex gap-4">
              <MapPin className="h-6 w-6 text-gold flex-shrink-0 mt-1" strokeWidth={1.5} />
              <div>
                <h3 className="font-semibold text-navy-deep">Oficina</h3>
                <p className="mt-1 text-navy/70">2322 Arthur Avenue #207<br />Bronx, New York 10458</p>
              </div>
            </div>
            <div className="flex gap-4">
              <Phone className="h-6 w-6 text-gold flex-shrink-0 mt-1" strokeWidth={1.5} />
              <div>
                <h3 className="font-semibold text-navy-deep">Teléfono</h3>
                <a href="tel:8333847375" className="mt-1 block text-navy/70 hover:text-gold">{PHONE_MAIN}</a>
              </div>
            </div>
            <div className="flex gap-4">
              <Mail className="h-6 w-6 text-gold flex-shrink-0 mt-1" strokeWidth={1.5} />
              <div>
                <h3 className="font-semibold text-navy-deep">Atención</h3>
                <p className="mt-1 text-navy/70">24/7 en el Bronx y todo New York</p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white p-8 md:p-10 shadow-lg">
          <h3 className="font-serif text-2xl text-navy-deep">Envíenos un mensaje</h3>
          {sent ? (
            <div className="mt-8 text-center py-12">
              <div className="text-4xl">✅</div>
              <h4 className="mt-4 font-serif text-2xl text-navy-deep">¡Mensaje Recibido!</h4>
              <p className="mt-2 text-navy/70 text-sm">Un abogado le contactará dentro de las próximas 24 horas.</p>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="mt-6 space-y-4">
              <input required placeholder="Nombre completo" className="w-full border border-border bg-white px-4 py-3 text-sm focus:outline-none focus:border-gold" />
              <input required type="email" placeholder="Email" className="w-full border border-border bg-white px-4 py-3 text-sm focus:outline-none focus:border-gold" />
              <input required type="tel" placeholder="Teléfono" className="w-full border border-border bg-white px-4 py-3 text-sm focus:outline-none focus:border-gold" />
              <select required defaultValue="" className="w-full border border-border bg-white px-4 py-3 text-sm focus:outline-none focus:border-gold">
                <option value="" disabled>Área legal...</option>
                <option>Accidente de tráfico</option>
                <option>Derecho laboral</option>
                <option>Derecho familiar</option>
                <option>Derecho penal</option>
                <option>Inmigración</option>
                <option>Otro</option>
              </select>
              <textarea required rows={4} placeholder="Cuéntenos sobre su caso..." className="w-full border border-border bg-white px-4 py-3 text-sm focus:outline-none focus:border-gold" />
              <button type="submit" className="w-full bg-navy-deep text-cream py-4 text-sm font-semibold tracking-wider uppercase hover:bg-navy transition-colors">
                Enviar
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-navy-deep text-cream/70 py-10 border-t border-cream/10">
      <div className="mx-auto max-w-7xl px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Scale className="h-5 w-5 text-gold" strokeWidth={1.5} />
          <span className="font-serif text-lg text-cream">Team Abogados</span>
        </div>
        <p className="text-xs">© {new Date().getFullYear()} Team Abogados. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}

function WhatsAppFab() {
  return (
    <a
      href={WHATSAPP}
      target="_blank"
      rel="noopener"
      aria-label="Chat por WhatsApp"
      className="fixed bottom-6 right-6 z-40 inline-flex items-center gap-2 bg-gold text-navy-deep px-5 py-3 rounded-full shadow-2xl font-semibold text-sm hover:bg-gold-soft transition-colors"
    >
      <span className="h-2 w-2 rounded-full bg-navy-deep animate-pulse" />
      Team Abogados
    </a>
  );
}

function Index() {
  return (
    <div className="bg-cream">
      <Header />
      <Hero />
      <AccidentSection />
      <Reviews />
      <Contact />
      <Footer />
      <WhatsAppFab />
    </div>
  );
}
