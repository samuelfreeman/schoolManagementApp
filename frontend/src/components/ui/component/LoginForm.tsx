import { loginFormSchema as formSchema } from "@/validation/SignUpschema"
import { useNavigate } from "react-router-dom"
import { login } from "@/api/slices/adminthunk"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"

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

export function LoginForm() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { toast } = useToast()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: ""
    },
  })
  const { loading, error } = useAppSelector((state) => state.admin)

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {

    const result = await dispatch(login(values))
    console.log("log form", result)
    if (result.meta.requestStatus.match("fulfilled")) {
      toast({
        title: "Success",
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">Logged in successfully</code>
          </pre>
        ),
      })
      navigate("/otp-verification")
    }else{
    

      toast({
        title: "Error",
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">{result.payload}</code>
          </pre>
        ),
      })
    }

  }
  // Do something with the form values.
  // ✅ This will be type-safe and validated.


  return (
    <div className="bg-white  min-h-[503px] w-[544px] m-5 lg:mr-32 lg:m-0 rounded-lg" >


      <Form {...form}>


        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8   flex justify-center items-center flex-col  p-10 " >
          <FormLabel className="text-4xl text-center justify-center flex p-4">Login</FormLabel>
          {error && <p className="error">{error}</p>}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="flex   flex-col">
                <FormLabel className="text-md">Email</FormLabel>
                <FormControl>
                  <Input placeholder="Email" {...field} />
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
                <FormLabel className="text-md text-left">Password</FormLabel>
                <FormControl>
                  <Input placeholder="Password" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormDescription>
            Don't have an account ? <a href="/signup" className="text-blue-700">Sign up</a>
          </FormDescription>



          <Button type="submit" className="px-20">
            {loading ? "Logging in ...." : "login"}
          </Button>
        </form>
      </Form>
    </div>
  )
}
