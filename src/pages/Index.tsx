import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import FilmStrip from "@/components/FilmStrip";
import Portrait from "@/components/Portrait";
import Filmography from "@/components/Filmography";
import Awards from "@/components/Awards";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <main className="bg-background min-h-screen">
      <Navigation />
      <Hero />
      <FilmStrip />
      <Portrait />
      <Filmography />
      <Awards />
      <Footer />
    </main>
  );
};

export default Index;
