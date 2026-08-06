import ShopJourney from '../components/journey/ShopJourney';
import Reception from '../components/Reception';

/* The whole page is one walk: outside the shop at dusk, in through the doors,
   past the stands and the pinboard, ending at the reception desk where the
   enquiry is taken. */
const Home = () => {
    return (
        <div className="flex flex-col">
            <ShopJourney />
            <Reception />
        </div>
    );
};

export default Home;
