# 메이플 유틸 웹 페이지

## About

메이플스토리를 하면서 여러 컨텐츠에 도움을 주는 웹사이트 입니다. 과거 샤레니안의 지하수로 길드 파티를 배치해주는 기능으로 시작해, 현재는 더 시드 족보와 몬스터 라이프 조합식을 제공합니다. 기존 코드는 재사용 하기
어려워 처음부터 다시 만드는겸 오픈소스로 만들려고 합니다.

## 설치 및 실행

```sh
> npm install # install dependencies
```

```sh
> npm run dev # development
> npm run build && npm start # production
```

## 환경변수

```.dotenv
GOOGLE_ANALYTICS_VIEW_ID="<GOOGLE-ANALYTICS-VIEW-ID>"
GOOGLE_CLIENT_EMAIL="<GOOGLE-API-SERVICE-ACCOUNT-MAIL>"
GOOGLE_CLIENT_ID="<GOOGLE-API-SERVICE-ACCOUNT-ID>"
GOOGLE_PRIVATE_KEY="<GOOGLE-API-SERVICE-ACCOUNT-PRIVATE-KEY>"
```