import { allContents } from "content-collections";

const DEFAULT_LOCALE = "en";

export const contentsSortedByFilename = (locale: string = DEFAULT_LOCALE) => {
  return allContents.sort((a, b) => {
    return a._meta.fileName.localeCompare(b._meta.fileName, locale);
  });
};
