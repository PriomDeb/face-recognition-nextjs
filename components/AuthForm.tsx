// // "use client";
// // import React, { useState } from "react";

// // import { z } from "zod";
// // import { zodResolver } from "@hookform/resolvers/zod";
// // import { useForm } from "react-hook-form";

// // import { Button } from "@/components/ui/button";
// // import {
// //   Form,
// //   FormControl,
// //   FormField,
// //   FormItem,
// //   FormLabel,
// //   FormMessage,
// // } from "@/components/ui/form";
// // import { Input } from "@/components/ui/input";
// // import Image from "next/image";
// // import Link from "next/link";
// // import { useRouter } from "next/navigation";
// // // import { createAccount, signInUser } from "@/lib/actions/user.action";
// // // import OTPModal from "./OTPModal";

// // type FormType = "sign-in" | "sign-up";

// // const authFormSchema = (formType: FormType) => {
// //   return z.object({
// //     email: z.string().email(),
// //     fullName:
// //       formType === "sign-up"
// //         ? z
// //             .string()
// //             .min(2, "Full Name must contain at least 2 characters.")
// //             .max(50)
// //         : z.string().optional(),
// //     password: z.string().min(6, "Password must be at least 6 characters long"),
// //   });
// // };

// // const AuthForm = ({ type }: { type: FormType }) => {
// //   const [isLoading, setIsLoading] = useState(false);
// //   const [errorMessage, setErrorMessage] = useState("");

// //   const [accountId, setAccountId] = useState(null);

// //   const formSchema = authFormSchema(type);

// //   // 1. Define your form.
// //   const form = useForm<z.infer<typeof formSchema>>({
// //     resolver: zodResolver(formSchema),
// //     defaultValues: {
// //       fullName: "",
// //       email: "",
// //       password: "",
// //     },
// //   });

// //   const router = useRouter();

// //   // 2. Define a submit handler.
// //   const onSubmit = async (values: z.infer<typeof formSchema>) => {
// //     setIsLoading(true);
// //     setErrorMessage("");

// //     // try {
// //     //   const user =
// //     //     type === "sign-up"
// //     //       ? await createAccount({
// //     //           fullName: values.fullName || "",
// //     //           email: values.email,
// //     //         })
// //     //       : await signInUser({ email: values.email });

// //     //   setAccountId(user.accountId);
// //     // } catch (error) {
// //     //   setErrorMessage("Error while creating an account. Please try again.");
// //     // } finally {
// //     //   setIsLoading(false);
// //     // }

// //     try {
// //       const user = type === "sign-up" ? router.push("/") : router.push("/");
// //     } catch (error) {
// //       setErrorMessage("Error while creating an account. Please try again.");
// //     } finally {
// //       setIsLoading(false);
// //     }
// //   };
// //   return (
// //     <div>
// //       <Form {...form}>
// //         <form onSubmit={form.handleSubmit(onSubmit)} className="auth-form">
// //           <h1 className="form-title">
// //             {type === "sign-up" ? "Sign Up" : "Sign In"}
// //           </h1>

// //           {type === "sign-up" && (
// //             <FormField
// //               control={form.control}
// //               name="fullName"
// //               render={({ field }) => (
// //                 <FormItem>
// //                   <div className="shad-form-item">
// //                     <FormLabel className="shad-form-label">Full Name</FormLabel>
// //                     <FormControl>
// //                       <Input
// //                         placeholder="Enter your full name"
// //                         {...field}
// //                         className="shad-input"
// //                       />
// //                     </FormControl>
// //                   </div>

// //                   <FormMessage className="shad-form-message" />
// //                 </FormItem>
// //               )}
// //             />
// //           )}

// //           <FormField
// //             control={form.control}
// //             name="email"
// //             render={({ field }) => (
// //               <FormItem>
// //                 <div className="shad-form-item">
// //                   <FormLabel className="shad-form-label">Email</FormLabel>
// //                   <FormControl>
// //                     <Input
// //                       placeholder="Enter your email"
// //                       {...field}
// //                       className="shad-input"
// //                     />
// //                   </FormControl>
// //                 </div>

// //                 <FormMessage className="shad-form-message" />
// //               </FormItem>
// //             )}
// //           />

// //           <FormField
// //             control={form.control}
// //             name="password"
// //             render={({ field }) => (
// //               <FormItem>
// //                 <div className="shad-form-item">
// //                   <FormLabel className="shad-form-label">Password</FormLabel>
// //                   <FormControl>
// //                     <Input
// //                       placeholder="Enter your password"
// //                       {...field}
// //                       className="shad-input"
// //                       type="password"
// //                     />
// //                   </FormControl>
// //                 </div>

// //                 <FormMessage className="shad-form-message" />
// //               </FormItem>
// //             )}
// //           />

// //           <Button
// //             type="submit"
// //             className="form-submit-button"
// //             disabled={isLoading}
// //           >
// //             {type === "sign-in" ? "Sign In" : "Sign Up"}
// //             {isLoading && (
// //               <Image
// //                 src={"/assets/icons/loader.svg"}
// //                 width={24}
// //                 height={24}
// //                 alt="loader"
// //                 className="ml-2 animate-spin"
// //               />
// //             )}
// //           </Button>

// //           {errorMessage && <p className="error-message">*{errorMessage}</p>}
// //           <div className="body-2 flex justify-center">
// //             <p className="text-light-100">
// //               {type === "sign-in"
// //                 ? "Don't have an account"
// //                 : "Already have an account?"}
// //             </p>
// //             <Link
// //               href={type === "sign-in" ? "/sign-up" : "/sign-in"}
// //               className="ml-1 font-medium text-brand"
// //             >
// //               {type === "sign-in" ? "Sign Up" : "Sign In"}
// //             </Link>
// //           </div>
// //         </form>
// //       </Form>

// //       {/* {accountId && (
// //       )} */}
// //     </div>
// //   );
// // };

// // export default AuthForm;

// "use client";

// import React, { useState } from "react";
// import { z } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import { useRouter } from "next/navigation";
// import { Button } from "@/components/ui/button";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import Image from "next/image";
// import Link from "next/link";
// import {
//   signInTeacherServer,
//   signUpTeacherServer,
// } from "@/lib/actions/auth.action";
// import { setAuthCookie } from "@/lib/client/auth.client";

// type FormType = "sign-in" | "sign-up";

// const authFormSchema = (formType: FormType) =>
//   z.object({
//     email: z.string().email(),
//     fullName:
//       formType === "sign-up"
//         ? z.string().min(2).max(50)
//         : z.string().optional(),
//     password: z.string().min(6),
//   });

// const AuthForm = ({ type }: { type: FormType }) => {
//   const [isLoading, setIsLoading] = useState(false);
//   const [errorMessage, setErrorMessage] = useState("");
//   const formSchema = authFormSchema(type);
//   const router = useRouter();

//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//     defaultValues: { fullName: "", email: "", password: "" },
//   });

//   // const onSubmit = async (values: z.infer<typeof formSchema>) => {
//   //   setIsLoading(true);
//   //   setErrorMessage("");

//   //   try {
//   //     let result;
//   //     if (type === "sign-up") {
//   //       result = await signUpTeacherServer({
//   //         name: values.fullName!,
//   //         email: values.email,
//   //         password: values.password,
//   //       });
//   //     } else {
//   //       result = await signInTeacherServer({
//   //         email: values.email,
//   //         password: values.password,
//   //       });
//   //     }

//   //     // setAuthCookie(result.token); // <--- set cookie in browser

//   //     router.push("/"); // redirect to dashboard
//   //   } catch (err: any) {
//   //     setErrorMessage(err.message || "Something went wrong");
//   //   } finally {
//   //     setIsLoading(false);
//   //   }
//   // };

//   const onSubmit = async (values: z.infer<typeof formSchema>) => {
//     setIsLoading(true);
//     setErrorMessage("");

//     try {
//       if (type === "sign-up") {
//         await signUpTeacherServer({
//           name: values.fullName!,
//           email: values.email,
//           password: values.password,
//         });
//       } else {
//         await signInTeacherServer({
//           email: values.email,
//           password: values.password,
//         });
//       }

//       // ✅ cookie is already set by server, so just redirect
//       router.push("/");
//     } catch (err: any) {
//       setErrorMessage(err.message || "Something went wrong");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <Form {...form}>
//       <form onSubmit={form.handleSubmit(onSubmit)} className="auth-form">
//         <h1 className="text-center text-2xl">
//           {type === "sign-up" ? "Sign Up" : "Sign In"}
//         </h1>

//         {type === "sign-up" && (
//           <FormField
//             control={form.control}
//             name="fullName"
//             render={({ field }) => (
//               <FormItem className="shad-form-item">
//                 <FormLabel className="shad-form-label">Full Name</FormLabel>
//                 <FormControl>
//                   <Input
//                     className="shad-input"
//                     placeholder="Full Name"
//                     {...field}
//                   />
//                 </FormControl>
//                 <FormMessage className="shad-form-message" />
//               </FormItem>
//             )}
//           />
//         )}

//         <FormField
//           control={form.control}
//           name="email"
//           render={({ field }) => (
//             <FormItem className="shad-form-item">
//               <FormLabel className="shad-form-label">Email</FormLabel>
//               <FormControl>
//                 <Input className="shad-input" placeholder="Email" {...field} />
//               </FormControl>
//               <FormMessage className="shad-form-message" />
//             </FormItem>
//           )}
//         />

//         <FormField
//           control={form.control}
//           name="password"
//           render={({ field }) => (
//             <FormItem className="shad-form-item">
//               <FormLabel className="shad-form-label">Password</FormLabel>
//               <FormControl>
//                 <Input
//                   type="password"
//                   placeholder="Password"
//                   {...field}
//                   className="shad-input"
//                 />
//               </FormControl>
//               <FormMessage className="shad-form-message" />
//             </FormItem>
//           )}
//         />

//         <Button
//           type="submit"
//           disabled={isLoading}
//           className="bg-brand hover:bg-purple-400"
//         >
//           {type === "sign-in" ? "Sign In" : "Sign Up"}
//           {isLoading && (
//             <Image
//               src="/assets/icons/loader.svg"
//               width={24}
//               height={24}
//               alt="loader"
//             />
//           )}
//         </Button>

//         {errorMessage && <p className="error-message">{errorMessage}</p>}

//         <p>
//           {type === "sign-in"
//             ? "Don't have an account?"
//             : "Already have an account?"}{" "}
//           <Link href={type === "sign-in" ? "/sign-up" : "/sign-in"}>
//             {type === "sign-in" ? "Sign Up" : "Sign In"}
//           </Link>
//         </p>
//       </form>
//     </Form>
//   );
// };

// export default AuthForm;
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
import { handleAuth } from "@/lib/actions/action";
// adjust path

type FormType = "sign-in" | "sign-up";

const authFormSchema = (formType: FormType) =>
  z.object({
    email: z.string().email(),
    fullName:
      formType === "sign-up"
        ? z.string().min(2).max(50)
        : z.string().optional(),
    password: z.string().min(6),
  });

const AuthForm = ({ type }: { type: FormType }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const formSchema = authFormSchema(type);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { fullName: "", email: "", password: "" },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    setErrorMessage("");

    try {
      await handleAuth(values, type); // server action handles cookie + redirect
    } catch (err: any) {
      setErrorMessage(err.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="auth-form">
        <h1 className="text-center text-2xl">
          {type === "sign-up" ? "Sign Up" : "Sign In"}
        </h1>

        {type === "sign-up" && (
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem className="shad-form-item">
                <FormLabel className="shad-form-label">Full Name</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    name="fullName"
                    placeholder="Full Name"
                    className="shad-input"
                  />
                </FormControl>
                <FormMessage className="shad-form-message" />
              </FormItem>
            )}
          />
        )}

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="shad-form-item">
              <FormLabel className="shad-form-label">Email</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  name="email"
                  placeholder="Email"
                  className="shad-input"
                />
              </FormControl>
              <FormMessage className="shad-form-message" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="shad-form-item">
              <FormLabel className="shad-form-label">Password</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  name="password"
                  type="password"
                  placeholder="Password"
                  className="shad-input"
                />
              </FormControl>
              <FormMessage className="shad-form-message" />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          disabled={isLoading}
          className="bg-brand hover:bg-purple-400"
        >
          {type === "sign-in" ? "Sign In" : "Sign Up"}
          {isLoading && (
            <Image
              src="/assets/icons/loader.svg"
              width={24}
              height={24}
              alt="loader"
            />
          )}
        </Button>

        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <p>
          {type === "sign-in"
            ? "Don't have an account?"
            : "Already have an account?"}{" "}
          <Link href={type === "sign-in" ? "/sign-up" : "/sign-in"}>
            {type === "sign-in" ? "Sign Up" : "Sign In"}
          </Link>
        </p>
      </form>
    </Form>
  );
};

export default AuthForm;
