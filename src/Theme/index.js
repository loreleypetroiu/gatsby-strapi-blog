import React from 'react';
import { ThemeProvider } from "styled-components"

const themeData = {
	colors: {
		primary: "#4F5EAD",
		secondary: "#A8BE56",
		body: "#FFFFFF",
		text: "#444444",
		muted: "#999999",
		link: {
			text: "#4F5EAD",
		}
	},
	font: "Open Sans"
}

const Theme = ({ children }) => {
	return (
		<ThemeProvider theme={themeData}>
			{children}
		</ThemeProvider>
	)
}

export default Theme;