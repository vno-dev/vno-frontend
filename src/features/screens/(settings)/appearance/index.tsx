'use client'
import { ContentSection } from '@/components/containers'
import { AppearanceForm } from '@/forms'
import React from 'react'

const AppearanceScreen = () => {
  return (
    <ContentSection
      title='Appearance'
      desc='Customize the appearance of the app. Automatically switch between day
          and night themes.'
    >
      <AppearanceForm />
    </ContentSection>
  )
}

export default AppearanceScreen