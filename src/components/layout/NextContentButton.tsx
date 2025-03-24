"use client";

import { FC, MouseEvent, useState } from "react";
import { navItems } from "@/lib/constants";
import { redirect } from "next/navigation";

type NextContentButtonProps = {
  totalPages: number;
};

export const NextContentButton: FC<NextContentButtonProps> = ({
  totalPages,
}) => {
  const [page, setPage] = useState(1);

  const isDisabled = page >= totalPages;

  const handleClick = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    const newPage = page + 1;

    setPage(newPage);
    redirect(`${navItems.clanky.href}?page=${newPage}`);
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
