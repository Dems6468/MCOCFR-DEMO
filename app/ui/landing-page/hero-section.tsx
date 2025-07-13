'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export default function HeroSection() {
  return (
    <div className='relative flex items-center justify-center min-h-[80vh] bg-gradient-to-b from-red-900 to-black overflow-hidden'>
      <div className='relative z-10 max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-center py-20'>
        <div className='text-center w-full mx-auto'>
          <div className='mb-8'>
            <img 
              src="/favicon-96x96.png" 
              alt="MCOC FR Logo" 
              className='mx-auto w-24 h-24 mb-6'
            />
            <h1 className='text-4xl md:text-6xl font-bold text-white mb-6 leading-tight'>
              Bienvenue sur <span className='text-red-500'>MCOC FR</span>
            </h1>
            <p className='text-xl text-gray-300 mb-6 max-w-4xl mx-auto'>
              La référence française pour Marvel Contest of Champions
            </p>
            <p className='text-lg text-red-400 font-medium mb-8'>
              MISE À JUIN 2025 - NICO MINORU / KAROLINA DEAN / CAPTAIN BRITAIN (REWORK)
            </p>
            <p className='text-gray-400 mb-8'>
              ⚠️ Le site n'aura pas de modifications majeures mais la maj mensuelle sera faite
            </p>
            <p className='text-gray-300 mb-8'>
              Je ne comptais pas supprimer un outil que je juge utile à la commu FR
            </p>
          </div>
          
          <div className='flex flex-col sm:flex-row gap-4 justify-center items-center'>
            <Link href='/champions' passHref>
              <Button className='bg-red-600 hover:bg-red-700 text-white px-6 py-3 text-lg flex items-center justify-center gap-2'>
                Voir les champions <ArrowRight className='w-5 h-5' />
              </Button>
            </Link>
            <Link href='#features' passHref>
              <Button
                variant='outline'
                className='text-white border-white px-6 py-3 text-lg hover:bg-red-900/50'
              >
                Découvrir les fonctionnalités
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}