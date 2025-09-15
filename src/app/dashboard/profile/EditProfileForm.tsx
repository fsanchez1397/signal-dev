"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import type { CandidateProfile } from "@prisma/client";
import type { User } from "@supabase/supabase-js";
import { onSave } from "@/app/dashboard/profile/actions";
import { useActionState } from "react";

interface EditProfileFormProps {
  user: User;
  profile: CandidateProfile;
}
export function EditProfileForm({
  user,
  profile: { firstName, lastName, email, githubUrl, bio, visaNeeded },
}: EditProfileFormProps) {
  const initialState = {
    success: false,
    message: "",
    errors: [],
  };
  const [state, formAction, isPending] = useActionState(onSave, initialState);
  const [isEditing, setIsEditing] = useState(false);
  const [bioLength, setBioLength] = useState(bio?.length ?? 0);
  return (
    <>
      <Button onClick={() => setIsEditing(!isEditing)}>Edit Profile</Button>
      {isEditing && (
        <Card className="w-full">
          <CardHeader className="text-center space-y-2">
            <CardTitle className="text-2xl font-semibold">
              Your Profile
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              Update your professional details.
            </CardDescription>
          </CardHeader>

          <form action={formAction}>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-sm font-medium">
                    First Name
                  </Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    type="text"
                    defaultValue={firstName}
                    placeholder="Enter your first name"
                    className="w-full"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-sm font-medium">
                    Last Name
                  </Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    type="text"
                    required
                    defaultValue={lastName}
                    placeholder="Enter your last name"
                    className="w-full"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">
                  Email Address
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  disabled
                  defaultValue={email}
                  className="w-full bg-muted text-muted-foreground cursor-not-allowed"
                />
                <p className="text-xs text-muted-foreground">
                  Email address cannot be changed
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="githubUrl" className="text-sm font-medium">
                  GitHub URL
                </Label>
                <Input
                  id="githubUrl"
                  name="githubUrl"
                  type="url"
                  defaultValue={githubUrl ?? ""}
                  placeholder="https://github.com/yourusername"
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio" className="text-sm font-medium">
                  Bio
                </Label>
                <Textarea
                  id="bio"
                  name="bio"
                  defaultValue={bio ?? ""}
                  placeholder="Tell us about yourself, your experience, and what you're looking for..."
                  className="w-full min-h-[120px] resize-none"
                  onChange={(e) => setBioLength(e.target.value.length)}
                  maxLength={500}
                />
                <div className="flex justify-between items-center">
                  <p className="text-xs text-muted-foreground">
                    Optional - Share your professional background
                  </p>
                  <p
                    className={`text-xs ${
                      bioLength > 450
                        ? "text-destructive"
                        : "text-muted-foreground"
                    }`}
                  >
                    {bioLength}/500
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="visaNeeded"
                  name="visaNeeded"
                  defaultChecked={visaNeeded ?? undefined}
                />
                <Label
                  htmlFor="visaNeeded"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  I require visa sponsorship
                </Label>
              </div>
            </CardContent>

            <CardFooter>
              <Button type="submit" className="w-full">
                {isPending ? "Saving..." : "Save"}
              </Button>
            </CardFooter>
          </form>
        </Card>
      )}
    </>
  );
}
