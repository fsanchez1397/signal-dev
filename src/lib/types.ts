export interface ActionResult {
  success: boolean;
  message?: string;
  errors?: {
    field?: string;
    message: string;
  }[];
}
export interface SignalReport {
  success: boolean;
  error?: string;
  profile?: {
    name: string | null;
    username: string;
    bio: string | null;
    followers: number;
    publicRepos: number;
    avatarUrl: string;
  };
  activitySignal?: "Highly Active" | "Active" | "Inactive";
  languageStats?: Record<string, number>;
  pinnedItems?: PinnedItem[];
}
export interface PinnedItem {
  name: string;
  description: string | null;
  primaryLanguage: string | null;
  stars: number;
  forks: number;
  lastCommitDate: string;
  professionalism: {
    hasDescription: boolean;
    hasReadme: boolean;
    hasLicense: boolean;
  };
}
export interface ReportState {
  report: SignalReport | null;
  error: string | null;
}
