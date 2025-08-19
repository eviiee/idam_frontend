import type { Metadata } from "next";
import "../globals.scss";
import "./layout.scss";

export const metadata: Metadata = {
  title: "이담리테일 - 로그인",
  description: "이담리테일 로그인",
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="login-page">
        {children}
      </body>
    </html>
  );
}
