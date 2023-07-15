import { FontawesomeObject } from "@fortawesome/fontawesome-svg-core";
import {
  FontAwesomeIcon,
  FontAwesomeIconProps,
} from "@fortawesome/react-fontawesome";
import { ReactNode } from "react";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  children?: ReactNode;
  icon: FontAwesomeIconProps["icon"];
}

export default function Button({
  title,
  onClick,
  children,
  icon,
  ...attributes
}: Props) {
  return (
    <button
      className="bg-oasis-green text-oasis-extra-light shadow-md p-2 px-4 rounded-md hover:bg-opacity-90 font-mono xl:text-lg text-sm flex flex-row justify-center items-center"
      onClick={onClick}
      title={title}
      {...attributes}
    >
      <FontAwesomeIcon icon={icon} className="xs:mr-2" />
      <div className="hidden xs:block">{children}</div>
    </button>
  );
}
