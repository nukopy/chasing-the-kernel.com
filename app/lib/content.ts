import { allContents } from "content-collections";
import type { Content } from "content-collections";

export function getContentsByLanguage(language: string): Content[] {
  return allContents.filter(content => content.language === language);
}

export function getContentBySlugAndLanguage(slug: string, language: string): Content | undefined {
  return allContents.find(content => 
    content._meta.path.endsWith(slug) && content.language === language
  );
}