import { Link } from "react-router";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/card.jsx";
import { Button } from "../components/button.jsx";
import { Briefcase, User, Eye, PlusCircle } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      {/* Header */}
      <div className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Briefcase className="size-8 text-primary" />
              <h1 className="text-2xl">JobConnect</h1>
            </div>
            <Link to="/create">
              <Button className="gap-2">
                <PlusCircle className="size-4" />
                Create Profile
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-5xl mb-4 bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
            Profile Management System
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Create, view, and manage professional profiles for job seekers and
            employers
          </p>
        </div>

        {/* Quick Actions */}
        <div className="max-w-5xl mx-auto mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="hover:shadow-lg transition-shadow border-blue-100">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <User className="size-6 text-primary" />
                  </div>
                  <CardTitle>Job Seeker Profile</CardTitle>
                </div>
                <CardDescription>
                  Create a professional profile to showcase your skills,
                  experience, and education to potential employers
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link to="/create?type=seeker">
                  <Button className="w-full" size="lg">
                    Create Job Seeker Profile
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow border-blue-100">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <Briefcase className="size-6 text-primary" />
                  </div>
                  <CardTitle>Employer Profile</CardTitle>
                </div>
                <CardDescription>
                  Build your company profile to attract top talent and showcase
                  your organization's culture and opportunities
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link to="/create?type=employer">
                  <Button className="w-full" size="lg">
                    Create Employer Profile
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Sample Profiles Section */}
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl mb-2">Sample Profiles</h2>
              <p className="text-muted-foreground">
                Explore example profiles to see what you can create
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Job Seeker Sample 1 */}
            <Card className="hover:shadow-lg transition-all border-blue-100">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Sarah Johnson</CardTitle>
                    <CardDescription className="mt-1">
                      Senior Software Engineer
                    </CardDescription>
                  </div>
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <User className="size-5 text-primary" />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  Passionate full-stack developer with 5+ years of experience
                  building scalable web applications...
                </p>
                <Link to="/profile/seeker1">
                  <Button variant="outline" className="w-full gap-2">
                    <Eye className="size-4" />
                    View Profile
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Job Seeker Sample 2 */}
            <Card className="hover:shadow-lg transition-all border-blue-100">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Michael Chen</CardTitle>
                    <CardDescription className="mt-1">
                      Senior UX Designer
                    </CardDescription>
                  </div>
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <User className="size-5 text-primary" />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  Creative UX/UI designer with a passion for creating intuitive
                  and beautiful user experiences...
                </p>
                <Link to="/profile/seeker2">
                  <Button variant="outline" className="w-full gap-2">
                    <Eye className="size-4" />
                    View Profile
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Employer Sample 1 */}
            <Card className="hover:shadow-lg transition-all border-blue-100">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>TechVision Solutions</CardTitle>
                    <CardDescription className="mt-1">
                      Software Development & IT Services
                    </CardDescription>
                  </div>
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Briefcase className="size-5 text-primary" />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  Leading software development company specializing in
                  enterprise solutions and cloud technologies...
                </p>
                <Link to="/profile/employer1">
                  <Button variant="outline" className="w-full gap-2">
                    <Eye className="size-4" />
                    View Profile
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Employer Sample 2 */}
            <Card className="hover:shadow-lg transition-all border-blue-100">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>GreenLeaf Innovations</CardTitle>
                    <CardDescription className="mt-1">
                      Sustainable Technology & CleanTech
                    </CardDescription>
                  </div>
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Briefcase className="size-5 text-primary" />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  Creating a sustainable future through innovative renewable
                  energy and environmental technology...
                </p>
                <Link to="/profile/employer2">
                  <Button variant="outline" className="w-full gap-2">
                    <Eye className="size-4" />
                    View Profile
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t bg-white/80 backdrop-blur-sm mt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-sm text-muted-foreground">
            <p>© 2024 JobConnect. All rights reserved.</p>
            <p className="mt-2">Professional Profile Management System</p>
          </div>
        </div>
      </div>
    </div>
  );
}
