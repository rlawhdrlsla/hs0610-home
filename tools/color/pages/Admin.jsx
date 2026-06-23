import React, { useState, useEffect, useCallback } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend,
} from 'recharts';
import { Shield, Users, TrendingUp, RefreshCw, LogOut, Lock } from 'lucide-react';

const API = '/api/admin';

function LoginScreen({ onLogin }) {
  const [key, setKey] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${API}/verify`, {
        method: 'POST',
        headers: { 'X-Admin-Key': key },
      });
      if (res.ok) {
        sessionStorage.setItem('ck_adminKey', key);
        onLogin(key);
      } else {
        setError('비밀번호가 올바르지 않습니다.');
      }
    } catch {
      setError('서버에 연결할 수 없습니다.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-dark-900 px-4">
      <div className="w-full max-w-sm">
        <div className="bg-dark-800 border border-dark-600 rounded-2xl p-8">
          <div className="flex flex-col items-center mb-6">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-pink-500 flex items-center justify-center mb-3">
              <Lock size={22} className="text-white" />
            </div>
            <h1 className="text-xl font-bold text-white">관리자 로그인</h1>
            <p className="text-sm text-gray-500 mt-1">ColorKit 관리자 전용</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="password"
              value={key}
              onChange={e => setKey(e.target.value)}
              placeholder="관리자 비밀번호"
              required
              className="input"
            />
            {error && <p className="text-sm text-red-400">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-semibold text-sm transition-colors disabled:opacity-50"
            >
              {loading ? '확인 중...' : '로그인'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon: Icon, color }) {
  return (
    <div className="bg-dark-800 border border-dark-600 rounded-2xl p-5">
      <div className="flex items-center gap-3 mb-2">
        <div className={`w-9 h-9 rounded-lg ${color} flex items-center justify-center`}>
          <Icon size={17} className="text-white" />
        </div>
        <span className="text-sm text-gray-400">{title}</span>
      </div>
      <div className="text-3xl font-bold text-white">
        {value?.toLocaleString() ?? '—'}
      </div>
    </div>
  );
}

function Dashboard({ adminKey, onLogout }) {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [days, setDays] = useState(14);
  const [lastUpdated, setLastUpdated] = useState(null);

  const fetchStats = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API}/stats?days=${days}`, {
        headers: { 'X-Admin-Key': adminKey },
      });
      if (res.status === 401) { onLogout(); return; }
      const data = await res.json();
      setStats(data);
      setLastUpdated(new Date());
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, [adminKey, days, onLogout]);

  useEffect(() => { fetchStats(); }, [fetchStats]);

  return (
    <div className="min-h-screen bg-dark-900">
      {/* 헤더 */}
      <div className="bg-dark-800 border-b border-dark-700 px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield size={18} className="text-violet-400" />
            <span className="font-bold text-white">ColorKit 관리자</span>
          </div>
          <div className="flex items-center gap-3">
            {lastUpdated && (
              <span className="text-xs text-gray-500 hidden sm:block">
                업데이트: {lastUpdated.toLocaleTimeString('ko-KR')}
              </span>
            )}
            <button
              onClick={fetchStats}
              disabled={loading}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-dark-700 text-sm text-gray-300 hover:bg-dark-600 transition-colors"
            >
              <RefreshCw size={13} className={loading ? 'animate-spin' : ''} />
              새로고침
            </button>
            <button
              onClick={onLogout}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-dark-700 text-sm text-gray-300 hover:bg-dark-600 transition-colors"
            >
              <LogOut size={13} />
              로그아웃
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-6">
        {/* 요약 카드 */}
        <div className="grid grid-cols-2 gap-4">
          <StatCard title="전체 방문자" value={stats?.visitorsTotal} icon={Users} color="bg-violet-600" />
          <StatCard title="오늘 방문자" value={stats?.todayVisitors} icon={TrendingUp} color="bg-pink-500" />
        </div>

        {/* 일별 차트 */}
        <div className="bg-dark-800 border border-dark-600 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-semibold text-white">일별 방문자 추이</h2>
            <div className="flex gap-1">
              {[7, 14, 30].map(d => (
                <button
                  key={d}
                  onClick={() => setDays(d)}
                  className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                    days === d
                      ? 'bg-violet-600 text-white'
                      : 'bg-dark-700 text-gray-400 hover:bg-dark-600'
                  }`}
                >
                  {d}일
                </button>
              ))}
            </div>
          </div>

          {loading ? (
            <div className="h-52 flex items-center justify-center text-gray-500 text-sm">
              불러오는 중...
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={stats?.daily ?? []} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2e2e2e" />
                <XAxis
                  dataKey="date"
                  tick={{ fontSize: 11, fill: '#9ca3af' }}
                  tickFormatter={v => v.slice(5)}
                />
                <YAxis tick={{ fontSize: 11, fill: '#9ca3af' }} allowDecimals={false} />
                <Tooltip
                  contentStyle={{ background: '#1a1a1a', border: '1px solid #2e2e2e', borderRadius: 8 }}
                  labelStyle={{ color: '#e5e7eb' }}
                  labelFormatter={l => `날짜: ${l}`}
                />
                <Legend wrapperStyle={{ fontSize: 12, color: '#9ca3af' }} />
                <Bar dataKey="visitors" name="방문자" fill="#7c3aed" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Admin() {
  const [adminKey, setAdminKey] = useState(
    () => sessionStorage.getItem('ck_adminKey') || null
  );

  function handleLogin(key) { setAdminKey(key); }
  function handleLogout() {
    sessionStorage.removeItem('ck_adminKey');
    setAdminKey(null);
  }

  if (!adminKey) return <LoginScreen onLogin={handleLogin} />;
  return <Dashboard adminKey={adminKey} onLogout={handleLogout} />;
}
