import {
  ChevronLeftIcon,
  ChevronRightIcon,
  MoreHorizontalIcon,
} from "lucide-react";
import * as React from "react";

import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { usePathname, useSearchParams } from "next/navigation";

export default function PaginationComponent({
  prev_page_url,
  next_page_url,
  links,
}: {
  prev_page_url: string | null;
  next_page_url: string | null;
  links: {
    active: boolean;
    label: string;
    url: string;
  }[];
}) {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  // Function to build the href for pagination links
  const getPaginationHref = (targetUrl: string | null) => {
    if (!targetUrl) return pathname;

    try {
      const targetUrlObj = new URL(targetUrl);
      const targetPageParam = targetUrlObj.searchParams.get("page");

      const newSearchParams = new URLSearchParams(searchParams.toString());

      if (targetPageParam) {
        newSearchParams.set("page", targetPageParam);
      } else {
        newSearchParams.delete("page");
      }

      return `${pathname}?${newSearchParams.toString()}`;
    } catch (error) {
      console.error("Error constructing pagination href:", error);
      return "#";
    }
  };

  return (
    <Pagination>
      <PaginationContent>
        {prev_page_url !== null ? (
          <PaginationItem>
            <PaginationPrevious href={getPaginationHref(prev_page_url)} />
          </PaginationItem>
        ) : null}
        {links
          .filter((link) => Number.parseInt(link.label))
          .map((link) => (
            <PaginationItem key={link.url}>
              <PaginationLink
                href={getPaginationHref(link.url)}
                isActive={link.active}
              >
                {link.label}
              </PaginationLink>
            </PaginationItem>
          ))}
        {next_page_url !== null ? (
          <PaginationItem>
            <PaginationNext href={getPaginationHref(next_page_url)} />
          </PaginationItem>
        ) : null}
      </PaginationContent>
    </Pagination>
  );
}

function Pagination({ className, ...props }: React.ComponentProps<"nav">) {
  return (
    <nav
      role="navigation"
      aria-label="pagination"
      data-slot="pagination"
      className={cn("mx-auto flex w-full justify-center", className)}
      {...props}
    />
  );
}

function PaginationContent({
  className,
  ...props
}: React.ComponentProps<"ul">) {
  return (
    <ul
      data-slot="pagination-content"
      className={cn("flex flex-row items-center gap-1", className)}
      {...props}
    />
  );
}

function PaginationItem({ ...props }: React.ComponentProps<"li">) {
  return <li data-slot="pagination-item" {...props} />;
}

type PaginationLinkProps = {
  isActive?: boolean;
} & Pick<React.ComponentProps<typeof Button>, "size"> &
  React.ComponentProps<"a">;

function PaginationLink({
  className,
  isActive,
  size = "icon",
  ...props
}: PaginationLinkProps) {
  return (
    <a
      aria-current={isActive ? "page" : undefined}
      data-slot="pagination-link"
      data-active={isActive}
      className={cn(
        buttonVariants({
          variant: isActive ? "outline" : "ghost",
          size,
        }),
        className
      )}
      {...props}
    />
  );
}

function PaginationPrevious({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) {
  return (
    <PaginationLink
      aria-label="Go to previous page"
      size="default"
      className={cn("gap-1 px-2.5 sm:pl-2.5", className)}
      {...props}
    >
      <ChevronLeftIcon />
      <span className="hidden sm:block">Previous</span>
    </PaginationLink>
  );
}

function PaginationNext({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) {
  return (
    <PaginationLink
      aria-label="Go to next page"
      size="default"
      className={cn("gap-1 px-2.5 sm:pr-2.5", className)}
      {...props}
    >
      <span className="hidden sm:block">Next</span>
      <ChevronRightIcon />
    </PaginationLink>
  );
}

function PaginationEllipsis({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      aria-hidden
      data-slot="pagination-ellipsis"
      className={cn("flex size-9 items-center justify-center", className)}
      {...props}
    >
      <MoreHorizontalIcon className="size-4" />
      <span className="sr-only">More pages</span>
    </span>
  );
}

export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
};
