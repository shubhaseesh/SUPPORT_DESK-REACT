import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import {FaQuestionCircle, FaTicketAlt} from 'react-icons/fa'


const Home = () => {
	return (
		<Fragment>
			<section className="heading">
				<h1>What do you need help with?</h1>
				<p>Please choose from an option below</p>
			</section>
            <Link to='/new-ticket' className='btn btn-reverse btn-block'>
                <FaQuestionCircle /> Create New Ticket
            </Link>
            <Link to='/tickets' className='btn btn-block'>
                <FaTicketAlt /> View My Tickets
            </Link>
		</Fragment>
	);
};

export default Home;
