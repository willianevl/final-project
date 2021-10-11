/* eslint-disable react/jsx-no-bind */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import FusePageCarded from '@fuse/core/FusePageCarded';
import TableComponent from 'app/fuse-layouts/shared-components/table';
import PageCardedHeader from 'app/fuse-layouts/shared-components/page-carded-header/PageCardedHeader';

import { getAll, selectAll } from '../store/notesSlice';

const columns = [
	{
		id: 'title',
		align: 'left',
		disablePadding: false,
		label: 'Title',
		sort: true
	},
	{
		id: 'description',
		align: 'left',
		disablePadding: false,
		label: 'Description',
		sort: false
	}
];

export default function Products() {
	const history = useHistory();
	const dispatch = useDispatch();
	const notesRedux = useSelector(selectAll);
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(false);

	function handleClick(value) {
		history.push(`/notes/${value.uid}`);
	}

	function handleClickNew() {
		history.push(`/notes/new`);
	}

	useEffect(() => {
		setLoading(true);
		dispatch(getAll());
	}, []);

	useEffect(() => {
		if (notesRedux) {
			setLoading(false);
			if (notesRedux.length) {
				const parsenotes = notesRedux.map(item => {
					return {
						...item
					};
				});
				setData(parsenotes);
			}
		}
	}, [notesRedux]);

	return (
		<FusePageCarded
			classes={{
				content: 'flex',
				contentCard: 'overflow-hidden rounded-t-12',
				header: 'min-h-72 h-72 sm:h-136 sm:min-h-136 white'
			}}
			header={<PageCardedHeader title="Produtos" buttonTitle="ADICIONAR NOVO" buttonAction={handleClickNew} />}
			content={<TableComponent key={data.uid} columns={columns} data={data} action={handleClick} />}
			innerScroll
		/>
	);
}
