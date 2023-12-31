import React from "react";
import { Link } from "react-router-dom";

import "./ErrorPage.css";

const ErrorPage = () => {
	return (
		<div className="error-page-container">
			<div className="error-code-message">
				<h2 className="error-code">404</h2>
				<h2 className="error-message">
					این صفحه وجود ندارد
				</h2>
				<Link to="/">
					<h2 className="home-link">Return to Home</h2>
				</Link>
			</div>
		</div>
	);
};

export default ErrorPage;
