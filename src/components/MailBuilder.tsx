import { useEffect, useState } from "react";
import parse from "html-react-parser";
import useLocalStorageState from "use-local-storage-state";
import {
  faHammer,
  faMailBulk,
  faPaperPlane,
  faPencil,
  faTrash,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import twMerge from "../twMerge";
import Content from "../types/Content";
import { createDownload, downloadMailingList, exportBuild } from "../utils";
import Button from "./Button";
import Divider from "./Divider";
import Editor from "./panels/Editor";
import Gallery from "./panels/Gallery";
import ListViewer from "./ListViewer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Email } from "../types/Email";
import { supabase } from "../initSupabase";
import { ErrorBoundary } from "react-error-boundary";
import { BgColor } from "../types/BgColorType";

export default function MailBuilder() {
  const [loadingRows, setLoadingRows] = useState<boolean>(false);
  const [rows, setRows] = useState<Array<Email>>([]);

  const [backgroundColor, setBackgroundColor] = useState<BgColor>("green");
  const [content, setContent] = useLocalStorageState<Content[]>(
    "browser-content",
    {
      defaultValue: [],
    }
  );
  const [showEditor, setShowEditor] = useState<boolean>(true);
  const [showMailingList, setShowMailingList] = useState<boolean>(false);

  const retrieveAll = async () => {
    const { data, error } = await supabase.from("emails").select("*");

    if (!error) {
      setRows(data);
    }
    return;
  };

  useEffect(() => {
    setLoadingRows(true);
    retrieveAll();
    setLoadingRows(false);
  }, []);

  const toolbar = (
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
          onClick={() => setShowMailingList(!showMailingList)}
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
          onClick={() => createDownload(content, backgroundColor)}
          icon={faHammer}
        >
          Export
        </Button>
        <Button
          title={"Generate Mailing List"}
          onClick={() => {
            if (rows.length !== 0) {
              downloadMailingList(rows);
            }
          }}
          icon={faPaperPlane}
        >
          Recipients
        </Button>
      </div>
    </div>
  );

  const mailingList = (
    <>
      <div className="absolute top-0 bottom-0 left-0 right-0 flex flex-col justify-center items-center p-4 pt-8">
        <div
          className="absolute top-0 bottom-0 left-0 right-0 bg-oasis-gray bg-opacity-25 z-10"
          onClick={() => setShowMailingList(false)}
        />
        <div
          className={twMerge(
            "flex flex-col items-end justify-center w-full z-50"
          )}
        >
          
          <button
            onClick={() => setShowMailingList(false)}
            className="flex flex-row  gap-4 justify-center items-center px-4 bg-oasis-green shadow-md hover:shadow-lg rounded-full  w-fit h-10  mb-4 text-oasis-extra-light p-2 text-xl hover:underline transition-all duration-150"
          >
            Close <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>
        <div className="w-full overflow-scroll rounded-xl shadow-xl ring-oasis-green ring-2 z-50">
          <div className="">
            
            <ListViewer
              rows={rows}
              loadingRows={loadingRows}
              retrieveAll={retrieveAll}
            />
          </div>
        </div>
      </div>
    </>
  );

  return (
    <div className="w-full min-h-screen">
      {toolbar}
      <div className="flex flex-col xl:flex-row justify-center gap-12">
        {showMailingList && mailingList}
        <div className={twMerge(showEditor ? "" : "hidden")}>
          <div className="flex flex-col p-4 pt-0 gap-8 my-16 w-full">
            <Editor content={content} setContent={setContent} />
            <Divider />
            <Gallery
              content={content}
              setContent={setContent}
              backgroundColor={backgroundColor}
              setBackgroundColor={setBackgroundColor}
            />
          </div>
        </div>
        <div className={twMerge("flex flex-col items-center py-8")}>
          <div className="shadow-xl">
            <ErrorBoundary
              fallback={
                <div className="flex flex-col gap-2">
                  <p>
                    Unable to load. Invalid content. Fix the HTML error and
                    click Refresh.
                  </p>
                  <button
                    className="p-1 rounded-md bg-oasis-blue text-white"
                    onClick={() => window.location.reload()}
                  >
                    Refresh
                  </button>
                </div>
              }
            >
              {parse(exportBuild(content, backgroundColor))}
            </ErrorBoundary>
          </div>
        </div>
      </div>
    </div>
  );
}
