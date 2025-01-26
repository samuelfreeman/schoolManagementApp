import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
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
import { useUpdateTutor } from "@/pages/admin/services/tutors/queries";
import { CustomButton } from "@/components/shared/custom/button";
import { PasswordInput } from "@/pages/auth/components/password-input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const formSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string(),
  contact: z.string(),
  gender: z.string(),
  password: z.string(),
  registeredCode: z.string(),
});

export default function EditTutorForm({ tutor }: { tutor: UpdateTutor }) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: tutor,
  });
  const { mutateAsync: updateTutor, isPending } = useUpdateTutor();
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await updateTutor(values);
    } catch (error) {
      console.error("Form submission error", error);
    }
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 max-w-3xl "
      >
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input placeholder="First Name" type="text" {...field} />
              </FormControl>
              <FormDescription>This is the tutor's first name</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last Name</FormLabel>
              <FormControl>
                <Input placeholder="Last Name" type="text" {...field} />
              </FormControl>
              <FormDescription>This is the tutor's last name</FormDescription>
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
                <Input placeholder="Email" type="email" {...field} />
              </FormControl>
              <FormDescription>This is the tutor's email</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="contact"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contact</FormLabel>
              <FormControl>
                <Input placeholder="Contact" type="text" {...field} />
              </FormControl>
              <FormDescription>This is the tutor's contact</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="gender"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Gender</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a gender" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>This is the tutor's gender</FormDescription>
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
                <PasswordInput placeholder="Password" {...field} />
              </FormControl>
              <FormDescription>Enter your password.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="registeredCode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Registered Code</FormLabel>
              <FormControl>
                <Input
                  placeholder="Registeration Code"
                  type="text"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                This is the tutor's registeration code
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <CustomButton type="submit" isLoading={isPending}>
          Update Tutor
        </CustomButton>
      </form>
    </Form>
  );
}
