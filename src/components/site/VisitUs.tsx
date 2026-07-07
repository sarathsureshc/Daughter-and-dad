import { MapPin, Dog, Sprout, Clock, Phone } from "lucide-react";
import { MagneticButton } from "./primitives/MagneticButton";
import { RevealText } from "./primitives/RevealText";

export function VisitUs() {
  return (
    <section id="visit" className="relative py-24 md:py-40">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 max-w-3xl">
          <p className="mb-4 text-xs uppercase tracking-[0.3em] text-primary">Visit</p>
          <RevealText
            as="h2"
            className="font-serif text-4xl leading-[1.05] text-foreground text-balance md:text-6xl"
          >
            Come find us under the trees.
          </RevealText>
        </div>

        <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
          {/* Map */}
          <div className="relative overflow-hidden rounded-3xl border border-foreground/10">
            <iframe
              title="Map of Daughter and Dad Coffee at Meliá Desert Palm, Dubai"
              src="https://www.google.com/maps?q=Melia+Desert+Palm+Dubai&output=embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-[420px] w-full grayscale-[15%] md:h-[560px]"
            />
            <div className="pointer-events-none absolute inset-0 bg-primary/[0.04] mix-blend-multiply" />
          </div>

          {/* Details */}
          <div className="flex flex-col gap-8">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 text-primary">
                <MapPin size={16} />
                <span className="text-xs uppercase tracking-[0.25em]">Address</span>
              </div>
              <p className="font-serif text-2xl text-foreground md:text-3xl">Meliá Desert Palm</p>
              <p className="mt-1 text-foreground/70">Warsan 2 · Dubai, UAE</p>
              <p className="mt-1 text-foreground/70">
                Inside Meliá Desert Palm, a member of Meliá Collection
              </p>
            </div>

            <div>
              <div className="mb-3 inline-flex items-center gap-2 text-primary">
                <Phone size={16} />
                <span className="text-xs uppercase tracking-[0.25em]">Contact</span>
              </div>
              <a href="tel:+971543834709" className="block text-foreground/85 hover:text-primary">
                +971 54 383 4709
              </a>
              <a
                href="mailto:admin@daughterdad.coffee"
                className="block text-foreground/85 hover:text-primary"
              >
                admin@daughterdad.coffee
              </a>
            </div>

            <div>
              <div className="mb-3 inline-flex items-center gap-2 text-primary">
                <Clock size={16} />
                <span className="text-xs uppercase tracking-[0.25em]">Hours</span>
              </div>
              <dl className="space-y-1 text-foreground/85">
                <div className="flex justify-between border-b border-foreground/10 py-2">
                  <dt>Café</dt>
                  <dd className="font-medium">7:00am – 7:00pm daily</dd>
                </div>
                <div className="flex justify-between border-b border-foreground/10 py-2">
                  <dt>Kitchen</dt>
                  <dd className="font-medium">7:30am – 3:30pm daily</dd>
                </div>
                <div className="flex justify-between py-2">
                  <dt>Weekend Brunch</dt>
                  <dd className="font-medium text-primary">Reservation required</dd>
                </div>
              </dl>
            </div>

            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-2 rounded-full border border-secondary/50 bg-secondary/10 px-4 py-2 text-sm text-foreground">
                <Dog size={15} className="text-secondary" />
                Dog-friendly
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-accent/70 bg-accent/40 px-4 py-2 text-sm text-foreground">
                <Sprout size={15} className="text-primary" />
                Set on an equestrian estate
              </span>
            </div>

            <div className="mt-2 flex flex-wrap gap-3">
              <MagneticButton href="mailto:admin@daughterdad.coffee" variant="primary">
                Reserve for Weekend Brunch
              </MagneticButton>
              <MagneticButton href="https://wa.me/971543834709" variant="outline">
                WhatsApp Us
              </MagneticButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
