import { Link } from 'react-router-dom'

export default function Privacy() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">개인정보처리방침</h1>
      <p className="text-sm text-gray-400 dark:text-gray-500 mb-8">최종 업데이트: 2026년 4월</p>

      <div className="space-y-8 text-gray-700 dark:text-gray-300 text-sm leading-relaxed">

        <section>
          <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-2">1. 수집하는 개인정보</h2>
          <p>CSSKit은 서비스 이용을 위해 별도의 회원가입이나 개인정보 수집을 하지 않습니다. 다만, 서비스 개선을 위해 Google Analytics 및 Google AdSense를 통해 익명의 방문 통계 및 광고 데이터가 수집될 수 있습니다.</p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-2">2. 쿠키 사용</h2>
          <p>본 서비스는 사용자 편의를 위해 다크모드 설정, 언어 설정 등을 브라우저의 로컬 스토리지에 저장합니다. 또한 Google AdSense는 맞춤형 광고 제공을 위해 쿠키를 사용할 수 있습니다.</p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-2">3. 제3자 서비스</h2>
          <p>본 서비스는 다음 제3자 서비스를 사용합니다:</p>
          <ul className="mt-2 space-y-1 ml-4">
            <li>• <strong>Google AdSense</strong>: 광고 게재 (Google 개인정보처리방침 적용)</li>
            <li>• <strong>Google Analytics</strong>: 익명 방문 통계 수집</li>
          </ul>
        </section>

        <section>
          <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-2">4. 개인정보 보호</h2>
          <p>CSSKit은 사용자의 개인정보를 수집·저장하지 않으므로, 별도의 개인정보 보호 조치가 필요하지 않습니다. 모든 CSS 생성 작업은 브라우저 내에서 처리됩니다.</p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-2">5. 문의</h2>
          <p>개인정보처리방침에 관한 문의사항은 아래 이메일로 연락해 주세요.<br />
          <a href="mailto:rlawhdrl3702@gmail.com" className="text-indigo-600 dark:text-indigo-400 hover:underline">rlawhdrl3702@gmail.com</a></p>
        </section>

      </div>

      <div className="mt-8">
        <Link to="/" className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline">← 홈으로</Link>
      </div>
    </div>
  )
}
