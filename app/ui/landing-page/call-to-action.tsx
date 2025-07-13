'use client';

import { Button } from '@/components/ui/button';
import { Swords, MessageSquare } from 'lucide-react';
import Link from 'next/link';

export default function CallToAction() {
  return (
    <section className='bg-gradient-to-r from-red-900 to-black py-20 relative overflow-hidden'>
      {/* Effet de fond */}
      <div className='absolute inset-0 opacity-10'>
        <div className='absolute inset-0 bg-[url("/marvel-pattern.png")] bg-cover bg-center mix-blend-overlay'></div>
      </div>
      
      <div className='max-w-7xl mx-auto px-6 lg:px-8 text-center relative z-10'>
        <div className='inline-flex items-center justify-center bg-red-600 text-white text-sm font-medium px-4 py-2 rounded-full mb-6'>
          <Swords className='w-5 h-5 mr-2' />
          REJOIGNEZ LA COMMUNAUTÉ
        </div>
        
        <h2 className='text-4xl font-extrabold text-white sm:text-5xl mb-6'>
          Prêt à dominer dans <span className='text-red-500'>Marvel Contest of Champions</span> ?
        </h2>
        
        <p className='text-xl text-gray-300 max-w-3xl mx-auto mb-10'>
          Accédez à toutes les fonctionnalités, guides et ressources pour devenir un meilleur joueur et progresser plus rapidement dans le jeu.
        </p>
        
        <div className='flex flex-col sm:flex-row justify-center gap-4'>
          <Button
            asChild
            size='lg'
            className='bg-red-600 hover:bg-red-700 text-white text-lg py-6 px-8 rounded-lg transition-all duration-300 transform hover:scale-105'
          >
            <Link href='/champions' className='font-bold'>
              Explorer les champions
              <Swords className='ml-2 h-5 w-5' />
            </Link>
          </Button>
          
          <Button
            asChild
            variant='outline'
            size='lg'
            className='bg-transparent border-2 border-white text-white hover:bg-white/10 text-lg py-6 px-8 rounded-lg transition-all duration-300 transform hover:scale-105'
          >
            <Link href='#contact' className='font-bold'>
              Nous contacter
              <MessageSquare className='ml-2 h-5 w-5' />
            </Link>
          </Button>
        </div>
        
        <p className='mt-6 text-gray-400 text-sm'>
          Rejoignez des milliers de joueurs qui améliorent déjà leur jeu avec nos ressources.
        </p>
      </div>
    </section>
  );
}
