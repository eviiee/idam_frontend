import type { Metadata } from "next";
import "../../globals.scss";
import "./layout.scss";
import ConsoleSideBar from "@/components/layout/ConsoleSideBar";
import "react-toastify/dist/ReactToastify.css"
import ToastProvider from "@/components/layout/ToastProvider";
import { ModalProvider } from "@/components/layout/modal/context";

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
        {/* <AdminPage> */}
        <div id="root">
          <div id="app">
            <ToastProvider>
              <ModalProvider>
                <div className="wrap">
                  <ConsoleSideBar />
                  <div className="content scroller">
                    {children}
                  </div>
                </div>
              </ModalProvider>
            </ToastProvider>
          </div>
        </div>
        {/* </AdminPage> */}
      </body>
    </html>
  );
}
