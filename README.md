# YouTube Clone React Project

## 🖥️ 프로젝트 소개

Youtube API를 활용한 유튜브 클론 리액트 프로젝트입니다. tanstack/react-query, axios, react-router-dom 라이브러리들을 활용하여 Youtube API 요청 및 데이터 캐싱과 라우팅을 구현했습니다.

## ⏱️ 개발 기간

> **2024.02.12 ~ 2024.03.06**

## 🛠️ 개발 환경

> `React`<br/>`Tailwind CSS`<br/>`TanStack React Query`<br/>`React-Router-DOM`<br/>`Axios`<br/>`Postman`

## 🔑 주요 기능

### YouTube API 데이터 요청

- YouTube API는 하루에 기본적으로 주어지는 10,000이라는 할당량이 비디오, 검색, 채널, 댓글 목록 데이터 요청시에 1~100 정도 쓰입니다.

- 개발 단계에 실제 데이터 요청으로 진행을 하게되면 금방 소진되기에 Postman을 활용해 mock data로 개발을 진행하고 배포 단계에서는 실제 데이터 요청하는 로직을 사용했습니다.

### 데이터 캐싱

- tanstack/react-query의 staleTime이 기본적으로 0으로 설정되어있지만 YouTube API의 특성상 자주 요청하게 되면 할당량이 빨리 소진되니 프로젝트 내에서는 Infinity로 설정하여 계속 fresh상태를 유지하도록 하였습니다.

- 새로고침을 하면 캐싱 데이터가 초기화되기 때문에 사용자가 새로운 데이터를 원한다면 새로고침을 시도해 새로운 데이터를 받아올 수 있습니다.

- 또는 gcTime(cacheTime)이 5분으로 설정되어 있기때문에 비활성화된지 5분이 지났다면 새로운 데이터 요청이 가능합니다.

### Routing

- SPA 내부에서 페이지 이동이 가능한 라이브러리인 react-router-dom를 활용해 routing을 구현했습니다.

- Outlet을 통해 검색 헤더는 항상 어느 페이지에서든 렌더링이 되고 Outlet으로 명시된 헤더 밑 영역에만 페이지 렌더링이 가능하도록 구현했습니다.

- useNavigate, useLocation, useParams 등 react-router-dom의 hooks를 활용해 클릭 이벤트 발생 시 페이지 이동을 하거나 페이지 이동 시 호출될 컴포넌트에 데이터를 전달하거나 dynamic routing을 통해 넘어온 url 파라미터를 조회하여 사용했습니다.
