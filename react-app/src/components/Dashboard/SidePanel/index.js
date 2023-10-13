import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { formatToRial } from "../../../utils/formatToIRR";
import LogoutButton from "../../auth/LogoutButton";
import AddFriendFormModal from "../FriendsTab/AddFriendForm/AddFriendFormModal";
import AddBillFormModal from "../BillsTab/AllBills/AddBillFormModal";

import { ReactComponent as Logo } from "../../../assets/logo.svg";
import User from "../../../assets/user.png";

import "./SidePanel.css";

const SidePanel = ({ balance }) => {
	const sessionUser = useSelector((state) => state.session.user);

	return (
		<div className="side-panel">
			<Link to="/">
				<div className="logo side-panel-logo">
					<Logo />
				</div>
			</Link>
			<div className="pic-and-name-div">
				<div className="profile-pic-div">
					<img
						src={User}
						alt="user_photo"
						loading="lazy"
						className="profile-pic"
					></img>
				</div>
				<div className="username-balance-div" >
					<h3>{sessionUser.username}</h3>
					<p>موجودی: {formatToRial(balance)}</p>
				</div>
			</div>
			<div id="add-bill-button-container">
				<AddBillFormModal />
			</div>
			<div className="side-panel-buttons">
				<div id="add-friend-button-container">
					<AddFriendFormModal />
				</div>
				<div id="logout-button-container">
					<LogoutButton />
				</div>
			</div>
		</div>
	);
};

export default SidePanel;
