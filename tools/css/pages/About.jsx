import { Link } from 'react-router-dom'

export default function About() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">CSSKit 소개</h1>
      <p className="text-gray-500 dark:text-gray-400 mb-8">무료 CSS 생성기 도구 모음</p>

      <div className="space-y-6 text-gray-700 dark:text-gray-300 leading-relaxed">
        <p>
          CSSKit은 웹 개발자와 디자이너를 위한 무료 CSS 생성기 도구 모음입니다.
          복잡한 CSS 속성을 직관적인 슬라이더와 인터페이스로 조작하고,
          완성된 코드를 바로 복사해서 사용할 수 있습니다.
        </p>

        <div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">제공 도구</h2>
          <ul className="space-y-2 text-sm">
            {[
              ['레이아웃 빌더', '드래그 앤 드롭으로 레이아웃 구성 및 HTML/CSS 코드 생성'],
              ['텍스트 스타일러', '폰트 크기·굵기·행간·자간·색상 조절'],
              ['박스 섀도우', '그림자 레이어를 추가하고 실시간으로 조절'],
              ['테두리 둥글기', '각 모서리의 border-radius 개별 조절'],
              ['플렉스박스 빌더', 'flex 속성을 클릭으로 설정'],
              ['버튼 생성기', '버튼 스타일 완성 및 CSS 복사'],
              ['박스 모델', 'margin·padding·border 시각화'],
            ].map(([name, desc]) => (
              <li key={name} className="flex gap-2">
                <span className="text-indigo-500 shrink-0">•</span>
                <span><strong className="text-gray-900 dark:text-white">{name}</strong> — {desc}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">특징</h2>
          <ul className="space-y-1 text-sm">
            {['완전 무료, 로그인 불필요', '한국어·영어·일본어·중국어 지원', '다크모드 지원', '모바일 반응형 디자인'].map(f => (
              <li key={f} className="flex gap-2"><span className="text-indigo-500">✓</span>{f}</li>
            ))}
          </ul>
        </div>

        <div className="pt-4 border-t border-gray-200 dark:border-gray-800 text-sm text-gray-500 dark:text-gray-400">
          문의: <a href="mailto:rlawhdrl3702@gmail.com" className="text-indigo-600 dark:text-indigo-400 hover:underline">rlawhdrl3702@gmail.com</a>
        </div>
      </div>

      <div className="mt-8">
        <Link to="/" className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline">← 홈으로</Link>
      </div>
    </div>
  )
}
