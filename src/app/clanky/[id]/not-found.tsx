"use client";

import { FC } from "react";

type ContentNotFoundProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

const ContentNotFound: FC<ContentNotFoundProps> = ({ reset }) => {
  return (
    <div className="text-center my-default">
      <h1 className="text-text-red-primary font-semibold text-3xl">
        Ajaj, obsah článku nenalezen
      </h1>
      <button onClick={() => reset()}>Zkusit znova</button>
    </div>
  );
};

export default ContentNotFound;
