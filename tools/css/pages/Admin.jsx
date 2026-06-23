import { useState, useEffect, useCallback } from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'

const API = '/api/admin'

function LoginScreen({ onLogin }) {
  const [key, setKey] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch(`${API}/verify`, { method: 'POST', headers: { 'X-Admin-Key': key } })
      if (res.ok) { sessionStorage.setItem('csskit_adminKey', key); onLogin(key) }
      else setError('비밀번호가 올바르지 않습니다.')
    } catch { setError('서버에 연결할 수 없습니다.') }
    finally { setLoading(false) }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950 px-4">
      <div className="w-full max-w-sm bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 p-8">
        <div className="flex flex-col items-center mb-6">
          <div className="w-11 h-11 rounded-xl bg-indigo-600 flex items-center justify-center mb-3 text-white text-xl">🔒</div>
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">관리자 로그인</h1>
          <p className="text-sm text-gray-400 mt-1">CSSKit 관리자 전용</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="password" value={key} onChange={e => setKey(e.target.value)}
            placeholder="관리자 비밀번호" required
            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
          {error && <p className="text-sm text-red-500">{error}</p>}
          <button type="submit" disabled={loading}
            className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm transition-colors disabled:opacity-50">
            {loading ? '확인 중...' : '로그인'}
          </button>
        </form>
      </div>
    </div>
  )
}

function StatCard({ title, value, color }) {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-5">
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">{title}</p>
      <p className={`text-3xl font-bold ${color}`}>{value?.toLocaleString() ?? '—'}</p>
    </div>
  )
}

function Dashboard({ adminKey, onLogout }) {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [lastUpdated, setLastUpdated] = useState(null)

  const fetchStats = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch(`${API}/stats`, { headers: { 'X-Admin-Key': adminKey } })
      if (res.status === 401) { onLogout(); return }
      setStats(await res.json())
      setLastUpdated(new Date())
    } catch (e) { console.error(e) }
    finally { setLoading(false) }
  }, [adminKey, onLogout])

  useEffect(() => { fetchStats() }, [fetchStats])

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* 헤더 */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <span className="font-bold text-gray-900 dark:text-white">CSSKit 관리자</span>
          <div className="flex items-center gap-3">
            {lastUpdated && (
              <span className="text-xs text-gray-400 hidden sm:block">
                업데이트: {lastUpdated.toLocaleTimeString('ko-KR')}
              </span>
            )}
            <button onClick={fetchStats} disabled={loading}
              className="text-xs px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
              {loading ? '...' : '새로고침'}
            </button>
            <button onClick={onLogout}
              className="text-xs px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
              로그아웃
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-6">
        {/* 요약 카드 */}
        <div className="grid grid-cols-2 gap-4">
          <StatCard title="전체 방문자" value={stats?.visitorsTotal} color="text-indigo-600 dark:text-indigo-400" />
          <StatCard title="오늘 방문자" value={stats?.todayVisitors} color="text-purple-600 dark:text-purple-400" />
        </div>

        {/* 일별 차트 */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
          <h2 className="font-semibold text-gray-900 dark:text-white mb-5">최근 30일 방문자 추이</h2>
          {loading ? (
            <div className="h-52 flex items-center justify-center text-gray-400 text-sm">불러오는 중...</div>
          ) : (
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={stats?.daily ?? []} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="date" tick={{ fontSize: 10 }} tickFormatter={v => v.slice(5)} />
                <YAxis tick={{ fontSize: 11 }} allowDecimals={false} />
                <Tooltip labelFormatter={l => `날짜: ${l}`} formatter={v => [v, '방문자']} />
                <Bar dataKey="visitors" fill="#6366f1" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* 일별 테이블 */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-800">
            <h2 className="font-semibold text-gray-900 dark:text-white">일별 방문자 상세</h2>
          </div>
          <div className="overflow-x-auto max-h-72 overflow-y-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 dark:bg-gray-800 sticky top-0">
                <tr>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">날짜</th>
                  <th className="text-right px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">방문자</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {[...(stats?.daily ?? [])].reverse().map(d => (
                  <tr key={d.date} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                    <td className="px-6 py-2.5 text-gray-700 dark:text-gray-300">{d.date}</td>
                    <td className="px-6 py-2.5 text-right font-mono text-gray-900 dark:text-white">{d.visitors}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Admin() {
  const [adminKey, setAdminKey] = useState(() => sessionStorage.getItem('csskit_adminKey') || null)

  function handleLogout() {
    sessionStorage.removeItem('csskit_adminKey')
    setAdminKey(null)
  }

  if (!adminKey) return <LoginScreen onLogin={setAdminKey} />
  return <Dashboard adminKey={adminKey} onLogout={handleLogout} />
}
