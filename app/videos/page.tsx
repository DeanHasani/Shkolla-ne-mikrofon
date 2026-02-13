import type { Metadata } from "next"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { videos } from "@/data/videos"
import { VideoCard } from "@/components/video-card"

export const metadata: Metadata = {
  title: "Të gjitha videot - Shkolla në Mikrofon",
  description:
    "Shfletoni te gjitha videot e hedhura ne website",
}

export default function VideosPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <div className="mx-auto max-w-8xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
          {/* Page header */}
          <div className="mb-8 sm:mb-12">
            <h1 className="text-2xl font-bold text-foreground sm:text-3xl lg:text-4xl">
              Të gjitha videot
            </h1>
            <p className="mt-2 text-sm text-muted-foreground sm:text-base">
              Shfleto të gjitha videot
            </p>
          </div>

          {/* All videos in one grid */}
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
            {videos.map((video) => (
              <VideoCard key={video.id} video={video} />
            ))}
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  )
}
