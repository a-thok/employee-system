declare const System: any
declare module 'connect-history-api-fallback'
declare module 'chart.js/dist/Chart'
declare module '*.vue'

interface NewBug {
  title: string;
  project: string;
  rank: string;
  category: string[];
  desc: string;
  images: string[];
}

interface Bug extends NewBug {
  _id: string;
  state: number;
  presenter: string;
  resolver: string;
}

interface ImageFile {
  preview: string;
  file: File;
}

interface Journal {
  username: string;
  content: string;
  marked: boolean;
  date?: Date;
}

interface Filter {
  name: string;
  value: string | number;
}

interface Queries {
  page: number;
  size?: number;
  project?: string;
  rank?: string;
  category?: string;
  state?: number;
  keyword?: string;
}
