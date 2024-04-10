import FormWrapper from 'components/auth/form-wrapper'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from 'components/ui/form'
import { useForm } from 'react-hook-form'
import { Input } from 'components/ui/input'
import { CreatePostSchema } from '@/schemas'
import { Button } from 'components/ui/button'
import { Textarea } from 'components/ui/textarea'
import { useCreatePostMutation } from 'api/posts'
import { toast } from 'sonner'

export default function CreatePostForm() {
  const [createPost, { isError, isLoading }] = useCreatePostMutation()
  const onSubmit = async (values: z.infer<typeof CreatePostSchema>) => {
    createPost(values)
      .unwrap()
      .then(() => {
        if (isError) {
          toast.error('Error')
          return
        }
        form.reset()
        toast.success('Succes')
      })
  }

  const form = useForm<z.infer<typeof CreatePostSchema>>({
    resolver: zodResolver(CreatePostSchema),
    defaultValues: {
      title: '',
      content: '',
    },
  })

  return (
    <FormWrapper header='Create new post' label='Add a new post to our blog'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
          <div className='space-y-4'>
            <FormField
              control={form.control}
              name='title'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      {...field}
                      placeholder='Dlya Tailera'
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='content'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Content</FormLabel>
                  <FormControl>
                    <Textarea
                      disabled={isLoading}
                      {...field}
                      placeholder='Post pro tailera'
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
            Submit
          </Button>
        </form>
      </Form>
    </FormWrapper>
  )
}
