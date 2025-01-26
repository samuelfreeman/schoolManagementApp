"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { otp as otpService } from "@/archive/api/slices/adminthunk";
import { toast } from "@/hooks/use-toast";
import { useAppDispatch, useAppSelector } from "@/archive/store/hooks";

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
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useNavigate } from "react-router-dom";

const FormSchema = z.object({
  otp: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
});

export function InputOTPForm() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      otp: "",
    },
  });

  const { loading } = useAppSelector((state) => state.admin);
  async function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);
    const result = await dispatch(otpService(data));

    if (result.meta.requestStatus.match("fulfilled")) {
      // Navigate to the dashboard or wherever you want to go after successful signup
      navigate("/dashboard");

      toast({
        title: "Success",
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">Verified Otp successfully</code>
          </pre>
        ),
      });
    } else {
      toast({
        title: "Error",
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">Error Verifying Otp</code>
          </pre>
        ),
      });
    }
  }

  return (
    <Form {...form}>
      <div className="bg-[url('/cool-background.svg')] w-full h-screen bg-cover  flex justify-center items-center bg-right-top">
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="bg-white rounded-md flex items-center flex-col justify-center  p-10"
        >
          <FormField
            control={form.control}
            name="otp"
            render={({ field }) => (
              <FormItem className="pl-16">
                <FormLabel className="text-black">One-Time Password</FormLabel>
                <FormControl>
                  <InputOTP maxLength={6} {...field}>
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </FormControl>
                <FormDescription className="text-white">
                  Please enter the one-time password sent to your phone.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full h-10 text-md">
            {loading ? "Submitting...." : "Submit"}
          </Button>
        </form>
      </div>
    </Form>
  );
}
