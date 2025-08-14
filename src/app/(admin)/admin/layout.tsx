import type { Metadata } from "next";
import "../../globals.scss";
import "./layout.scss";
import ConsoleSideBar from "@/components/layout/ConsoleSideBar";

export const metadata: Metadata = {
  title: "이담리테일 관리자",
  description: "이담리테일 관리자 페이지",
};

export default function AdminLayout({
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
              <ConsoleSideBar />
              <div className="content">
                {children}
              </div>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
