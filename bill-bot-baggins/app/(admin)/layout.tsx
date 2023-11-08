import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';

export default function AdminLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <section className='bg-secondary/5'>
      <Navbar />
      {children}
    </section>
  );
}
