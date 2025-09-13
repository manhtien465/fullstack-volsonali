import { MarkdownText } from '@/components/custom/markdown-text'
import {  MarkdownProps } from '@/types'
import React from 'react'

export const Markdown = (data: Readonly<MarkdownProps>) => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
                 <MarkdownText content={data.content} />
               </div>
  )
}
