# 🧭 Compass Point - 사고 가시화 루틴 도구

> Harvard Project Zero의 Compass Point Thinking Routine을 기반으로 한 웹 기반 학습 도구

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-18.3-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4-646CFF.svg)](https://vitejs.dev/)

## 📖 소개

Compass Point는 하버드 프로젝트 제로(Harvard Project Zero)의 사고 루틴을 디지털 도구로 구현한 웹 애플리케이션입니다. 학생들이 아이디어나 주제에 대해 네 가지 관점(동서남북)에서 체계적으로 생각하고 기록할 수 있도록 돕습니다.

### 🎯 Compass Point 사고 루틴이란?

Compass Point는 새로운 아이디어나 제안을 탐색할 때 사용하는 사고 루틴입니다:

- **E (동쪽/East) - 설렘, 기대**: 이 아이디어에서 흥미롭거나 기대되는 점
- **W (서쪽/West) - 걱정, 우려**: 잠재적 문제나 우려되는 점
- **S (남쪽/South) - 필요, 제안**: 더 알아야 할 것, 추가로 필요한 정보
- **N (북쪽/North) - 입장, 태도**: 이 아이디어에 대한 현재 입장과 전반적인 의견

## ✨ 주요 기능

### 📝 사고 정리
- **4방향 입력**: 동서남북 각 방향별로 생각 정리
- **자동 높이 조절**: 입력 내용에 따라 텍스트 영역 자동 확장
- **줄바꿈 보존**: 엔터키로 입력한 줄바꿈 완벽 유지

### 💾 저장 및 내보내기
- **자동 저장**: 2초마다 자동으로 브라우저에 저장
- **PDF 다운로드**: 인쇄 품질의 PDF 생성 (브라우저 인쇄 기능)
- **이미지 다운로드**: PNG 형식의 고화질 이미지 (2x 스케일)
- **텍스트 다운로드**: 편집 가능한 텍스트 파일

### 🎨 사용자 경험
- **반응형 디자인**: 모바일, 태블릿, 데스크톱 모두 지원
- **진행률 표시**: 작성 진행률을 실시간으로 확인
- **색상 구분**: 각 방향별 고유 색상으로 시각적 구분
- **접근성**: WCAG 2.1 AA 준수

### 📱 크로스 플랫폼
- ✅ **데스크톱**: Windows, macOS, Linux
- ✅ **모바일**: iOS Safari, Chrome Mobile
- ✅ **태블릿**: iPad, Android 태블릿

## 🚀 시작하기

### 필수 요구사항

- Node.js 18.0 이상
- npm 또는 yarn

### 설치

```bash
# 저장소 클론
git clone https://github.com/plusiam/compass-point.git

# 프로젝트 폴더로 이동
cd compass-point

# 의존성 설치
npm install

# 개발 서버 실행
npm run dev
```

브라우저에서 `http://localhost:5173` 접속

### 빌드

```bash
# 프로덕션 빌드
npm run build

# 빌드 미리보기
npm run preview
```

## 📖 사용 방법

### 1️⃣ 기본 사용

1. **이름 입력**: 상단에 이름 또는 모둠명 입력
2. **주제 입력**: 중앙의 나침반에 검토할 아이디어/주제 입력
3. **4방향 작성**: 각 방향(동서남북)에 생각 기록
4. **저장**: 자동 저장되거나 "저장하기" 버튼 클릭

### 2️⃣ 다운로드

#### PDF로 저장 (추천 📄)
1. "PDF 저장" 버튼 클릭
2. 브라우저 인쇄 대화상자에서 **"PDF로 저장"** 선택
3. 파일명 입력 후 저장

#### 이미지로 저장 (빠른 공유 🖼️)
1. "이미지 저장" 버튼 클릭
2. PNG 파일 자동 다운로드

#### 텍스트로 저장 (편집용 📝)
1. "텍스트 저장" 버튼 클릭
2. TXT 파일 자동 다운로드

### 3️⃣ 초기화

- "초기화" 버튼으로 모든 내용 삭제
- 저장된 데이터도 함께 삭제됨

## 🛠️ 기술 스택

### 프론트엔드
- **React 18.3** - UI 라이브러리
- **TypeScript 5.8** - 타입 안정성
- **Vite 5.4** - 빌드 도구
- **Tailwind CSS 3.4** - 스타일링

### 주요 라이브러리
- **html2canvas 1.4** - 이미지 캡처
- **Radix UI** - 접근 가능한 UI 컴포넌트
- **Lucide React** - 아이콘
- **Sonner** - 토스트 알림

### 개발 도구
- **ESLint** - 코드 품질
- **PostCSS** - CSS 처리
- **Autoprefixer** - 브라우저 호환성

## 📁 프로젝트 구조

```
compass-point-tool/
├── src/
│   ├── components/
│   │   ├── CompassPoint.tsx      # 메인 컴포넌트
│   │   ├── DirectionCard.tsx     # 방향 카드 컴포넌트
│   │   └── ui/                   # UI 컴포넌트
│   ├── hooks/
│   │   └── useAutoSave.ts        # 자동 저장 훅
│   ├── assets/                   # 이미지, 아이콘
│   ├── App.tsx                   # 앱 진입점
│   ├── index.css                 # 전역 스타일
│   └── main.tsx                  # React 진입점
├── public/                       # 정적 파일
├── index.html                    # HTML 템플릿
├── package.json                  # 프로젝트 설정
├── tsconfig.json                 # TypeScript 설정
├── vite.config.ts                # Vite 설정
└── tailwind.config.js            # Tailwind 설정
```

## 🎨 디자인 시스템

### 색상 팔레트

```css
/* 방향별 색상 */
--east: hsl(30 95% 55%)      /* 핑크 - 설렘, 기대 */
--west: hsl(210 80% 50%)     /* 그린 - 걱정, 우려 */
--south: hsl(150 60% 45%)    /* 블루 - 필요, 제안 */
--north: hsl(270 60% 55%)    /* 퍼플 - 입장, 태도 */
```

### 타이포그래피
- 기본 폰트: System fonts (-apple-system, BlinkMacSystemFont, 'Malgun Gothic')
- 베이스 크기: 16px
- 줄 높이: 1.6

## 🌐 배포

### GitHub Pages

```bash
# package.json에 homepage 추가
{
  "homepage": "https://plusiam.github.io/compass-point"
}

# 빌드 및 배포
npm run build
# dist 폴더를 GitHub Pages에 배포
```

### Vercel / Netlify

1. GitHub 저장소 연결
2. 빌드 명령어: `npm run build`
3. 출력 디렉토리: `dist`
4. 자동 배포

## 📱 모바일 지원

### iOS
- Safari 완벽 지원
- "공유" → "PDF로 저장" 또는 "인쇄"
- AirPrint 지원

### Android
- Chrome, Samsung Internet 지원
- "인쇄" → "PDF로 저장"
- Google Drive 저장 지원

## 🤝 기여하기

기여를 환영합니다! 다음 단계를 따라주세요:

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### 개발 가이드라인

- TypeScript 사용
- ESLint 규칙 준수
- 접근성 고려 (ARIA 레이블, 키보드 네비게이션)
- 모바일 우선 반응형 디자인
- 의미있는 커밋 메시지

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다. 자세한 내용은 [LICENSE](LICENSE) 파일을 참조하세요.

## 🙏 감사의 말

- [Harvard Project Zero](https://pz.harvard.edu/) - Compass Point Thinking Routine
- [Thinking Routines Toolbox](https://pz.harvard.edu/thinking-routines) - 사고 루틴 리소스

## 📧 연락처

Project Link: [https://github.com/plusiam/compass-point](https://github.com/plusiam/compass-point)

---

<div align="center">

**[⬆ 맨 위로](#-compass-point---사고-가시화-루틴-도구)**

Made with ❤️ for educators and students

</div>
