import centralMt from "@/assets/landing/preview/central-mt.webp"
import coreDay from "@/assets/landing/preview/core-day.webp"
import demoDay from "@/assets/landing/preview/demo-day.webp"
import fsDay from "@/assets/landing/preview/fs-day.webp"
import nerdinaryHackathon from "@/assets/landing/preview/nerdinary-hackathon.webp"
import networkingDay from "@/assets/landing/preview/networking-day.webp"
import schoolOt from "@/assets/landing/preview/school-ot.webp"
import umcHackathon from "@/assets/landing/preview/umc-hackathon.webp"

export interface PreviewTab {
  id: string
  label: string
  image?: { src: string; alt: string }
  description?: string
}

export const PREVIEW_COPY = {
  title: "UMC Preview",
  description:
    "새로운 만남부터 특별한 도전까지, UMC에서는 모두 경험할 수 있어요.",
  tabListLabel: "UMC 활동",
} as const

// 시안에는 첫 번째 탭의 이미지와 설명만 있다. 첫 탭 설명은 1440 시안 문구를 따른다(1440 미만 프레임은 이전 문구). 나머지 탭의 사진은 src/assets/landing/preview/에, 설명 문구는 이 파일에 직접 둔다
export const PREVIEW_TABS: readonly PreviewTab[] = [
  {
    id: "school-ot",
    label: "학교 OT · 연합 OT",
    image: { src: schoolOt, alt: "학교 OT에서 발표를 듣는 챌린저들" },
    description:
      "UMC의 첫걸음을 내딛는 챌린저들을 위해 각 학교와 중앙운영사무국에서 오리엔테이션을 진행해요. UMC만의 문화와 활동 목표, 커리큘럼부터 앞으로 진행될 스터디까지, 새로운 도전을 시작하기 위해 필요한 모든 것을 알아보는 시간이에요.",
  },
  {
    id: "core-day",
    label: "Core Day",
    image: {
      src: coreDay,
      alt: "Core Day 행사장에서 테이블마다 모여 이야기하는 운영진",
    },
    description:
      "운영진들의 결속력을 다지고 친목을 쌓는 시간이에요. 각 지부별 행사 준비에 앞서 운영진끼리 교류하며, 원활하게 소통할 수 있는 자리를 만들어요.",
  },
  {
    id: "networking-day",
    label: "연합 네트워킹 데이",
    image: { src: networkingDay, alt: "연합 네트워킹 데이 단체 사진" },
    description:
      "UMC에 속한 모든 대학의 부원들이 한자리에 모이는 대규모 행사예요. 현직 부원부터 OB까지 모두 모여 다양한 경험과 지식을 나누고 친목을 다져요.",
  },
  {
    id: "nerdinary-hackathon",
    label: "너디너리 해커톤",
    image: {
      src: nerdinaryHackathon,
      alt: "너디너리 해커톤 행사장에서 테이블에 모여 노트북으로 작업하는 참가자들",
    },
    description:
      "UMC와 CMC가 함께하는 대규모 해커톤으로, 기획부터 개발까지 전 과정을 경험하며 실력을 겨루는 자리예요. 각기 다른 학교와 파트에서 활동하는 참가자들이 한데 모여 협력하고, 아이디어를 현실로 만들어 가요.",
  },
  {
    id: "umc-hackathon",
    label: "UMC 해커톤",
    image: {
      src: umcHackathon,
      alt: "UMC 해커톤에서 노트북을 펴 놓고 팀 작업을 하는 챌린저들",
    },
    description:
      "UMC 부원들만을 대상으로 한 해커톤으로, UMC 안에서 결속과 협력을 다지는 중요한 기회예요. 챌린저들이 함께 혁신적인 아이디어를 내고, 짧은 기간 안에 실용적인 결과물을 만들어 내요.",
  },
  {
    id: "demo-day",
    label: "DEMO Day",
    image: { src: demoDay, alt: "DEMO Day에 모인 챌린저들" },
    description:
      "8주간의 프로젝트 기간 동안 갈고닦은 실력을 세상에 선보이는 자리예요. 단순한 발표가 아니라, 실제 사용자를 고려한 완성도 있는 결과물을 선보이는 무대예요.",
  },
  {
    id: "fs-day",
    label: "FS Day",
    image: {
      src: fsDay,
      alt: "FS Day 행사장에서 테이블마다 모여 노트북으로 집중 개발하는 챌린저들",
    },
    description:
      "FS Day는 다양한 학교와 기수의 UMC 부원들이 모여 아이디어를 공유하고, 팀별로 집중 개발에 몰입하는 행사예요. 각 팀의 아이디어를 실행 가능한 결과물로 구현해 공유하고, 피드백을 주고받으며 새로운 협업 기회를 발견하는 뜻깊은 시간이에요.",
  },
  {
    id: "central-mt",
    label: "중앙 MT",
    image: {
      src: centralMt,
      alt: "UMC 8th 중앙 MT 현수막 앞에서 브이를 하며 단체 사진을 찍은 챌린저들",
    },
    description:
      "전체 UMC 챌린저들이 한자리에 모이는 특별한 시간이에요. 다양한 학교의 크루들과 교류하고 협업하며 함께 성장해요. 미니게임부터 다양한 친목 활동까지, 단순한 MT를 넘어 UMC의 문화를 온몸으로 느낄 수 있어요.",
  },
]
