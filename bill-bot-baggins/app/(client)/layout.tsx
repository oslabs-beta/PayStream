import { Footer, Navbar } from '@/components/index';

export default function ClientLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <section className='flex h-screen flex-col bg-secondary/5'>
      <Navbar />
      {children}
      <Footer />
    </section>
  );
}
