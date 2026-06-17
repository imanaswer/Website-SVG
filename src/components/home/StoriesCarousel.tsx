"use client";

import { useRef, useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { youTubeId, youTubeThumb } from "@/lib/youtube";

export type StoryCard = {
  id: string;
  title: string;
  caption: string | null;
  youtubeUrl: string | null;
  thumbnail: string | null;
};

/**
 * Horizontal scroll-snap carousel of video stories. YouTube videos use a
 * click-to-load facade (thumbnail + play button) so no iframe loads until the
 * visitor asks — keeping the page light. Scrollable by touch, buttons and keys.
 */
export function StoriesCarousel({ stories }: { stories: StoryCard[] }) {
  const trackRef = useRef<HTMLUListElement | null>(null);

  if (stories.length === 0) {
    return (
      <p className="rounded-lg border border-line bg-card px-4 py-6 text-muted">
        Stories from around the school will appear here soon.
      </p>
    );
  }

  function scrollBy(dir: 1 | -1) {
    const track = trackRef.current;
    if (!track) return;
    track.scrollBy({ left: dir * Math.min(track.clientWidth * 0.9, 420), behavior: "smooth" });
  }

  return (
    <div className="relative">
      <ul
        ref={trackRef}
        className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {stories.map((story) => (
          <li
            key={story.id}
            className="w-[280px] shrink-0 snap-start sm:w-[340px]"
          >
            <StoryItem story={story} />
          </li>
        ))}
      </ul>

      {stories.length > 1 && (
        <div className="mt-4 flex gap-2">
          <button
            type="button"
            onClick={() => scrollBy(-1)}
            aria-label="Previous stories"
            className="grid h-10 w-10 place-items-center rounded-full border border-line bg-card text-indigo hover:border-indigo/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
          >
            <Icon name="chevron-left" className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={() => scrollBy(1)}
            aria-label="Next stories"
            className="grid h-10 w-10 place-items-center rounded-full border border-line bg-card text-indigo hover:border-indigo/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
          >
            <Icon name="chevron-right" className="h-5 w-5" />
          </button>
        </div>
      )}
    </div>
  );
}

function StoryItem({ story }: { story: StoryCard }) {
  const [playing, setPlaying] = useState(false);
  const ytId = youTubeId(story.youtubeUrl);
  const thumb = story.thumbnail ?? (ytId ? youTubeThumb(ytId) : null);

  return (
    <figure className="card-rise group overflow-hidden rounded-2xl border border-line bg-card">
      <div className="relative aspect-video bg-indigo/10">
        {playing && ytId ? (
          <iframe
            className="absolute inset-0 h-full w-full"
            src={`https://www.youtube-nocookie.com/embed/${ytId}?autoplay=1`}
            title={story.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <button
            type="button"
            onClick={() => ytId && setPlaying(true)}
            disabled={!ytId}
            aria-label={ytId ? `Play: ${story.title}` : story.title}
            className="absolute inset-0 h-full w-full"
          >
            {thumb ? (
              // eslint-disable-next-line @next/next/no-img-element -- external YT thumbnail, not a project asset
              <img
                src={thumb}
                alt=""
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            ) : (
              <span className="absolute inset-0 bg-gradient-to-br from-indigo to-ink" />
            )}
            {ytId && (
              <span className="absolute inset-0 grid place-items-center">
                <span className="grid h-14 w-14 place-items-center rounded-full bg-gold/90 text-ink shadow-lg transition-transform group-hover:scale-110">
                  <Icon name="play" className="h-6 w-6" />
                </span>
              </span>
            )}
          </button>
        )}
      </div>
      <figcaption className="p-4">
        <h3 className="font-display text-lg font-semibold text-indigo">{story.title}</h3>
        {story.caption && <p className="mt-1 text-sm text-muted">{story.caption}</p>}
      </figcaption>
    </figure>
  );
}
