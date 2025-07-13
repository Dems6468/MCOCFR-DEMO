'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Star } from 'lucide-react';

const testimonials = [
  {
    name: 'Alex T.',
    role: 'Joueur compétitif',
    content:
      "Ce site est une mine d'or pour tout joueur sérieux de MCOC. Les guides sur les champions m'ont aidé à améliorer mon gameplay de manière significative.",
    rating: 5
  },
  {
    name: 'Sophie M.',
    role: 'Nouvelle joueuse',
    content:
      "En tant que nouvelle joueuse, je me sentais perdue. Les explications claires et les guides m'ont permis de progresser rapidement.",
    rating: 5
  },
  {
    name: 'Marc D.',
    role: 'Leader d\'alliance',
    content:
      "Je recommande ce site à tous les membres de mon alliance. Les informations sur les débuffs et immunités sont particulièrement utiles pour les guerres d'alliance.",
    rating: 4
  },
  {
    name: 'Julie P.',
    role: 'Collectionneuse',
    content:
      "J'adore la section sur les champions. C'est très complet et ça m'aide à prendre des décisions éclairées pour mon équipe.",
    rating: 5
  }
];

const RatingStars = ({ count }: { count: number }) => {
  return (
    <div className="flex">
      {[...Array(5)].map((_, i) => (
        <Star 
          key={i} 
          className={`w-5 h-5 ${i < count ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
        />
      ))}
    </div>
  );
};

export default function TestimonialsSection() {
  return (
    <section className='bg-gray-800 py-16'>
      <div className='max-w-7xl mx-auto px-6 lg:px-8'>
        <div className='text-center mb-12'>
          <h2 className='text-3xl font-extrabold text-white sm:text-4xl mb-4'>
            Témoignages de la communauté
          </h2>
          <p className='text-xl text-gray-300 max-w-3xl mx-auto'>
            Découvrez ce que les joueurs de la communauté MCOC pensent de notre site
          </p>
        </div>

        <div className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-2'>
          {testimonials.map((testimonial) => (
            <Card
              key={testimonial.name}
              className='rounded-lg bg-gray-700 border-gray-600 hover:border-red-500 transition-colors duration-300'
            >
              <CardHeader className='pb-2'>
                <div className='flex justify-between items-start'>
                  <div>
                    <CardTitle className='text-xl font-bold text-white'>
                      {testimonial.name}
                    </CardTitle>
                    <p className='text-red-400'>{testimonial.role}</p>
                  </div>
                  <RatingStars count={testimonial.rating} />
                </div>
              </CardHeader>
              <CardContent>
                <p className='text-gray-300 italic'>&quot;{testimonial.content}&quot;</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
