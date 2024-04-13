import React from 'react'
import { Card, CardContent, CardFooter, CardHeader } from 'components/ui/card'
import Header from '@/components/form-assets/header'
import Social from '@/components/form-assets/social'
import BackButton from 'components/form-assets/back-button'

interface Props {
  header: string
  label: string
  children: React.ReactNode
  backButtonHref?: string
  backButtonLabel?: string
  showSocial?: boolean
  showBackButton?: boolean
}

export default function FormWrapper({
  header,
  label,
  children,
  backButtonHref,
  backButtonLabel,
  showBackButton,
  showSocial,
}: Props) {
  return (
    <Card className='sm:w-[400px] w-full sm:m-0 mx-5 shadow-md'>
      <CardHeader>
        <Header label={label} header={header} />
      </CardHeader>
      <CardContent>{children}</CardContent>
      {showSocial && (
        <CardFooter>
          <Social />
        </CardFooter>
      )}
      {showBackButton && (
        <CardFooter>
          <BackButton href={backButtonHref!} label={backButtonLabel!} />
        </CardFooter>
      )}
    </Card>
  )
}
