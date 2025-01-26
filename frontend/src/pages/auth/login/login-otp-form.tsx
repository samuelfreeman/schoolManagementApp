import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useVerifyLogin } from "../services/queries";
import { useVerifyUser } from "@/store/use-auth-store";

const FormSchema = z.object({
  otp: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
});

export default function LoginOtpForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      otp: "",
    },
  });
  const { email } = useVerifyUser();
  const { mutateAsync: otpVerify, isPending } = useVerifyLogin();

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      await otpVerify({ ...data, email });
    } catch (error) {
      console.error("Form submission error", error);
    } finally {
      form.reset();
    }
  }

  return (
    <div className="bg-[url('/cool-background.svg')] w-full h-screen bg-cover  flex justify-center items-center bg-right-top">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="bg-background space-y-3 w-full max-w-sm bg-surface shadow-lg rounded-lg p-6"
        >
          <FormField
            control={form.control}
            name="otp"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="otp" className="text-xl font-semibold">
                  One-Time Password
                </FormLabel>
                <FormDescription>
                  Please enter the one-time password sent to you email.
                </FormDescription>
                <FormControl>
                  <InputOTP className="w-full" maxLength={6} {...field}>
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                    </InputOTPGroup>
                    <InputOTPSeparator />
                    <InputOTPGroup>
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isPending} className="w-full">
            {isPending ? "Verifying..." : "Verify OTP"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
