import comgongSunbae from "@/assets/landing/sponsors/comgong-sunbae.webp"
import daval from "@/assets/landing/sponsors/daval.webp"
import gridge from "@/assets/landing/sponsors/gridge.webp"
import jober from "@/assets/landing/sponsors/jober.webp"
import neordinary from "@/assets/landing/sponsors/neordinary.webp"
import softSquared from "@/assets/landing/sponsors/soft-squared.webp"
import vieworks from "@/assets/landing/sponsors/vieworks.webp"

export interface Sponsor {
  id: string
  name: string
  logo: string
  width: number
  height: number
  slotWidth: number
}

export const SPONSORS_COPY = {
  title: "후원사",
  description:
    "UMC의 성장을 함께 만들어주시는 후원사와 함께 더 많은 배움과 도전의 기회를 이어가고 있습니다.",
} as const

export const SPONSORS: readonly Sponsor[] = [
  {
    id: "gridge",
    name: "그릿지",
    logo: gridge,
    width: 193,
    height: 65,
    slotWidth: 193,
  },
  {
    id: "soft-squared",
    name: "소프트스퀘어드",
    logo: softSquared,
    width: 222,
    height: 86,
    slotWidth: 222,
  },
  {
    id: "comgong-sunbae",
    name: "컴공선배",
    logo: comgongSunbae,
    width: 110,
    height: 110,
    slotWidth: 122,
  },
  {
    id: "neordinary",
    name: "너디너리",
    logo: neordinary,
    width: 223,
    height: 82,
    slotWidth: 235,
  },
  {
    id: "daval",
    name: "daval.ai",
    logo: daval,
    width: 172,
    height: 132,
    slotWidth: 172,
  },
  {
    id: "jober",
    name: "jober",
    logo: jober,
    width: 177,
    height: 68,
    slotWidth: 177,
  },
  {
    id: "vieworks",
    name: "vieworks",
    logo: vieworks,
    width: 225,
    height: 63,
    slotWidth: 225,
  },
]
