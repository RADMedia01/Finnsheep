"use client";

import { usePathname } from 'next/navigation';
import Link from 'next/link';

const ActiveLink = ({ href, children, activeClassName = 'text-blue-700 font-medium', ...props }) => {
  const pathname = usePathname();

  const className = pathname === href ? activeClassName : 'hover:text-blue-500 transition duration-500 ease-in-out';

  return (
    <Link href={href} {...props} className={className}>
      {children}
    </Link>
  );
};

export default ActiveLink;
