import { Film, BookMarked, Music, FileArchive, FileImage, Folder } from "lucide-react";
import type { FileTypeConfig, SearchOperators } from "../types";

export const GOOGLE_BASE = "https://www.google.com/search?q=";

export const OPEN_DIR_EXCLUSIONS =
  `-inurl:(jsp|pl|php|html|aspx|htm|cf|shtml) intitle:index.of -inurl:(listen77|mp3raid|mp3toss|mp3drug|index_of|index-of|wallywashis|downloadmana)`;

export const FILE_TYPES: FileTypeConfig[] = [
  { label: "TV / Movies", value: "mkv|mp4|avi|mov|mpg|wmv|divx|mpeg", Icon: Film },
  { label: "Books & eBooks", value: "MOBI|CBZ|CBR|CBC|CHM|EPUB|FB2|LIT|LRF|ODT|PDF|PRC|PDB|PML|RB|RTF|TCR|DOC|DOCX", Icon: BookMarked },
  { label: "Music / Audio", value: "mp3|wav|ac3|ogg|flac|wma|m4a|aac|mod", Icon: Music },
  { label: "Software / Games", value: "exe|iso|dmg|tar|7z|bz2|gz|rar|zip|apk", Icon: FileArchive },
  { label: "Images", value: "jpg|png|bmp|gif|tif|tiff|psd", Icon: FileImage },
  { label: "Any File Type", value: "", Icon: Folder },
];

export const INITIAL_OPS: SearchOperators = {
  exactPhrase: "", orTerms: "", andTerms: "", excludeTerms: "",
  numberFrom: "", numberTo: "", priceValue: "", priceCurrency: "$",
  site: "", related: "", filetype: "",
  intitle: "", allintitle: "", inurl: "", allinurl: "",
  intext: "", allintext: "", inanchor: "",
  aroundTerm1: "", aroundTerm2: "", aroundDistance: 5,
  before: "", after: "",
  define: "", cache: "", weather: "", stocks: "", map: "", movie: "", source: "", unitConvert: "",
};
