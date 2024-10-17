import {
	createBrowserRouter,
	createRoutesFromElements,
	RouterProvider,
	Route,
} from 'react-router-dom';

import { Home } from './pages/Home';

import './App.css';

const App = () => {
	const router = createBrowserRouter(
		createRoutesFromElements(
			<Route
				path='/'
				element={<Home />}
			/>
		)
	);

	return <RouterProvider router={router} />;
};

export default App;
