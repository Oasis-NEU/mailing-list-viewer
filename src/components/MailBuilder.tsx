import { useState } from "react";
import parse from "html-react-parser";
import useLocalStorageState from "use-local-storage-state";
import {
  faHammer,
  faMailBulk,
  faPencil,
  faTrash,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import twMerge from "../twMerge";
import Content from "../types/Content";
import { createDownload, exportBuild } from "../utils";
import Button from "./Button";
import Divider from "./Divider";
import Editor from "./panels/Editor";
import Gallery from "./panels/Gallery";
import ListViewer from "./ListViewer/ListViewer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function MailBuilder() {
  const [bgGreen, setBgGreen] = useState<boolean>(true);
  const [content, setContent] = useLocalStorageState<Content[]>(
    "browser-content",
    {
      defaultValue: [],
    }
  );
  const [showEditor, setShowEditor] = useState<boolean>(true);
  const [showMailingList, setShowMailingList] = useState<boolean>(false);

  return (
    <div className="w-full min-h-screen select-none">
      <div className="sticky top-0 bg-oasis-extra-light p-6 flex flex-row gap-2 justify-between shadow-xl">
        <div className="flex flex-row gap-2">
          <Button
            title={"Toggle Editor"}
            onClick={() => setShowEditor(!showEditor)}
            icon={faPencil}
          >
            {showEditor ? "Show" : "Hide"} Editor
          </Button>
          <Button
            title={"Toggle Mailing List"}
            onClick={() => setShowMailingList(!showEditor)}
            icon={faMailBulk}
          >
            {showEditor ? "Show" : "Hide"} Mailing List
          </Button>
        </div>
        <div className="flex flex-row gap-2">
          <Button
            title={"Reset Content"}
            onClick={() => setContent([])}
            icon={faTrash}
          >
            Reset
          </Button>
          <Button
            title={"Build Page"}
            onClick={() => createDownload(content, bgGreen)}
            icon={faHammer}
          >
            Export
          </Button>
          <Button
            title={"Generate Mailing List"}
            onClick={() => createDownload(content, bgGreen)}
            icon={faMailBulk}
          >
            Recipients
          </Button>
        </div>
      </div>
      <div className="flex flex-col xl:flex-row justify-center gap-12">
        <div className="absolute top-0 bottom-0 left-0 right-0 flex flex-col justify-center items-center p-36">
          <div className="flex flex-col items-end justify-center w-full">
            <button onClick={() => setShowMailingList(false)} className="flex flex-row  gap-4 justify-center items-center px-4 bg-oasis-green shadow-md hover:shadow-lg rounded-full  w-fit h-10  mb-4 text-oasis-extra-light p-2 text-xl hover:underline transition-all duration-150">Close <FontAwesomeIcon icon={faXmark} /></button>
          </div>
          <div className="w-full overflow-scroll rounded-xl shadow-xl ring-oasis-green ring-2">
            <div className="">
              <ListViewer />
            </div>
          </div>
        </div>
        <div className={twMerge(showEditor ? "" : "hidden")}>
          <div className="flex flex-col p-4 pt-0 gap-8 my-8">
            <Editor content={content} setContent={setContent} />
            <Divider />
            <Gallery
              content={content}
              setContent={setContent}
              bgGreen={bgGreen}
              setBgGreen={setBgGreen}
            />
          </div>
        </div>
        <div
          className={twMerge(
            "flex flex-col items-center pb-16" /* ,
            showEditor ? "md:w-1/2" : "w-full" */
          )}
        >
          <div className="shadow-xl">
            {parse(exportBuild(content, bgGreen))}
          </div>
        </div>
      </div>
    </div>
  );
}
