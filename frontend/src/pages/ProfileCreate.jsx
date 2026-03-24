import { useState, useEffect } from "react";
import { useNavigate, useSearchParams, Link } from "react-router";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/card.jsx";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/tabs.jsx";
import { Button } from "../components/button.jsx";
import { Input } from "../components/input.jsx";
import { Label } from "../components/label.jsx";
import { Textarea } from "../components/textarea.jsx";
import { Briefcase, User, ArrowLeft, Upload, Image } from "lucide-react";
import { toast } from "sonner";

export default function ProfileCreate() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const typeParam = searchParams.get("type");
  const [activeTab, setActiveTab] = useState(typeParam || "seeker");
  const [profileImage, setProfileImage] = useState(null);
  const [companyLogo, setCompanyLogo] = useState(null);

  useEffect(() => {
    if (typeParam && (typeParam === "seeker" || typeParam === "employer")) {
      setActiveTab(typeParam);
    }
  }, [typeParam]);

  const handleImageUpload = (e, setImage) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSeekerSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const profileData = {
      type: "seeker",
      id: Math.random().toString(36).substr(2, 9),
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      location: formData.get("location"),
      bio: formData.get("bio"),
      skills: formData.get("skills"),
      experience: formData.get("experience"),
      education: formData.get("education"),
      resumeLink: formData.get("resumeLink"),
      profileImage: profileImage,
    };

    localStorage.setItem(
      `profile-${profileData.id}`,
      JSON.stringify(profileData)
    );
    toast.success("Job Seeker profile created successfully!");
    navigate(`/profile/${profileData.id}`);
  };

  const handleEmployerSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const profileData = {
      type: "employer",
      id: Math.random().toString(36).substr(2, 9),
      companyName: formData.get("companyName"),
      industry: formData.get("industry"),
      companySize: formData.get("companySize"),
      website: formData.get("website"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      location: formData.get("location"),
      description: formData.get("description"),
      companyLogo: companyLogo,
    };

    localStorage.setItem(
      `profile-${profileData.id}`,
      JSON.stringify(profileData)
    );
    toast.success("Employer profile created successfully!");
    navigate(`/profile/${profileData.id}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 py-12 px-4">
      <div className="mx-auto max-w-3xl">
        <div className="mb-6">
          <Link to="/">
            <Button variant="outline" className="gap-2">
              <ArrowLeft className="size-4" />
              Back to Home
            </Button>
          </Link>
        </div>

        <div className="mb-8 text-center">
          <h1 className="mb-2 bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
            Create Your Profile
          </h1>
          <p className="text-muted-foreground">
            Choose your profile type and fill in your details
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v)}>
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="seeker" className="gap-2">
              <User className="size-4" />
              Job Seeker
            </TabsTrigger>
            <TabsTrigger value="employer" className="gap-2">
              <Briefcase className="size-4" />
              Employer
            </TabsTrigger>
          </TabsList>

          <TabsContent value="seeker">
            <Card className="border-blue-100 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-transparent">
                <CardTitle>Job Seeker Profile</CardTitle>
                <CardDescription>
                  Create your professional profile to connect with employers
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSeekerSubmit} className="space-y-6">
                  {/* Profile Image Upload */}
                  <div className="space-y-2">
                    <Label htmlFor="profileImage">Profile Photo</Label>
                    <div className="flex items-center gap-4">
                      {profileImage && (
                        <div className="size-20 rounded-full overflow-hidden border-4 border-blue-100">
                          <img
                            src={profileImage}
                            alt="Profile"
                            className="size-full object-cover"
                          />
                        </div>
                      )}
                      <div className="flex-1">
                        <Input
                          id="profileImage"
                          name="profileImage"
                          type="file"
                          accept="image/*"
                          className="cursor-pointer"
                          onChange={(e) =>
                            handleImageUpload(e, setProfileImage)
                          }
                        />
                        <p className="text-sm text-muted-foreground mt-1">
                          Upload a professional photo (JPG, PNG)
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        placeholder="John"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        placeholder="Doe"
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
                      placeholder="john.doe@example.com"
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
                        placeholder="+1 (555) 000-0000"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        name="location"
                        placeholder="San Francisco, CA"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bio">Professional Bio</Label>
                    <Textarea
                      id="bio"
                      name="bio"
                      placeholder="Tell us about yourself and your career goals..."
                      rows={4}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="skills">Skills</Label>
                    <Input
                      id="skills"
                      name="skills"
                      placeholder="e.g., JavaScript, React, Node.js, Python"
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
                      placeholder="Describe your work experience..."
                      rows={4}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="education">Education</Label>
                    <Textarea
                      id="education"
                      name="education"
                      placeholder="Your educational background..."
                      rows={3}
                    />
                  </div>

                  {/* Resume Link */}
                  <div className="space-y-2">
                    <Label htmlFor="resumeLink">
                      Resume Link (Google Drive or Cloud)
                    </Label>
                    <Input
                      id="resumeLink"
                      name="resumeLink"
                      type="url"
                      placeholder="https://drive.google.com/file/d/..."
                    />
                    <p className="text-sm text-muted-foreground">
                      Share a link to your resume on Google Drive, Dropbox, or
                      similar
                    </p>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <Button type="submit" className="flex-1" size="lg">
                      Create Profile
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="employer">
            <Card className="border-blue-100 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-transparent">
                <CardTitle>Employer Profile</CardTitle>
                <CardDescription>
                  Create your company profile to find the right talent
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleEmployerSubmit} className="space-y-6">
                  {/* Company Logo Upload */}
                  <div className="space-y-2">
                    <Label htmlFor="companyLogo">Company Logo</Label>
                    <div className="flex items-center gap-4">
                      {companyLogo && (
                        <div className="size-20 rounded-lg overflow-hidden border-4 border-blue-100 bg-white">
                          <img
                            src={companyLogo}
                            alt="Company Logo"
                            className="size-full object-contain p-2"
                          />
                        </div>
                      )}
                      <div className="flex-1">
                        <Input
                          id="companyLogo"
                          name="companyLogo"
                          type="file"
                          accept="image/*"
                          className="cursor-pointer"
                          onChange={(e) => handleImageUpload(e, setCompanyLogo)}
                        />
                        <p className="text-sm text-muted-foreground mt-1">
                          Upload your company logo (PNG, JPG, SVG)
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="companyName">Company Name</Label>
                    <Input
                      id="companyName"
                      name="companyName"
                      placeholder="Acme Corporation"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="industry">Industry</Label>
                      <Input
                        id="industry"
                        name="industry"
                        placeholder="Technology, Finance, Healthcare, etc."
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="companySize">Company Size</Label>
                      <Input
                        id="companySize"
                        name="companySize"
                        placeholder="1-10, 11-50, 51-200, etc."
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
                      placeholder="https://www.example.com"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Contact Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="hr@example.com"
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
                        placeholder="+1 (555) 000-0000"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        name="location"
                        placeholder="New York, NY"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Company Description</Label>
                    <Textarea
                      id="description"
                      name="description"
                      placeholder="Tell us about your company, culture, and what makes you unique..."
                      rows={6}
                      required
                    />
                  </div>

                  <div className="flex gap-3 pt-4">
                    <Button type="submit" className="flex-1" size="lg">
                      Create Profile
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
