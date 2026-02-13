"use client"

import Link from "next/link"
import Image from "next/image"
import { Clock, CheckCircle2, Play } from "lucide-react"
import { useEffect, useState } from "react"
import type { Video } from "@/data/videos"
import { cn } from "@/lib/utils"

interface VideoCardProps {
  video: Video
}

export function VideoCard({ video }: VideoCardProps) {
  const [watched, setWatched] = useState(false)

  useEffect(() => {
    try {
      const allProgress = JSON.parse(
        localStorage.getItem("video-progress") || "{}"
      )
      if (allProgress[video.id]?.watched) {
        setWatched(true)
      }
    } catch {
      // localStorage unavailable
    }
  }, [video.id])

  return (
    <Link
      href={`/videos/${video.id}`}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-lg border border-border bg-card shadow-sm transition-all hover:shadow-md hover:border-primary/30 sm:rounded-xl",
        watched && "ring-2 ring-accent/30"
      )}
    >
      {/* Thumbnail area */}
      <div className="relative aspect-video w-full bg-muted">
        <Image
          src={video.thumbnail}
          alt={video.title}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-foreground/5">
          <Play className="h-10 w-10 text-muted-foreground/50 transition-transform group-hover:scale-110 group-hover:text-primary sm:h-12 sm:w-12" />
        </div>

        {/* Duration badge */}
        <span className="absolute bottom-2 right-2 rounded bg-foreground/80 px-1.5 py-0.5 text-xs font-medium text-background sm:bottom-3 sm:right-3 sm:px-2 sm:py-1">
          {video.duration}
        </span>

        {/* Watched badge */}
        {watched && (
          <span className="absolute left-2 top-2 flex items-center gap-1 rounded bg-accent px-1.5 py-0.5 text-xs font-medium text-accent-foreground sm:left-3 sm:top-3 sm:px-2 sm:py-1">
            <CheckCircle2 className="h-3 w-3" />
            <span className="sr-only sm:not-sr-only">Watched</span>
          </span>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-1.5 p-3 sm:gap-2 sm:p-4">
        <h3 className="text-sm font-semibold leading-snug text-card-foreground group-hover:text-primary sm:text-base">
          {video.title}
        </h3>

        <p className="line-clamp-2 text-xs leading-relaxed text-muted-foreground sm:text-sm">
          {video.description}
        </p>

        <div className="mt-auto flex items-center gap-3 pt-2 text-xs text-muted-foreground sm:text-sm">
          <span className="flex items-center gap-1">
            <Clock className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
            {video.duration}
          </span>
          {video.series && (
            <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
              {"Part"} {video.series.part} {"of"} {video.series.totalParts}
            </span>
          )}
        </div>
      </div>
    </Link>
  )
}