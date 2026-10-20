import anyang from "@/assets/landing/universities/anyang.webp"
import dankook from "@/assets/landing/universities/dankook.webp"
import duksung from "@/assets/landing/universities/duksung.webp"
import ewha from "@/assets/landing/universities/ewha.webp"
import gachon from "@/assets/landing/universities/gachon.webp"
import hansung from "@/assets/landing/universities/hansung.webp"
import hanyangErica from "@/assets/landing/universities/hanyang-erica.webp"
import hongik from "@/assets/landing/universities/hongik.webp"
import hufs from "@/assets/landing/universities/hufs.webp"
import sejong from "@/assets/landing/universities/sejong.webp"
import seoulWomens from "@/assets/landing/universities/seoul-womens.webp"
import soongsil from "@/assets/landing/universities/soongsil.webp"

import { type LogoFrame } from "./SchoolTagChip"

export interface School {
  name: string
  logo: string
  // Figma 로고 이미지 채우기의 위치·크기(%). 없으면 원 전체를 채운다
  frame?: LogoFrame
}

export const UNIVERSITIES_COPY = {
  title: "UMC와 함께하는 학교",
  description: [
    "전국 20여 개 이상의 대학이 함께 하고 있습니다.",
    "지금 이 순간에도 지속적으로 확장되는 거대한 IT 네트워크를 경험하세요!",
  ],
}

export const SCHOOL_ROWS: School[][] = [
  [
    {
      name: "가천대학교",
      logo: gachon,
      frame: { left: -2.17, top: -2.02, width: 106.41, height: 105.05 },
    },
    {
      name: "홍익대학교 서울캠퍼스",
      logo: hongik,
      frame: { left: 1.41, top: 1.01, width: 97.5, height: 97.5 },
    },
    {
      name: "덕성여자대학교",
      logo: duksung,
      frame: { left: 4.54, top: 4.76, width: 90, height: 90 },
    },
    {
      name: "한양대 ERICA",
      logo: hanyangErica,
      frame: { left: -24.81, top: -27.41, width: 152.23, height: 152.23 },
    },
    { name: "안양대학교", logo: anyang },
    {
      name: "한성대학교",
      logo: hansung,
      frame: { left: 9.66, top: 17.88, width: 80, height: 66.08 },
    },
    {
      name: "서울여자대학교",
      logo: seoulWomens,
      frame: { left: -4.12, top: -5.34, width: 108.52, height: 108.52 },
    },
  ],
  [
    { name: "한국외국어대학교", logo: hufs },
    { name: "이화여자대학교", logo: ewha },
    {
      name: "한양대 ERICA",
      logo: hanyangErica,
      frame: { left: -24.81, top: -27.41, width: 152.23, height: 152.23 },
    },
    {
      name: "한성대학교",
      logo: hansung,
      frame: { left: 9.66, top: 17.88, width: 80, height: 66.08 },
    },
    {
      name: "세종대학교",
      logo: sejong,
      frame: { left: -45.67, top: -17.17, width: 186.8, height: 132.09 },
    },
    {
      name: "단국대학교",
      logo: dankook,
      frame: { left: 2.98, top: 14.57, width: 93.73, height: 70.93 },
    },
    {
      name: "숭실대학교",
      logo: soongsil,
      frame: { left: 2.01, top: 2.95, width: 95.34, height: 94.7 },
    },
  ],
]
