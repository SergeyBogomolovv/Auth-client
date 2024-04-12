import { UpdatePostSchema } from '@/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from 'components/ui/dialog'
import { Post } from 'interfaces/post'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from 'components/ui/form'
import { Button } from 'components/ui/button'
import { Textarea } from 'components/ui/textarea'
import { Input } from 'components/ui/input'
import { toast } from 'sonner'
import { useUpdatePostMutation } from '@/redux/api/posts'

interface Props {
  post: Post
  children: React.ReactNode
}

export default function EditPostModal({ children, post }: Props) {
  const [updatePost, { isLoading }] = useUpdatePostMutation()
  const onSubmit = async (values: z.infer<typeof UpdatePostSchema>) => {
    await updatePost({ data: values, id: post.id })
      .unwrap()
      .then(() => {
        form.reset()
        toast.success('Post updated')
      })
      .catch(() => toast.error(`Failed to update post`))
  }
  const form = useForm<z.infer<typeof UpdatePostSchema>>({
    resolver: zodResolver(UpdatePostSchema),
    defaultValues: {
      title: post.title,
      content: post.content,
    },
  })

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit post {post.title}</DialogTitle>
          <DialogDescription>
            You can edit title or content of this post.
          </DialogDescription>
        </DialogHeader>
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
            <DialogFooter>
              <DialogClose>
                <Button
                  variant={'secondary'}
                  type='button'
                  className='w-full'
                  size='lg'
                >
                  Close
                </Button>
              </DialogClose>
              <Button
                disabled={isLoading}
                type='submit'
                className='w-full'
                size='lg'
              >
                Submit
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
