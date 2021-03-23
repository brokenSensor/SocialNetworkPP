import { Provider } from 'react-redux';
import store from './store';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Login from './components/auth/Login';
import Register from './components/auth/Register';

import Navbar from './components/layout/Navbar';
import { useEffect } from 'react';
import { loadUser } from './actions/auth';

function App() {
	useEffect(() => {
		store.dispatch(loadUser());
	}, []);
	return (
		<Provider store={store}>
			<BrowserRouter>
				<Navbar />
				<section className='main'>
					<Route exact path='/login' component={Login} />
					<Route exact path='/register' component={Register} />
				</section>
				{/* <Footer /> */}
			</BrowserRouter>
		</Provider>
	);
}

export default App;
