import '@/app/ui/global.css';
import SideNavBar from '@/app/ui/left-nav-bar/sidenav';
import { Toaster } from '@/components/ui/sonner';

interface RootLayoutProps {
  readonly children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html
      lang='fr'
      className='h-full'
    >
      <body className='antialiased bg-gray-900 text-white h-full'>
        <div
          className='fixed inset-0 bg-cover bg-center opacity-20 z-0'
          style={{
            backgroundImage: 'url(/images/espace.webp)',
          }}
        />

        <div className='relative flex h-full flex-col md:flex-row z-10'>
          <div className=' md:flex md:flex-shrink-0'>
            <div className='flex w-full md:w-64 flex-col bg-gray-900/90 backdrop-blur-sm'>
              <SideNavBar />
            </div>
          </div>

          <div className='flex flex-1 flex-col overflow-hidden'>
            <main className='flex-1 overflow-y-auto p-4 md:p-8'>{children}</main>
          </div>

          <Toaster position='top-right' />
        </div>
      </body>
    </html>
  );
}
