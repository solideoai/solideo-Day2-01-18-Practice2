export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <main className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-gray-900 mb-4">
            TripSync
          </h1>
          <p className="text-2xl text-gray-600 mb-8">
            AI 기반 개인화 여행 플래너
          </p>
          <div className="max-w-2xl mx-auto">
            <p className="text-lg text-gray-700 mb-6">
              실시간 교통정보와 AI 추천을 통해 개인 맞춤형 여행 경험을 제공합니다.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="text-4xl mb-4">🚗</div>
                <h3 className="text-xl font-semibold mb-2">스마트 라우팅</h3>
                <p className="text-gray-600">실시간 교통정보로 최적 경로 제안</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="text-4xl mb-4">🤖</div>
                <h3 className="text-xl font-semibold mb-2">AI 개인화</h3>
                <p className="text-gray-600">취향 분석을 통한 맞춤 추천</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="text-4xl mb-4">🎫</div>
                <h3 className="text-xl font-semibold mb-2">통합 예약</h3>
                <p className="text-gray-600">교통수단부터 숙박까지 원스톱</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
