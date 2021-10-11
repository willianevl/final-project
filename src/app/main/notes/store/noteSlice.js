/* eslint-disable camelcase */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import ApiService from 'app/services/api/';

export const getOne = createAsyncThunk('note/getOne', async (uid, { dispatch }) => {
	const response = await ApiService.doGet(`/notes/${uid}`);
	const note = await response;

	return { ...note };
});

export const saveOne = createAsyncThunk('note/saveOne', async (data, { dispatch }) => {
	const request = { ...data, userUid: '727e9e09-34fb-4d29-8231-c6d739ff5d66' };

	const response = await ApiService.doPost('/notes', request);
	if (response.error) {
		dispatch(updateResponse(response.data));
		return data;
	}

	return { ...data, message: 'Great job', success: 'Ok' };
});

export const updateOne = createAsyncThunk('note/updateOne', async ({ data, uid }, { dispatch, getState }) => {
	const request = { ...data };
	console.log(request);

	const response = await ApiService.doPut(`/notes/${uid}`, request);
	const oldState = getState().note;

	if (response.error) {
		dispatch(updateResponse(response.data));
		return { ...data, uid, loading: false };
	}

	dispatch(getOne(uid));

	return { ...oldState, message: 'Great job', success: 'Success' };
});

export const deleteOne = createAsyncThunk('note/deleteOne', async ({ data, uid }, { dispatch, getState }) => {
	const request = { ...data };
	console.log(request);

	const response = await ApiService.doDelete(`/notes/${uid}`);

	return { message: 'Great job', success: 'Success' };
});

const initialState = {
	message: '',
	loading: false,
	title: '',
	description: ''
};

const noteSlice = createSlice({
	name: 'note',
	initialState,
	reducers: {
		newData: {
			reducer: (state, action) => action.payload,
			prepare: event => ({
				payload: {
					uid: 'new',
					title: '',
					description: '',
					loading: false,
					message: ''
				}
			})
		},
		clearState: (state, action) => initialState,
		updateState: (state, action) => {
			return { ...state, ...action.payload };
		},
		updateResponse: (state, action) => {
			state.success = action.payload.success;
			state.message = action.payload.message;
		},
		updateLoading: (state, action) => {
			state.loading = action.payload;
		}
	},
	extraReducers: {
		[getOne.fulfilled]: (state, action) => action.payload,
		[saveOne.fulfilled]: (state, action) => action.payload,
		[updateOne.fulfilled]: (state, action) => action.payload
	}
});

export const { newData, updateResponse, updateLoading } = noteSlice.actions;

export default noteSlice.reducer;
