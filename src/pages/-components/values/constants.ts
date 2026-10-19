import {
  CheckPictogram,
  GoalPictogram,
  GraduationCapPictogram,
  UsersPictogram,
} from "@umc-product/icons"
import { type ComponentType } from "react"

import collaboration from "@/assets/landing/values/collaboration.webp"
import connection from "@/assets/landing/values/connection.webp"
import growth from "@/assets/landing/values/growth.webp"
import guidance from "@/assets/landing/values/guidance.webp"

export interface ValueItem {
  id: "growth" | "collaboration" | "connection" | "guidance"
  title: string
  subtitle: string
  image: string
  Icon: ComponentType<{ size?: number | string; color?: string }>
  description: readonly string[]
}

export const VALUES_TITLE =
  "함께한 경험이 새로운 가능성이 되도록, UMC는 다릅니다."

export const VALUES: readonly ValueItem[] = [
  {
    id: "growth",
    title: "성장",
    subtitle: "Growth",
    image: growth,
    Icon: GraduationCapPictogram,
    description: [
      "실제 서비스를 기획하고 개발하며,\n실무에 가까운 경험을\n쌓을 수 있어요.",
      "스터디를 통해 기본기를 다진 뒤,\n누구나 개발에 도전할 수 있어요.",
    ],
  },
  {
    id: "collaboration",
    title: "협업",
    subtitle: "Collaboration",
    image: collaboration,
    Icon: UsersPictogram,
    description: [
      "파트에 관계없이\n아이디어를 제안하고,\n직접 실현해 볼 수 있어요.",
      "수평적인 문화 속에서\n자유롭게 의견을 나누며\n함께 일하는 방법을 배워요.",
    ],
  },
  {
    id: "connection",
    title: "연결",
    subtitle: "Connection",
    image: connection,
    Icon: CheckPictogram,
    description: [
      "같은 목표를 향해\n치열하게 고민하고\n완성해 가는 과정을 함께해요.",
      "프로젝트 그 이상의 끈끈한\n유대감을 형성해요.",
    ],
  },
  {
    id: "guidance",
    title: "길잡이",
    subtitle: "Guidance",
    image: guidance,
    Icon: GoalPictogram,
    description: [
      "다양한 파트와 활동을 경험하며\n나만의 가능성을\n여러 갈래로 넓혀갈 수 있어요.",
      "챌린저와 운영진이\n서로 아는 것을 나누며\n함께 길을 찾아가요.",
    ],
  },
]
