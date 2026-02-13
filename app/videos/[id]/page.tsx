import { notFound } from "next/navigation"
import Link from "next/link"
import type { Metadata } from "next"
import { ArrowLeft, ChevronLeft, ChevronRight, Clock } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { VideoPlayer } from "@/components/video-player"
import { videos, getVideoById, getSeriesVideos } from "@/data/videos"

interface PageProps {
  params: Promise<{ id: string }>
}

export async function generateStaticParams() {
  return videos.map((video) => ({ id: video.id }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params
  const video = getVideoById(id)
  if (!video) return { title: "Video Not Found" }

  return {
    title: `${video.title} - Shkolla në Mikrofon`,
    description: video.description,
  }
}

export default async function VideoPage({ params }: PageProps) {
  const { id } = await params
  const video = getVideoById(id)

  if (!video) {
    notFound()
  }

  const seriesVideos = video.series
    ? getSeriesVideos(video.series.name)
    : []

  const currentIndex = seriesVideos.findIndex((v) => v.id === video.id)
  const prevVideo = currentIndex > 0 ? seriesVideos[currentIndex - 1] : null
  const nextVideo =
    currentIndex < seriesVideos.length - 1
      ? seriesVideos[currentIndex + 1]
      : null

  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6 sm:py-10 lg:px-8">
          {/* Back link */}
          <Link
            href="/videos"
            className="mb-4 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground sm:mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            Kthehu tek të gjitha videot
          </Link>

          {/* Video player */}
          <VideoPlayer src={video.url} title={video.title} videoId={video.id} />

          {/* Video info */}
          <div className="mt-4 sm:mt-6"> 
            <h1 className="text-xl font-bold text-foreground sm:text-2xl lg:text-3xl">
              {video.title}
            </h1>

            <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>{video.duration}</span>
            </div>

            <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
              {video.description}
            </p>
          </div>

          {/* Series navigation */}
          {video.series && (prevVideo || nextVideo) && (
            <div className="mt-8 border-t border-border pt-6 sm:mt-10 sm:pt-8">
              <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                Navigimi i videove
              </h2>
              <div className="flex flex-row gap-3 justify-between">
                {prevVideo ? (
                  <Link
                    href={`/videos/${prevVideo.id}`}
                    className="flex flex-1 items-center gap-2 rounded-lg border border-border bg-card px-3 py-3 text-sm transition-colors hover:bg-muted sm:px-4 max-w-[48%]"
                  >
                    <ChevronLeft className="h-4 w-4 shrink-0 text-muted-foreground" />
                    <div className="min-w-0">
                      <div className="text-xs text-muted-foreground">
                        Video e kaluar
                      </div>
                      <div className="truncate font-medium text-card-foreground">
                        {prevVideo.title}
                      </div>
                    </div>
                  </Link>
                ) : (
                  <div />
                )}

                {nextVideo ? (
                  <Link
                    href={`/videos/${nextVideo.id}`}
                    className="flex flex-1 items-center justify-end gap-2 rounded-lg border border-border bg-card px-3 py-3 text-right text-sm transition-colors hover:bg-muted sm:px-4 max-w-[48%]"
                  >
                    <div className="min-w-0">
                      <div className="text-xs text-muted-foreground">Video e rradhës</div>
                      <div className="truncate font-medium text-card-foreground">
                        {nextVideo.title}
                      </div>
                    </div>
                    <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" />
                  </Link>
                ) : (
                  <div />
                )}
              </div>
            </div>
          )}

          {/* Series overview */}
          {video.series && seriesVideos.length > 1 && (
            <div className="mt-8 sm:mt-10">
              <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                Videot e renditura
              </h2>
              <div className="flex flex-col gap-2">
                {seriesVideos.map((sv) => (
                  <Link
                    key={sv.id}
                    href={`/videos/${sv.id}`}
                    className={`flex items-center gap-3 rounded-lg border px-4 py-3 text-sm transition-colors ${
                      sv.id === video.id
                        ? "border-primary bg-primary/5 text-primary"
                        : "border-border bg-card text-card-foreground hover:bg-muted"
                    }`}
                  >
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                      {sv.series?.part}
                    </span>
                    <span className="min-w-0 truncate font-medium">
                      {sv.title}
                    </span>
                    <span className="ml-auto shrink-0 text-xs text-muted-foreground">
                      {sv.duration}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <SiteFooter />
    </>
  )
}
