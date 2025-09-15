"use server";

import { z } from "zod";
import type { SignalReport } from "@/lib/types";
import type { PinnedItem } from "@/lib/types";
import type { ReportState } from "@/lib/types";

// Define a clear, type-safe interface for the final report.
// This is the "product" our action will create.

const githubUsernameSchema = z
  .string()
  .url({ message: "Please enter a valid URL." })
  .refine((url) => url.startsWith("https://github.com/"), {
    message: "Please enter a valid GitHub profile URL.",
  });

export async function handleReportGeneration(
  prevState: ReportState,
  formData: FormData
): Promise<ReportState> {
  const username = formData.get("github") as string;

  const validation = githubUsernameSchema.safeParse(username);
  if (!validation.success) {
    return { report: null, error: "Invalid GitHub username provided." };
  }

  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    console.error("CRITICAL: GITHUB_TOKEN is not set.");
    return { success: false, error: "Server configuration error." };
  }

  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  try {
    // 1. Fetch core user data from the REST API
    const userRes = await fetch(`https://api.github.com/users/${username}`, {
      headers,
    });
    if (!userRes.ok) {
      return { success: false, error: "User not found." };
    }
    const userData = await userRes.json();

    // 2. Fetch pinned repositories using the GraphQL API
    const graphqlQuery = {
      query: `
        query PinnedRepos($username: String!) {
          user(login: $username) {
            pinnedItems(first: 6, types: REPOSITORY) {
              nodes {
                ... on Repository {
                  name
                  description
                  stargazerCount
                  forkCount
                  pushedAt
                  primaryLanguage {
                    name
                  }
                  object(expression: "HEAD:") {
                    ... on Tree {
                      entries {
                        name
                      }
                    }
                  }
                }
              }
            }
            contributionsCollection {
              contributionCalendar {
                totalContributions
              }
            }
          }
        }
      `,
      variables: { username },
    };

    const graphqlRes = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers,
      body: JSON.stringify(graphqlQuery),
    });
    const graphqlData = await graphqlRes.json();
    const pinnedNodes = graphqlData.data.user.pinnedItems.nodes;
    const totalContributions =
      graphqlData.data.user.contributionsCollection.contributionCalendar
        .totalContributions;

    const pinnedItems: PinnedItem[] = pinnedNodes.map((repo: any) => {
      const files =
        repo.object?.entries.map((e: any) => e.name.toLowerCase()) || [];
      return {
        name: repo.name,
        description: repo.description,
        primaryLanguage: repo.primaryLanguage?.name || "N/A",
        stars: repo.stargazerCount,
        forks: repo.forkCount,
        lastCommitDate: new Date(repo.pushedAt).toLocaleDateString(),
        professionalism: {
          hasDescription: !!repo.description,
          hasReadme: files.includes("readme.md"),
          hasLicense: files.includes("license") || files.includes("license.md"),
        },
      };
    });

    // 3. Fetch all repos for language stats (can be a heavy call)
    const reposRes = await fetch(
      `https://api.github.com/users/${username}/repos?per_page=100`,
      { headers }
    );
    const reposData = await reposRes.json();
    const langCounts: Record<string, number> = {};
    for (const repo of reposData) {
      if (repo.language) {
        langCounts[repo.language] = (langCounts[repo.language] || 0) + 1;
      }
    }
    const totalReposWithLang = Object.values(langCounts).reduce(
      (sum, count) => sum + count,
      0
    );
    const languageStats: Record<string, number> = {};
    for (const lang in langCounts) {
      languageStats[lang] = Math.round(
        (langCounts[lang] / totalReposWithLang) * 100
      );
    }

    // 4. Determine Activity Signal
    let activitySignal: "Highly Active" | "Active" | "Inactive" = "Inactive";
    if (totalContributions > 500) {
      activitySignal = "Highly Active";
    } else if (totalContributions > 100) {
      activitySignal = "Active";
    }

    // 5. Assemble and return the final report
    return {
      success: true,
      profile: {
        name: userData.name,
        username: userData.login,
        bio: userData.bio,
        followers: userData.followers,
        publicRepos: userData.public_repos,
        avatarUrl: userData.avatar_url,
      },
      activitySignal,
      languageStats,
      pinnedItems,
    };
  } catch (error) {
    console.error("Failed to generate Signal Report:", error);
    return { success: false, error: "An unexpected error occurred." };
  }
}
