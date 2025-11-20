# [(주)올페이즈] 프론트엔드 과제

### 💡 거래 내역 조회는 로컬 Mock API 사용 (포트 3000 필요)

---

## 설치 방법

프로젝트를 클론한 후, 다음 명령어로 의존성을 설치합니다:

```bash
npm install
```

## 실행 방법


```bash
npm run dev
```


---

### 1. Mock 데이터 구조

Next.js API Route를 사용하여 별도의 API를 구성했습니다. (`app/api/v1/payments/list/route.ts`)

내부에 정의한 Mock 데이터는 **9월, 10월, 11월** 달별로 분리되어 있습니다.
달별 데이터가 있어야 정렬, 통계, 집계 등의 기능을 제대로 보여줄 수 있어서 이렇게 구성했습니다.

- `mocks/payments/mock-payments-2025-09.ts`
- `mocks/payments/mock-payments-2025-10.ts`
- `mocks/payments/mock-payments-2025-11.ts`

---

### 2. 반응형 디자인

모바일 확장까지 고려하여 UX/UI를 설계했습니다.

- **바텀 시트 모달**: 필터링 및 정렬 기능을 모바일 친화적인 바텀 시트 형태로 구현
- **반응형 구현**: 최소 너비 **320px**까지 지원하도록 구현
- 주요 브레이크포인트: 390px, 540px, 768px, 1024px

---

### 3. 시각화 라이브러리

가맹점 목록 페이지의 시각화 그래프는 **recharts** 라이브러리를 사용했고 나머지는 직접 구현하였습니다.

- 가맹점 상태별 분포 (Bar Chart)
- 업종별 분포 (Bar Chart)

---

### 4. 사용한 주요 기술 및 선택 이유

### Next.js 16.0.3

**선택 이유:**

- Mock API를 별도의 백엔드 서버 없이 Next.js 내부에서 쉽게 구현할 수 있어 "로컬 Mock API"를 효율적으로 구성할 수 있었습니다. 특히 달별 데이터(9월, 10월, 11월)를 분리하여 관리하고, 정렬, 통계, 집계 등의 기능을 제대로 보여주기 위해 Next.js의 API Routes를 활용하여 `app/api/v1/payments/list/route.ts`에 Mock API를 구성했습니다.

### React 19.2.0

### TypeScript 5.x

### Tailwind CSS 4.x

### Recharts 3.4.1

---

## 개발 환경

- Node.js 20.x LTS

