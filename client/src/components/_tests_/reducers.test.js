import  leagueReducer from '../reducers/leagueReducer';
import  leagueTableReducer from '../reducers/leagueTableReducer';
import  teamReducer from '../reducers/teamReducer';
import  playerReducer from '../reducers/playerReducer';



describe('Test All Reducers', () => {


	it('should change leagueReducer State ', () => {

		const initialState = [];

		const actions = {
			type: 'FETCH_DATA_SUCCESS',
			leagues: [{},{}]
		}

		const newState = leagueReducer(initialState, actions);

		expect(newState).toEqual([{},{}]);
		
      	});

	it('should change leagueTableReducer State ', () => {

		const initialState = [];

		const actions = {
			type: 'FETCH_LEAGUE_TABLE_SUCCESS',
			tables: [{},{}]
		}

		const newState = leagueTableReducer(initialState, actions);

		expect(newState).toEqual([{},{}]);
		
      	});

	it('should change teamReducer State ', () => {

		const initialState = [];

		const actions = {
			type: 'FETCH_TEAM_SUCCESS',
			teams: [{},{}]
		}

		const newState = teamReducer(initialState, actions);

		expect(newState).toEqual([{},{}]);
		
      	});

	it('should change playerReducer State ', () => {

		const initialState = [];

		const actions = {
			type: 'FETCH_PLAYERS_SUCCESS',
			players: [{},{}]
		}

		const newState = playerReducer(initialState, actions);

		expect(newState).toEqual([{},{}]);
		
      	});
		   

});
