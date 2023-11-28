"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

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
import { trpc } from "@/app/_trpc/client";
import { auth, currentUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const formSchema = z.object({
  code: z.string().min(2, {
    message: "Enter a valid access code.",
  }),
});

export function AccessCodeForm() {
  const [responseMessage, setResponseMessage] = useState("");

  // Use the hook directly at the top level
  const { data: existingCodeData, isLoading, isError, error } = trpc.retrieveCode.useQuery();


  const submittedAccessCode = trpc.submitCode.useMutation({
    onSuccess: (data) => {
      // Handle successful response
      setResponseMessage(data.message);
      toast.success(data.message);
    },
    onError: (error) => {
      // Handle error response
      setResponseMessage(error.message);
      toast.error(error.message);
    },
  });

  const getExistingCode = async () => {
    const retrieveAccessCode = trpc.retrieveCode.useQuery();
    return retrieveAccessCode.data;
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      code: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    submittedAccessCode.mutate({
      code: values.code,
    });
  };

  useEffect(() => {
    if (existingCodeData) {
      // Set the existing code as the default value
      form.reset({ code: existingCodeData });
    }
  }, [existingCodeData, form]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="pt-5">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="code"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Enter your pre-mocks access code for free premium access to all papers to prepare for your mocks.</FormLabel>
                <FormControl>
                <Input {...field} {...form.register('code')} />
                </FormControl>
                <FormDescription>
                  Enter your pre-mocks access code here.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
}

export default AccessCodeForm;
