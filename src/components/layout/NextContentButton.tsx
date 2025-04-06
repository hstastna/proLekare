"use client";

import { FC, MouseEvent } from "react";
import { navItems } from "@/lib/constants";
import { useRouter, useSearchParams } from "next/navigation";

type NextContentButtonProps = {
  totalPages: number;
};

export const NextContentButton: FC<NextContentButtonProps> = ({
  totalPages,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const page = parseInt(searchParams.get("page") || "1", 10);

  const isDisabled = page >= totalPages;

  const handleClick = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    router.push(`${navItems.clanky.href}?page=${page + 1}`);
  };

  return (
    <div className="flex justify-center">
      <button
        disabled={isDisabled}
        className={`
          bg-red-button text-red-primary text-sm font-semibold
          py-2 px-4 rounded-md
          ${isDisabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
        onClick={handleClick}
      >
        Další strana
      </button>
    </div>
  );
};
