import Hero from '../components/Hero';
import TireShowcase from '../components/TireShowcase';
import About from '../components/About';
import Services from '../components/Services';
import Process from '../components/Process';
import Reviews from '../components/Reviews';
import Contact from '../components/Contact';

/* Narrative order: hook → product → who we are → range → how it works →
   proof → contact. The showcase sits directly after the hero so the tires
   are the first thing the page actually argues with. */
const Home = () => {
    return (
        <div className="flex flex-col">
            <Hero />
            <TireShowcase />
            <About />
            <Services />
            <Process />
            <Reviews />
            <Contact />
        </div>
    );
};

export default Home;
