'use client';

import Link from 'next/link';
import MainCesiZenLogo from '@/app/ui/CesiZenLogo';
import NavLinks from './nav-links';

export default function SideNavBar() {
  return (
    <div className='flex h-full flex-col px-3 py-4 md:px-2'>
      {/* Logo Section */}
      <Link
        href='/'
        className='mb-2 flex h-20 items-center rounded-md bg-blue-400 p-4 transition hover:bg-blue-500 w-full'
        aria-label='Accueil'
      >
        <div className='w-full'>
          <MainCesiZenLogo />
        </div>
      </Link>

      {/* Navigation Links Section */}
      <div className='flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2'>
        <NavLinks />
        <div
          className='hidden h-auto w-full grow rounded-md bg-gray-50 md:block'
          aria-hidden='true'
        ></div>
      </div>
    </div>
  );
}
