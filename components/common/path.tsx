'use client';

import { Fragment } from 'react';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '../ui/breadcrumb';

function Path() {
  const pathname = usePathname();
  const path = pathname
    .split('/')
    .filter(Boolean);

  return (
    <div className="flex border-b p-2">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href={pathname}>/</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>

          {path.map((p, i) => {
            const url = path
              .slice(0, i + 1)
              .join('/');
            return (
              <Fragment key={i}>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link
                      href={'/' + url}
                      className="capitalize"
                    >
                      {p}
                    </Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
              </Fragment>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
}

export default Path;
