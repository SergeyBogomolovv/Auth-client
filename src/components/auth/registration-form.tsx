import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
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
import FormError from 'components/auth/form-error'
import FormSucces from 'components/auth/form-succes'
import FormWrapper from 'components/auth/form-wrapper'
import { RegisterSchema } from '@/schemas'
import { useRegistrationMutation } from '@/redux/api/auth'

const RegisterForm = () => {
  const [error, setError] = useState<string | undefined>()
  const [succes, setSucces] = useState<string | undefined>()
  const [registration, { isLoading }] = useRegistrationMutation()
  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      passwordRepeat: '',
    },
  })

  const onSubmit = async (values: z.infer<typeof RegisterSchema>) => {
    setError('')
    setSucces('')
    await registration(values)
      .unwrap()
      .then((data) => {
        setSucces(data.message)
      })
      .catch((err) => {
        setError(err.data.message)
      })
  }

  return (
    <FormWrapper
      showBackButton
      showSocial
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
                  <Input disabled={isLoading} {...field} placeholder='Gerax' />
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
            <FormField
              control={form.control}
              name='passwordRepeat'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Repeat password</FormLabel>
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
            <FormError message={error} />
            <FormSucces message={succes} />
          </div>
          <Button
            disabled={isLoading}
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
