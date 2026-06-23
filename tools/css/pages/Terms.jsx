import { Link } from 'react-router-dom'

export default function Terms() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">서비스 이용약관</h1>
      <p className="text-sm text-gray-400 dark:text-gray-500 mb-8">최종 업데이트: 2026년 4월</p>

      <div className="space-y-8 text-gray-700 dark:text-gray-300 text-sm leading-relaxed">

        <section>
          <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-2">1. 서비스 소개</h2>
          <p>CSSKit(이하 "서비스")은 웹 개발자 및 디자이너를 위한 무료 CSS 생성 도구 모음을 제공합니다. 본 약관은 서비스 이용에 관한 조건을 규정합니다.</p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-2">2. 서비스 이용</h2>
          <ul className="space-y-1 ml-4">
            <li>• 본 서비스는 무료로 제공되며 별도의 회원가입이 필요하지 않습니다.</li>
            <li>• 서비스를 통해 생성된 CSS/HTML 코드는 개인 및 상업적 목적으로 자유롭게 사용할 수 있습니다.</li>
            <li>• 서비스를 불법적인 목적으로 사용하거나 타인의 권리를 침해하는 용도로 사용해서는 안 됩니다.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-2">3. 지식재산권</h2>
          <p>서비스의 소스코드, 디자인, 로고 등 콘텐츠의 지식재산권은 CSSKit에 귀속됩니다. 단, 사용자가 서비스를 통해 생성한 CSS 코드에 대한 권리는 사용자에게 있습니다.</p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-2">4. 면책조항</h2>
          <p>본 서비스는 "있는 그대로" 제공됩니다. 서비스 이용으로 인해 발생하는 직·간접적 손해에 대해 CSSKit은 책임을 지지 않습니다. 서비스는 사전 고지 없이 변경되거나 중단될 수 있습니다.</p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-2">5. 광고</h2>
          <p>본 서비스는 Google AdSense를 통한 광고를 게재할 수 있습니다. 광고 콘텐츠는 Google의 정책에 따라 표시되며, 서비스 운영자는 광고 내용에 대한 책임을 지지 않습니다.</p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-2">6. 문의</h2>
          <p>이용약관에 관한 문의사항은 아래 이메일로 연락해 주세요.<br />
          <a href="mailto:rlawhdrl3702@gmail.com" className="text-indigo-600 dark:text-indigo-400 hover:underline">rlawhdrl3702@gmail.com</a></p>
        </section>

      </div>

      <div className="mt-8">
        <Link to="/" className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline">← 홈으로</Link>
      </div>
    </div>
  )
}
