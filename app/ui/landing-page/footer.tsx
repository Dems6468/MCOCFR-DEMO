'use client';

import Link from 'next/link';
import { MessageSquare, Twitter, Instagram, Youtube, Facebook } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-900 text-gray-300 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Colonne 1: Logo et description */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <img 
                src="/favicon-96x96.png" 
                alt="MCOC FR Logo" 
                className="w-10 h-10"
              />
              <span className="text-xl font-bold text-white">MCOC FR</span>
            </div>
            <p className="text-sm">
              La référence française pour Marvel Contest of Champions. Guides, astuces et actualités pour dominer dans le jeu.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          {/* Colonne 2: Liens rapides */}
          <div>
            <h3 className="text-white font-semibold mb-4">Liens Rapides</h3>
            <ul className="space-y-2">
              <li><Link href="/champions" className="hover:text-red-400 transition-colors">Champions</Link></li>
              <li><Link href="/debuffs" className="hover:text-red-400 transition-colors">Débuffs et Immunités</Link></li>
              <li><Link href="/focus" className="hover:text-red-400 transition-colors">Liste 7*</Link></li>
              <li><Link href="/guides" className="hover:text-red-400 transition-colors">Guides</Link></li>
              <li><Link href="/news" className="hover:text-red-400 transition-colors">Actualités</Link></li>
            </ul>
          </div>
          
          {/* Colonne 3: Ressources */}
          <div>
            <h3 className="text-white font-semibold mb-4">Ressources</h3>
            <ul className="space-y-2">
              <li><Link href="/tier-list" className="hover:text-red-400 transition-colors">Tier List</Link></li>
              <li><Link href="/counters" className="hover:text-red-400 transition-colors">Contres</Link></li>
              <li><Link href="/masteries" className="hover:text-red-400 transition-colors">Maîtrises</Link></li>
              <li><Link href="/awakenings" className="hover:text-red-400 transition-colors">Réveils</Link></li>
              <li><Link href="/rank-up" className="hover:text-red-400 transition-colors">Guide de montée en rang</Link></li>
            </ul>
          </div>
          
          {/* Colonne 4: Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact</h3>
            <ul className="space-y-2">
              <li><a href="mailto:contact@mcocfr.com" className="hover:text-red-400 transition-colors">contact@mcocfr.com</a></li>
              <li><Link href="/about" className="hover:text-red-400 transition-colors">À propos</Link></li>
              <li><Link href="/privacy" className="hover:text-red-400 transition-colors">Politique de confidentialité</Link></li>
              <li><Link href="/terms" className="hover:text-red-400 transition-colors">Conditions d'utilisation</Link></li>
              <li><Link href="/sitemap" className="hover:text-red-400 transition-colors">Plan du site</Link></li>
            </ul>
          </div>
        </div>
        
        {/* Copyright et mentions légales */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-500">
            © {currentYear} MCOC FR. Tous droits réservés.
          </p>
          <p className="text-sm text-gray-500 mt-4 md:mt-0">
            Marvel Contest of Champions est une marque déposée de Kabam Games, Inc. Ce site n'est pas affilié à Kabam Games, Inc.
          </p>
        </div>
      </div>
    </footer>
  );
}
