import { signUpFormSchema as formSchema } from "@/validation/SignUpschema"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useAppDispatch, useAppSelector } from "@/store/hooks"

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
import { signUp } from "@/api/slices/adminthunk"
import { useNavigate } from "react-router-dom"
import { useToast } from "@/hooks/use-toast"



export function ProfileForm() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const {toast} = useToast()
  const { loading, error } = useAppSelector((state) => state.admin)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  })

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Add your API call here
    const result = await dispatch(signUp(values))
    console.log(result)

    if (result.meta.requestStatus.match("fulfilled")) {
      toast({
        title: "Success",
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">Signup  successfully</code>
          </pre>
        ),
      })
            navigate("/")
          }
          if(error){ 
      
            toast({
              title: "Error",
              description: (
                <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                  <code className="text-white">Error Signing Up</code>
                </pre>
              ),
            })
          }
        }
            
  return (
    <div className="bg-white  h-[503px] w-[544px] mr-32 rounded-lg" >


      <Form {...form}>

        <FormLabel className="text-4xl text-center justify-center flex p-4">Sign Up</FormLabel>
        {error && <p className="error">{error}</p>}
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5   flex justify-center items-center flex-col  p-10 " >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="flex  flex-col">
                <FormLabel className="text-md">Username</FormLabel>
                <FormControl>
                  <Input placeholder="Username" {...field} />
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
            Already have an account ? <a href="/login" className="text-blue-700">Login</a>
          </FormDescription>
          <Button type="submit" className="px-20">

            {loading ? "Registering..." : "Register"}
          </Button>
        </form>
      </Form>
    </div>
  )
}
