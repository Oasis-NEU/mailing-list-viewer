import twMerge from "./twMerge";
import Alignment from "./types/Alignment";
import Content from "./types/Content";
import ContentType from "./types/ContentType";

const oasisGreen = "rgb(57 115 103)";
const oasisGray = "rgb(110 126 133)";
const oasisYellow = "rgb(240 194 55)";
const oasisExtraLight = "rgb(255, 255, 255)";
const oasisBlue = "rgb(0 38 66)";
const oasisLight = "rgb(236, 240, 241)";

export const renderHeader = (
  c: Content,
  i: number,
  bgGreen: boolean
): string => {
  return (
    '<h1 style="' +
    twMerge(
      "font-size: 1.5rem;",
      "line-height: 2rem;",
      "font-weight: 700;",
      c.alignment === Alignment.CENTER
        ? "text-align: center;"
        : "text-align: left;",
      i === 0 ? "" : "margin-top: 2rem;",
      bgGreen ? "color: " + oasisGreen + ";" : "color:" + oasisGray + ";"
    ) +
    '">' +
    c.body +
    "</h1>"
  );
};
export const renderButton = (c: Content, i: number): string => {
  return (
    '<div style="' +
    twMerge(
      "display: flex; flex-direction: row;",
      c.alignment === Alignment.LEFT
        ? "justify-content: flex-start;"
        : "justify-content: center;"
    ) +
    '">' +
    '<a style="' +
    twMerge(
      "margin-top: 0.5rem; margin-bottom: 0.5rem;",
      "background-color: " + oasisYellow + ";",
      "color: " + oasisExtraLight + ";",
      "font-weight: 700;",
      "text-decoration-line: none;",
      "padding: 0.75rem;",
      "border-radius: 0.375rem;",
      "box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.1);"
    ) +
    '" href="' +
    c.dest +
    '">' +
    c.body +
    "</a></div>"
  );
};

/*

style="' +
  twMerge(
    "margin-top: 2rem; margin-bottom: 2rem;",
    c.alignment === Alignment.CENTER
      ? "margin-left: auto; margin-right: auto;"
      : ""
  ) +
  '"
*/

export const renderImage = (c: Content, i: number): string =>
  '<table style="width: 100%;"><tr><td style="text-align: center;"><img style="margin: auto auto auto auto; max-height: 12rem; ' +
  (c.shadow ? "box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);" : "") +
  '" src=' +
  c.body +
  " /></td></tr></table>";

export const renderParagraph = (c: Content, i: number): string =>
  '<p style="' +
  twMerge(
    "color: " + oasisBlue + ";",
    "margin-top: 0.5rem; margin-bottom: 0.5rem;",
    c.alignment === Alignment.CENTER
      ? "text-align: center;"
      : "text-align: left;"
  ) +
  '">' +
  c.body.replace("\n", "<br />") +
  "</p>";

function buildContentItem(c: Content, i: number, bgGreen: boolean): string {
  switch (c.contentType) {
    case ContentType.Header:
      return renderHeader(c, i, bgGreen);
    case ContentType.Button:
      return renderButton(c, i);
    case ContentType.Image:
      return renderImage(c, i);
    case ContentType.Paragraph:
      return renderParagraph(c, i);
  }
}

export function buildContent(c: Content[], bgGreen: boolean): string {
  return (
    '<center><table border="0" height="100%" width="600px"><tr style="background-color: ' +
    (bgGreen ? oasisGreen : oasisYellow) +
    ';"><td style="text-align: center;"><img src="https://i.imgur.com/EFgQitP.png" alt="Oasis Logo" style="height: 8rem; margin: auto auto auto auto;" /></td></tr><tr style=""><td border="0" style="color: ' +
    oasisBlue +
    "; background-color: " +
    oasisLight +
    '; padding: 2rem 2rem 2rem 2rem;">' +
    c.map((c, i) => buildContentItem(c, i, bgGreen)).join("\n") +
    '</td></tr><tr style="background-color: ' +
    (bgGreen ? oasisGreen : oasisYellow) +
    ';"><td border="0px" style="height: 12rem; color: ' +
    oasisLight +
    ';"><p style="' +
    twMerge(
      "margin: auto auto auto auto;",
      "text-align: center;",
      "max-width: 480px;"
    ) +
    '">Oasis is a proud participant in the Khoury College of Computer Sciences community at Northeastern University in Boston, MA.<br/><br/> If you\'d like to stop receiving emails, <a href="https://oasisneu.com/unsubscribe" style="' +
    twMerge(
      "color: " + oasisLight + ";",
      "font-style: italic; text-decoration-line: underline;"
    ) +
    '">click here</a> to unsubscribe.<br/></p></td></tr></table></center>'
  );
}

export function exportBuild(c: Content[], bgGreen: boolean): string {
  return (
    '<!DOCTYPE html><meta http-equiv="Content-Type" content="text/html charset=UTF-8" /><html><head><style>a {color: ' +
    oasisGreen +
    '; font-weight: bold; font-style: italic;} table { border-collapse: collapse; }</style></head><body style="max-width: 600px; width: 100%; margin: 0px; font-family: sans-serif;">' +
    buildContent(c, bgGreen) +
    "</body></html>"
  );
}

export function createDownload(content: Content[], bgGreen: boolean) {
  const file = new File([exportBuild(content, bgGreen)], "new-email.html", {
    type: "text/plain",
  });

  function download() {
    const link = document.createElement("a");
    const url = URL.createObjectURL(file);

    link.href = url;
    link.download = file.name;
    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  }

  download();
}
