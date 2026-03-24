import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../components/card.jsx";
import { Button } from "../components/button.jsx";
import { Badge } from "../components/badge.jsx";
import { Separator } from "../components/separator.jsx";
import {
  Mail,
  Phone,
  MapPin,
  Briefcase,
  GraduationCap,
  FileText,
  Edit,
  ArrowLeft,
  Building2,
  Globe,
  Users,
  ExternalLink,
  User,
} from "lucide-react";
import { getProfileById } from "../data/dummyProfiles";

export default function ProfileView() {
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
      <div className="mx-auto max-w-4xl">
        <div className="mb-6 flex items-center justify-between">
          <Link to="/">
            <Button variant="outline" className="gap-2">
              <ArrowLeft className="size-4" />
              Back to Home
            </Button>
          </Link>
          <Link to={`/profile/${id}/edit`}>
            <Button className="gap-2">
              <Edit className="size-4" />
              Edit Profile
            </Button>
          </Link>
        </div>

        {profile.type === "seeker" ? (
          <SeekerProfileView profile={profile} />
        ) : (
          <EmployerProfileView profile={profile} />
        )}
      </div>
    </div>
  );
}

function SeekerProfileView({ profile }) {
  const skills = profile.skills
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  return (
    <div className="space-y-6">
      <Card className="border-blue-100 shadow-lg overflow-hidden">
        <div className="h-24 bg-gradient-to-r from-blue-500 to-blue-400"></div>
        <CardHeader className="relative -mt-12">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-4">
              <div className="size-20 rounded-full bg-white border-4 border-white shadow-lg flex items-center justify-center overflow-hidden">
                {profile.profileImage ? (
                  <img
                    src={profile.profileImage}
                    alt="Profile"
                    className="size-full object-cover"
                  />
                ) : (
                  <User className="size-10 text-primary" />
                )}
              </div>
              <div className="mt-6">
                <CardTitle className="text-3xl">
                  {profile.firstName} {profile.lastName}
                </CardTitle>
                <CardDescription className="mt-2 text-base">
                  Job Seeker Profile
                </CardDescription>
              </div>
            </div>
            <Badge variant="secondary" className="gap-1.5 mt-6">
              <Briefcase className="size-3.5" />
              Seeker
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="mb-3 flex items-center gap-2">
              <Mail className="size-4 text-primary" />
              Contact Information
            </h3>
            <div className="grid gap-3 pl-6">
              <div className="flex items-center gap-3 text-muted-foreground">
                <Mail className="size-4 shrink-0" />
                <span>{profile.email}</span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <Phone className="size-4 shrink-0" />
                <span>{profile.phone}</span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <MapPin className="size-4 shrink-0" />
                <span>{profile.location}</span>
              </div>
            </div>
          </div>

          <Separator />

          <div>
            <h3 className="mb-3">Professional Bio</h3>
            <p className="text-muted-foreground leading-relaxed">
              {profile.bio}
            </p>
          </div>

          <Separator />

          <div>
            <h3 className="mb-3">Skills</h3>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="bg-blue-100 text-blue-700 border-blue-200"
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </div>

          {profile.experience && (
            <>
              <Separator />
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Briefcase className="size-4 text-primary" />
                  <h3>Work Experience</h3>
                </div>
                <p className="text-muted-foreground whitespace-pre-line leading-relaxed">
                  {profile.experience}
                </p>
              </div>
            </>
          )}

          {profile.education && (
            <>
              <Separator />
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <GraduationCap className="size-4 text-primary" />
                  <h3>Education</h3>
                </div>
                <p className="text-muted-foreground whitespace-pre-line leading-relaxed">
                  {profile.education}
                </p>
              </div>
            </>
          )}

          {profile.resumeLink && (
            <>
              <Separator />
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <FileText className="size-4 text-primary" />
                  <h3>Resume</h3>
                </div>
                <a
                  href={profile.resumeLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="outline" className="gap-2">
                    <FileText className="size-4" />
                    View Resume
                    <ExternalLink className="size-3.5" />
                  </Button>
                </a>
                <p className="text-sm text-muted-foreground mt-2">
                  Opens in new tab - hosted on{" "}
                  {profile.resumeLink.includes("drive.google.com")
                    ? "Google Drive"
                    : "cloud storage"}
                </p>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function EmployerProfileView({ profile }) {
  return (
    <div className="space-y-6">
      <Card className="border-blue-100 shadow-lg overflow-hidden">
        <div className="h-24 bg-gradient-to-r from-blue-500 to-blue-400"></div>
        <CardHeader className="relative -mt-12">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-4">
              <div className="size-20 rounded-lg bg-white border-4 border-white shadow-lg flex items-center justify-center overflow-hidden">
                {profile.companyLogo ? (
                  <img
                    src={profile.companyLogo}
                    alt="Company Logo"
                    className="size-full object-contain p-2"
                  />
                ) : (
                  <Building2 className="size-10 text-primary" />
                )}
              </div>
              <div className="mt-6">
                <CardTitle className="text-3xl">
                  {profile.companyName}
                </CardTitle>
                <CardDescription className="mt-2 text-base">
                  Employer Profile
                </CardDescription>
              </div>
            </div>
            <Badge variant="secondary" className="gap-1.5 mt-6">
              <Building2 className="size-3.5" />
              Employer
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="mb-3 flex items-center gap-2">
              <Building2 className="size-4 text-primary" />
              Company Details
            </h3>
            <div className="grid gap-3 pl-6">
              <div className="flex items-center gap-3 text-muted-foreground">
                <Building2 className="size-4 shrink-0" />
                <span>{profile.industry}</span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <Users className="size-4 shrink-0" />
                <span>{profile.companySize} employees</span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <Globe className="size-4 shrink-0" />
                <a
                  href={profile.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors"
                >
                  {profile.website}
                </a>
              </div>
            </div>
          </div>

          <Separator />

          <div>
            <h3 className="mb-3 flex items-center gap-2">
              <Mail className="size-4 text-primary" />
              Contact Information
            </h3>
            <div className="grid gap-3 pl-6">
              <div className="flex items-center gap-3 text-muted-foreground">
                <Mail className="size-4 shrink-0" />
                <span>{profile.email}</span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <Phone className="size-4 shrink-0" />
                <span>{profile.phone}</span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <MapPin className="size-4 shrink-0" />
                <span>{profile.location}</span>
              </div>
            </div>
          </div>

          <Separator />

          <div>
            <h3 className="mb-3">Company Description</h3>
            <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
              {profile.description}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
