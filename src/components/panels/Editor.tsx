import EditorHeader from "../editors/EditorHeader";
import EditorButton from "../editors/EditorButton";
import EditorImage from "../editors/EditorImage";
import EditorParagraph from "../editors/EditorParagraph";
import Content from "../../types/Content";
import ContentType from "../../types/ContentType";

interface Props {
  content: Content[];
  setContent: React.Dispatch<React.SetStateAction<Content[]>>;
}

export default function Editor({ content, setContent }: Props) {
  const renderEditor = (c: Content, i: number) => {
    switch (c.contentType) {
      case ContentType.Header:
        return <EditorHeader content={content} setContent={setContent} i={i} />;
      case ContentType.Button:
        return <EditorButton content={content} setContent={setContent} i={i} />;
      case ContentType.Image:
        return <EditorImage content={content} setContent={setContent} i={i} />;
      case ContentType.Paragraph:
        return (
          <EditorParagraph content={content} setContent={setContent} i={i} />
        );
    }
  };

  const empty = (
    <div className="flex w-full justify-center items-center mt-2">
      <p className="italic font-mono">
        Add some content from the Content Gallery.
      </p>
    </div>
  );

  

  return (
    <div className="flex flex-col gap-4 select-none">
      {content.length > 0
        ? content.map((content: Content, i) => (
            <div key={i}>{renderEditor(content, i)}</div>
          ))
        : empty}
    </div>
  );
}
