import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTransition } from 'react'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import FormWrapper from './form-wrapper'
import { useAuth } from '@/hooks/use-auth'
import { toast } from 'sonner'
import { LoginSchema } from '@/schemas'

const LoginForm = () => {
  const { login } = useAuth()
  const [isPending, startTransition] = useTransition()
  const onSubmit = async (values: z.infer<typeof LoginSchema>) => {
    startTransition(() => {
      login({ email: values.email, password: values.password }).then((data) => {
        if (data.error) {
          toast.error(data.error)
        }
        if (data.succes) {
          toast.success(data.succes)
        }
      })
    })
  }

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })
  return (
    <FormWrapper
      header='Login'
      label='Welcome back!'
      backButtonLabel='Dont have an account?'
      backButtonHref='/auth/registration'
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
          <div className='space-y-4'>
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isPending}
                      {...field}
                      placeholder='example@email.com'
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isPending}
                      type='password'
                      {...field}
                      placeholder='******'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button
            disabled={isPending}
            type='submit'
            className='w-full'
            size='lg'
          >
            Login
          </Button>
        </form>
      </Form>
    </FormWrapper>
  )
}

export default LoginForm
