import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState, useTransition } from 'react'
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
import FormError from './form-error'
import FormSucces from './form-succes'
import FormWrapper from './form-wrapper'
import { RegisterSchema } from '@/schemas'
import { useAuth } from '@/hooks/use-auth'

const RegisterForm = () => {
  const { registration } = useAuth()
  const [error, setError] = useState<string | undefined>()
  const [succes, setSucces] = useState<string | undefined>()
  const [isPending, startTransition] = useTransition()
  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      passwordRepeat: '',
    },
  })
  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
    setError('')
    setSucces('')
    startTransition(() => {
      registration(values).then((data) => {
        if (data.message) {
          setSucces(data.message)
        }
        if (data.error) {
          setError(data.error)
        }
      })
    })
  }

  return (
    <FormWrapper
      header='Registration'
      label='Create an account'
      backButtonLabel='Already have an account?'
      backButtonHref='/auth/login'
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input disabled={isPending} {...field} placeholder='Gerax' />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
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
            <FormField
              control={form.control}
              name='passwordRepeat'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Repeat password</FormLabel>
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
            <FormError message={error} />
            <FormSucces message={succes} />
          </div>
          <Button
            disabled={isPending}
            type='submit'
            className='w-full'
            size='lg'
          >
            Registration
          </Button>
        </form>
      </Form>
    </FormWrapper>
  )
}

export default RegisterForm
