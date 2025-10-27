"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useAuth, useUser } from "@/firebase";
import { initiateEmailSignIn } from "@/firebase/non-blocking-login";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { onAuthStateChanged, User } from "firebase/auth";
import { Loader2 } from "lucide-react";


const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
});

export default function LoginPage() {
  const { user, isUserLoading } = useUser();
  const auth = useAuth();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [formIsSubmitting, setFormIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    if (!isUserLoading && user) {
      router.push("/ride");
    }
  }, [user, isUserLoading, router]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user: User | null) => {
        setFormIsSubmitting(false);
        if (user) {
            router.push('/ride');
        }
    }, (error) => {
        setFormIsSubmitting(false);
        let errorMessage = "An unknown error occurred.";
        if (error.code) {
          switch (error.code) {
            case "auth/user-not-found":
            case "auth/wrong-password":
            case "auth/invalid-credential":
              errorMessage = "Invalid email or password. Please try again.";
              break;
            default:
              errorMessage = "Failed to log in. Please try again later.";
              break;
          }
        }
        setError(errorMessage);
    });
    return () => unsubscribe();
  }, [auth, router]);
  
  function onSubmit(values: z.infer<typeof formSchema>) {
    setError(null);
    setFormIsSubmitting(true);
    initiateEmailSignIn(auth, values.email, values.password);
  }

  if (isUserLoading || user) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-background">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <main className="flex h-screen w-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-headline">Welcome Back</CardTitle>
          <CardDescription>Log in to your Alliaz X-ride account</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="name@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="••••••••" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={formIsSubmitting}>
                {formIsSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Log In
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="justify-center text-sm">
          <p>
            Don't have an account?{" "}
            <Link href="/register" className="font-semibold text-primary hover:underline">
              Register
            </Link>
          </p>
        </CardFooter>
      </Card>
    </main>
  );
}
