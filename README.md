# FLOW GWANGJU

만 20–34세 청년이 취향을 통해 새로운 사람과 일상을 만나는 광주 기반 로컬 소셜링,
**FLOW GWANGJU**의 공식 웹사이트입니다.

> 취향이 흐르면, 우리가 만난다 · AFTER WORK, INTO THE CITY

## 페이지 구성

| 파일 | 내용 |
| --- | --- |
| `index.html` | 브랜드 소개, 진행 방식, 이번 달 일정, 운영진 스토리, FAQ |
| `programs.html` | 8개 프로그램 상세(진행 순서·정원·참가비), 오픈 우선순위, 공통 운영 장치 |
| `join.html` | 참여 대상과 신청 절차, 참여 규칙, 환불 규정, 호스트·공간·기업 제휴 |
| `brand.html` | 브랜드 정의, 컬러·타이포·로고 규칙, 보이스 앤 톤, 콘텐츠 원칙 |

## 실행

빌드 도구가 없는 정적 사이트입니다. 저장소를 열어 바로 확인할 수 있습니다.

```bash
python3 -m http.server 8000
# http://localhost:8000
```

GitHub Pages로 배포할 경우 저장소 설정에서 브랜치와 루트(`/`)를 지정하면 됩니다.
(Jekyll 처리를 막기 위해 `.nojekyll` 파일이 포함되어 있습니다.)

## 운영하면서 바꿔야 하는 것

### 1. 채널 링크

`assets/js/main.js` 상단의 `FLOW_LINKS` 한 곳만 수정하면 모든 페이지에 반영됩니다.
HTML에서 `data-link="apply"` 처럼 표시된 요소의 `href`가 자동으로 채워집니다.

```js
const FLOW_LINKS = {
  apply: "https://forms.gle/",          // 신청 폼
  kakao: "https://pf.kakao.com/",       // 카카오톡 채널
  instagram: "https://instagram.com/flow.gwangju",
  host: "https://forms.gle/",           // 호스트 지원 폼
  partner: "mailto:hello@flowgwangju.kr",
  email: "mailto:hello@flowgwangju.kr",
};
```

### 2. 이번 달 일정

`index.html`의 `#schedule` 섹션에 있는 `.slot` 목록을 직접 수정합니다.
현재 들어 있는 3건은 **예시 편성**이므로 실제 일정으로 교체해야 합니다.
상태 배지는 `tag--lime`(모집 중) / `tag--blue`(오픈 예정)을 사용합니다.

### 3. 참가비

프로그램별 참가비는 공간·강사·재료비에 따라 달라지는 **기준 범위**입니다.
실제 견적이 확정되면 `programs.html`과 일정 섹션의 금액을 함께 맞춰주세요.

### 4. 도메인

`index.html`의 `canonical`, 각 페이지의 `og:image` 경로,
푸터의 이메일 주소는 도메인이 정해지면 절대 경로로 교체하는 편이 좋습니다.

## 디자인 토큰

| 토큰 | 값 | 용도 |
| --- | --- | --- |
| `--lime` | `#D8FF45` | 메인 포인트 (버튼·강조) |
| `--ink` | `#16181D` | 기본 텍스트·다크 섹션 |
| `--ivory` | `#FFF9EF` | 배경 |
| `--blue` | `#48C7FF` | 보조 포인트 |

한글은 Pretendard, 영문은 Space Grotesk를 사용합니다.
색·타이포·로고 사용 규칙은 `brand.html`에 정리되어 있습니다.

## 구조

```
.
├── index.html
├── programs.html
├── join.html
├── brand.html
└── assets/
    ├── css/style.css
    ├── js/main.js
    └── img/{logo-mark,favicon,og-image}.svg
```
