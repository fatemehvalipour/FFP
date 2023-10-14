import { ReactComponent as Logo } from "../../assets/logo.svg";

import LoginFormModal from "../auth/LoginFormModal";
import SignUpFormModal from "../auth/SignupFormModal";
import Footer from "./Footer";

import "./SplashPage.css";

const SplashPage = () => {
	const modalHelper = () => {
		const events = ["mousedown", "click", "mouseup"];
		events.forEach((event) =>
			document.querySelector("#signup").dispatchEvent(
				new MouseEvent(event, {
					view: window,
					bubbles: true,
					cancelable: true,
					buttons: 1,
				})
			)
		);
	};
	return (
		<>
			<nav>
				<div className="logo">
					<Logo />
				</div>
				<div className="user-actions">
					<LoginFormModal />
					<SignUpFormModal />
				</div>
			</nav>
			<div className="splash-content">
				<div className="start-split-button bold" onClick={modalHelper}>
					شروع
					
				</div>
			</div>
			<Footer />
		</>
	);
};

export default SplashPage;
