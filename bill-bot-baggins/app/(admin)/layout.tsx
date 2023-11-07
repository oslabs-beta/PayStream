import Sidebar from '@/components/Sidebar';

export default function AdminLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <section className='flex bg-secondary/5'>
      <Sidebar />
      {children}
    </section>
  );
}
