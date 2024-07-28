'use client'

import { HamburgerIcon, MGLogo } from '@/components'
import { Tooltip } from '@chakra-ui/react'
import Link from 'next/link'

export const TopNav = (): JSX.Element => (
  <nav className='bg-white px-6 py-4 shadow-sm text-secondary flex items-center justify-between'>
    <Tooltip
      label='Coming soon.'
      hasArrow
      placement='right'
      background='white'
      p='2'
      color=''
    >
      <aside className='flex items-center gap-2 cursor-pointer relative h-fit'>
        <HamburgerIcon />
        <span className='text-sm font-semibold'>Menu</span>
      </aside>
    </Tooltip>

    <h1 className='font-semibold text-base -ml-8'>Let&apos;s get your loan</h1>

    <Link href='/'>
      <MGLogo />
    </Link>
  </nav>
)
