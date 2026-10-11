import Image from "next/image";
import Link from "next/link";
import React from "react";

/*
 * Roster body modeled on Sony Music’s Featured Artists main
 * (main#main-content.wrapper → .container → .artist-block grid).
 *
 * MAP YOUR DATA HERE
 * ------------------
 * Pass artists with:
 *   - id / name     — required
 *   - imageSrc      — square press photo (object-cover)
 *   - href          — optional profile / external link
 */

export type TalentRosterItem = {
  id: string;
  name: string;
  /** Square press photo. Leave empty until mapped — cell shows a fallback. */
  imageSrc?: string;
  href?: string;
};

type Props = {
  artists: ReadonlyArray<TalentRosterItem>;
  headline?: string;
};

export const TalentRoster = ({
  artists,
  headline = "Featured Talents",
}: Props) => (
  <section
    id="main-content"
    className="wrapper w-full bg-[var(--color-background)] text-[var(--color-text)]"
  >
    <div className="container mx-auto w-full max-w-[960px] px-4 py-8 sm:px-6 sm:py-10 lg:px-0 lg:pb-[75px] lg:pt-[30px]">
      <h1
        className="page-title m-0 pb-10 text-center text-4xl font-black leading-none tracking-tight sm:text-[40px] sm:leading-10"
        data-aos="fade-up"
      >
        {headline}
      </h1>

      {/*
        Sony pattern: uniform square tiles, 3 across on desktop, ~20px gutters.
        aspect-square + object-cover keeps mixed press shots flush.
      */}
      <ul className="m-0 grid list-none grid-cols-1 gap-5 p-0 sm:grid-cols-2 lg:grid-cols-3">
        {artists.map((artist, index) => {
          const media = artist.imageSrc ? (
            <Image
              src={artist.imageSrc}
              alt={artist.name}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 300px"
              className="object-cover object-center transition duration-500 ease-out group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
            />
          ) : (
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-br from-neutral-300 via-neutral-400 to-neutral-600 dark:from-neutral-700 dark:via-neutral-800 dark:to-neutral-950"
            />
          );

          const details = (
            <div className="artist-details absolute inset-x-0 bottom-0 bg-[var(--color-accent)]/80 px-2 py-[9px] text-center text-[#f7f7f7] transition-[background-color] duration-500 group-hover:bg-[var(--color-accent)]">
              <h2 className="m-0 p-0 text-lg font-normal leading-tight text-[#f7f7f7]">
                {artist.name}
              </h2>
            </div>
          );

          const card = (
            <article className="artist-block group relative aspect-square w-full overflow-hidden border border-[#bbbbbb]">
              <div className="artist-img absolute inset-0">{media}</div>
              {details}
            </article>
          );

          return (
            <li
              key={artist.id}
              className="min-w-0"
              data-aos="fade-up"
              data-aos-delay={String((index % 6) * 60)}
            >
              {artist.href ? (
                <Link
                  href={artist.href}
                  className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2"
                  target={artist.href.startsWith("http") ? "_blank" : undefined}
                  rel={
                    artist.href.startsWith("http")
                      ? "noopener noreferrer"
                      : undefined
                  }
                >
                  {card}
                </Link>
              ) : (
                card
              )}
            </li>
          );
        })}
      </ul>
    </div>
  </section>
);
