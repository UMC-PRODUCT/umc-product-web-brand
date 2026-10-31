export interface ProjectFlowStep {
  text: string
  note?: string
}

export interface ProjectSummaryItem {
  title: string
  description: string
  apiCount?: number
}

export interface ProjectDetail {
  flow?: readonly ProjectFlowStep[]
  features?: {
    summary?: string
    note?: string
    items: readonly ProjectSummaryItem[]
  }
  stack?: readonly ProjectSummaryItem[]
}

// 노션 정리본의 문구를 옮겼다. 서비스 소개 목록이 시안의 서비스 이용 흐름이다
export const PROJECT_DETAILS: Readonly<Record<string, ProjectDetail>> = {
  "pop-it": {
    flow: [
      { text: "호스트는 팝업스토어용 공간을 등록, 게스트는 탐색·예약" },
      {
        text: "전자계약 → 에스크로 결제(토스페이먼츠) → 퇴실 사진 인증 → 정산으로 이어지는 거래 전 과정 지원",
      },
      { text: "AI 맞춤 공간 추천과 3D 공간 뷰어로 탐색 경험 강화" },
      {
        text: "백엔드 19개 테이블 규모 · 민감정보 암호화 및 동시성 제어 설계",
      },
    ],
    features: {
      summary: "거래 흐름을 따라 영역별로 정리한 주요 기능.",
      note: "차기 버전 (데모데이 이후, 미구현): 실시간 채팅(WebSocket/STOMP), AI 추천 개인화 고도화, 알림 센터, 3D 큐레이션 고도화",
      items: [
        { title: "인증·회원", description: "소셜 로그인, 토큰 발급·회전" },
        {
          title: "호스트 온보딩",
          description: "호스트 전환, 사업자·정산 정보 등록, 포트원 본인인증",
        },
        {
          title: "공간 등록·관리 (호스트)",
          description: "공간 등록·수정, 이미지·편의시설 관리, 호스트 공간 상세",
        },
        {
          title: "공간 탐색·상세 (게스트)",
          description:
            "공간 목록·상세, 키워드·카테고리·지역·날짜 검색, 지도 모달, 찜하기",
        },
        { title: "예약 (게스트)", description: "예약 요청·취소" },
        {
          title: "전자계약",
          description: "호스트–게스트 전자서명, 계약 조건 스냅샷·위변조 검증",
        },
        {
          title: "에스크로 결제",
          description: "토스페이먼츠 결제 승인, 정산·보증금 환불 상태 관리",
        },
        {
          title: "퇴실 인증",
          description: "게스트 퇴실 사진 제출 / 호스트 확인·승인",
        },
        {
          title: "예약 관리 (호스트)",
          description: "예약 승인·거절, 예약 현황",
        },
        { title: "정산", description: "결제 완료 후 호스트 정산 처리" },
        {
          title: "자동화",
          description: "스케줄러 (퇴실 자동 승인, UV 집계 등)",
        },
        {
          title: "AI 추천",
          description: "임베딩 기반 맞춤 공간 추천, 지역·FOMO 추천 사유 산출",
        },
        {
          title: "공통 인프라",
          description: "S3 Presigned URL 발급, 민감정보 암호화·해시",
        },
      ],
    },
    stack: [
      {
        title: "Language / Framework",
        description: "Java, Spring Boot, Spring Data JPA",
      },
      { title: "Database", description: "MySQL" },
      {
        title: "인증 / 보안",
        description:
          "소셜 로그인(OAuth), JWT(Refresh Token), 포트원(PortOne) 본인인증, AES-256-GCM 암호화, HMAC-SHA256 해시",
      },
      { title: "결제", description: "토스페이먼츠 (에스크로)" },
      { title: "파일 / 스토리지", description: "AWS S3 (Presigned URL)" },
      { title: "지도 / 위치", description: "카카오맵 (지오코딩)" },
      {
        title: "AI 추천",
        description:
          "임베딩 벡터(768차원), 코사인 유사도 (애플리케이션 레벨 계산)",
      },
      {
        title: "동시성 제어",
        description: "낙관적 락(@Version), 조건부·부분 유니크 인덱스",
      },
      { title: "3D", description: "3D 공간 뷰어 (scene · hotspot)" },
      {
        title: "협업 / 리뷰",
        description: "GitHub (Git-Flow), CodeRabbit (AI 코드 리뷰 봇)",
      },
    ],
  },
  muffin: {
    flow: [
      { text: "매일 09:00 공개되는 뉴스·퀴즈로 경제 개념 학습" },
      {
        text: "실제 증시 일정에 맞춰 섹터 ETF에 모의투자",
        note: "(거래일 10:00~24:00)",
      },
      {
        text: "다음 거래일 아침 정산 → 손익·통계·주간 랭킹으로 학습 동기 부여",
      },
    ],
    features: {
      summary:
        "도메인별 주요 기능 요약 — 전체 48개 API 개발 (MVP 30 · 부가 17 · 범위 외 1) + 서버 자동 배치 14종.",
      note: "서버 자동 배치 (14종): RSS 뉴스 수집 · 뉴스/퀴즈 발행 · 시가/종가 수집 · 투자 마감 확정 · 일일 정산 · 주간 랭킹 집계 · 만료 데이터 정리 등. 실제 증시 일정(거래일 10:00~24:00, 주말·공휴일 휴장)에 맞춰 동작.",
      items: [
        {
          title: "인증",
          description:
            "로컬·구글 로그인, 토큰 재발급(재사용 감지), 이메일 인증, 회원 탈퇴",
          apiCount: 8,
        },
        {
          title: "온보딩",
          description:
            "투자 성향 3문항 → 캐릭터·추천 섹터 확정, 초기 가상 자산 지급",
          apiCount: 2,
        },
        {
          title: "뉴스",
          description:
            "뉴스 목록·상세, 오늘의 뉴스, 용어 하이라이트, 섹터 영향도, AI 해설 카드, 스크랩",
          apiCount: 8,
        },
        {
          title: "용어",
          description: "용어 사전 조회, 용어 저장·복습",
          apiCount: 3,
        },
        {
          title: "퀴즈",
          description:
            "오늘의 한입 퀴즈, 즉시 채점·해설, 결과 조회, 지난 퀴즈 복습",
          apiCount: 5,
        },
        {
          title: "모의투자",
          description:
            "섹터 목록, 투자 확정·수정, 현황·총자산 조회, 정산 결과 팝업",
          apiCount: 6,
        },
        {
          title: "통계",
          description:
            "누적 수익률·그래프, TOP3 섹터, 기간별 손익, 최근 성과 상세",
          apiCount: 4,
        },
        {
          title: "랭킹",
          description: "주간 수익률 TOP10 + 내 순위",
          apiCount: 1,
        },
        {
          title: "마이페이지",
          description:
            "홈(캐릭터·스트릭), 스크랩·최근 뉴스, 퀴즈 참여 내역, 닉네임 변경",
          apiCount: 6,
        },
        {
          title: "설정",
          description: "알림 토글 4종 조회·변경",
          apiCount: 2,
        },
        {
          title: "시스템",
          description: "무중단 배포용 Readiness 체크",
          apiCount: 1,
        },
      ],
    },
    stack: [
      { title: "Language / Framework", description: "Java, Spring Boot" },
      {
        title: "데이터 접근",
        description: "Spring Data JPA, Hibernate, QueryDSL, Flyway",
      },
      { title: "Database", description: "MySQL (AWS RDS)" },
      {
        title: "인증 / 보안",
        description: "JWT, Google OAuth2, HttpOnly Cookie, Spring Security",
      },
      {
        title: "API 문서",
        description: "Swagger (springdoc), Spring REST Docs",
      },
      {
        title: "Infra / 배포",
        description:
          "AWS (EC2 · RDS · ECR · VPC · IAM · SSM), Terraform, Docker, GitHub Actions, Nginx, Cloudflare",
      },
      {
        title: "모니터링",
        description: "Grafana Cloud, Grafana Alloy, Loki, Discord 알림",
      },
      {
        title: "외부 연동",
        description: "OpenAI, 매일경제 RSS, Toss, CoinGecko, SMTP",
      },
    ],
  },
  teaching: {
    flow: [
      {
        text: "자료 URL만 저장하면 AI가 본문·영상 스크립트를 분석해 요약·상세 해설 생성 후 벡터 색인(RAG)",
      },
      {
        text: "폴더·태그로 자료 정리, 저장한 자료를 근거로 답하는 AI 챗봇 Q&A (관련 자료 없으면 일반 지식으로 보완)",
      },
      {
        text: "티칭맵: 폴더 자료를 순서형 학습 단계(커리큘럼)로 재구성 + 진행률 추적",
      },
      {
        text: "하이라이트하면 사용자가 고른 페르소나(다정한/엄격한/응원하는) AI 선생님이 해설",
      },
      { text: "카카오·구글 소셜 로그인, 무료/프리미엄 멤버십" },
    ],
    features: {
      summary: "도메인별 주요 기능 요약.",
      note: "부가 기능: 카카오페이 구독 결제(TeachING Plus), 휴지통(폴더·자료·티칭맵 30일 보관·복구), 티칭맵 하이라이트 AI 분석",
      items: [
        {
          title: "온보딩·인증",
          description:
            "소셜 로그인, 회원가입, 약관 조회, 닉네임 중복확인, 토큰 재발급, 로그아웃",
        },
        { title: "홈", description: "대시보드 종합 조회, 알림 목록·요약" },
        {
          title: "자료 수집·AI 분석",
          description:
            "URL 입력 → AI 분석, 분석 결과 저장 확정, 최근 수집 자료 목록, 벡터 색인(Qdrant)",
        },
        {
          title: "보관함(폴더)",
          description:
            "폴더 CRUD, 자료 목록·검색, 자료 상세·태그·원문 이동, AI 요약·상세분석 조회·수정, 자료 이동",
        },
        {
          title: "티칭맵",
          description:
            "생성, 목록·단건 조회, 정보 수정, 임시저장, 스텝 완료 토글, 스텝 상세조회",
        },
        {
          title: "챗봇(RAG)",
          description: "대화방 생성·목록, 히스토리 조회, 질문 전송 & RAG 답변",
        },
        {
          title: "마이페이지",
          description:
            "내 정보 조회·수정, 회원 탈퇴, 알림 설정, AI 선생님 페르소나 설정",
        },
      ],
    },
    stack: [
      {
        title: "Language / Framework",
        description: "Java, Spring Boot, Spring Data JPA",
      },
      { title: "Database", description: "MySQL (AWS RDS)" },
      {
        title: "Vector DB",
        description: "Qdrant (임베딩 벡터·검색 payload 저장)",
      },
      {
        title: "AI / 검색",
        description:
          "RAG(임베딩 + 하이브리드 폴백 검색), AI 자동 요약·분석, 유튜브 스크립트 추출",
      },
      {
        title: "인증 / 보안",
        description: "JWT, 카카오·구글 소셜 로그인, 환경변수 기반 Secret 관리",
      },
      { title: "결제", description: "카카오페이 (구독 결제)" },
      {
        title: "파일 / 스토리지",
        description: "AWS S3 (서버 사이드 포맷 검증, UUID 키)",
      },
      {
        title: "Infra / 배포",
        description:
          "AWS EC2, Docker / docker-compose, GitHub Actions + ECR, OIDC + IAM 최소 권한",
      },
      { title: "리버스 프록시", description: "Nginx + Let's Encrypt(SSL)" },
      { title: "API 문서", description: "Swagger / OpenAPI" },
      {
        title: "협업 / 리뷰",
        description: "GitHub, CodeRabbit (AI 코드 리뷰 봇)",
      },
    ],
  },
  boogle: {
    flow: [
      { text: "기록: 선택형 항목으로 배변 상태와 생활 습관을 간편 입력" },
      { text: "확인: 캘린더로 날짜별 배변·생활 기록을 한 화면에서 통합 확인" },
      { text: "분석: 누적 데이터로 반복 패턴·변화를 주·월간 단위로 제공" },
      { text: "관리: 패턴 기반 장 건강 생활 가이드 + 리포트로 연결" },
    ],
    features: {
      summary: "기록 → 확인 → 분석 → 관리 흐름에 맞춰 구성.",
      items: [
        {
          title: "배변·생활 기록",
          description:
            "배변 상태 + 식사·수면·수분·운동·스트레스 등 생활 습관을 선택형 항목으로 간편 기록",
        },
        {
          title: "캘린더",
          description: "날짜별 배변·생활 기록을 한 화면에서 통합 확인",
        },
        {
          title: "패턴 분석 및 유형",
          description:
            "누적 기록으로 배변 주기·상태 변화를 룰 기반 패턴 분석 제공",
        },
        {
          title: "맞춤형 생활 가이드",
          description: "기록·분석 결과에 따라 참고할 장 건강 정보 제공",
        },
        {
          title: "주·월간 리포트/PDF",
          description: "배변 현황·생활 습관·주요 변화와 패턴을 리포트로 요약",
        },
      ],
    },
  },
  brifo: {
    flow: [
      {
        text: "뉴스 수집(배치) → 카드뉴스 → AI 사원 브리핑(보고서) → 사용자 의사결정 → 결과 정산으로 이어지는 핵심 흐름",
      },
      { text: "결정 과정을 결정 일기로 기록·공유" },
      {
        text: "AP(내부 재화), 출석 보상, 뱃지·업적, 튜토리얼 보상 등 게이미피케이션",
      },
      { text: "카드뉴스 속 용어를 내 용어장에 저장해 학습" },
    ],
    features: {
      summary: "도메인별 MVP 기능 요약.",
      note: "부가 기능: 토큰 관리(JWT·CSRF), 뱃지·업적 조회·획득, 결정일기 공유 및 공유 이미지 생성, 알림 생성·알림함 조회",
      items: [
        {
          title: "인증 (auth)",
          description: "카카오·네이버 소셜 로그인, 로그아웃",
        },
        {
          title: "사용자 (user)",
          description:
            "프로필 생성·관심종목 선택, 프로필 조회·수정, 사용자 정보 조회, 홈화면, 탈퇴",
        },
        {
          title: "AI 사원 (agent)",
          description: "사무실 조회, AI 사원 정보 전체·상세 조회",
        },
        { title: "카드뉴스 (news)", description: "카드뉴스 조회" },
        {
          title: "브리핑 (briefing)",
          description: "AI 사원 브리핑 생성, 전체·상세 조회",
        },
        {
          title: "용어 (term)",
          description: "카드뉴스 용어 상세 조회, 내 용어장 저장·조회",
        },
        { title: "주식 (stock)", description: "주식 인기·전체 종목 조회" },
        {
          title: "의사결정 (decision)",
          description: "의사결정 생성, 결정 목록 조회, 결정 정산",
        },
        { title: "결정일기 (diary)", description: "결정 일기 기록" },
        {
          title: "AP 재화 (ap)",
          description:
            "AP 획득·차감 기록 조회, 출석기록 조회, AP 대출, 튜토리얼 보상",
        },
        {
          title: "약관 (policy)",
          description: "약관 전체·상세 조회, 사용자 약관 동의, 개정 조회·동의",
        },
      ],
    },
    stack: [
      {
        title: "Language / Framework",
        description:
          "Java, Spring Boot, Spring Data JPA, Spring Batch(뉴스 수집)",
      },
      {
        title: "Database",
        description: "PostgreSQL (AWS RDS + Read Replica, 읽기/쓰기 분산)",
      },
      {
        title: "마이그레이션",
        description:
          "Flyway (스키마 단일 관리, 도메인 규칙은 JPA/비즈니스 로직)",
      },
      {
        title: "캐시",
        description: "AWS ElastiCache (반복 조회·일시 상태 공유 캐시)",
      },
      {
        title: "인증 / 보안",
        description:
          "JWT, CSRF 토큰, 카카오·네이버 소셜 로그인, Parameter Store(민감정보 분리)",
      },
      {
        title: "AI",
        description: "AI 사원 브리핑 생성 (뉴스·카드뉴스 기반 보고서)",
      },
      {
        title: "Infra",
        description:
          "AWS VPC, ALB(트래픽 분산·헬스체크), EC2 Auto Scaling Group, ECR, RDS, ElastiCache, SSM",
      },
      {
        title: "CI/CD",
        description:
          "GitHub Actions + ECR(commit SHA 태그), OIDC 임시 권한, SSM 무중단 배포·헬스체크",
      },
      {
        title: "설계 포인트",
        description:
          "내부 ID(sequence)/외부 공개 ID(UUIDv7) 분리, UUIDv7 커서 페이지네이션, 논리 삭제, 외부 API 호출 로깅",
      },
    ],
  },
  bookshelves: {
    flow: [
      {
        text: "특정 도서를 기준으로 익명 채팅방을 열어 실시간 독서모임 진행 (타이머·자동 종료)",
      },
      {
        text: "도서 기반 AI 추천 질문으로 대화를 이끌고, 모임 종료 후 AI가 대화 요약",
      },
      {
        text: "개인 책장(내 서재)에 읽은 책·한줄평·독서 통계·모임 기록 저장",
      },
      { text: "WebSocket 양방향 통신 기반 실시간 채팅방 상태 관리" },
      { text: "로그인 계정별로 독서 기록·참여 모임·AI 요약 보관" },
    ],
    features: {
      summary: "MVP 기능",
      note: "부가 기능: 알림(모임 시작·취소·요약 완료·푸시), 홈 화면(추천 도서·최근 책장·참여 가능 모임), 계정 설정(닉네임·프로필·관심 카테고리), 채팅방 신고(중복 방지·접수 상태 관리)",
      items: [
        {
          title: "익명 도서 채팅방",
          description:
            "도서 기준 채팅방 생성, 참여자별 랜덤 닉네임, 실시간 채팅, 상단 타이머·시간 종료 시 자동 종료, 공통 질문 선택",
        },
        {
          title: "AI 추천 질문·요약",
          description:
            "도서 기반 AI 추천 질문 생성·토글, 모임 종료 후 대화 요약 및 결과 저장",
        },
        {
          title: "개인 책장(내 서재)",
          description:
            "읽은 책 기록, 코멘트·한줄평, 독서 통계, 참여 모임 기록·AI 요약 저장",
        },
        {
          title: "실시간 양방향 통신",
          description:
            "메시지 실시간 송수신, 채팅방 입장·진행·종료 상태 실시간 반영",
        },
        {
          title: "로그인·데이터 관리",
          description: "사용자 로그인, 계정별 독서 기록·참여 모임·AI 요약 저장",
        },
      ],
    },
    stack: [
      {
        title: "Language / Framework",
        description: "Java, Spring Boot, Gradle",
      },
      {
        title: "Database",
        description: "MySQL 8.4 (AWS RDS, Private Subnet, TLS VERIFY_IDENTITY)",
      },
      { title: "마이그레이션", description: "Flyway (ddl-auto=validate)" },
      {
        title: "캐시 / 임시 저장",
        description:
          "Redis (JWT 토큰 저장소, 외부 도서 정보 캐시, 최근 검색어 / Docker·AOF)",
      },
      {
        title: "실시간 통신",
        description: "WebSocket (Nginx Upgrade 헤더 전달)",
      },
      {
        title: "인증 / 보안",
        description:
          "JWT, IMDSv2, EBS·RDS 암호화, 비밀정보 .env·읽기전용 마운트",
      },
      {
        title: "AI / 외부 연동",
        description:
          "AI 추천 질문·대화 요약, 카카오 도서 검색, Firebase(푸시 알림)",
      },
      {
        title: "Infra",
        description:
          "AWS 서울 리전, Terraform(VPC·Subnet·SG·EC2·EIP·RDS·IAM), EC2(Ubuntu 24.04, t3.small), Docker Compose, Nginx(Reverse Proxy·TLS)",
      },
      {
        title: "CI/CD",
        description:
          "GitHub Actions + GitHub Container Registry, OIDC, AWS SSM, SHA-256 digest 이미지 고정",
      },
      {
        title: "코드 스타일",
        description: "Google Java Format + Spotless (CI 강제)",
      },
    ],
  },
  "slate-to": {
    flow: [
      {
        text: "공고 → 지원 → 프로젝트 → 영상 → 피드백으로 이어지는 영상 제작 협업 전 과정 지원",
      },
      {
        text: "YouTube 영상에 재생 지점(타임코드) 기반 피드백과 답글, 해결 상태 관리",
      },
      {
        text: "로그인 없이 영상을 보고 피드백을 남기는 외부 공유 리뷰(게스트) 지원",
      },
      { text: "자료실·공지·일정·알림·포트폴리오까지 팀 운영 기능 포함" },
      {
        text: "백엔드 전체 108개 API (MVP 68 · 부가 39 · 헬스체크 1), 36개 테이블 · 9개 도메인 규모",
      },
    ],
    features: {
      summary:
        "핵심 흐름(MVP) — 하나라도 빠지면 서비스가 성립하지 않는 7개 기능.",
      note: "부가 기능 (39 API, 전부 구현·배포): 프로젝트 자료실, 공지사항, 일정 관리, 알림, 활동 로그, 포트폴리오, 공고 북마크, 오늘의 브리핑",
      items: [
        {
          title: "계정·인증",
          description:
            "이메일 인증 후 회원가입, 이메일·구글 로그인, 토큰 재발급, 비밀번호 변경·재설정, 로그아웃",
          apiCount: 9,
        },
        {
          title: "프로필·온보딩",
          description:
            "역할·지역·관심 분야 등록, 프로필 조회·수정·탈퇴, 이미지 교체, 활동 통계",
          apiCount: 8,
        },
        {
          title: "구인 공고",
          description:
            "공고 등록·수정·삭제, 직군·지역·영상 길이·키워드 검색, 맞춤 추천, 내 공고 관리",
          apiCount: 7,
        },
        {
          title: "지원",
          description:
            "지원서 제출·첨부 업로드/다운로드, 지원자 목록·상세, 상태 변경, 내 지원 현황",
          apiCount: 7,
        },
        {
          title: "프로젝트·팀",
          description:
            "프로젝트 CRUD·고정, 초대 링크 발급·수락, 멤버 권한 변경·내보내기·나가기",
          apiCount: 15,
        },
        {
          title: "영상·피드백",
          description:
            "YouTube URL 검증 후 영상 등록, 타임스탬프 피드백·답글, 해결 상태, 영상 북마크",
          apiCount: 17,
        },
        {
          title: "외부 공유 리뷰",
          description:
            "로그인 없이 보는 공유 링크 발급·비활성화, 게스트 등록 후 비회원 피드백",
          apiCount: 5,
        },
      ],
    },
    stack: [
      {
        title: "Language / Framework",
        description: "Java, Spring Boot, Spring Data JPA",
      },
      { title: "Database", description: "MySQL 8.4 (AWS RDS)" },
      { title: "마이그레이션", description: "Flyway" },
      {
        title: "인증 / 보안",
        description:
          "JWT(Refresh Token 화이트리스트), 구글 소셜 로그인, 이메일 인증, 토큰·세션 해시 저장",
      },
      {
        title: "파일 / 스토리지",
        description: "AWS S3 (storage_key 기반 접근 제어)",
      },
      { title: "외부 연동", description: "YouTube (URL 검증·영상 등록)" },
      {
        title: "Infra / 배포",
        description:
          "AWS EC2, Docker / Docker Compose, Nginx(Reverse Proxy), 도메인·DNS·HTTPS",
      },
      { title: "CI/CD", description: "GitHub Actions" },
      {
        title: "모니터링",
        description: "Amazon CloudWatch (EC2 지표 대시보드·경보)",
      },
      {
        title: "API 문서",
        description:
          "Swagger / springdoc (@Operation, @ApiErrorCodes, 문서 검증 테스트)",
      },
      {
        title: "공통 설계",
        description:
          "ApiResponse<T> 통일 응답, 전역 예외 처리, 커서 기반 페이지네이션",
      },
    ],
  },
  "muse-review": {
    flow: [
      {
        text: "백킹트랙 위에서 MIDI로 연주 → AI 화성학 엔진이 스케일·텐션·코드진행·보이스리딩 영역별로 채점·분석",
      },
      {
        text: "분석 결과를 두고 AI 멘토에게 추가 질문 (Gemini 스트리밍 → SSE 실시간 응답)",
      },
      { text: "인터랙티브 화성학 이론 가이드 + 이론 연계 즉각 연습" },
      { text: "연습 히스토리·통계 대시보드로 성장 추적" },
      { text: "카카오·구글 소셜 로그인" },
      { text: "백엔드와 Python/FastAPI 분석 서버를 분리한 멀티 서비스 구조" },
    ],
    features: {
      summary: "도메인(Swagger 태그)별 MVP 기능 요약.",
      note: "부가 기능: 학원 소속·강사 연동, 구독 결제, 오답노트 등은 설계·일부 엔티티만 두고 데모데이 이후 구현 예정",
      items: [
        {
          title: "ACCOUNT",
          description:
            "소셜 회원가입·온보딩, 소셜 로그인·로그아웃, 회원 탈퇴, 뮤지션 프로필 설정·수정, 구독 상태 조회",
          apiCount: 7,
        },
        {
          title: "SESSION-ANALYSIS",
          description:
            "분석 구간 선택·요청, AI 화성학 엔진 분석, 결과 표시, AI 멘토 질의응답(SSE), 영역별 연주 점수",
          apiCount: 5,
        },
        {
          title: "SESSION-PRACTICE",
          description:
            "실시간 MIDI 저장, 백킹트랙 업로드·공개범위 설정, 백킹트랙 컨트롤·실시간 기록, 백킹트랙 선택",
          apiCount: 8,
        },
        {
          title: "SESSION-LEARNING",
          description: "인터랙티브 화성학 이론 가이드, 이론 연계 즉각 연습",
          apiCount: 2,
        },
        {
          title: "ACCOUNT-SETTINGS",
          description: "연습 히스토리 및 통계 대시보드",
          apiCount: 1,
        },
        {
          title: "NOTIFICATION",
          description: "알림함 조회·읽음 처리",
          apiCount: 1,
        },
      ],
    },
    stack: [
      {
        title: "Language / Framework",
        description: "Java 17, Spring Boot 3.2.2, Spring Data JPA",
      },
      {
        title: "Database",
        description: "PostgreSQL 18 (AWS RDS), JSONB(MIDI 이벤트 저장)",
      },
      {
        title: "임시 저장 / 캐시",
        description: "Redis (OAuth 일회성 인증 정보, TTL 관리)",
      },
      {
        title: "분석 서버",
        description: "Python / FastAPI (별도 컨테이너, 내부 REST 연동)",
      },
      {
        title: "AI",
        description: "Google Gemini API (Streaming → SSE 실시간 전달)",
      },
      {
        title: "인증 / 보안",
        description: "JWT, 카카오·구글 OAuth, Refresh Token SHA-256 해시 저장",
      },
      {
        title: "파일 / 스토리지",
        description: "AWS S3 (Presigned URL, Object Key 저장)",
      },
      {
        title: "Infra / 배포",
        description: "AWS EC2, Docker / Docker Compose, Nginx(Reverse Proxy)",
      },
      { title: "CI/CD", description: "GitHub Actions + Docker Hub" },
      {
        title: "도메인 / HTTPS",
        description: "가비아 DNS, Let's Encrypt + Certbot(자동 갱신)",
      },
      {
        title: "동시성 제어",
        description: "낙관적 락(@Version), 비관적 락(PESSIMISTIC_WRITE)",
      },
      {
        title: "공통 설계",
        description:
          "ApiResponse<T> 통일 응답, 전역 예외 처리, 커서 페이지네이션",
      },
    ],
  },
}
