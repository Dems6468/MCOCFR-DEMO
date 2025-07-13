'use client';

import NavLinks from './nav-links';
import MCOCFRLogo from '@/app/ui/mcoc-fr-logo';

export default function SideNavBar() {
  return (
    <div className='flex h-full flex-col bg-gray-900/80 backdrop-blur-sm'>
      <div className='md:block px-4 py-4 border-b border-gray-700/50'>
        <MCOCFRLogo />
      </div>

      <div className='flex-1 overflow-y-auto p-1'>
        <NavLinks />
      </div>
    </div>
  );
}
