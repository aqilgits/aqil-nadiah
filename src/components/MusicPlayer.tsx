"use client";

import { useEffect, useRef, useState } from "react";

const VIDEO_ID = "c3WQtYn-_HQ";

declare global {
  interface Window {
    YT: {
      Player: new (
        el: HTMLElement,
        opts: {
          videoId: string;
          playerVars?: Record<string, number | string>;
          events?: {
            onReady?: () => void;
            onStateChange?: (e: { data: number }) => void;
          };
        }
      ) => {
        playVideo(): void;
        pauseVideo(): void;
      };
      PlayerState: { PLAYING: number };
    };
    onYouTubeIframeAPIReady: () => void;
  }
}

export default function MusicPlayer({ autoPlay }: { autoPlay: boolean }) {
  const playerRef = useRef<{ playVideo(): void; pauseVideo(): void } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [playing, setPlaying] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    function initPlayer() {
      if (!containerRef.current) return;
      playerRef.current = new window.YT.Player(containerRef.current, {
        videoId: VIDEO_ID,
        playerVars: {
          autoplay: 0,
          controls: 0,
          disablekb: 1,
          loop: 1,
          playlist: VIDEO_ID,
          modestbranding: 1,
          rel: 0,
        },
        events: {
          onReady: () => setReady(true),
          onStateChange: (e: { data: number }) => {
            setPlaying(e.data === window.YT.PlayerState.PLAYING);
          },
        },
      });
    }

    if (window.YT?.Player) {
      initPlayer();
    } else {
      window.onYouTubeIframeAPIReady = initPlayer;
      if (!document.getElementById("yt-api-script")) {
        const tag = document.createElement("script");
        tag.id = "yt-api-script";
        tag.src = "https://www.youtube.com/iframe_api";
        document.head.appendChild(tag);
      }
    }
  }, []);

  // Auto-play once door is opened and player is ready
  useEffect(() => {
    if (autoPlay && ready && playerRef.current) {
      playerRef.current.playVideo();
    }
  }, [autoPlay, ready]);

  function toggle() {
    if (!playerRef.current) return;
    if (playing) {
      playerRef.current.pauseVideo();
    } else {
      playerRef.current.playVideo();
    }
  }

  return (
    <>
      {/* Hidden YouTube iframe */}
      <div
        style={{
          position: "fixed",
          width: 1, height: 1,
          overflow: "hidden",
          opacity: 0,
          pointerEvents: "none",
          zIndex: -1,
        }}
        aria-hidden="true"
      >
        <div ref={containerRef} />
      </div>

      {/* Floating music pill */}
      <button
        onClick={toggle}
        aria-label={playing ? "Jeda muzik" : "Main muzik"}
        style={{
          position: "fixed",
          top: 20,
          right: 20,
          zIndex: 9998,
          width: 38,
          height: 38,
          borderRadius: "50%",
          border: "1px solid rgba(207,140,154,0.35)",
          background: "rgba(255,255,255,0.75)",
          backdropFilter: "blur(12px)",
          boxShadow: "0 2px 16px rgba(207,140,154,0.18)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          transition: "transform 0.15s, background 0.15s",
        }}
      >
        {playing ? <PauseIcon /> : <NoteIcon spinning={ready} />}
      </button>
    </>
  );
}

function NoteIcon({ spinning }: { spinning: boolean }) {
  return (
    <span
      style={{
        fontSize: 16,
        display: "block",
        animation: spinning ? "noteSpin 3s linear infinite" : "none",
        color: "#cf8c9a",
      }}
    >
      ♪
      <style>{`
        @keyframes noteSpin {
          0%   { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </span>
  );
}

function PauseIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <rect x="2" y="1" width="4" height="12" rx="1.5" fill="#cf8c9a" />
      <rect x="8" y="1" width="4" height="12" rx="1.5" fill="#cf8c9a" />
    </svg>
  );
}
