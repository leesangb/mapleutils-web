# 메이플 유틸 웹 페이지

## About

메이플스토리를 하면서 여러 컨텐츠에 도움을 주는 웹사이트 입니다. 과거 샤레니안의 지하수로 길드 파티를 배치해주는 기능으로 시작해, 현재는 더 시드 족보와 몬스터 라이프 조합식을 제공합니다.

## 주요 스택

- [React.js](https://reactjs.org/)
- [MUI](https://mui.com)
- [Next.js](https://nextjs.org/)
- [Hangul.js](https://github.com/e-/Hangul.js)

## 설치 및 실행

```sh
> npm install # install dependencies
```

```sh
> npm run dev # development
> npm run build && npm start # production
```

## 사이트맵 생성

```sh
> npm run sitemap
```

## 환경변수

```dotenv
GOOGLE_ANALYTICS_VIEW_ID="<GOOGLE-ANALYTICS-VIEW-ID>"
GOOGLE_CLIENT_EMAIL="<GOOGLE-API-SERVICE-ACCOUNT-MAIL>"
GOOGLE_CLIENT_ID="<GOOGLE-API-SERVICE-ACCOUNT-ID>"
GOOGLE_PRIVATE_KEY="<GOOGLE-API-SERVICE-ACCOUNT-PRIVATE-KEY>"
```

---

## 더 시드

### 24층 `/seed/24`

더 시드 24층 브금을 들을 수 있습니다.

- [x] 브금 선택 시 자동 복사
- [x] 정렬
- [x] 키보드 조작

### 36층 `/seed/36`

더 시드 36층 메모를 할 수 있습니다

### 39층 `/seed/39`

더 시드 39층 문제들을 볼 수 있습니다.

- [x] 문제 또는 보기 검색 (초성도 ✅)
- [x] 특수문자 무시하고 검색
- [x] `CTRL` + `F` 또는 `F3`키로 바로 검색

### 48층 `/seed/48`

더 시드 48층 투명발판을 도와주는 미니맵 오버레이입니다.

- [x] 메이플 화면을 공유하여 미니맵에 오버레이
- [x] 점프구간 표시

### 49층 `/seed/49`

더 시드 49층 실루엣 모음입니다.

- [x] 몬스터 이름 검색 (초성도 ✅)
- [x] 마을 별 필터
- [x] 실루엣 on/off
- [x] 몬스터 클릭 시 복사
- [x] 마우스 포인터가 실루엣에 올라가 있을 때 몬스터 표시

## 몬스터 라이프

### 스페셜 조합

스페셜 몬스터의 조합식을 보여줍니다.

- [x] 전체 조합식 보기
- [x] `http://wachan.me`데이터 불러오기 / `https://meso.kr`바로가기

### 몬스터 정리

조합식 또는 상자로 얻을 수 있는 몬스터들을 볼 수 있습니다.

- [x] 몬스터 효과별 정리
- [x] 전체 조합식 보기
- [x] 상자 정보, 수명 연장 정보 보기