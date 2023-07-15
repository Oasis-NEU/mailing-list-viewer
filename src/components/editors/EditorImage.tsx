import {
  faToggleOn,
  faToggleOff,
  faArrowUp,
  faArrowDown,
  faAlignCenter,
  faAlignLeft,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import twMerge from "../../twMerge";
import Alignment from "../../types/Alignment";
import Content from "../../types/Content";

type Props = {
  content: Content[];
  setContent: React.Dispatch<React.SetStateAction<Content[]>>;
  i: number;
};

export default function EditorImage({ content, setContent, i }: Props) {
  return (
    <div className="w-full flex flex-row gap-2">
      <input
        className={twMerge("flex-1 p-1 ring-2 ring-oasis-green rounded-md")}
        key={i}
        type="text"
        value={content[i].body}
        onChange={(e) => {
          setContent(
            content.map((co, ind) => {
              if (ind === i) {
                return {
                  contentType: content[i].contentType,
                  body: e.target.value,
                  alignment: content[i].alignment,
                };
              } else {
                return co;
              }
            })
          );
        }}
      />
      <button
        onClick={() => {
          setContent(
            content.map((co, ind) => {
              if (ind === i) {
                return {
                  contentType: content[i].contentType,
                  body: content[i].body,
                  shadow: !content[i].shadow,
                  alignment: content[i].alignment,
                };
              } else {
                return co;
              }
            })
          );
        }}
      >
        <FontAwesomeIcon
          className={twMerge(
            content[i].shadow
              ? "text-oasis-green"
              : "text-oasis-gray opacity-50"
          )}
          icon={content[i].shadow ? faToggleOn : faToggleOff}
        />
      </button>
      <button
        onClick={() => {
          setContent([
            ...content.slice(0, i - 1),
            content[i],
            content[i - 1],
            ...content.slice(i + 1),
          ]);
        }}
        disabled={i === 0}
      >
        <FontAwesomeIcon
          className={twMerge(
            i === 0 ? "text-oasis-gray opacity-50" : "text-oasis-green",
            " hover:drop-shadow-md"
          )}
          icon={faArrowUp}
        />
      </button>
      <button
        onClick={() => {
          setContent([
            ...content.slice(0, i),
            content[i + 1],
            content[i],
            ...content.slice(i + 2),
          ]);
        }}
        disabled={i === content.length - 1}
      >
        <FontAwesomeIcon
          className={twMerge(
            i === content.length - 1
              ? "text-oasis-gray opacity-50"
              : "text-oasis-green",
            " hover:drop-shadow-md"
          )}
          icon={faArrowDown}
        />
      </button>
      <button
        onClick={() => {
          setContent(
            content.map((co, ind) => {
              if (ind === i) {
                return {
                  contentType: content[i].contentType,
                  body: content[i].body,
                  alignment:
                    content[i].alignment === Alignment.LEFT
                      ? Alignment.CENTER
                      : Alignment.LEFT,
                };
              } else {
                return co;
              }
            })
          );
        }}
      >
        <FontAwesomeIcon
          className="text-oasis-green hover:drop-shadow-md"
          icon={
            content[i].alignment === Alignment.CENTER
              ? faAlignCenter
              : faAlignLeft
          }
        />
      </button>
      <button
        onClick={() => {
          setContent(content.filter((co, ind) => ind !== i));
        }}
      >
        <FontAwesomeIcon
          className="text-oasis-green shadow:sm hover:drop-shadow-md"
          icon={faTrash}
        />
      </button>
    </div>
  );
}
