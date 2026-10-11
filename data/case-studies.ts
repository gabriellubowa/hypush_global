// Case study gallery. Drop new shots in /public/case-studies/
// and add an entry here — the page picks them up automatically.

export interface ICaseStudyItem {
  id: string;
  name: string;
  /** Short label shown in the lightbox (Artist, Brand, Campaign…). */
  kind: string;
  imageSrc: string;
  alt: string;
}

export const CASE_STUDIES: ReadonlyArray<ICaseStudyItem> = [
  {
    id: "jose-chameleone",
    name: "Jose Chameleone",
    kind: "Artist",
    imageSrc: "/talents/jose-chameleone.jpg",
    alt: "Jose Chameleone",
  },
  {
    id: "pallaso",
    name: "Pallaso",
    kind: "Artist",
    imageSrc: "/talents/pallaso.jpg",
    alt: "Pallaso",
  },
  {
    id: "dax-vibes",
    name: "Dax Vibes",
    kind: "Artist",
    imageSrc: "/talents/dax-vibes.jpg",
    alt: "Dax Vibes",
  },
  {
    id: "topboy-mc",
    name: "TopBoy MC",
    kind: "MC",
    imageSrc: "/talents/topboy-mc.jpg",
    alt: "TopBoy MC",
  },
  {
    id: "sqoop-larma",
    name: "Sqoop Larma",
    kind: "Artist",
    imageSrc: "/talents/sqoop-larma.jpg",
    alt: "Sqoop Larma",
  },
  {
    id: "hash-beats",
    name: "Hash Beats",
    kind: "Artist",
    imageSrc: "/talents/hash-beats.jpg",
    alt: "Hash Beats",
  },
  {
    id: "weasel-manizo",
    name: "Weasel Manizo",
    kind: "Artist",
    imageSrc: "/talents/weasel-manizo.jpg",
    alt: "Weasel Manizo",
  },
  {
    id: "van-data",
    name: "Van Data",
    kind: "Artist",
    imageSrc: "/talents/van-data.jpg",
    alt: "Van Data",
  },
  {
    id: "mikey-seems-2-funny",
    name: "Mikey Seems 2 Funny",
    kind: "Creator",
    imageSrc: "/talents/mikey-seems-2-funny.jpg",
    alt: "Mikey Seems 2 Funny",
  },
  {
    id: "emperor-orlandoh",
    name: "Emperor Orlandoh",
    kind: "Artist",
    imageSrc: "/talents/emperor-orlandoh.jpg",
    alt: "Emperor Orlandoh",
  },
];
