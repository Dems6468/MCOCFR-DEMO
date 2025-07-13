import { cn } from '@/app/lib/utils';
import { Card, CardHeader, CardContent, CardTitle, CardFooter } from '@/components/ui/card';
import { Swords, Shield, BookOpen, HeartPulse, Trophy, Users, Lightbulb, MessageSquare } from 'lucide-react';
import Link from 'next/link';

const features = [
  {
    name: 'Champions',
    description: 'Explorez les héros de MCOC et leurs capacités uniques.',
    icon: Swords,
    link: '/champions',
    buttonText: 'Voir les champions'
  },
  {
    name: 'Débuffs et Immunités',
    description: 'Trouvez vos champions immunisés.',
    icon: Shield,
    link: '/debuffs',
    buttonText: 'Voir les débuffs'
  },
  {
    name: 'Liste 7*',
    description: 'Prestige, Focalisation et Reliques de vos champions.',
    icon: Trophy,
    link: '/focus',
    buttonText: 'Explorer'
  },
  {
    name: 'Buffs et Capacités',
    description: 'Toutes les informations sur les buffs et capacités des champions.',
    icon: HeartPulse,
    link: '#',
    buttonText: 'En savoir plus'
  },
  {
    name: 'Comment Contrer',
    description: 'Stratégies pour contrer chaque champion.',
    icon: Swords,
    link: '#',
    buttonText: 'Découvrir'
  },
  {
    name: 'Quêtes Histoire',
    description: 'Guides pour les quêtes d\'histoire.',
    icon: BookOpen,
    link: '#',
    buttonText: 'Explorer'
  },
  {
    name: 'Les Créateurs FR',
    description: 'Découvrez les créateurs de contenu MCOC francophones.',
    icon: Users,
    link: '#',
    buttonText: 'Découvrir'
  },
  {
    name: 'Boîte à Idées',
    description: 'Proposez vos idées pour le site.',
    icon: Lightbulb,
    link: '#',
    buttonText: 'Participer'
  },
  {
    name: 'Contact',
    description: 'Une question ? Contactez-nous !',
    icon: MessageSquare,
    link: '#contact',
    buttonText: 'Nous contacter'
  }
];

export default function FeaturesSection() {
  return (
    <section id='features' className='py-16 bg-gray-900'>
      <div className='max-w-7xl mx-auto px-6 lg:px-8'>
        {/* Header */}
        <div className='text-center mb-16'>
          <h2 className='text-4xl font-extrabold text-white sm:text-5xl'>
            Fonctionnalités
          </h2>
          <p className='mt-4 text-xl text-gray-300 max-w-3xl mx-auto'>
            Tous les outils dont vous avez besoin pour dominer dans Marvel Contest of Champions
          </p>
        </div>

        {/* Features grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {features.map((feature) => (
            <Card 
              key={feature.name}
              className='bg-gray-800 border-gray-700 text-white hover:border-red-500 transition-colors duration-300 h-full flex flex-col'
            >
              <CardHeader className='flex flex-col items-center text-center pb-2'>
                <div className='flex items-center justify-center w-14 h-14 bg-red-600 rounded-full shadow-lg mb-4'>
                  <feature.icon className='w-7 h-7 text-white' />
                </div>
                <CardTitle className='text-xl font-bold text-white'>
                  {feature.name}
                </CardTitle>
              </CardHeader>
              <CardContent className='flex-grow px-6 pb-2'>
                <p className='text-gray-300 text-center'>{feature.description}</p>
              </CardContent>
              <CardFooter className='p-4 pt-0'>
                <Link 
                  href={feature.link}
                  className='w-full mt-4 inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 transition-colors duration-200'
                >
                  {feature.buttonText}
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
