import * as Icons from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";

// Types
import {
  IconDefinition,
  IconPrefix,
  IconPack,
} from "@fortawesome/free-solid-svg-icons";

// Type that `library.add()` expects.
type IconDefinitionOrPack = IconDefinition | IconPack;

interface ImportedIcons {
  [key: string]: IconPrefix | IconDefinitionOrPack;
}

// Type `Icons` as a interface containing keys whose values are
// union of the resulting union type from above and `IconPrefix`.
const iconList = Object.keys(Icons)
  .filter((key) => key !== "fas" && key !== "prefix")
  .map((icon) => (Icons as ImportedIcons)[icon]);

const importFontAwesome = () => {
  library.add(...(iconList as IconDefinitionOrPack[]));
};

export default importFontAwesome;
