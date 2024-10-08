"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Link from "next/link";
import axios, { AxiosError } from "axios";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Toaster, toast } from "sonner";
import { useState } from "react";

const formSchema = z
  .object({
    username: z.string().min(6, "User name should be minimum 8 characters long"),
    email: z.string().email("Invalid email format"),
    password: z.string().min(8, "Password must contain minimum 8 characters"),
    passwordConfirm: z.string().min(8, "Password must contain minimum 8 characters"),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "Passwords do not match",
    path: ["passwordConfirm"],
  });

export default function ProfileForm() {
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      passwordConfirm: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response =await axios.post("https://caterpillar-hack-production.up.railway.app/signup",{
        username:values.username,
        email:values.email,
        password:values.password
      })
      console.log("Signup successful:", response.data);
      toast.success(response.data.message)
    } catch (error:AxiosError|any) {
      console.error("Signup failed:", error);
      toast.error(error.message)
    }
  }

  return (
    <main className="w-full h-screen flex flex-col justify-center items-center gap-4">
      <Toaster position="top-center" richColors/>
        <span className="text-2xl font-semibold un">Sign Up</span>
      <section className="md:w-96 w-[300px] border-2 px-8 py-6 bg-[#e9e8e8]">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-1 flex flex-col"
          >
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input  className="md:w-[300px] w-[200px]" placeholder="username" {...field} />
                  </FormControl>
                  {/* <FormDescription>This is your username.</FormDescription> */}
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input  className="md:w-[300px] w-[200px]" placeholder="email" {...field} />
                  </FormControl>
                  {/* <FormDescription>This is your email.</FormDescription> */}
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
                    <Input  className="md:w-[300px] w-[200px]" type="password" placeholder="******" {...field} />
                  </FormControl>
                  {/* <FormDescription>This is your password.</FormDescription> */}
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="passwordConfirm"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input className="md:w-[300px] w-[200px]" type="password" placeholder="******" {...field} />
                  </FormControl>
                  {/* <FormDescription>Re-enter your password.</FormDescription> */}
                  <FormMessage />
                </FormItem>
              )}
            />
            <section className="text-center">
              <Link href={"/"} className="text-xs underline">
                Already have an account? Login 
              </Link>
            </section>
            <div className="flex justify-center">

            <Button type="submit" className="w-[150px] mt-2 bg-yellow-400 text-yellow-600 font-bold hover:bg-yellow-300">Submit</Button>
            </div>
          </form>
        </Form>
      </section>
    </main>
  );
}
