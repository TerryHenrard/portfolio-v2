import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/core/components/ui/card";
import { SignOutButton } from "@/features/auth/components/sign-out-button";
import { requireAuth } from "@/features/auth/lib/require-auth";

export default async function AdminPage() {
  await requireAuth();

  return (
    <main className="container mx-auto px-4 py-12">
      <Card className="mx-auto max-w-2xl">
        <CardHeader>
          <CardTitle className="text-2xl">Admin Dashboard</CardTitle>
          <CardDescription>
            Welcome to the admin area. You are successfully authenticated.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <p className="text-muted-foreground text-sm">
            This is a protected area. Only authenticated admin users can access this page.
          </p>
          <SignOutButton />
        </CardContent>
      </Card>
    </main>
  );
}
