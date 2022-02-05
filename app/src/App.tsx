import { useState } from 'react';

import Sidebar from './Components/Sidebar'
import Coolors from './Components/Coolors'
import { Color } from './assets/models';
import { post } from './assets/requests';

import './App.css';

const defaultColorsNb = 5;

const history: Color[][] = []
let cursor = -1

const App = () => {

  	const [coolors, setCoolors] = useState<Color[]>([])

  	const updateCoolors = (c: Color[]) => {
		cursor = history.length
   	 	history.push(c)
		setCoolors(c)
		console.log(cursor, history);
  	}

	const setRandomCoolors = () => {
		const colorsNb = coolors.length > 0 
			? coolors.length : defaultColorsNb;

		post( '/textures', {nb: colorsNb}, (data: any) => {
			if ( coolors.length === 0 )
				updateCoolors(data);
			else
			{
				updateCoolors( coolors.map( 
					(c,i) => coolors[i].locked 
					? c : data[i] ) )
			}
		} )
	}

	const previous = () => {
		console.log(cursor);
		
		if ( cursor > 0 )
		{
			cursor--
			setCoolors(history[cursor])
		}
	}

	const refresh = () => {
		setRandomCoolors();
	}

	const next = () => {
		if ( (cursor + 1) < history.length)
		{
			cursor++
			setCoolors(history[cursor])
		}
	}

	return (
		<div className="App">
			<Sidebar coolors={coolors} previous={previous} refresh={refresh} next={next}/>
			<Coolors coolors={coolors} setCoolors={updateCoolors} setRandomCoolors={setRandomCoolors}/>
		</div>
	);
}

export default App;
