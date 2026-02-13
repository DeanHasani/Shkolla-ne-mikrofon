
export interface Video {
  id: string
  title: string
  description: string
  duration: string
  durationSeconds: number
  url: string
  thumbnail: string
  order: number
  series?: {
    name: string
    part: number
    totalParts: number
  }
}

export const videos: Video[] = [
  {
    id: "njihuni-me-ne",
    title: "Njihuni me ne",
    description:
      "Hyrja e podcastit: Njihuni me ne",
    duration: "0:41",
    durationSeconds: 41,
    url: "https://pub-e8fcef5b0e6f4cd7bd1c7f53702aa5c2.r2.dev/Njihuni%20me%20ne.mp4",
    thumbnail: "/thumbnails/njmnthumbnail.jpg",
    order: 1,
    series: {
      name: "Podcast Shkolla në Mikrofon",
      part: 1,
      totalParts: 5,
    },
  },
  {
    id: "interviste",
    title: "Intervistë me profesor Latif Çoçolin",
    description:
      "Një mësues ndikon përjetë; asnjëherë nuk e di se ku ndalet ndikimi i tij. Fjalët e profesor Latifit janë për ne, për ju, për të gjithë ata që besojnë në fuqinë e arsimit Në 6 pyetje, si vetëm ai di të përgjigjet. Na ndiqni!",
    duration: "23:50",
    durationSeconds: 1430,
    url: "https://pub-e8fcef5b0e6f4cd7bd1c7f53702aa5c2.r2.dev/INTERVISTA%20ME%20PROFESOR%20LATIF%20COCOLIN.mp4",
    thumbnail: "/thumbnails/intvthumbnail.jpg",
    order: 2,
    series: {
      name: "Podcast Shkolla në Mikrofon",
      part: 2,
      totalParts: 5,
    },
  },
  {
    id: "perfeksionizmi",
    title: "Perfeksionizmi",
    description:
      "Ky podcast flet për perfeksionizmin dhe presionin për të qenë gjithmonë perfektë. Ne tregojmë pse guximi për të qenë vetvetja është më i fortë se çdo përsosmëri.",
    duration: "5:23",
    durationSeconds: 323,
    url: "https://pub-e8fcef5b0e6f4cd7bd1c7f53702aa5c2.r2.dev/Perfeksionizmi.mp4",
    thumbnail: "/thumbnails/pfkthumbnail.jpg",
    order: 3,
    series: {
      name: "Podcast Shkolla në Mikrofon",
      part: 3,
      totalParts: 5,
    },
  },
  {
    id: "gjysherit",
    title: "Gjyshërit",
    description:
      "Është një rrëfim ku gjithsecili do të gjejë veten, mes kujtimeve, dashurisë dhe mësimeve që na kanë lënë gjyshërit.",
    duration: "8:22",
    durationSeconds: 502,
    url: "https://pub-e8fcef5b0e6f4cd7bd1c7f53702aa5c2.r2.dev/Gjysherit.mp4",
    thumbnail: "/thumbnails/gjshthumbnail.jpg",
    order: 4,
    series: {
      name: "Podcast Shkolla në Mikrofon",
      part: 4,
      totalParts: 5,
    },
  },
  {
    id: "festojme-se-bashku",
    title: "Festojmë së bashku",
    description:
      "Festojmë së bashku me nxënësit e fillores festat e fundvitit, me gëzim, buzëqeshje dhe atmosferë të ngrohtë festive. Na ndiqni në dy episode magjepsëse me fëmijët e ciklit fillor!",
    duration: "14:37",
    durationSeconds: 877,
    url: "https://pub-e8fcef5b0e6f4cd7bd1c7f53702aa5c2.r2.dev/Festojme%20se%20bashku.mp4",
    thumbnail: "/thumbnails/fsbthumbnail.jpg",
    order: 5,
    series: {
      name: "Podcast Shkolla në Mikrofon",
      part: 5,
      totalParts: 5,
    },
  },

]

export function getVideoById(id: string): Video | undefined {
  return videos.find((v) => v.id === id)
}

export function getSeriesVideos(seriesName: string): Video[] {
  return videos
    .filter((v) => v.series?.name === seriesName)
    .sort((a, b) => a.order - b.order)
}
