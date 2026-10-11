// Talent roster — photos sourced from https://hypush.co/talents/

export interface ITalent {
  slug: string;
  name: string;
  imageSrc: string;
}

export const TALENTS: ReadonlyArray<ITalent> = [
  {
    slug: "jose-chameleone",
    name: "Jose Chameleone",
    imageSrc: "/talents/jose-chameleone.jpg",
  },
  {
    slug: "pallaso",
    name: "Pallaso",
    imageSrc: "/talents/pallaso.jpg",
  },
  {
    slug: "mikey-seems-2-funny",
    name: "Mikey Seems 2 Funny",
    imageSrc: "/talents/mikey-seems-2-funny.jpg",
  },
  {
    slug: "hash-beats",
    name: "Hash Beats",
    imageSrc: "/talents/hash-beats.jpg",
  },
  {
    slug: "van-data",
    name: "Van Data",
    imageSrc: "/talents/van-data.jpg",
  },
  {
    slug: "weasel-manizo",
    name: "Weasel Manizo",
    imageSrc: "/talents/weasel-manizo.jpg",
  },
  {
    slug: "dax-vibes",
    name: "Dax Vibes",
    imageSrc: "/talents/dax-vibes.jpg",
  },
  {
    slug: "emperor-orlandoh",
    name: "Emperor Orlandoh",
    imageSrc: "/talents/emperor-orlandoh.jpg",
  },
  {
    slug: "topboy-mc",
    name: "TopBoy MC",
    imageSrc: "/talents/topboy-mc.jpg",
  },
  {
    slug: "sqoop-larma",
    name: "Sqoop Larma",
    imageSrc: "/talents/sqoop-larma.jpg",
  },
];
