import { type OfficeGeneration } from "../-components/memberTypes"

export const OFFICE_COPY = {
  title: "중앙사무국",
  description: "더 나은 교육과 운영으로, 함께 성장하는 UMC를 만듭니다.",
  heroDescription: "UMC의 활동과 운영을 더 편리하게 만드는 제품팀이에요.",
}

export const OFFICE_GENERATIONS: readonly [
  OfficeGeneration,
  ...OfficeGeneration[],
] = [
  {
    id: 11,
    label: "11기",
    members: {
      푸짐바오: {
        nickname: "푸짐바오",
        name: "김가빈",
        email: "rlark456@gmail.com",
        school: "덕성여자대학교",
        photo: "547bbe164c4a",
      },
      웰시: {
        nickname: "웰시",
        name: "최지은",
        email: "chlwldmsee@gmail.com",
        school: "가천대학교",
        photo: "3164433bb20f",
      },
      유엘: {
        nickname: "유엘",
        name: "김예주",
        email: "kimyeju0830@gmail.com",
        school: "인천가톨릭대학교",
        photo: "235724450bba",
      },
      풍뎅이: {
        nickname: "풍뎅이",
        name: "최서준",
        email: "westing7759@gmail.com",
        school: "중앙대학교",
        photo: "e131803be6a3",
      },
      돌돌이: {
        nickname: "돌돌이",
        name: "이윤교",
        email: "gyo3065@gmail.com",
        school: "중앙대학교",
        photo: "0c2fa35fcea5",
      },
      디아: {
        nickname: "디아",
        name: "김정서",
        email: "jeongseo789@gmail.com",
        school: "가천대학교",
        photo: "6038ff67fa62",
      },
      루카: {
        nickname: "루카",
        name: "유정민",
        email: "ontonuert@gmail.com",
        school: "동양미래대학교",
        photo: "a1fa8724eb53",
      },
      클레버: {
        nickname: "클레버",
        name: "김영민",
        email: "kcleverp@gmail.com",
        school: "인하대학교",
        photo: "6d52f4995eb9",
      },
      나나: {
        nickname: "나나",
        name: "이예나",
        email: "iyena1575@gmail.com",
        school: "가천대학교",
        photo: "4609102793c5",
      },
      루비: {
        nickname: "루비",
        name: "허윤호",
        email: "imrubi5555@gmail.com",
        school: "서경대학교",
        photo: "cb3537b0b55e",
      },
      연두: {
        nickname: "연두",
        name: "신연주",
        email: "skishin04@gmail.com",
        school: "덕성여자대학교",
        photo: "18e0e78dd3d9",
      },
      동민: {
        nickname: "동민",
        name: "김동민",
        email: "kdm5672@gmail.com",
        school: "가톨릭대학교",
        photo: "8e82a8d769ac",
      },
      밍구: {
        nickname: "밍구",
        name: "구민정",
        email: "mj10050203@gmail.com",
        school: "중앙대학교",
        photo: "98f6adf9ef3d",
      },
      삼삼: {
        nickname: "삼삼",
        name: "허예슬",
        email: "xamxam3330@gmail.com",
        school: "숙명여자대학교",
        photo: "0e4f25c976d1",
      },
      챔닝: {
        nickname: "챔닝",
        name: "윤채민",
        email: "ilynyoun@gmail.com",
        school: "홍익대학교 세종",
        photo: "ecb7b4b73fa8",
      },
      하나: {
        nickname: "하나",
        name: "원인수",
        email: "woninsoo4@gmail.com",
        school: "성신여자대학교",
        photo: "7cbad48ef576",
      },
      빅토리: {
        nickname: "빅토리",
        name: "김승리",
        email: "seoungli0110@naver.com",
        school: "성신여자대학교",
        photo: "da8b4a5d4c38",
      },
      시안: {
        nickname: "시안",
        name: "우자영",
        email: "wjy5504@gmail.com",
        school: "한성대학교",
        photo: "b5fae9b412f0",
      },
      연동: {
        nickname: "연동",
        name: "임동연",
        email: "rchijy@naver.com",
        school: "숭실대학교",
        photo: "b77657e5989d",
      },
      노코: {
        nickname: "노코",
        name: "박수현",
        email: "comzun01@gmail.com",
        school: "명지대학교",
        photo: "2e21589c0751",
      },
      호시: {
        nickname: "호시",
        name: "이호현",
        email: "hamh1121@gmail.com",
        school: "서경대학교",
        photo: "184a7044c7b1",
      },
      마크: {
        nickname: "마크",
        name: "김주헌",
        email: "juheon0313@naver.com",
        school: "명지대학교",
        photo: "a3678e188cdf",
      },
    },
    bureaus: {
      operations: [
        {
          title: "총괄단",
          description:
            "11기의 비전과 운영 방향을 설계하고, 조직 전체를 하나의 목표로 연결하며 이끌어요.",
          entries: [
            {
              memberId: "푸짐바오",
              tags: [{ kind: "central", label: "총괄" }],
            },
            { memberId: "웰시", tags: [{ kind: "central", label: "부총괄" }] },
          ],
        },
        {
          title: "BX Designer",
          description:
            "UMC의 브랜드 경험을 디자인하고, 일관된 브랜드 이미지를 만들어가요.",
          entries: [{ memberId: "유엘" }],
        },
        {
          title: "Event PM",
          description:
            "다양한 행사와 이벤트를 기획하고, 특별한 경험을 만들어가요.",
          entries: [{ memberId: "풍뎅이" }, { memberId: "돌돌이" }],
        },
        {
          title: "Content Manager",
          description: "조직의 이야기와 활동을 매력적인 콘텐츠로 전달해요.",
          entries: [{ memberId: "디아" }, { memberId: "루카" }],
        },
        {
          title: "Community Manager",
          description:
            "멤버들이 자연스럽게 소통하고 연결될 수 있는 커뮤니티를 만들어가요.",
          entries: [{ memberId: "클레버" }],
        },
        {
          title: "Operation Manager",
          description:
            "조직의 일상적인 운영을 관리하고, 모든 활동이 원활하게 진행되도록 지원해요.",
          entries: [{ memberId: "나나" }],
        },
      ],
      education: [
        {
          title: "총괄단",
          description:
            "11기의 비전과 운영 방향을 설계하고, 조직 전체를 하나의 목표로 연결하며 이끌어요.",
          entries: [
            {
              memberId: "푸짐바오",
              tags: [{ kind: "central", label: "총괄" }],
            },
            { memberId: "웰시", tags: [{ kind: "central", label: "부총괄" }] },
          ],
        },
        {
          title: "교육국장",
          description:
            "교육국 전체를 총괄하며, 교육의 방향성과 품질을 관리해요.",
          entries: [{ memberId: "루비" }],
        },
        {
          title: "Plan 파트장",
          description:
            "논리적이고 설득력 있는 서비스 기획을 할 수 있도록 도와요.",
          entries: [
            { memberId: "연두" },
            { memberId: "동민" },
            { memberId: "밍구" },
          ],
        },
        {
          title: "Design 파트장",
          description:
            "사용자 중심의 디자인과 완성도 높은 결과물을 만들 수 있도록 도와요.",
          entries: [
            { memberId: "삼삼" },
            { memberId: "챔닝" },
            { memberId: "하나" },
            { memberId: "빅토리" },
            { memberId: "시안" },
          ],
        },
        {
          title: "Product Engineering 파트장",
          description:
            "개발 과정에서 마주하는 기술적 어려움을 해결하고, 더 나은 구현 방법을 찾을 수 있도록 도와요.",
          entries: [
            { memberId: "연동" },
            { memberId: "노코" },
            { memberId: "호시" },
            { memberId: "마크" },
          ],
        },
      ],
    },
  },
  {
    id: 10,
    label: "10기",
    members: {
      쳇쳇: { nickname: "쳇쳇", name: "전채운" },
      라엘: { nickname: "라엘", name: "라희수" },
      진저: { nickname: "진저", name: "주서윤" },
      노브: { nickname: "노브", name: "노하영" },
      웰시: { nickname: "웰시", name: "최지은" },
      이즈: { nickname: "이즈", name: "양인서" },
      페임: { nickname: "페임", name: "이지수" },
      디아: { nickname: "디아", name: "김정서" },
      루카: { nickname: "루카", name: "유정민" },
      우연: { nickname: "우연", name: "추연우" },
      도라: { nickname: "도라", name: "오경민" },
      모니: { nickname: "모니", name: "황무원" },
      유자니: { nickname: "유자니", name: "장유진" },
      진: { nickname: "진", name: "최수진" },
      지이: { nickname: "지이", name: "양윤영" },
      소피: { nickname: "소피", name: "이예지" },
      조나단: { nickname: "조나단", name: "조경석" },
      마크: { nickname: "마크", name: "김주헌" },
      재서: { nickname: "재서", name: "전하경" },
      호시: { nickname: "호시", name: "이호현" },
    },
    bureaus: {
      operations: [
        {
          title: "총괄단",
          description:
            "10기의 비전과 운영 방향을 설계하고, 조직 전체를 하나의 목표로 연결하며 이끌어요.",
          entries: [
            { memberId: "쳇쳇", tags: [{ kind: "central", label: "총괄" }] },
            { memberId: "라엘", tags: [{ kind: "central", label: "부총괄" }] },
          ],
        },
        {
          title: "BX Designer",
          description:
            "UMC의 브랜드 경험을 디자인하고, 일관된 브랜드 이미지를 만들어가요.",
          entries: [{ memberId: "진저" }],
        },
        {
          title: "Brand Marketer",
          description: "조직의 이야기와 활동을 매력적인 콘텐츠로 전달해요.",
          entries: [{ memberId: "노브" }],
        },
        {
          title: "Community Manager",
          description:
            "멤버들이 자연스럽게 소통하고 연결될 수 있는 커뮤니티를 만들어가요.",
          entries: [{ memberId: "웰시" }],
        },
        {
          title: "Event PM",
          description:
            "다양한 행사와 이벤트를 기획하고, 특별한 경험을 만들어가요.",
          entries: [{ memberId: "이즈" }, { memberId: "페임" }],
        },
        {
          title: "Finance Manager",
          description:
            "UMC의 예산을 체계적으로 관리하고, 활동에 필요한 재정을 계획하고 운영해요.",
          entries: [{ memberId: "디아" }, { memberId: "루카" }],
        },
        {
          title: "Operation Manager",
          description:
            "조직의 일상적인 운영을 관리하고, 모든 활동이 원활하게 진행되도록 지원해요.",
          entries: [{ memberId: "우연" }],
        },
      ],
      education: [
        {
          title: "총괄단",
          description:
            "10기의 비전과 운영 방향을 설계하고, 조직 전체를 하나의 목표로 연결하며 이끌어요.",
          entries: [
            { memberId: "쳇쳇", tags: [{ kind: "central", label: "총괄" }] },
            { memberId: "라엘", tags: [{ kind: "central", label: "부총괄" }] },
          ],
        },
        {
          title: "Plan 파트장",
          description:
            "논리적이고 설득력 있는 서비스 기획을 할 수 있도록 도와요.",
          entries: [{ memberId: "도라" }, { memberId: "모니" }],
        },
        {
          title: "Design 파트장",
          description:
            "사용자 중심의 디자인과 완성도 높은 결과물을 만들 수 있도록 도와요.",
          entries: [{ memberId: "유자니" }, { memberId: "진" }],
        },
        {
          title: "Web 파트장",
          description:
            "사용자에게 편리한 웹 서비스를 제공할 수 있도록 개발 방향을 이끌고, 안정적인 웹 환경을 구축해요.",
          entries: [{ memberId: "지이" }, { memberId: "진" }],
        },
        {
          title: "iOS 파트장",
          description:
            "iOS 앱 개발을 이끌며, 사용자 경험을 고려한 완성도 높은 모바일 서비스를 만들어가요.",
          entries: [{ memberId: "소피" }],
        },
        {
          title: "Android 파트장",
          description:
            "Android 앱 개발을 이끌며, 사용자가 편리하고 안정적으로 서비스를 이용할 수 있도록 지원해요.",
          entries: [{ memberId: "조나단" }],
        },
        {
          title: "Spring Boot 파트장",
          description:
            "Spring Boot 기반의 서버 개발을 이끌며, 안정적인 서비스 운영을 위한 백엔드 시스템을 구축해요.",
          entries: [{ memberId: "마크" }],
        },
        {
          title: "Node.js 파트장",
          description:
            "Node.js 기반의 서버 개발을 이끌며, 효율적인 데이터 처리와 원활한 서비스 운영을 지원해요.",
          entries: [{ memberId: "재서" }, { memberId: "호시" }],
        },
      ],
    },
  },
  {
    id: 9,
    label: "9기",
    members: {
      쳇쳇: { nickname: "쳇쳇", name: "전채운" },
      라엘: { nickname: "라엘", name: "라희수" },
      예니: { nickname: "예니", name: "나예은" },
      노브: { nickname: "노브", name: "노하영" },
      엘리: { nickname: "엘리", name: "박정인" },
      위즈: { nickname: "위즈", name: "이슬기" },
      연두: { nickname: "연두", name: "장연주" },
      소다: { nickname: "소다", name: "임서연" },
      우연: { nickname: "우연", name: "추연우" },
      이즈: { nickname: "이즈", name: "양인서" },
      도레미: { nickname: "도레미", name: "곽도윤" },
      페임: { nickname: "페임", name: "이지수" },
      마들렌: { nickname: "마들렌", name: "윤수호" },
      캐실: { nickname: "캐실", name: "김성은" },
      애니: { nickname: "애니", name: "황애라" },
      매튜: { nickname: "매튜", name: "김용민" },
      코튼: { nickname: "코튼", name: "김연진" },
      리버: { nickname: "리버", name: "이재원" },
      어헛차: { nickname: "어헛차", name: "박유수" },
      티미: { nickname: "티미", name: "오창민" },
      마크: { nickname: "마크", name: "김주헌" },
      재서: { nickname: "재서", name: "전하경" },
    },
    bureaus: {
      operations: [
        {
          title: "총괄단",
          description:
            "9기의 비전과 운영 방향을 설계하고, 조직 전체를 하나의 목표로 연결하며 이끌어요.",
          entries: [
            { memberId: "쳇쳇", tags: [{ kind: "central", label: "총괄" }] },
            { memberId: "라엘", tags: [{ kind: "central", label: "부총괄" }] },
          ],
        },
        {
          title: "Design Branding",
          description:
            "UMC의 브랜드 아이덴티티를 구축하고, 일관된 디자인을 통해 브랜드의 가치를 전달해요.",
          entries: [
            { memberId: "예니", tags: [{ kind: "role", label: "Lead" }] },
            { memberId: "노브" },
            { memberId: "엘리" },
          ],
        },
        {
          title: "대외협력",
          description:
            "외부 기업 및 기관과의 협력을 이끌고, 다양한 파트너십을 통해 UMC의 활동 기회를 넓혀가요.",
          entries: [
            { memberId: "위즈", tags: [{ kind: "role", label: "Lead" }] },
            { memberId: "연두" },
            { memberId: "소다" },
          ],
        },
        {
          title: "소통 정책",
          description:
            "원활한 소통 환경을 조성하며, 모두가 함께할 수 있는 커뮤니티를 만들어가요.",
          entries: [
            { memberId: "우연", tags: [{ kind: "role", label: "Lead" }] },
            { memberId: "이즈" },
          ],
        },
        {
          title: "행사기획",
          description:
            "UMC의 다양한 행사와 프로그램을 기획하고 운영하며, 구성원들에게 특별한 경험을 제공해요.",
          entries: [
            { memberId: "이즈", tags: [{ kind: "role", label: "Lead" }] },
            { memberId: "도레미" },
            { memberId: "페임" },
          ],
        },
      ],
      education: [
        {
          title: "총괄단",
          description:
            "9기의 비전과 운영 방향을 설계하고, 조직 전체를 하나의 목표로 연결하며 이끌어요.",
          entries: [
            { memberId: "쳇쳇", tags: [{ kind: "central", label: "총괄" }] },
            { memberId: "라엘", tags: [{ kind: "central", label: "부총괄" }] },
          ],
        },
        {
          title: "교육국장",
          description:
            "교육국 전체를 총괄하며, 교육의 방향성과 품질을 관리해요.",
          entries: [{ memberId: "마들렌" }],
        },
        {
          title: "Plan 파트장",
          description:
            "논리적이고 설득력 있는 서비스 기획을 할 수 있도록 도와요.",
          entries: [{ memberId: "마들렌" }],
        },
        {
          title: "Design 파트장",
          description:
            "사용자 중심의 디자인과 완성도 높은 결과물을 만들 수 있도록 도와요.",
          entries: [{ memberId: "캐실" }, { memberId: "애니" }],
        },
        {
          title: "Web 파트장",
          description:
            "사용자에게 편리한 웹 서비스를 제공할 수 있도록 개발 방향을 이끌고, 안정적인 웹 환경을 구축해요.",
          entries: [{ memberId: "매튜" }, { memberId: "코튼" }],
        },
        {
          title: "iOS 파트장",
          description:
            "iOS 앱 개발을 이끌며, 사용자 경험을 고려한 완성도 높은 모바일 서비스를 만들어가요.",
          entries: [{ memberId: "리버" }],
        },
        {
          title: "Android 파트장",
          description:
            "Android 앱 개발을 이끌며, 사용자가 편리하고 안정적으로 서비스를 이용할 수 있도록 지원해요.",
          entries: [{ memberId: "어헛차" }],
        },
        {
          title: "Spring Boot 파트장",
          description:
            "Spring Boot 기반의 서버 개발을 이끌며, 안정적인 서비스 운영을 위한 백엔드 시스템을 구축해요.",
          entries: [{ memberId: "티미" }, { memberId: "마크" }],
        },
        {
          title: "Node.js 파트장",
          description:
            "Node.js 기반의 서버 개발을 이끌며, 효율적인 데이터 처리와 원활한 서비스 운영을 지원해요.",
          entries: [{ memberId: "재서" }],
        },
      ],
    },
  },
]
