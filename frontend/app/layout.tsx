import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TripSync - AI 기반 여행 플래너",
  description: "실시간 교통정보와 AI 추천을 통한 개인화 여행 플래너",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
