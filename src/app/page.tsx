"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { handleReportGeneration } from "./action";
import type { SignalReport } from "@/lib/types";

// Define the initial state for our hook
const initialState = {
  report: null,
  error: null,
};

export default function HomePage() {
  const [state, formAction, isPending] = useActionState(
    handleReportGeneration,
    initialState
  );

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">
            GitHub Signal Report
          </CardTitle>
          <CardDescription>
            Enter a GitHub profile URL to generate an instant, non-technical
            analysis.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={formAction} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="github">GitHub Profile URL</Label>
              <Input
                id="github"
                name="github"
                placeholder="https://github.com/fsanchez1397"
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? "Generating..." : "Generate Report"}
            </Button>
            {state.error && (
              <p className="text-sm text-red-500 pt-2 text-center">
                {state.error}
              </p>
            )}
          </form>
        </CardContent>
      </Card>

      {/* Conditionally render the report only on success */}
      {state.report?.success && state.report.profile && (
        <ReportDisplay report={state.report} />
      )}
    </main>
  );
}

// A simple component to display the report results
function ReportDisplay({ report }: { report: SignalReport }) {
  if (!report.success || !report.profile) return null;

  return (
    <Card className="w-full max-w-3xl mt-8 animate-fade-in">
      <CardHeader>
        <div className="flex items-center space-x-4">
          <img
            src={report.profile.avatarUrl}
            alt={report.profile.name || ""}
            className="w-20 h-20 rounded-full border-2 border-gray-200"
          />
          <div>
            <CardTitle className="text-2xl">{report.profile.name}</CardTitle>
            <CardDescription className="text-md">
              @{report.profile.username}
            </CardDescription>
            <p className="text-sm text-gray-600 pt-1">{report.profile.bio}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="font-semibold text-lg mb-2">Key Metrics</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-center">
            <div className="bg-gray-50 p-3 rounded-md">
              <p className="text-sm text-gray-500">Activity Signal</p>
              <p
                className={`font-bold text-lg ${
                  report.activitySignal === "Highly Active"
                    ? "text-green-600"
                    : report.activitySignal === "Active"
                    ? "text-yellow-600"
                    : "text-red-600"
                }`}
              >
                {report.activitySignal}
              </p>
            </div>
            <div className="bg-gray-50 p-3 rounded-md">
              <p className="text-sm text-gray-500">Followers</p>
              <p className="font-bold text-lg">{report.profile.followers}</p>
            </div>
            <div className="bg-gray-50 p-3 rounded-md">
              <p className="text-sm text-gray-500">Public Repos</p>
              <p className="font-bold text-lg">{report.profile.publicRepos}</p>
            </div>
          </div>
        </div>
        <div>
          <h3 className="font-semibold text-lg mb-2">Primary Languages</h3>
          <div className="bg-gray-100 p-3 rounded-md text-sm font-mono">
            {JSON.stringify(report.languageStats, null, 2)}
          </div>
        </div>
        <div>
          <h3 className="font-semibold text-lg mb-2">Pinned Repositories</h3>
          <div className="space-y-4">
            {report.pinnedItems?.map((repo) => (
              <div key={repo.name} className="border p-4 rounded-md bg-white">
                <h4 className="font-bold">{repo.name}</h4>
                <p className="text-sm text-gray-600 mb-2">{repo.description}</p>
                <div className="flex space-x-4 text-xs text-gray-500">
                  <span>⭐ {repo.stars}</span>
                  <span>{repo.primaryLanguage}</span>
                  <span>Last commit: {repo.lastCommitDate}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
