import { useSelector } from "react-redux";
import { useState } from "react";

import { Modal } from "../../../../../context/Modal";
import { formatToRial } from "../../../../../utils/formatToIRR";
import ExpenseBillDetails from "./ExpenseBillDetails";
import SettleUpModal from "./ExpenseBillDetails/SettleUpModal";
import User from "../../../../../assets/user.png";

const ExpenseDetail = ({ expense }) => {
	const [showModal, setShowModal] = useState(false);

	const sessionUser = useSelector((state) => state.session.user);

	return (
		<div className="bill-container-and-buttons">
			<div className="bill-container" onClick={() => setShowModal(true)}>
				<div className="profile-pic-div bill-pic-div">
					<img
						src={User}
						className="profile-pic bill-profile-pic"
						alt={`${expense.bill.owner_name} profile`}
					></img>
				</div>
				<div className="bill-owner-description-container">
					<div className="bill-owner-name">
						شما به {expense.bill.owner_name} بابت
					</div>
					<h2 className="bill-description">
						<span className="invoice-icon">
							<i className="fas fa-receipt"></i>
						</span>
						<p className="testing-ellipses">
							{expense.bill.description}
						</p>
						<span>
							{expense.settled ? (
								<i className="fas fa-check settled-true"></i>
							) : (
								<i className="fas fa-times settled-false"></i>
							)}
						</span>
					</h2>
					<div className="bill-owner-name">
						بدهکارید
					</div>
				</div>
				<div
					className={
						!expense.settled
							? "negative-payment bill-total-amount brand-font"
							: "bill-total-amount brand-font"
					}
				>
					{expense.settled
						? "تسویه شده است"
						: `${formatToRial(expense.amount_due)}`}
				</div>
			</div>
			<div className="settle-up-container">
				{!expense.settled && expense.payer_id === sessionUser.id && (
					<SettleUpModal expense={expense} />
				)}
			</div>
			<div>
				{showModal && (
					<Modal onClose={() => setShowModal(false)}>
						<ExpenseBillDetails
							showModal={setShowModal}
							expense={expense}
						/>
					</Modal>
				)}
			</div>
		</div>
	);
};

export default ExpenseDetail;
