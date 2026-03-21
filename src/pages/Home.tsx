import Hero from '../components/Hero';
import About from '../components/About';
import Services from '../components/Services';
import Reviews from '../components/Reviews';
import Contact from '../components/Contact';

const Home = () => {
    return (
        <div className="flex flex-col">
            <Hero />
            <About />
            <Services />
            <Reviews />
            <Contact />
        </div>
    );
};

export default Home;
