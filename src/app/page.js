import Navbar from '@/app/components/Navbar/Navbar';

export default function Home() {
  return (
    <>
      <Navbar />
      <main style={{ paddingTop: '100px' }}>
        <h1>Netflix Clone - GB WebAssist</h1>
        <div style={{ height: '200vh' }}>
          <p>Scroll pour voir l&apos;effet de la navbar...</p>
        </div>
      </main>
    </>
  );
}