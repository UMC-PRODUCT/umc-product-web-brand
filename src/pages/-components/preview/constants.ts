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
      "UMC의 첫걸음을 시작하는 챌린저들을 위한 자리예요. UMC의 문화와 활동 방향부터 커리큘럼, 스터디 진행 방식까지 앞으로의 활동에 필요한 내용을 함께 알아가요.",
  },
  {
    id: "core-day",
    label: "Core Day",
    image: {
      src: coreDay,
      alt: "Core Day 행사장에서 테이블마다 모여 이야기하는 운영진",
    },
    description:
      "운영진들이 한자리에 모여 서로 교류하고 결속을 다지는 시간이에요. 각 지부의 행사를 준비하기에 앞서 자유롭게 소통하며, 함께 활동할 운영진들과 가까워지는 기회를 만들어요.",
  },
  {
    id: "networking-day",
    label: "연합 네트워킹 데이",
    image: { src: networkingDay, alt: "연합 네트워킹 데이 단체 사진" },
    description:
      "UMC의 다양한 학교와 기수의 부원들이 한자리에 모이는 네트워킹 행사예요. 현직 부원부터 OB까지 서로의 경험과 이야기를 나누며 새로운 사람들과 관계를 만들어가요.",
  },
  {
    id: "nerdinary-hackathon",
    label: "너디너리 해커톤",
    image: {
      src: nerdinaryHackathon,
      alt: "너디너리 해커톤 행사장에서 테이블에 모여 노트북으로 작업하는 참가자들",
    },
    description:
      "UMC와 CMC가 함께하는 대규모 해커톤이에요. 서로 다른 학교와 파트의 참가자들이 팀을 이루어 아이디어를 구체화하고, 기획부터 개발까지 하나의 서비스를 완성해요.",
  },
  {
    id: "umc-hackathon",
    label: "UMC 해커톤",
    image: {
      src: umcHackathon,
      alt: "UMC 해커톤에서 노트북을 펴 놓고 팀 작업을 하는 챌린저들",
    },
    description:
      "UMC 부원들이 함께하는 해커톤이에요. 짧은 시간 동안 아이디어를 구체화하고 팀원들과 협업하며, 직접 결과물을 만들어보는 경험을 할 수 있어요",
  },
  {
    id: "demo-day",
    label: "DEMO Day",
    image: { src: demoDay, alt: "DEMO Day에 모인 챌린저들" },
    description:
      "8주간 함께 만든 프로젝트를 선보이는 자리예요. 기획부터 디자인, 개발까지 완성한 서비스를 직접 공유하고, 다른 팀의 프로젝트를 만나며 서로의 경험과 결과를 돌아봐요.",
  },
  {
    id: "fs-day",
    label: "FS Day",
    image: {
      src: fsDay,
      alt: "FS Day 행사장에서 테이블마다 모여 노트북으로 집중 개발하는 챌린저들",
    },
    description:
      "다양한 학교와 기수의 UMC 부원들이 모여 아이디어를 공유하고 프로젝트에 집중하는 날이에요. 팀별로 아이디어를 빠르게 구체화하고 결과물을 만들어보며, 서로의 작업을 공유하고 피드백을 나눠요.",
  },
  {
    id: "central-mt",
    label: "중앙 MT",
    image: {
      src: centralMt,
      alt: "UMC 8th 중앙 MT 현수막 앞에서 브이를 하며 단체 사진을 찍은 챌린저들",
    },
    description:
      "UMC의 다양한 학교와 크루가 함께 모여 교류하는 자리예요. 미니게임과 친목 활동을 통해 서로 가까워지고, 학교와 지부를 넘어 UMC의 다양한 사람들과 함께하는 시간을 가져요.",
  },
]
