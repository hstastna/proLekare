"use client";

import { FC, useEffect } from "react";

type PageErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export const PageError: FC<PageErrorProps> = ({ error, reset }) => {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="text-center my-default">
      <h1 className="text-text-red-primary font-semibold text-3xl">
        Ajaj, něco se pokazilo
      </h1>
      <button onClick={() => reset()}>Zkusit znova</button>
    </div>
  );
};
