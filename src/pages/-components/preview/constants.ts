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
  description: "다양한 IT 네트워킹을, 여기 UMC에서 경험하세요.",
  tabListLabel: "UMC 활동",
} as const

// 시안에는 첫 번째 탭의 이미지와 설명만 있다. 나머지 탭의 사진은 src/assets/landing/preview/에, 설명 문구는 이 파일에 직접 둔다
export const PREVIEW_TABS: readonly PreviewTab[] = [
  {
    id: "school-ot",
    label: "학교 OT · 연합 OT",
    image: { src: schoolOt, alt: "학교 OT에서 발표를 듣는 챌린저들" },
    description:
      "UMC의 첫걸음을 내딛는 챌린저들을 위해 각 학교 및 중앙운영사무국이 주최하는 자리로 UMC의 전반적인 소개는 물론, 우리만의 독특한 문화, 앞으로 도전해야 할 목표와 커리큘럼, 그리고 스터디가 어떻게 진행될지에 대한 모든 것을 공유",
  },
  {
    id: "core-day",
    label: "Core Day",
    image: {
      src: coreDay,
      alt: "Core Day 행사장에서 테이블마다 모여 이야기하는 운영진",
    },
    description:
      "운영진들의 결속력을 다지고, 친목을 쌓는 시간으로 각 지부별 행사 준비에 앞서 운영진들끼리 교류할 수 있는 기회를 제공하며, 원활한 의사소통을 위한 장을 갖는 자리",
  },
  {
    id: "networking-day",
    label: "연합 네트워킹 데이",
    image: { src: networkingDay, alt: "연합 네트워킹 데이 단체 사진" },
    description:
      "UMC에 속한 대학의 모든 부원들이 한자리에 모이는 대규모 행사로 현직 부원부터 OB까지 모두가 모여, 다양한 경험과 지식을 나누고 친목을 다지는 자리",
  },
  {
    id: "nerdinary-hackathon",
    label: "너디너리 해커톤",
    image: {
      src: nerdinaryHackathon,
      alt: "너디너리 해커톤 행사장에서 테이블에 모여 노트북으로 작업하는 참가자들",
    },
    description:
      "UMC와 CMC가 함께하는 대규모 해커톤으로 기획부터 개발까지 전 과정을 경험하며 실력을 겨루는 자리죠. 각기 다른 학교와 다양한 파트에서 활동하는 참가자들이 한데 모여 협력하고 아이디어를 현실로 만들어가는 과정",
  },
  {
    id: "umc-hackathon",
    label: "UMC 해커톤",
    image: {
      src: umcHackathon,
      alt: "UMC 해커톤에서 노트북을 펴 놓고 팀 작업을 하는 챌린저들",
    },
    description:
      "UMC 부원들만을 대상으로 한 해커톤으로, UMC 안에서의 내부 결속과 협력을 다지는 중요한 기회로 UMC의 챌린저들이 함께 혁신적인 아이디어를 내고, 단기간 내에 실용적인 결과물을 만들어내는 과정",
  },
  {
    id: "demo-day",
    label: "DEMO Day",
    image: { src: demoDay, alt: "DEMO Day에 모인 챌린저들" },
    description:
      "8주간의 프로젝트 기간을 통해 갈고닦은 실력을 세상에 선보이는 자리로 단순한 발표가 아닌, 실제 사용자를 고려한 완성도 있는 결과물을 선보이는 무대",
  },
  {
    id: "fs-day",
    label: "FS Day",
    image: {
      src: fsDay,
      alt: "FS Day 행사장에서 테이블마다 모여 노트북으로 집중 개발하는 챌린저들",
    },
    description:
      "FS Day는 다양한 학교와 기수의 UMC 부원들이 모여 아이디어를 공유하고, 팀별로 집중 개발에 몰입하는 행사로 실질적인 협업 경험을 쌓으며, 각 팀의 아이디어를 구체화하고 실행 가능한 결과물로 구현 및 개발한 결과물을 공유하며 다양한 피드백을 교환하고, 새로운 협업 기회를 발견할 수 있는 뜻깊은 시간을 가짐",
  },
  {
    id: "central-mt",
    label: "중앙 MT",
    image: {
      src: centralMt,
      alt: "UMC 8th 중앙 MT 현수막 앞에서 브이를 하며 단체 사진을 찍은 챌린저들",
    },
    description:
      "전체 UMC 챌린저들이 한자리에 모이는 특별한 경험으로 UMC 중앙 MT는 다양한 학교의 크루들과 함께하는 교류, 협업, 성장의 장. 미니게임부터 다양한 친목 활동까지, 단순한 MT를 넘어 UMC의 문화를 온몸으로 느낄 수 있는 시간 제공",
  },
]
