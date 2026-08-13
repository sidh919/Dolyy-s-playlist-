"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Track } from "@/lib/playlist";
import { parseDuration } from "@/lib/time";

/**
 * No audio files were provided alongside the track list, so there is nothing
 * to actually decode or play. This hook simulates a transport (play/pause,
 * elapsed time, auto-advance) against each track's placeholder duration so
 * every part of the player UI is real and wired up. Swap `tick` for a real
 * <audio> element's `timeupdate`/`ended` events once audio sources exist.
 */
export function usePlayer(tracks: Track[]) {
  const [index, setIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const track = tracks[index];
  const duration = parseDuration(track.duration);

  const next = useCallback(() => {
    setIndex((i) => (i + 1) % tracks.length);
    setElapsed(0);
  }, [tracks.length]);

  const prev = useCallback(() => {
    setIndex((i) => (i - 1 + tracks.length) % tracks.length);
    setElapsed(0);
  }, [tracks.length]);

  const togglePlay = useCallback(() => setIsPlaying((p) => !p), []);

  const seekTo = useCallback(
    (fraction: number) => {
      const clamped = Math.min(1, Math.max(0, fraction));
      setElapsed(clamped * duration);
    },
    [duration]
  );

  useEffect(() => {
    if (!isPlaying) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }
    intervalRef.current = setInterval(() => {
      setElapsed((e) => {
        if (e + 1 >= duration) {
          next();
          return 0;
        }
        return e + 1;
      });
    }, 1000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPlaying, duration, next]);

  return {
    track,
    index,
    isPlaying,
    elapsed,
    duration,
    next,
    prev,
    togglePlay,
    seekTo,
  };
}
