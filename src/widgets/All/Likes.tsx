import { Dispatch, SetStateAction } from "react";
import { useTranslation } from "react-i18next";

type Props = {
  likes: number;
  setLikes: Dispatch<SetStateAction<number>>;
};

export function Widget({ likes, setLikes }: Props) {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col">
      <label className="text-sm text-gray-500 mb-1">
        {t("likes")}: {likes}
      </label>
      <input
        type="range"
        min={0}
        step={0.1}
        max={10}
        value={likes}
        onChange={(e) => setLikes(Number(e.target.value))}
        className="w-[160px]  cursor-pointer"
      />
    </div>
  );
}
