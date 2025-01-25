import { tutorSignUpFormSchema as formSchema } from "@/validation/Tutorschema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Dialog, DialogTitle, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { loadTutors, tutorSignUp } from "@/api/slices/tutorthunk";
import { useToast } from "@/hooks/use-toast";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export function AddTutorModal({
  isOpen,
  setClose,
}: {
  isOpen: boolean;
  setClose: (open: boolean) => void;
}) {
  const dispatch = useAppDispatch();
  const { toast } = useToast();
  const { loading } = useAppSelector((state) => state.tutor);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      contact: "",
      registeredCode: "",
      gender: "",
      email: "",
      password: "",
    },
  });

  const { reset } = form;

  // Submit handler
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const result = await dispatch(tutorSignUp(values));
    console.log(result);
    if (result.meta.requestStatus === "fulfilled") {
      toast({
        title: "Success",
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">Tutor Registered successfully</code>
          </pre>
        ),
      });
      dispatch(loadTutors());
      // Notify parent component to update the tutor list
      // onAddTutor(values); // Pass the new tutor data
      onClose();
      reset();
    } else {
      toast({
        title: "Error",
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">{result.payload}</code>
          </pre>
        ),
      });
    }
  }

  const onClose = () => {
    setClose(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogTitle>Register a tutor</DialogTitle>
        <div className="lg:min-h-[503px] lg:w-[544px] lg:pr-12 text-left rounded-lg">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className=" flex justify-center items-center flex-col   "
            >
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem className="flex  flex-col">
                    <FormLabel className="text-sm">Firstname</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Firstname"
                        {...field}
                        className="h-7"
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem className="flex  flex-col">
                    <FormLabel className="text-sm">Lastname</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Lastname"
                        {...field}
                        className="h-7"
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="flex   flex-col">
                    <FormLabel className="text-sm">Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Email" {...field} className="h-7" />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="contact"
                render={({ field }) => (
                  <FormItem className="flex   flex-col">
                    <FormLabel className="text-sm">Contact</FormLabel>
                    <FormControl>
                      <Input placeholder="Contact" {...field} className="h-7" />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="flex    flex-col">
                    <FormLabel className="text-sm text-left">
                      Password
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Password"
                        {...field}
                        className="h-7"
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem className="flex   flex-col">
                    <FormLabel className="text-sm text-left">Gender</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex pr-28 pb-2"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="male" id="Male" />
                          <Label htmlFor="Male">Male</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="female" id="Female" />
                          <Label htmlFor="Female">Female</Label>
                        </div>
                      </RadioGroup>
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="registeredCode"
                render={({ field }) => (
                  <FormItem className="flex  flex-col pb-3">
                    <FormLabel className="text-sm">
                      Registeration Code
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="" {...field} className="h-7" />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="px-20 mt-5">
                {loading ? "Registering..." : "Register Tutor"}
              </Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
