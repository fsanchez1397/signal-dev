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

export function EditProfileForm({ user, profile }) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "john.doe@example.com", // Pre-filled disabled field
    githubUrl: "",
    bio: "",
    requiresVisaSponsorship: false,
  });
  const [isEditing, setIsEditing] = useState(false);
  const [bioLength, setBioLength] = useState(0);

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    if (field === "bio" && typeof value === "string") {
      setBioLength(value.length);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted:", formData);
  };

  return (
    <>
      <Button onClick={() => setIsEditing(!isEditing)}>Edit Profile</Button>
      {isEditing ? (
        <Card className="w-full">
          <CardHeader className="text-center space-y-2">
            <CardTitle className="text-2xl font-semibold">
              Your Profile
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              Update your professional details.
            </CardDescription>
          </CardHeader>

          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-sm font-medium">
                    First Name *
                  </Label>
                  <Input
                    id="firstName"
                    type="text"
                    required
                    value={formData.firstName}
                    onChange={(e) =>
                      handleInputChange("firstName", e.target.value)
                    }
                    placeholder="Enter your first name"
                    className="w-full"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-sm font-medium">
                    Last Name *
                  </Label>
                  <Input
                    id="lastName"
                    type="text"
                    required
                    value={formData.lastName}
                    onChange={(e) =>
                      handleInputChange("lastName", e.target.value)
                    }
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
                  type="email"
                  disabled
                  value={formData.email}
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
                  type="url"
                  value={formData.githubUrl}
                  onChange={(e) =>
                    handleInputChange("githubUrl", e.target.value)
                  }
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
                  value={formData.bio}
                  onChange={(e) => {
                    if (e.target.value.length <= 500) {
                      handleInputChange("bio", e.target.value);
                    }
                  }}
                  placeholder="Tell us about yourself, your experience, and what you're looking for..."
                  className="w-full min-h-[120px] resize-none"
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
                  id="visaSponsorship"
                  checked={formData.requiresVisaSponsorship}
                  onCheckedChange={(checked) =>
                    handleInputChange(
                      "requiresVisaSponsorship",
                      checked === true
                    )
                  }
                />
                <Label
                  htmlFor="visaSponsorship"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  I require visa sponsorship
                </Label>
              </div>
            </CardContent>

            <CardFooter>
              <Button type="submit" className="w-full">
                Save Changes
              </Button>
            </CardFooter>
          </form>
        </Card>
      ) : (
        <></>
      )}
    </>
  );
}
