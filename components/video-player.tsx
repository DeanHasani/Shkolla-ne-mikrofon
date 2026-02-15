"use client"

import { useCallback } from "react"

interface VideoPlayerProps {
  src: string
  title: string
  videoId: string
}

export function VideoPlayer({ src, title, videoId }: VideoPlayerProps) {
  // Mark YouTube video as watched when iframe loads
  const markYouTubeWatched = useCallback(() => {
    try {
      const allProgress = JSON.parse(
        localStorage.getItem("video-progress") || "{}"
      )
      allProgress[videoId] = {
        currentTime: 0,
        duration: 0,
        watched: true,
      }
      localStorage.setItem("video-progress", JSON.stringify(allProgress))
    } catch {
      // localStorage unavailable
    }
  }, [videoId])

  return (
    <div className="group relative overflow-hidden rounded-lg border border-border bg-foreground/5 shadow-sm sm:rounded-xl">
      <div className="aspect-video w-full">
        <iframe
          width="100%"
          height="100%"
          src={`https://www.youtube.com/embed/${src}`}
          title={title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          onLoad={markYouTubeWatched}
          className="w-full h-full"
        />
      </div>
    </div>
  )
}