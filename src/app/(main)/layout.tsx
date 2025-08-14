import type { Metadata } from "next";
import "../globals.scss";
import "./layout.scss";
import NavigationBar from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "이담리테일",
  description: "1개도 도매 가격에, 스마트한 구매",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <div id="root">
          <div id="app">
            <div className="wrap">
              <NavigationBar />
              <div className="content">
                {children}
                <Footer />
              </div>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
