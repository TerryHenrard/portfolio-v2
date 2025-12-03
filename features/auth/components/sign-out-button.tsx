"use client";

import { Button, ShadcnButtonProps } from "@/core/components/ui/button";
import { LogOut } from "lucide-react";
import { redirect } from "next/navigation";
import { useState } from "react";
import { authClient } from "../lib/auth-client";

export function SignOutButton({
  variant = "outline",
  size = "default",
  className,
}: Pick<ShadcnButtonProps, "variant" | "size" | "className">) {
  const [isLoading, setIsLoading] = useState(false);

  async function handleSignOut() {
    setIsLoading(true);

    try {
      await authClient.signOut();
      redirect("/sign-in");
    } catch (error) {
      console.error("Sign out error:", error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleSignOut}
      disabled={isLoading}
      className={className}
    >
      <LogOut />
      {isLoading ? "Signing out..." : "Sign out"}
    </Button>
  );
}
