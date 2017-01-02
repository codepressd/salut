import configMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as authActions from '../actions/authActions';
import * as productActions from '../actions/productActions';

import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

const middlewares =[thunk];
const mockStore = configMockStore(middlewares);
const mock = new MockAdapter(axios);

describe('Test All  Actions', () => {


	it('creates FETCH_DATA_SUCCESS when fetching getLeagueData', (done) => {
		mock
			.onGet('https://api.football-data.org/v1/competitions/?season=2016')
			.reply(200, [])

		const expectedActions =[

			{leagues: [] , type: 'FETCH_DATA_SUCCESS'}

		];

		 const store = mockStore({ leagues: [] });

		 return store.dispatch(actions.getLeagueData('https://api.football-data.org/v1/competitions/?season=2016'))
      			.then(() => { // return of async actions
        			expect(store.getActions()).toEqual(expectedActions);
        			done();
      		});
		   

	});

	it('creates FETCH_DATA_ERROR ', () => {
		const text = 'This is throwing an error';

		const expectedActions ={
			type: 'FETCH_DATA_ERROR',
			error: 'This is throwing an error'
		};

		expect(actions.fetchDataError(text)).toEqual(expectedActions);   

	});

	it('creates FETCH_TEAM_SUCCESS when fetching getLeagueData', (done) => {
		mock
			.onGet('https://api.football-data.org/v1/competitions/PL/teams')
			.reply(200, [])

		const expectedActions =[

			{teams: [] , type: 'FETCH_TEAM_SUCCESS'}

		];

		 const store = mockStore({ teams: [] });

		 return store.dispatch(actions.getTeamData('https://api.football-data.org/v1/competitions/PL/teams'))
      			.then(() => { // return of async actions
        			expect(store.getActions()).toEqual(expectedActions);
        			done();
      		});
		   

	});

	it('creates FETCH_TEAM_ERROR ', () => {
		const text = 'This is throwing an error';

		const expectedActions ={
			type: 'FETCH_TEAM_ERROR',
			error: 'This is throwing an error'
		};

		expect(actions.fetchTeamError(text)).toEqual(expectedActions);   

	});

	it('creates FETCH_PLAYERS_SUCCESS when fetching getLeagueData', (done) => {
		mock
			.onGet('https://api.football-data.org/v1/teams/322/players')
			.reply(200, [])

		const expectedActions =[

			{players: [] , type: 'FETCH_PLAYERS_SUCCESS'}

		];

		 const store = mockStore({ players: [] });

		 return store.dispatch(actions.getTeamPlayersData('https://api.football-data.org/v1/teams/322/players'))
      			.then(() => { // return of async actions
        			expect(store.getActions()).toEqual(expectedActions);
        			done();
      		});
		   

	});
	it('creates FETCH_PLAYERS_ERROR ', () => {
		const text = 'This is throwing an error';

		const expectedActions ={
			type: 'FETCH_PLAYERS_ERROR',
			error: 'This is throwing an error'
		};

		expect(actions.fetchTeamPlayersError(text)).toEqual(expectedActions);   

	});

	it('creates FETCH_LEAGUE_TABLE_SUCCESS when fetching getLeagueData', (done) => {
		mock
			.onGet('https://api.football-data.org/v1/competitions/PL/leagueTable')
			.reply(200, [])

		const expectedActions =[

			{tables: [] , type: 'FETCH_LEAGUE_TABLE_SUCCESS'}

		];

		 const store = mockStore({ tables: [] });

		 return store.dispatch(actions.getLeagueTableData('https://api.football-data.org/v1/competitions/PL/leagueTable'))
      			.then(() => { // return of async actions
        			expect(store.getActions()).toEqual(expectedActions);
        			done();
      		});
		   

	});
	it('creates FETCH_LEAGUE_TABLE_ERROR ', () => {
		const text = 'This is throwing an error';

		const expectedActions ={
			type: 'FETCH_LEAGUE_TABLE_ERROR',
			error: 'This is throwing an error'
		};

		expect(actions.fetchLeagueTableError(text)).toEqual(expectedActions);   

	});

});