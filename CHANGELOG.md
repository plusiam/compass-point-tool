# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2025-10-11

### Added
- 🎉 초기 릴리스
- 🧭 Compass Point 4방향 사고 루틴 인터페이스
- 👤 이름/모둠명 입력 기능
- 📊 실시간 작성 진행률 표시
- 💾 자동 저장 기능 (2초 Debounce)
- 🖼️ 고해상도 이미지 다운로드 (PNG)
- 📄 텍스트 파일 다운로드 (TXT)
- 📝 사용자 이름을 포함한 파일명 자동 생성
- ✅ 빈 내용 검증 및 사용자 피드백
- 📱 완전 반응형 디자인 (모바일/태블릿/데스크톱)
- ♿ 접근성 개선 (ARIA, 키보드 네비게이션)
- 🌙 다크모드 지원
- 🔔 Toast 알림 시스템
- 🚀 GitHub Pages 자동 배포 설정

### Technical Details
- React 18 + TypeScript
- Vite 빌드 시스템
- Tailwind CSS (정적 클래스 매핑)
- Radix UI 컴포넌트
- html2canvas (이미지 캡처)
- Custom useAutoSave Hook
- GitHub Actions CI/CD

### Fixed
- ✅ Tailwind CSS 동적 클래스 문제 해결
- ✅ 모바일 반응형 버튼 크기 최적화
- ✅ Textarea 리사이징 개선
- ✅ 초기 렌더링 시 불필요한 저장 방지

### Improved
- 🎨 각 방향별 고유 색상 시스템
- 💡 사용자 경험 개선 (진행률, 자동 저장 표시)
- 🔒 파일명 특수문자 제거 (안전한 파일명)
- 📏 입력 필드 최대 길이 제한
- ⚡ 성능 최적화 (Debounce, Lazy Loading)

## [Unreleased]

### Planned Features
- 🌐 다국어 지원 (한글/영어)
- 📚 예시 답변 갤러리
- 👥 협업 모드
- 📊 교사용 대시보드
- 🎤 음성 입력 지원
- 📤 공유 URL 생성
- 💬 댓글 기능
- 📈 학습 분석 도구

---

For more details, see the [GitHub repository](https://github.com/plusiam/compass-point-tool).
