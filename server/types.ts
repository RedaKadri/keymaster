export type Stats = {
  language: "english" | "french";
  time: number;
  errors: number;
  wpm: number;
  raw: number;
  timeLine: wpmType[];
};

export type GitHubUser = {
  login: string;
  id: number;
  avatar_url: string;
  email?: string;
};
