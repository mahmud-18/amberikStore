"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaChevronRight } from "react-icons/fa";

const Breadcrumb = () => {
  const pathname = usePathname();
  const paths = pathname.split("/").filter(Boolean);

  if (paths.length === 0) return null;

  const breadcrumbs = paths.map((path, index) => {
    const href = `/${paths.slice(0, index + 1).join("/")}`;
    const label = path
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
    const isLast = index === paths.length - 1;

    return {
      href,
      label,
      isLast,
    };
  });

  return (
    <nav className="flex items-center space-x-2 text-sm py-4 px-4 bg-white/50 backdrop-blur-sm rounded-lg">
      <Link
        href="/"
        className="text-gray-500 hover:text-pink-500 transition-colors duration-300"
      >
        Beranda
      </Link>
      {breadcrumbs.map((breadcrumb, index) => (
        <div key={breadcrumb.href} className="flex items-center space-x-2">
          <FaChevronRight className="text-gray-400" size={12} />
          {breadcrumb.isLast ? (
            <span className="text-pink-500 font-medium">
              {breadcrumb.label}
            </span>
          ) : (
            <Link
              href={breadcrumb.href}
              className="text-gray-500 hover:text-pink-500 transition-colors duration-300"
            >
              {breadcrumb.label}
            </Link>
          )}
        </div>
      ))}
    </nav>
  );
};

export default Breadcrumb;
