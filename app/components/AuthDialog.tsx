"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { supabase } from "@/lib/supabase"
import { showToast } from "@/components/ui/toast"
import { Eye, EyeOff } from "lucide-react"

export function AuthDialogs() {
  const [isSignInOpen, setIsSignInOpen] = useState(false)
  const [isSignUpOpen, setIsSignUpOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [showSignInPassword, setShowSignInPassword] = useState(false)
  const [showSignUpPassword, setShowSignUpPassword] = useState(false)
  const router = useRouter()

  const handleSignUp = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsLoading(true)

    const formData = new FormData(event.currentTarget)
    const email = formData.get("email") as string
    const password = formData.get("password") as string
    const firstName = formData.get("firstName") as string
    const lastName = formData.get("lastName") as string
    const accountType = formData.get("accountType") as string

    try {
      console.log("Attempting to sign up with:", { email, firstName, lastName, accountType })

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            first_name: firstName,
            last_name: lastName,
            account_type: accountType,
          },
        },
      })

      if (error) {
        throw error
      }

      console.log("Sign up successful, user data:", data)

      if (!data.user) {
        throw new Error("User data is missing after sign up")
      }

      showToast("Account created successfully. You can now log in with your account.", "success")
      setIsSignUpOpen(false)
    } catch (error) {
      console.error("Error during sign up:", error)
      let errorMessage = "There was a problem creating your account."

      if (error instanceof Error) {
        errorMessage += " " + error.message
      }

      showToast(errorMessage, "error")
    } finally {
      setIsLoading(false)
    }
  }

  const handleSignIn = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsLoading(true)

    const formData = new FormData(event.currentTarget)
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) throw error

      // Fetch user account type from the users table
      const { data: userData, error: userError } = await supabase
        .from("users")
        .select("account_type")
        .eq("id", data.user.id)
        .single()

      if (userError) throw userError

      setIsSignInOpen(false)

      // Redirect based on user account type
      if (userData.account_type === "admin") {
        router.push("/admin/dashboard")
      } else {
        router.push("/dashboard")
      }

      showToast(`Welcome back, ${data.user.user_metadata.first_name}!`, "success")
    } catch (error) {
      console.error("Error during sign in:", error)
      showToast("Invalid email or password.", "error")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-row items-center justify-center space-x-4">
      <Dialog open={isSignInOpen} onOpenChange={setIsSignInOpen}>
        <DialogTrigger asChild>
          <Button variant="outline">Sign In</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Sign In</DialogTitle>
            <DialogDescription>Enter your credentials to access your account.</DialogDescription>
          </DialogHeader>
          <form className="space-y-4" onSubmit={handleSignIn}>
            <div className="space-y-2">
              <Label htmlFor="signin-email">Email</Label>
              <Input id="signin-email" name="email" type="email" placeholder="Enter your email" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="signin-password">Password</Label>
              <div className="relative">
                <Input
                  id="signin-password"
                  name="password"
                  type={showSignInPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowSignInPassword(!showSignInPassword)}
                >
                  {showSignInPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-500" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-500" />
                  )}
                </Button>
              </div>
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Signing In..." : "Sign In"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={isSignUpOpen} onOpenChange={setIsSignUpOpen}>
        <DialogTrigger asChild>
          <Button>Sign Up</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create an Account</DialogTitle>
            <DialogDescription>Fill in your details to create a new account.</DialogDescription>
          </DialogHeader>
          <form className="space-y-4" onSubmit={handleSignUp}>
            <div className="space-y-2">
              <Label htmlFor="signup-account-type">Account Type</Label>
              <Select name="accountType" required>
                <SelectTrigger id="signup-account-type">
                  <SelectValue placeholder="Select account type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="end-user">End User</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="signup-first-name">First Name</Label>
              <Input id="signup-first-name" name="firstName" placeholder="Enter your first name" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="signup-last-name">Last Name</Label>
              <Input id="signup-last-name" name="lastName" placeholder="Enter your last name" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="signup-email">Email</Label>
              <Input id="signup-email" name="email" type="email" placeholder="Enter your email" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="signup-password">Password</Label>
              <div className="relative">
                <Input
                  id="signup-password"
                  name="password"
                  type={showSignUpPassword ? "text" : "password"}
                  placeholder="Create a password"
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowSignUpPassword(!showSignUpPassword)}
                >
                  {showSignUpPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-500" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-500" />
                  )}
                </Button>
              </div>
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Signing Up..." : "Sign Up"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

