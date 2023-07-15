import Alignment from "./Alignment";
import ContentType from "./ContentType";

type Content = {
  contentType: ContentType;
  body: string;
  dest?: string;
  alignment?: Alignment;
  shadow?: boolean;
};

export default Content;
