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
import { createStudent, saveStudentImage } from "@/lib/actions/server.action";
// import { createAccount, signInUser } from "@/lib/actions/user.action";
// import OTPModal from "./OTPModal";

import { toast } from "sonner";

const authFormSchema = () => {
  return z.object({
    fullName: z.string(),
    rollNumber: z.string(),
    email: z.string().email(),
    phone: z.string(),
    image: z
      .any()
      .refine((file) => file instanceof File, "Image must be a file"),
  });
};

const StudentForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [accountId, setAccountId] = useState(null);

  const formSchema = authFormSchema();
  const [preview, setPreview] = useState<string | null>(null);
  const [imageStored, setImageStored] = useState(false);

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      rollNumber: "",
      email: "",
      phone: "",
      image: undefined,
    },
  });

  const router = useRouter();

  // 2. Define a submit handler.
  const onSubmitHandler = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    setErrorMessage("");

    try {
      // 1. Save student record
      const studentResult = await createStudent({
        name: values.fullName,
        email: values.email,
        phone: values.phone,
        rollNumber: values.rollNumber,
      });

      if (!studentResult.success || !studentResult.student) {
        throw new Error(studentResult.message || "Failed to create student");
      }

      const studentId = studentResult.student.id;

      // 2. Save image (if file uploaded)
      if (values.image instanceof File) {
        await saveStudentImage(values.image, values.fullName, studentId);
      }

      toast("Student is added.", {
        action: { label: "Close", onClick: () => {} },
      });
      router.push("/students");
    } catch (error) {
      setErrorMessage("Error while adding a student. Please try again.");

      toast("Error while adding the student.", {
        description: "" + `${error}`,
        action: {
          label: "Close",
          onClick: () => console.log("Toast Closed"),
        },
      });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="center">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmitHandler)}
          className="auth-form"
        >
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

          {/* <FormField
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
          /> */}
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <div className="shad-form-item">
                  <FormLabel className="shad-form-label">
                    Upload Photo
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          field.onChange(file); // store File in form state
                          setPreview(URL.createObjectURL(file)); // generate preview
                        }
                      }}
                      className="shad-input hover:cursor-pointer"
                    />
                  </FormControl>
                </div>
                <FormMessage className="shad-form-message" />
              </FormItem>
            )}
          />

          {preview && (
            <div className="mt-2">
              <Image
                src={preview}
                alt="Preview"
                width={120}
                height={120}
                className="rounded-md border"
              />
            </div>
          )}

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
