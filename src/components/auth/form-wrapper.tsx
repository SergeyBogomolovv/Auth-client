import React from 'react'
import { Card, CardContent, CardFooter, CardHeader } from '../ui/card'
import Header from './header'
import Social from './social'
import BackButton from './back-button'

interface Props {
  header: string
  label: string
  children: React.ReactNode
  backButtonHref: string
  backButtonLabel: string
}

export default function FormWrapper({
  header,
  label,
  children,
  backButtonHref,
  backButtonLabel,
}: Props) {
  return (
    <Card className='sm:w-[400px] w-full sm:m-0 mx-5 shadow-md'>
      <CardHeader>
        <Header label={label} header={header} />
      </CardHeader>
      <CardContent>{children}</CardContent>
      <CardFooter>
        <Social />
      </CardFooter>
      <CardFooter>
        <BackButton href={backButtonHref} label={backButtonLabel} />
      </CardFooter>
    </Card>
  )
}
