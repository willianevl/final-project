import { authRoles } from 'app/auth';
import React from 'react';

const NotesConfig = {
	settings: {
		layout: {
			config: {
				mode: 'fullwidth',
				scroll: 'content',
				navbar: {
					display: true,
					folded: false,
					position: 'left'
				},
				toolbar: {
					display: true,
					style: 'fixed',
					position: 'below'
				},
				footer: {
					display: false,
					style: 'fixed',
					position: 'below'
				}
			}
		}
	},
	// auth: authRoles.admin,
	routes: [
		{
			path: '/notes/:uid',
			component: React.lazy(() => import('./show/Note'))
		},
		{
			path: '/notes',
			exact: true,
			component: React.lazy(() => import('./list/Notes'))
		}
	]
};

export default NotesConfig;
