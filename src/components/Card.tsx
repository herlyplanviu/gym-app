import { ReactNode } from "react";

function Card({ children }: { children: ReactNode }) {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-6">{children}</div>
  );
}

export default Card;
