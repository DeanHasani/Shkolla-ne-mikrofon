import Link from "next/link"
import { ArrowRight} from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { videos } from "@/data/videos"
import Image from "next/image"
import { TiltCard } from "@/components/tilt-card"

const features = [
  {
    icon: "/icons/qellimi.svg",
    title: "Qëllimi",
    description:
      "Ky website i shkollës 9-vjeçare 'Naim Frashëri' i kushtohet podcastit 'Shkolla në mikrofon', një hapësirë ku nxënësit marrin fjalën për të ndarë mendimet, përvojat dhe këndvështrimet e tyre mbi shkollën dhe realitetin që i rrethon.",
  },
  {
    icon: "/icons/mesazhi.svg",
    title: "Mesazhi",
    description:
      "I frymëzuar nga mendimi i lirë dhe fryma emancipuese e Musine Kokalarit, podcasti synon të nxisë guximin për të folur, të menduarit ndryshe dhe respektin për dinjitetin njerëzor.",
  },
  {
    icon: "/icons/ideja.svg",
    title: "Ideja",
    description:
      "Kjo platformë krijon një hapësirë ku zëri i të rinjve dëgjohet qartë, me përgjegjësi dhe autenticitet, duke sjellë për publikun botën e tyre ashtu siç ata e shohin sot dhe e ëndërrojnë nesër.",
  },
]

export default function HomePage() {
  const totalDuration = videos.reduce((acc, v) => acc + v.durationSeconds, 0)
  const totalMinutes = Math.round(totalDuration / 60)

  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
            <div className="flex flex-col items-center text-center">
              <h1 className="max-w-3xl text-balance text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl md:text-5xl lg:text-6xl">
                Shkolla në Mikrofon – Kur Nxënësit Marrin Fjalën
              </h1>

              <p className="mt-4 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground sm:mt-6 sm:text-lg">
                Një website dhe një hapësirë për zërin dhe mendimin e nxënësve.Të flasësh është <b>Guxim</b>. Të dëgjohesh është <b>Fuqi</b>.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:gap-4">
                <Link
                  href={`/videos/${videos[0].id}`}
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 sm:px-6 sm:text-base"
                >
                  Fillo nga video e parë
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/videos"
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-border bg-card px-5 py-3 text-sm font-semibold text-card-foreground shadow-sm transition-colors hover:bg-muted sm:px-6 sm:text-base"
                >
                  Shfleto të gjitha videot
                </Link>
              </div>

              {/* Stats */}
              <div className="mt-12 flex flex-wrap items-center justify-center gap-6 sm:mt-16 sm:gap-10">
                <div className="flex flex-col items-center">
                  <span className="text-2xl font-bold text-foreground sm:text-3xl">
                    {videos.length}
                  </span>
                  <span className="mt-1 text-xs text-muted-foreground sm:text-sm">
                    Video
                  </span>
                </div>
                <div className="h-8 w-px bg-border sm:h-10" />
                <div className="flex flex-col items-center">
                  <span className="text-2xl font-bold text-foreground sm:text-3xl">
                    {totalMinutes} min
                  </span>
                  <span className="mt-1 text-xs text-muted-foreground sm:text-sm">
                    Koha në total
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="border-t border-border bg-card">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
            <div className="text-center">
              <h2 className="text-balance text-2xl font-bold text-card-foreground sm:text-3xl">
                Çfarë synon të arrijë ky podcast?
              </h2>
              <p className="mx-auto mt-3 max-w-lg text-sm text-muted-foreground sm:text-base">
                Të bëjë zërin e nxënësve të dëgjohet – me guxim, përgjegjësi dhe autenticitet.
              </p>
            </div>

            <div className="mt-10 grid gap-6 sm:mt-14 sm:grid-cols-3 sm:gap-8">
              {features.map((feature) => (
                <TiltCard
                  key={feature.title}
                  className="rounded-xl border border-border bg-background"
                >
                  <div className="flex flex-col items-center p-6 text-center sm:p-8">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 sm:h-12 sm:w-12">
                      <Image src={feature.icon} alt="" width={24} height={24} className="h-5 w-5 text-primary sm:h-6 sm:w-6" />
                    </div>
                    <h3 className="mt-4 text-base font-semibold text-card-foreground sm:text-lg">
                      {feature.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </TiltCard>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="border-t border-border">
          <div className="mx-auto max-w-6xl px-4 py-16 text-center sm:px-6 sm:py-20 lg:px-8">
            <h2 className="text-balance text-2xl font-bold text-foreground sm:text-3xl">
              Gati për të filluar?
            </h2>
            <Link
              href="/videos"
              className="mt-6 inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 sm:mt-8 sm:text-base"
            >
              Shikoni të gjitha videot
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}