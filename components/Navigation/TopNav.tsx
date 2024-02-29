import { HamburgerIcon, MGLogo } from '@/components'

export const TopNav = (): JSX.Element => (
  <nav className='bg-white px-6 py-4 text-secondary flex items-center justify-between'>
    <aside className='flex items-center gap-2 cursor-pointer'>
      <HamburgerIcon />
      <span className='text-sm font-semibold'>Menu</span>
    </aside>

    <h1 className='font-semibold text-base'>Let&apos;s get your loan</h1>

    <aside>
      <MGLogo />
    </aside>
  </nav>
)
