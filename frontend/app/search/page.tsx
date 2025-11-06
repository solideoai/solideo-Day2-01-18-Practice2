'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface Location {
  name: string
  address: string
  lat: number
  lng: number
}

export default function SearchPage() {
  const router = useRouter()
  const [origin, setOrigin] = useState<Location | null>(null)
  const [destination, setDestination] = useState<Location | null>(null)
  const [originInput, setOriginInput] = useState('')
  const [destinationInput, setDestinationInput] = useState('')
  const [departureDate, setDepartureDate] = useState('')
  const [departureTime, setDepartureTime] = useState('')
  const [transportMode, setTransportMode] = useState('transit')

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()

    // TODO: Implement actual route search with Google Maps API
    console.log({
      origin,
      destination,
      departureDate,
      departureTime,
      transportMode
    })

    alert('경로 검색 기능은 Google Maps API 연동 후 구현됩니다.')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <h1
              className="text-2xl font-bold text-blue-600 cursor-pointer"
              onClick={() => router.push('/dashboard')}
            >
              TripSync
            </h1>
            <button
              onClick={() => router.push('/dashboard')}
              className="text-gray-600 hover:text-gray-900"
            >
              ← 대시보드
            </button>
          </div>
        </div>
      </header>

      {/* Search Form */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">여행 경로 검색</h2>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <form onSubmit={handleSearch} className="space-y-6">
              {/* Origin */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  출발지
                </label>
                <input
                  type="text"
                  value={originInput}
                  onChange={(e) => setOriginInput(e.target.value)}
                  placeholder="출발지를 입력하세요"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                <p className="mt-1 text-xs text-gray-500">
                  예: 서울역, 강남구 테헤란로, 주소 등
                </p>
              </div>

              {/* Destination */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  목적지
                </label>
                <input
                  type="text"
                  value={destinationInput}
                  onChange={(e) => setDestinationInput(e.target.value)}
                  placeholder="목적지를 입력하세요"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                <p className="mt-1 text-xs text-gray-500">
                  예: 부산역, 제주시, 주소 등
                </p>
              </div>

              {/* Date and Time */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    출발 날짜
                  </label>
                  <input
                    type="date"
                    value={departureDate}
                    onChange={(e) => setDepartureDate(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    출발 시간
                  </label>
                  <input
                    type="time"
                    value={departureTime}
                    onChange={(e) => setDepartureTime(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>

              {/* Transport Mode */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  교통수단
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <button
                    type="button"
                    onClick={() => setTransportMode('transit')}
                    className={`p-3 border-2 rounded-lg transition ${
                      transportMode === 'transit'
                        ? 'border-blue-600 bg-blue-50 text-blue-700'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="text-2xl mb-1">🚇</div>
                    <div className="text-sm font-medium">대중교통</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setTransportMode('driving')}
                    className={`p-3 border-2 rounded-lg transition ${
                      transportMode === 'driving'
                        ? 'border-blue-600 bg-blue-50 text-blue-700'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="text-2xl mb-1">🚗</div>
                    <div className="text-sm font-medium">자동차</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setTransportMode('train')}
                    className={`p-3 border-2 rounded-lg transition ${
                      transportMode === 'train'
                        ? 'border-blue-600 bg-blue-50 text-blue-700'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="text-2xl mb-1">🚄</div>
                    <div className="text-sm font-medium">기차</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setTransportMode('flight')}
                    className={`p-3 border-2 rounded-lg transition ${
                      transportMode === 'flight'
                        ? 'border-blue-600 bg-blue-50 text-blue-700'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="text-2xl mb-1">✈️</div>
                    <div className="text-sm font-medium">항공</div>
                  </button>
                </div>
              </div>

              {/* Search Button */}
              <button
                type="submit"
                className="w-full py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
              >
                경로 검색
              </button>
            </form>
          </div>

          {/* Info Box */}
          <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-semibold text-blue-900 mb-2">💡 검색 팁</h3>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• 정확한 주소나 건물명을 입력하면 더 정확한 결과를 얻을 수 있습니다</li>
              <li>• 대중교통 이용 시 실시간 교통정보를 반영합니다</li>
              <li>• 여러 교통수단을 비교하여 최적의 경로를 찾아보세요</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  )
}
