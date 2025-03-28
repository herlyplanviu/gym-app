import { ReactNode, useEffect } from "react";

function Layout({ children, title }: { children: ReactNode; title: string }) {
  useEffect(() => {
    document.title = title ? `${title} - Gym App` : "Gym App";
  }, [title]);

  return <div className="min-h-screen bg-gray-100 p-6">{children}</div>;
}

export default Layout;
