'use client';
import {
  FaHome,
  FaUserShield,
  FaUserCog,
  FaList,
  FaBook,
  FaUsers,
  FaLightbulb,
  FaEnvelope,
} from 'react-icons/fa';
import { GiSwordman } from 'react-icons/gi';
import { BiHealth } from 'react-icons/bi';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

export default function NavLinks() {
  const pathname = usePathname();

  const links = [
    { name: 'Accueil', href: '/', icon: FaHome },
    { name: 'Champions', href: '/champions', icon: GiSwordman },
    { name: 'Buffs', href: '/buffs', icon: FaList },
    { name: 'Débuffs', href: '/debuffs', icon: BiHealth },
    { name: 'Stat Focus', href: '/focus', icon: FaList },
    { name: 'Communauté', href: '/community', icon: FaUsers },
    { name: 'Contact', href: '/contact', icon: FaEnvelope },
  ];

  // Diviser les liens en deux groupes pour la disposition mobile
  const firstHalfLinks = links.slice(0, Math.ceil(links.length / 2));
  const secondHalfLinks = links.slice(Math.ceil(links.length / 2));
  const allLinks = [firstHalfLinks, secondHalfLinks];

  return (
    <div className='w-full'>
      {/* Première ligne */}
      <div className='grid grid-cols-4 gap-1 mb-1 md:grid-cols-1 md:gap-0 md:mb-0'>
        {allLinks.map((group) =>
          group.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={clsx(
                'flex flex-col items-center justify-center h-16 p-1 text-xs font-medium hover:bg-gray-800/50 hover:text-gray-100 transition-colors md:h-12 md:flex-row md:justify-start md:px-3 md:text-sm',
                {
                  'bg-gray-800/70 text-gray-100':
                    (pathname.startsWith(link.href) && link.href !== '/') || pathname === link.href,
                  'text-gray-400': !(
                    (pathname.startsWith(link.href) && link.href !== '/') ||
                    pathname === link.href
                  ),
                }
              )}
            >
              <link.icon className='w-5 h-5 mb-1 md:mb-0 md:mr-2 flex-shrink-0' />
              <span className='text-center md:text-left md:truncate'>{link.name}</span>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
