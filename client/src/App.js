import { Provider } from 'react-redux';
import store from './store';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Navbar from './components/layout/Navbar';

function App() {
	return (
		<Provider store={store}>
			<BrowserRouter>
				<Navbar />
				<Route exact path='/' component={''} />
				{/* <Footer /> */}
			</BrowserRouter>
		</Provider>
	);
}

export default App;
