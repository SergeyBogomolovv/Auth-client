import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from 'components/ui/form'
import { Input } from 'components/ui/input'
import { Button } from 'components/ui/button'
import FormWrapper from '@/components/form-assets/form-wrapper'
import { toast } from 'sonner'
import { LoginSchema } from '@/schemas'
import { useLoginMutation } from '@/redux/api/auth'

const LoginForm = () => {
  const [loginAction, { isLoading }] = useLoginMutation()
  const onSubmit = async (values: z.infer<typeof LoginSchema>) => {
    await loginAction({
      email: values.email,
      password: values.password,
    })
      .unwrap()
      .catch(() => {
        toast.error('Failed to login')
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
      showBackButton
      showSocial
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
                      disabled={isLoading}
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
                      disabled={isLoading}
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
            disabled={isLoading}
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
