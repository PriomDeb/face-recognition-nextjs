"use client";
import React, { useState } from "react";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
// import { createAccount, signInUser } from "@/lib/actions/user.action";
// import OTPModal from "./OTPModal";

const authFormSchema = () => {
  return z.object({
    fullName: z.string(),
    rollNumber: z.string(),
    email: z.string().email(),
    phone: z.string(),
    image: z.string(),
  });
};

const StudentForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [accountId, setAccountId] = useState(null);

  const formSchema = authFormSchema();

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      rollNumber: "",
      email: "",
      phone: "",
      image: "",
    },
  });

  const router = useRouter();

  // 2. Define a submit handler.
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    setErrorMessage("");

    // try {
    //   const user =
    //     type === "sign-up"
    //       ? await createAccount({
    //           fullName: values.fullName || "",
    //           email: values.email,
    //         })
    //       : await signInUser({ email: values.email });

    //   setAccountId(user.accountId);
    // } catch (error) {
    //   setErrorMessage("Error while creating an account. Please try again.");
    // } finally {
    //   setIsLoading(false);
    // }

    try {
      console.log("Find");
    } catch (error) {
      setErrorMessage("Error while creating an account. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="center">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="auth-form">
          <h1 className="form-title">
            <p>Add Student</p>
          </h1>

          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <div className="shad-form-item">
                  <FormLabel className="shad-form-label">Full Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="student name"
                      {...field}
                      className="shad-input"
                    />
                  </FormControl>
                </div>

                <FormMessage className="shad-form-message" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="rollNumber"
            render={({ field }) => (
              <FormItem>
                <div className="shad-form-item">
                  <FormLabel className="shad-form-label">Roll Number</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="student roll number"
                      {...field}
                      className="shad-input"
                    />
                  </FormControl>
                </div>

                <FormMessage className="shad-form-message" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <div className="shad-form-item">
                  <FormLabel className="shad-form-label">Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your email"
                      {...field}
                      className="shad-input"
                    />
                  </FormControl>
                </div>

                <FormMessage className="shad-form-message" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <div className="shad-form-item">
                  <FormLabel className="shad-form-label">Phone</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="student phone number"
                      {...field}
                      className="shad-input"
                    />
                  </FormControl>
                </div>

                <FormMessage className="shad-form-message" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <div className="shad-form-item">
                  <FormLabel className="shad-form-label">
                    Student Face
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="student phone number"
                      {...field}
                      className="shad-input"
                    />
                  </FormControl>
                </div>

                <FormMessage className="shad-form-message" />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="form-submit-button"
            disabled={isLoading}
          >
            <p>Add Student</p>
            {isLoading && (
              <Image
                src={"/assets/icons/loader.svg"}
                width={24}
                height={24}
                alt="loader"
                className="ml-2 animate-spin"
              />
            )}
          </Button>

          {errorMessage && <p className="error-message">*{errorMessage}</p>}
          {/* <div className="body-2 flex justify-center">
            <p className="text-light-100">
              ? "Don't have an account" : "Already have an account?"
            </p>
            <Link
              href={"/sign-up/sign-in"}
              className="ml-1 font-medium text-brand"
            >
              {"sign-inSign In"}
            </Link>
          </div> */}
        </form>
      </Form>

      {/* {accountId && (
      )} */}
    </div>
  );
};

export default StudentForm;
