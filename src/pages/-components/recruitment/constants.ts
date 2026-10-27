import { type FeatureCardField } from "./FeatureCard"

export const RECRUITMENT_COPY = {
  title: "UMC 11기 모집 분야",
  description:
    "하나의 프로덕트를 완성하는 4가지 핵심 분야.\n당신의 역량을 가장 명확하게 보여줄 파트에 지원하세요!",
  cta: "모집 안내 보러가기",
} as const

// TODO: 리크루팅 페이지가 만들어지면 주소를 넣는다. null이면 버튼을 비활성으로 둔다
export const RECRUITMENT_PAGE_URL: string | null = null

export interface RecruitmentField {
  field: FeatureCardField
  title: string
  description: string
}

export const RECRUITMENT_FIELDS: readonly RecruitmentField[] = [
  {
    field: "pm",
    title: "PM",
    description:
      "사용자의 문제를 발견하고 해결할 문제를 정의해요. 아이디어를 구체화하고, 기획부터 출시까지 제품이 완성되는 전 과정을 이끌어요.",
  },
  {
    field: "design",
    title: "Design",
    description:
      "사용자가 더 쉽고 편리하게 사용할 수 있는 경험을 설계해요. 직관적인 UX와 완성도 높은 UI로 아이디어를 실제 제품 경험으로 만들어가요.",
  },
  {
    field: "web",
    title: "Web\nProduct Engineer",
    description:
      "서비스를 실제로 동작하는 웹 제품으로 구현해요. Frontend와 Backend를 아우르며 화면 구현부터 API, 데이터베이스, 인증, 배포까지 제품 개발의 전 과정을 경험해요.",
  },
  {
    field: "mobile",
    title: "Mobile\nProduct Engineer",
    description:
      "서비스를 사용자가 직접 이용하는 모바일 앱으로 구현해요. 화면 구현부터 기능 개발, 서버 연동, 데이터 처리, 배포까지 모바일 제품 개발의 전 과정을 경험해요.",
  },
]
