import React, { useEffect, useState } from 'react';

import { useSelector } from 'react-redux';

import PageCardedHeader from 'app/fuse-layouts/shared-components/page-carded-header/PageCardedHeader';

function Header() {
	const noteRedux = useSelector(({ note }) => note);
	const [note, setNote] = useState({});

	useEffect(() => {
		if (noteRedux) {
			setNote(noteRedux);
		}
	}, [noteRedux]);

	return <PageCardedHeader link="/notes" title={note?.title || 'New note'} textBack="Notes" />;
}

export default Header;
