import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import ApiService from 'app/services/api';

export const getAll = createAsyncThunk('notes/getNotes', async () => {
	const response = await ApiService.doGet('/notes');
	const data = await response;
	console.log(data);

	return data;
});

const adapter = createEntityAdapter({
	selectId: note => note.uid
});

export const { selectAll, selectById } = adapter.getSelectors(state => state.notes);

const notesSlice = createSlice({
	name: 'notes',
	initialState: adapter.getInitialState(),
	reducers: {},
	extraReducers: {
		[getAll.fulfilled]: adapter.setAll
	}
});

export default notesSlice.reducer;
