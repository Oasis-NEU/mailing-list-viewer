import { HTMLAttributes } from "react";
import twMerge from "../twMerge";

interface Props extends HTMLAttributes<HTMLDivElement> {
  colorStyles?: string;
}

export default function Divider({ colorStyles }: Props) {
  const bgColor = "bg-" + (colorStyles ?? "oasis-gray");

  return (
    <div className={twMerge("w-full h-[2px] rounded-full", bgColor)}> </div>
  );
}
