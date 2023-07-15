import Alignment from "../../types/Alignment";
import Content from "../../types/Content";
import ContentType from "../../types/ContentType";
import Button from "../Button";
import {
  faFireFlameSimple,
  faFontAwesome,
  faHeader,
  faImage,
  faLeftRight,
  faParagraph,
  faShuffle,
  faSignature,
  faSquare,
  faToggleOn,
  faWater,
} from "@fortawesome/free-solid-svg-icons";

type Props = {
  content: Content[];
  setContent: React.Dispatch<React.SetStateAction<Content[]>>;
  bgGreen: boolean;
  setBgGreen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Gallery({
  content,
  setContent,
  bgGreen,
  setBgGreen,
}: Props) {
  const addItem = (...items: Content[]) => {
    setContent([...content, ...items]);
  };

  const header = (
    <h1 className="text-oasis-green font-mono italic  font-bold text-2xl mt-4 mb-2 text-center">
      Content Gallery
    </h1>
  );

  const options = [
    {
      title: "Add Header",
      action: () => {
        addItem({
          contentType: ContentType.Header,
          body: "I'm a header",
          alignment: Alignment.CENTER,
        });
      },
      body: "Header",
      icon: faHeader,
    },
    {
      title: "Add Paragraph",
      action: () => {
        addItem({
          contentType: ContentType.Paragraph,
          body: "Nulla anim sit reprehenderit ex. Aute sit fugiat ea ad eu reprehenderit do labore. Do et reprehenderit aliqua quis ipsum irure reprehenderit consectetur voluptate pariatur velit qui aliquip est. Proident est proident reprehenderit excepteur et id excepteur magna.",
          alignment: Alignment.LEFT,
        });
      },
      body: "Paragraph",
      icon: faParagraph,
    },
    {
      title: "Add Button",
      action: () => {
        addItem({
          contentType: ContentType.Button,
          body: "Click Me!",
          dest: "",
          alignment: Alignment.CENTER,
        });
      },
      body: "Button",
      icon: faToggleOn,
    },
    {
      title: "Add Image (Custom)",
      action: () => {
        addItem({
          contentType: ContentType.Image,
          body: "Page an image address here",
          shadow: true,
          alignment: Alignment.CENTER,
        });
      },
      body: "Image",
      icon: faImage,
    },
    {
      title: "Add Image (Logo, yellow)",
      action: () => {
        addItem({
          contentType: ContentType.Image,
          body: "https://i.imgur.com/glRQ5mI.png",
          alignment: Alignment.CENTER,
        });
      },
      body: "Logo",
      icon: faFontAwesome,
    },
    {
      title: "Add Image (Palms, wide)",
      action: () => {
        addItem({
          contentType: ContentType.Image,
          body: "https://i.imgur.com/HOyjPXM.png",
          shadow: true,
          alignment: Alignment.CENTER,
        });
      },
      body: "Palms, wide",
      icon: faLeftRight,
    },
    {
      title: "Add Image (Palms, square)",
      action: () => {
        addItem({
          contentType: ContentType.Image,
          body: "https://i.imgur.com/aJQI6mQ.png",
          shadow: true,
          alignment: Alignment.CENTER,
        });
      },
      body: "Palms",
      icon: faSquare,
    },
    {
      title: "Add Image (Pond)",
      action: () => {
        addItem({
          contentType: ContentType.Image,
          body: "https://i.imgur.com/mpwj7QA.png",
          shadow: true,
          alignment: Alignment.CENTER,
        });
      },
      body: "Pond",
      icon: faWater,
    },
    {
      title: "Add Default Message Setup",
      action: () => {
        addItem(
          {
            contentType: ContentType.Header,
            body: "Some Important Headline",
            alignment: Alignment.CENTER,
          },
          {
            contentType: ContentType.Paragraph,
            body: "Nulla anim sit reprehenderit ex. Aute sit fugiat ea ad eu reprehenderit do labore. Do et reprehenderit aliqua quis ipsum irure reprehenderit consectetur voluptate pariatur velit qui aliquip est. Proident est proident reprehenderit excepteur et id excepteur magna.",
            alignment: Alignment.LEFT,
          },
          {
            contentType: ContentType.Image,
            body: "https://i.imgur.com/mpwj7QA.png",
            alignment: Alignment.CENTER,
            shadow: true,
          },
          {
            contentType: ContentType.Paragraph,
            body: "Nulla anim sit reprehenderit ex. Aute sit fugiat ea ad eu reprehenderit do labore. Do et reprehenderit aliqua quis ipsum irure reprehenderit consectetur voluptate pariatur velit qui aliquip est. Proident est proident reprehenderit excepteur et id excepteur magna.",
            alignment: Alignment.LEFT,
          },
          {
            contentType: ContentType.Paragraph,
            body: "<i>Best,<br />The Oasis Team</i>",
            alignment: Alignment.LEFT,
          },
          {
            contentType: ContentType.Header,
            body: "Stay up to date!",
            alignment: Alignment.CENTER,
          },
          {
            contentType: ContentType.Paragraph,
            body: "Follow us on Instagram <a href=\"https://www.instagram.com/oasisneu\">@oasisneu</a> or check <a href=\"https://www.oasisneu.com\">oasisneu.com</a> to keep up with the latest updates.",
            alignment: Alignment.CENTER,
          }
        );
      },
      body: "Template",
      icon: faFireFlameSimple,
    },
    {
      title: "Add Signature",
      action: () => {
        addItem(
          {
            contentType: ContentType.Paragraph,
            body: "<i>Best,<br />The Oasis Team</i>",
            alignment: Alignment.LEFT,
          },
          {
            contentType: ContentType.Header,
            body: "Stay up to date!",
            alignment: Alignment.CENTER,
          },
          {
            contentType: ContentType.Paragraph,
            body: "Follow us on Instagram <a href='instagram.com/oasisneu'>@oasisneu</a> or check <a href='oasisneu.com'>oasisneu.com</a> to keep up with the latest updates.",
            alignment: Alignment.CENTER,
          }
        );
      },
      body: "Signature",
      icon: faSignature,
    },
    {
      title: "Swap Background Color",
      action: () => {
        setBgGreen(!bgGreen);
      },
      body: "Background",
      icon: faShuffle,
    },
  ];

  return (
    <div className="flex flex-col gap-4">
      {header}
      <div className="grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-2">
        {options.map(({ title, action, body, icon }, i) => (
          <Button key={i} title={title} onClick={action} icon={icon}>
            {body}
          </Button>
        ))}
      </div>
    </div>
  );
}
