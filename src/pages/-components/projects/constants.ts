import boogle from "@/assets/landing/projects/boogle.webp"
import bookshelves from "@/assets/landing/projects/bookshelves.webp"
import brifo from "@/assets/landing/projects/brifo.webp"
import muffin from "@/assets/landing/projects/muffin.webp"
import museReview from "@/assets/landing/projects/muse-review.webp"
import popit from "@/assets/landing/projects/popit.webp"
import slateTo from "@/assets/landing/projects/slate-to.webp"
import teaching from "@/assets/landing/projects/teaching.webp"

export const PROJECTS_COPY = {
  title: "UMC 챌린저들의 프로젝트 목록 둘러보기",
  description: "치열하게 고민하고 만들어 낸 데모데이 수상작들을 만나보세요.",
  cta: "챌린저들 프로젝트 구경하기",
} as const

export interface Project {
  name: string
  description: string
  parts: readonly string[]
  award: string
  thumbnail: string
}

const SPRING_PARTS = ["Plan", "Design", "Web", "SpringBoot"] as const

// 10기 데모데이 수상작. 소개는 각 프로젝트 랜딩페이지 첫 화면의 문구다
export const PROJECTS: readonly Project[] = [
  {
    name: "POP-IT",
    description: "빈 공간을 빛나는 기회로",
    parts: SPRING_PARTS,
    award: "대상",
    thumbnail: popit,
  },
  {
    name: "Muffin",
    description: "주린이들을 위한 매일 가볍게 즐기는 경제 학습 서비스",
    parts: SPRING_PARTS,
    award: "대상",
    thumbnail: muffin,
  },
  {
    name: "TeachING",
    description: "흩어진 정보를 연결해 나만의 지식으로 만드는 AI 학습 서비스",
    parts: SPRING_PARTS,
    award: "최우수상",
    thumbnail: teaching,
  },
  {
    name: "Boogle",
    description: "매일의 장 신호, 부글이 기록해요",
    parts: ["Plan", "Design", "Web", "Nest"],
    award: "최우수상",
    thumbnail: boogle,
  },
  {
    name: "BRIFO",
    description: "게이미피케이션 기반 AI 투자 교육 플랫폼",
    parts: SPRING_PARTS,
    award: "우수상",
    thumbnail: brifo,
  },
  {
    name: "책장사이",
    description: "한 권의 책으로 이어지는 대화와 기록",
    parts: SPRING_PARTS,
    award: "우수상",
    thumbnail: bookshelves,
  },
  {
    name: "SLATE-TO",
    description: "영상 제작자들을 위한 All In One 협업 플랫폼",
    parts: SPRING_PARTS,
    award: "우수상",
    thumbnail: slateTo,
  },
  {
    name: "MuseReview",
    description: "흘러간 영감을 다시 듣다",
    parts: SPRING_PARTS,
    award: "우수상",
    thumbnail: museReview,
  },
]
