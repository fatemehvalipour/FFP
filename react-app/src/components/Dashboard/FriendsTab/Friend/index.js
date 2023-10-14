import { useState } from "react";

import { formatToRial } from "../../../../utils/formatToIRR";
import { Modal } from "../../../../context/Modal";
import FriendDetails from '../FriendDetailsModal/';
import DeleteFriendModal from '../DeleteFriendModal';

import User from "../../../../assets/user.png";

import "./Friend.css";

const Friend = ({id, friendId, image, username, balance}) => {
	const [showModal, setShowModal] = useState(false);

	const formattedBalance = formatToRial(balance)

	return (
		<>
			<div className="friend-container" onClick={() => setShowModal(true)}>
				<div className="profile-pic-div">
					<img src={User} className="friends-profile-pic" alt={`${username} profile`} ></img>
				</div>
				<div className="friend-info">
					{balance > 0 ?
						<h3><span className="bold">{username}</span> به شما <span className="positive-payment ">{formattedBalance}</span> بدهی دارد</h3>
						: (balance < 0 ?
						<h3>شما به <span className="bold">{username} </span> <span className="negative-payment"> {formattedBalance}</span> بدهی دارید</h3>
						:  <h3><span className="bold">{username}</span> با شما حسابی ندارد!</h3>)
					}
				</div>
				{parseFloat(balance) === 0 ? (
					<DeleteFriendModal id={id} onClick={(e) => {e.stopPropagation(); setShowModal(false)}}/>
					): <p></p>}


			</div>
			<div>
				{(showModal) && (
				<Modal onClose={() => setShowModal(false)}>
					<FriendDetails showModal={setShowModal} username={username} balance={balance} friendId={friendId} image={image} />
				</Modal>
				)}

			</div>
		</>
	);
};

export default Friend;
