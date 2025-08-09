# Star Breaker Raid

- 개발 기간: 2024.9.5 ~ 2025.2.17
- 유지보수 기간: 2025.2.17~

- 기획자: wjd15sheep@gmail.com
- 개발자: wjd15sheep@gmail.com


## 목적

Star Breaker Raid는 로스트아크 게임을 즐기는 유저들을 위하여 만들어졌습니다.

로스트아크 컨텐츠 중에서 특히 레이드에 대한 기능들을 보조하는 기능들로 만들어졌습니다.

`모집글 등록`, `신청 기능`, `일정 관리` , `이번주 레이드 수`

### ✨ 차별점 : 🥇 인증제도

- `인증 제도`란 레이드에 해박하고 공대장을 많이 해봤으며 레이드 중 기믹에 대해서 잘 설명하고 성공적으로 이끌어간 경험이 많이 있는 분들을 특정해 사이트 이용자들에게 클린한 레이드와 성취를 보장하는 제도 입니다.
- 인증된 사람은 `Teacher`의 칭호를 드리고 모집글을 등록시 메인 화면에 공고하여 사람들에 모집글이 많이 노출이 됩니다. (이는 클린한 레이드를 위함이며 레이드에 두려운 사람들이 인증된 레이드에서 많이 물어보고 성장하도록 장려하기 위해서 입니다.)


### 중요 기능

- 레이드 공고 기능
- 레이드 신청 기능
- 레이드 신청자를 확인하는 기능
- 동적 레이아웃, 모바일과 웹 버전

### 배포된 사이트 주소

https://star-breaker-raid.vercel.app/

### 사이트 가이드

https://dot-quesadilla-543.notion.site/Star-Breaker-Raid-edbf6874fadb44d3b60dce202b177d39

---


### Screenshot
<img width="1710" height="948" alt="image" src="https://github.com/user-attachments/assets/b8cbc46a-89f2-4ce8-a235-9dc83dcc1543" />
<img width="1710" height="950" alt="image" src="https://github.com/user-attachments/assets/75a19cf2-78af-4b75-86d5-e4bc2d585d4c" />
<img width="1702" height="1018" alt="image" src="https://github.com/user-attachments/assets/cfb87227-1758-46f1-b3aa-bb4b1677749b" />
<img width="1696" height="948" alt="image" src="https://github.com/user-attachments/assets/2a40342e-3e36-4da2-9615-3989785ff506" />
<img width="1710" height="950" alt="image" src="https://github.com/user-attachments/assets/0ad82660-3e64-4661-9cd7-9a41a560f0e2" />

# 개발

### 프레임워크 및 라이브러리 버전
- 프레임워크: `Next.js`
- DB: `Postgres`
- 배포: `Vercel`
  
|     | 명칭                        | version            |                                                  |
| --- | --------------------------- | ------------------ | ------------------------------------------------ |
| 1   | next                        | 15.1.4 이상        | 프레임워크                                       |
| 2   | react & react-dom           | 19.0.0 이상        | 리엑트 라이브러리                                |
| 3   | vercel                      | 39.3.0 이상        | CI/CD 배포 프로세스                              |
| 4   | zustand                     | 4.5.5 이상         | 전역 상태관리 라이브러리                         |
| 5   | @auth/core                  | 0.37.4 이상        | Auth.js 로그인 관련 라이브러리                   |
| 6   | next-auth                   | 5.0.0-beta.25 이상 | Auth.js 로그인 관련 라이브러리                   |
| 7   | @next/third-parties         | 15.1.4 이상        | google 서드파티 쿠키 처리 관련 라이브러리        |
| 8   | @vercel/postgres            | 0.9.0 이상         | vercel 포스트 그래이스 연결 ORM 라이브러리       |
| 9   | @vercel/speed-insights      | 1.1.0 이상         | vercel speed-insights overview 라이브러리        |
| 10  | bcryptjs                    | 2.4.3 이상         | 해시코드 암호화 라이브러리                       |
| 11  | date-fns                    | 4.1.0 이상         | 날짜 관련 함수 라이브러리                        |
| 12  | date-fns-tz                 | 3.2.0 이상         | 날짜 관련 그리고 region에 따른 시간 포멧         |
| 13  | js-cookie                   | 3.0.5 이상         | 클라이언측 CSR에서 쿠키 제어 함수 라이브러리     |
| 14  | react-datepicker            | 7.3.0 이상         | 날짜 선택 라이브러리                             |
| 15  | swr                         | 2.3.2 이상         | 데이터 fetch 관련 라이브러리                     |
| 16  | zod                         | 3.23.8 이상        | 스키마 선언 및 유요성 검사 라이브러리            |
| 17  | prettier                    | 3.3.3 이상         | 프리티 설정 라이브러리                           |
| 18  | prettier-plugin-tailwindcss | 0.6.6 이상         | tailwindcss 프리티 플러그인                      |
| 19  | tailwindcss                 | 3.4.1              | tailwindcss css를 쉽게 사용할 수 있는 라이브러리 |
| 20  | typescript                  | 5 이상             | 타입스크립티 라이브러리                          |


사용한 라이브러리 버전과 간단한 설명, 타입스크립트를 사용중이라 @types로 타입이 설정된 라이브러리는 제외했습니다. 

### ERD
초기 ERD는 users, characters, raid_posts, applications_list 만 있었으나 점차 테이블이 늘어나 최종 아래와 같이 설계하였습니다.


![Image](https://github.com/user-attachments/assets/0d6820ab-5fbc-4750-b85c-27d09f8323b7)

ERD 및 테이블에 대한 자세한 사항은 [링크](https://dot-quesadilla-543.notion.site/ERD-19363ce144d98078a746f44c7fca522d?pvs=4)에서 확인

### 🔧 기술적 구현 상세 (Technical Highlights)

#### 1. **API 설계**
- `RESTful API` 기반 설계 및 응답 표준화
- 불필요한 데이터 제거 및 필드 최적화로 네트워크 비용 최소화
- 공통 에러 핸들링 구조 도입으로 예외 발생 시 사용자 메시지 일관성 유지
- 가독성과 명확성을 위한 Query/Path Parameter 설계
  ```java
    GET /api/raidPostAPI/raidPostGet?posts_position=teacher
    DELETE /api/raidPostAPI/createPost?post_id=12&user_id=aaa
  ```

#### 2. **DB 설계 및 최적화**
#### 관계형 데이터베이스(RDBMS)를 선택한 이유
- 레이드 모집 → 신청 → 참여 → 스케줄 등의 흐름이 명확한 관계로 이어지며, 이를 테이블 간 관계로 구조화하기 적합
- 데이터 간 참조가 빈번하게 일어나며, JOIN 연산이나 서브쿼리를 통해 복합 데이터를 일관성 있게 처리할 수 있음
- 관계형 모델을 통해 이후 데이터 통계 및 사용자 이력 추적 시에도 용이함

#### PostgreSQL 기반의 정규화된 관계형 데이터베이스 설계
- 테이블 간 명확한 관계 설정을 통해 데이터 중복을 최소화하고 무결성 유지가 용이하도록 설계
- 관계형으로 CASCADE를 활용한 데이터 관리

#### 외래키(Foreign Key) 및 CASCADE 정책을 활용한 데이터 연동
- 예를 들어 사용자가 삭제되면 해당 유저와 연관된 레이드 모집글과 신청 정보도 함께 삭제되도록 설정
- 이를 통해 데이터 유실 없이 종속성 있는 레코드를 자동 정리 가능
  ```sql
  CREATE TABLE raid_posts (
    post_id SERIAL PRIMARY KEY,
    user_id TEXT NOT NULL,
    raid_name TEXT NOT NULL,
    ...
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
  );

  ```

#### 3. **인증 / 보안**
- Google OAuth 2.0 로그인
  - Auth.js를 활용하여 소셜 로그인 기능 구현. 구글 계정을 통해 빠르고 안전한 인증 제공
- JWT 기반 세션 유지
  - 로그인 성공 시 JWT를 기반으로 세션을 유지하며, userId, nickname, role 등의 정보를 포함하여 클라이언트와 서버에서 모두 접근 가능
- 권한 기반 접근 제어
  - Admin 권한을 가진 유저만 공략글 생성 및 삭제 가능
- 비밀번호 보안 처리
  - 사용자 비밀번호는 bcrypt로 단방향 해싱하여 안전하게 DB에 저장
  

#### 4. 캐싱 전략
- 정적 자산 캐싱
  - 이미지 및 SVG 아이콘 등 변경이 거의 없는 정적 파일은 **최대 1년(max-age=31536000)**으로 캐싱
  - 사용자가 반복 방문 시 리소스 재요청 없이 빠르게 로딩 가능
- 반정적 콘텐츠 캐싱
  - 공략 가이드(raid guide)와 같이 변경 가능성이 있지만 잦지 않은 리소스는 **최대 1주일(max-age=604800)**로 캐싱
  - 유동적인 콘텐츠에 대한 캐싱 정책을 적절히 설정하여 사용자 경험 개선 및 서버 부하 감소

- API 응답 캐싱
  - API 요청(GET /api/...)은 항상 최신 데이터 제공이 필요하므로 no-store 정책 적용
  - 민감하거나 유저 맞춤형 데이터의 경우 절대 캐싱하지 않도록 설계
  - 서버에서는 필요 시 ETag / Last-Modified 기반 304 Not Modified 응답을 활용해 네트워크 트래픽 절감


####  5. 배포
- 배포 플랫폼: Vercel
- main 브랜치로 커밋/푸시될 때마다 자동으로 빌드 & 배포되는 CI/CD 파이프라인 구성
- 환경 변수를 이용한 보안 구성 및 다양한 배포 환경 설정 가능


##### Vercel을 선택한 이유
  - Next.js 프레임워크에 최적화되어 있어 별도의 설정 없이 빠른 배포 가능
  - 정적 페이지와 서버사이드 렌더링(SSR) 모두에 대해 효율적인 퍼포먼스 제공
  - Dashboard를 통해 실시간으로 방문자 트래픽, 성능 지표(속도, 에러 등)를 시각화하여 분석 가능


### 저작권

Star-Breaker-Raid 제작에 공략과 다양한 이미지들의 출처를 남깁니다.

- 이미지, 각종 asset은 원저작자는 `Smilegate RPG`
- 레이드 가이드 동영상 원저작자는 `바보 온달`, `바뀐TV`, `캡틴 잭`, `꿀멩이님은 여왕님`, `로아백`
- 레이드 가이드 컨닝페이퍼 원저작자 `큐티근육맨`, `빵루쉐`, `홍당근`, `아크라시아인의 노트`, `장짱`, `덕진`,`강아지가두마리나`, `고양이가세마리`
