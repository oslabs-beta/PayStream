import Navbar from '@/components/Navbar';

export default function AdminLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <section className='h-screen bg-neutral-950'>
      <Navbar />
      {children}
    </section>
  );
}
