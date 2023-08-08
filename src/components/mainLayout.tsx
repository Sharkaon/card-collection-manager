import { ReactNode } from "react";

const MainLayout = ({ children }: { children: ReactNode }) => 
  <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
    <div className="w-screen flex flex-col items-center justify-center gap-12 px-4 py-16 ">
      { children }
    </div>
  </main>
;

export default MainLayout;
