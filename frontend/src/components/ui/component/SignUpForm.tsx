import { signUpFormSchema as formSchema } from "@/validation/SignUpschema"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"





export function ProfileForm() {
  // ...
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  })

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }
  return (
    <div className="bg-white  h-[503px] w-[544px] mr-32 rounded-lg" >


      <Form {...form}>


        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8   flex justify-center items-center flex-col  p-10 " >
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem className="flex gap-y-7 items-center flex-col">
                <FormLabel className="text-4xl">Sign Up</FormLabel>
                <FormControl>
                  <Input placeholder="Username" {...field} />
                </FormControl>
                <FormControl>
                  <Input placeholder="Email" {...field} />
                </FormControl>
                <FormControl>
                  <Input placeholder="Password" {...field} />
                </FormControl>
                <FormDescription>
                  Already have an account ? <a href="/login" className="text-blue-700">Login</a>
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="px-20">Register</Button>
        </form>
      </Form>
    </div>
  )
}
