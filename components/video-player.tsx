"use client"

import { useEffect, useRef, useCallback, useState } from "react"
import { Play, Pause } from "lucide-react"

interface VideoPlayerProps {
  src: string
  title: string
  videoId: string
}

export function VideoPlayer({ src, title, videoId }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [showOverlay, setShowOverlay] = useState(false)
  const overlayTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)

  const saveProgress = useCallback(() => {
    const video = videoRef.current
    if (!video) return
    const progress = {
      currentTime: video.currentTime,
      duration: video.duration,
      watched: video.currentTime / video.duration > 0.9,
    }
    try {
      const allProgress = JSON.parse(
        localStorage.getItem("video-progress") || "{}"
      )
      allProgress[videoId] = progress
      localStorage.setItem("video-progress", JSON.stringify(allProgress))
    } catch {
      // localStorage unavailable
    }
  }, [videoId])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    // Restore saved progress
    try {
      const allProgress = JSON.parse(
        localStorage.getItem("video-progress") || "{}"
      )
      const saved = allProgress[videoId]
      if (saved && saved.currentTime > 0 && !saved.watched) {
        video.currentTime = saved.currentTime
      }
    } catch {
      // localStorage unavailable
    }

    const handleTimeUpdate = () => saveProgress()
    const handleEnded = () => {
      try {
        const allProgress = JSON.parse(
          localStorage.getItem("video-progress") || "{}"
        )
        allProgress[videoId] = {
          currentTime: video.duration,
          duration: video.duration,
          watched: true,
        }
        localStorage.setItem("video-progress", JSON.stringify(allProgress))
      } catch {
        // localStorage unavailable
      }
    }

    video.addEventListener("timeupdate", handleTimeUpdate)
    video.addEventListener("ended", handleEnded)

    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate)
      video.removeEventListener("ended", handleEnded)
    }
  }, [videoId, saveProgress])

  const togglePlayPause = useCallback(() => {
    const video = videoRef.current
    if (!video) return
    if (video.paused) {
      video.play()
    } else {
      video.pause()
    }
  }, [])

  const flashOverlay = useCallback(() => {
    setShowOverlay(true)
    if (overlayTimeout.current) clearTimeout(overlayTimeout.current)
    overlayTimeout.current = setTimeout(() => setShowOverlay(false), 800)
  }, [])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const onPlay = () => {
      setIsPlaying(true)
      flashOverlay()
    }
    const onPause = () => {
      setIsPlaying(false)
      flashOverlay()
    }

    video.addEventListener("play", onPlay)
    video.addEventListener("pause", onPause)

    return () => {
      video.removeEventListener("play", onPlay)
      video.removeEventListener("pause", onPause)
    }
  }, [flashOverlay])

  return (
    <div className="group relative overflow-hidden rounded-lg border border-border bg-foreground/5 shadow-sm sm:rounded-xl">
      <video
        ref={videoRef}
        controls
        playsInline
        muted
        controlsList="nodownload"
        onContextMenu={(e) => e.preventDefault()}
        preload="metadata"
        className="aspect-video w-full bg-foreground/10"
        aria-label={`Video player: ${title}`}
      >
        <source src={src} type="video/mp4" />
        <p>
          {"Your browser does not support the video element."}
        </p>
      </video>

      {/* Center overlay play/pause icon — hidden on mobile, visible on sm+ */}
      <button
        type="button"
        onClick={togglePlayPause}
        aria-label={isPlaying ? "Pause video" : "Play video"}
        className={`pointer-events-none hidden sm:flex absolute inset-x-0 top-0 bottom-12 items-center justify-center transition-opacity duration-300 sm:pointer-events-auto ${
          showOverlay ? "opacity-100" : "opacity-0 group-hover:opacity-100"
        }`}
      >
        <span className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/80 text-primary-foreground shadow-lg backdrop-blur-sm transition-transform hover:scale-110">
          {isPlaying ? (
            <Pause className="h-9 w-9" />
          ) : (
            <Play className="h-9 w-9" />
          )}
        </span>
      </button>
    </div>
  )
}
