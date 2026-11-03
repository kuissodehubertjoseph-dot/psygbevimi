import articlesJson from './articles.json';
import ebei from './tests/ebei.json';
import ebcdp from './tests/ebcdp.json';
import workplaceWellness from './tests/workplace-wellness.json';

export interface Article {
  id: string;
  slug: string;
  title: string;
  category: string;
  imageUrl: string | null;
  readingTime: string | null;
  createdAt: string;
  commentsCount: number;
  /** Texte de l'article, en Markdown */
  content: string;
}

export const ARTICLES: Article[] = articlesJson as Article[];

export interface TestQuestion {
  id: string;
  text: string;
  scale: { min: number; max: number; labels: Record<string, string> };
  isNegative?: boolean;
}

export interface TestDimension {
  id: string;
  label: string;
  questionIds: string[];
}

export interface TestDefinition {
  id: string;
  name: string;
  description: string;
  duration: string;
  questions: TestQuestion[];
  dimensions?: TestDimension[];
}

export const TESTS: Record<string, TestDefinition> = {
  ebei: ebei as TestDefinition,
  ebcdp: ebcdp as TestDefinition,
  'workplace-wellness': workplaceWellness as TestDefinition,
};

export const formatArticleDate = (iso: string): string =>
  new Date(iso).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
