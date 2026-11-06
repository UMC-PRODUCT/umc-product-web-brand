import anyang from "@/assets/landing/universities/anyang.webp"
import catholic from "@/assets/landing/universities/catholic.webp"
import chungang from "@/assets/landing/universities/chungang.webp"
import dankook from "@/assets/landing/universities/dankook.webp"
import dongduk from "@/assets/landing/universities/dongduk.webp"
import dongguk from "@/assets/landing/universities/dongguk.webp"
import dongyang from "@/assets/landing/universities/dongyang.webp"
import duksung from "@/assets/landing/universities/duksung.webp"
import ewha from "@/assets/landing/universities/ewha.webp"
import gachon from "@/assets/landing/universities/gachon.webp"
import hansung from "@/assets/landing/universities/hansung.webp"
import hanyangErica from "@/assets/landing/universities/hanyang-erica.webp"
import hongik from "@/assets/landing/universities/hongik.webp"
import hufs from "@/assets/landing/universities/hufs.webp"
import inha from "@/assets/landing/universities/inha.webp"
import kau from "@/assets/landing/universities/kau.webp"
import sejong from "@/assets/landing/universities/sejong.webp"
import seokyeong from "@/assets/landing/universities/seokyeong.webp"
import seoulWomens from "@/assets/landing/universities/seoul-womens.webp"
import sookmyung from "@/assets/landing/universities/sookmyung.webp"
import soongsil from "@/assets/landing/universities/soongsil.webp"
import sungshin from "@/assets/landing/universities/sungshin.webp"

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

const HONGIK_FRAME: LogoFrame = {
  left: 1.41,
  top: 1.01,
  width: 97.5,
  height: 97.5,
}

// 11기 5개 지부 23개 학교. Figma "UMC 학교 목록" 순서(지부별)를 따른다
const SCHOOLS: School[] = [
  // 캥거루
  {
    name: "가천대학교",
    logo: gachon,
    frame: { left: -2.17, top: -2.02, width: 106.41, height: 105.05 },
  },
  {
    name: "서울여자대학교",
    logo: seoulWomens,
    frame: { left: -4.12, top: -5.34, width: 108.52, height: 108.52 },
  },
  {
    name: "한국항공대학교",
    logo: kau,
    frame: { left: -2.86, top: -3.04, width: 105, height: 105 },
  },
  {
    name: "한성대학교",
    logo: hansung,
    frame: { left: 9.66, top: 17.88, width: 80, height: 66.08 },
  },
  // 아홀로틀
  {
    name: "가톨릭대학교",
    logo: catholic,
    frame: { left: 9.45, top: 19.35, width: 80.87, height: 60 },
  },
  {
    name: "덕성여자대학교",
    logo: duksung,
    frame: { left: 4.54, top: 4.76, width: 90, height: 90 },
  },
  {
    name: "세종대학교",
    logo: sejong,
    frame: { left: -45.67, top: -17.17, width: 186.8, height: 132.09 },
  },
  { name: "안양대학교", logo: anyang },
  { name: "홍익대학교 서울캠퍼스", logo: hongik, frame: HONGIK_FRAME },
  // 티라노
  {
    name: "단국대학교",
    logo: dankook,
    frame: { left: 2.98, top: 14.57, width: 93.73, height: 70.93 },
  },
  { name: "동국대학교", logo: dongguk },
  { name: "동덕여자대학교", logo: dongduk },
  {
    name: "서경대학교",
    logo: seokyeong,
    frame: { left: 7.06, top: 12.9, width: 76.72, height: 72.68 },
  },
  { name: "홍익대학교 세종캠퍼스", logo: hongik, frame: HONGIK_FRAME },
  // 쿼카
  {
    name: "동양미래대학교",
    logo: dongyang,
    frame: { left: 3.84, top: 3.63, width: 92.5, height: 94.18 },
  },
  {
    name: "숭실대학교",
    logo: soongsil,
    frame: { left: 2.01, top: 2.95, width: 95.34, height: 94.7 },
  },
  { name: "이화여자대학교", logo: ewha },
  { name: "인하대학교", logo: inha },
  {
    name: "한양대 ERICA",
    logo: hanyangErica,
    frame: { left: -24.81, top: -27.41, width: 152.23, height: 152.23 },
  },
  // 수달
  {
    name: "성신여자대학교",
    logo: sungshin,
    frame: { left: 5.21, top: 3.64, width: 90, height: 92.33 },
  },
  { name: "숙명여자대학교", logo: sookmyung },
  {
    name: "중앙대학교",
    logo: chungang,
    frame: { left: 7.43, top: 9.59, width: 85.42, height: 80.14 },
  },
  { name: "한국외국어대학교", logo: hufs },
]

// 지부가 한 줄에 몰리지 않도록 번갈아 두 줄로 나눈다
export const SCHOOL_ROWS: School[][] = [
  SCHOOLS.filter((_, index) => index % 2 === 0),
  SCHOOLS.filter((_, index) => index % 2 === 1),
]
