"use client";

import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { PiShuffleBold } from "react-icons/pi";

type Props = {
  seed: number;
  setSeed: Dispatch<SetStateAction<number>>;
};

export function Widget({ seed, setSeed }: Props) {
  const [reload, setReload] = useState<boolean>(false);
  const { t } = useTranslation();

  function onChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    setSeed(Number(e.target.value));
  }

  useEffect(() => {
    const array = new Uint32Array(1);
    window.crypto.getRandomValues(array);
    setSeed(array[0] % 1_000_000);
  }, [reload, setSeed]);

  return (
    <div className="flex flex-col relative border rounded px-3 py-2">
      <label className="text-sm text-gray-500 mb-1">{t("seed")}</label>
      <div className="relative">
        <input
          type="number"
          value={seed}
          onChange={onChangeHandler}
          className="pr-10 w-[140px] cursor-pointer"
        />
        <button
          onClick={() => {
            setReload((prev) => !prev);
          }}
        >
          <PiShuffleBold className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 cursor-pointer" />
        </button>
      </div>
    </div>
  );
}
