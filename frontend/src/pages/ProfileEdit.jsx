import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/card";
import { Button } from "../components/button";
import { Input } from "../components/input";
import { Label } from "../components/label";
import { Textarea } from "../components/textarea";
import { ArrowLeft, Save } from "lucide-react";
import { toast } from "sonner";
import { getProfileById } from "../data/dummyProfiles";

export default function ProfileEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    // Try to get from dummy data first
    const dummyProfile = getProfileById(id);
    if (dummyProfile) {
      setProfile(dummyProfile);
    } else {
      // Try to get from localStorage
      const storedProfile = localStorage.getItem(`profile-${id}`);
      if (storedProfile) {
        setProfile(JSON.parse(storedProfile));
      }
    }
  }, [id]);

  const handleSeekerSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const updatedProfile = {
      ...profile,
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      location: formData.get("location"),
      bio: formData.get("bio"),
      skills: formData.get("skills"),
      experience: formData.get("experience"),
      education: formData.get("education"),
    };

    localStorage.setItem(`profile-${id}`, JSON.stringify(updatedProfile));
    toast.success("Profile updated successfully!");
    navigate(`/profile/${id}`);
  };

  const handleEmployerSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const updatedProfile = {
      ...profile,
      companyName: formData.get("companyName"),
      industry: formData.get("industry"),
      companySize: formData.get("companySize"),
      website: formData.get("website"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      location: formData.get("location"),
      description: formData.get("description"),
    };

    localStorage.setItem(`profile-${id}`, JSON.stringify(updatedProfile));
    toast.success("Profile updated successfully!");
    navigate(`/profile/${id}`);
  };

  if (!profile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 flex items-center justify-center p-4">
        <Card className="max-w-md border-blue-100">
          <CardContent className="pt-6">
            <p className="text-center text-muted-foreground mb-4">
              Profile not found
            </p>
            <Link to="/">
              <Button className="w-full">Go to Home</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 py-12 px-4">
      <div className="mx-auto max-w-3xl">
        <div className="mb-6">
          <Link to={`/profile/${id}`}>
            <Button variant="outline" className="gap-2">
              <ArrowLeft className="size-4" />
              Back to Profile
            </Button>
          </Link>
        </div>

        {profile.type === "seeker" ? (
          <SeekerProfileEdit profile={profile} onSubmit={handleSeekerSubmit} />
        ) : (
          <EmployerProfileEdit
            profile={profile}
            onSubmit={handleEmployerSubmit}
          />
        )}
      </div>
    </div>
  );
}

function SeekerProfileEdit({ profile, onSubmit }) {
  return (
    <Card className="border-blue-100 shadow-lg">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-transparent">
        <CardTitle>Edit Job Seeker Profile</CardTitle>
        <CardDescription>Update your professional information</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                name="firstName"
                defaultValue={profile.firstName}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                name="lastName"
                defaultValue={profile.lastName}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              defaultValue={profile.email}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                defaultValue={profile.phone}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                name="location"
                defaultValue={profile.location}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio">Professional Bio</Label>
            <Textarea
              id="bio"
              name="bio"
              defaultValue={profile.bio}
              rows={4}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="skills">Skills</Label>
            <Input
              id="skills"
              name="skills"
              defaultValue={profile.skills}
              required
            />
            <p className="text-sm text-muted-foreground">
              Separate skills with commas
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="experience">Work Experience</Label>
            <Textarea
              id="experience"
              name="experience"
              defaultValue={profile.experience || ""}
              rows={4}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="education">Education</Label>
            <Textarea
              id="education"
              name="education"
              defaultValue={profile.education || ""}
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="resume">Update Resume</Label>
            <Input
              id="resume"
              name="resume"
              type="file"
              accept=".pdf,.doc,.docx"
              className="cursor-pointer"
            />
            <p className="text-sm text-muted-foreground">
              Upload a new resume to replace the existing one
            </p>
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="submit" className="flex-1 gap-2" size="lg">
              <Save className="size-4" />
              Save Changes
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

function EmployerProfileEdit({ profile, onSubmit }) {
  return (
    <Card className="border-blue-100 shadow-lg">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-transparent">
        <CardTitle>Edit Employer Profile</CardTitle>
        <CardDescription>Update your company information</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="companyName">Company Name</Label>
            <Input
              id="companyName"
              name="companyName"
              defaultValue={profile.companyName}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="industry">Industry</Label>
              <Input
                id="industry"
                name="industry"
                defaultValue={profile.industry}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="companySize">Company Size</Label>
              <Input
                id="companySize"
                name="companySize"
                defaultValue={profile.companySize}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="website">Company Website</Label>
            <Input
              id="website"
              name="website"
              type="url"
              defaultValue={profile.website}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Contact Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              defaultValue={profile.email}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="phone">Contact Phone</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                defaultValue={profile.phone}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                name="location"
                defaultValue={profile.location}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Company Description</Label>
            <Textarea
              id="description"
              name="description"
              defaultValue={profile.description}
              rows={6}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="logo">Update Company Logo</Label>
            <Input
              id="logo"
              name="logo"
              type="file"
              accept="image/*"
              className="cursor-pointer"
            />
            <p className="text-sm text-muted-foreground">
              Upload a new logo to replace the existing one
            </p>
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="submit" className="flex-1 gap-2" size="lg">
              <Save className="size-4" />
              Save Changes
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
