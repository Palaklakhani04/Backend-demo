import React from "react";

type Props = {
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
};

export default function Card({ title, subtitle, children, className }: Props) {
  return (
    <div
      className={`rounded-2xl border border-gray-100 bg-white p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ${className || ""}`}
    >
      {(title || subtitle) && (
        <div className="mb-4">
          {title && (
            <h1 className="text-lg font-semibold text-gray-800">{title}</h1>
          )}
          {subtitle && (
            <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
          )}
        </div>
      )}
      <div>{children}</div>
    </div>
  );
}
