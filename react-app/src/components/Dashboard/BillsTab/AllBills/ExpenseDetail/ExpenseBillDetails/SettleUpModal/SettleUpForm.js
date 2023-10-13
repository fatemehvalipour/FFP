import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
	addTransactionRecord,
	getUserBalance,
} from "../../../../../../../store/bills";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./SettleUp.css";

toast.configure();


const SettleUpForm = ({ showModal, expense }) => {
	const dispatch = useDispatch();
	const sessionUser = useSelector((state) => state.session.user);

	const [errors, setErrors] = useState({});
	const [amount_paid, setAmountPaid] = useState(expense.amount_due);
	const [showCard, setShowCard] = useState(false);
	

	const notify = () => {
		toast.success(`شما ${amount_paid} پرداخت کردید!`, {
			position: toast.POSITION.TOP_RIGHT,
			autoClose: 2000,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (Object.keys(errors).length === 0) {
			const data = await dispatch(
				addTransactionRecord(
					expense.bill.owner_id,
					expense.id,
					amount_paid
				)
			);
			dispatch(getUserBalance(sessionUser.id));
			notify();

			showModal(false);

			if (data) {
				setErrors(data);
				return;
			}
		}
	};

	useEffect(() => {
		const errors = [];
		if (amount_paid > Number(expense.amount_due))
			errors["amount_paid"] = `نمی توانید بیشتر از مقدار مشخص شده پرداخت کنید!`;
		if (amount_paid <= 0)
			errors["amount_paid"] = "مقدار مثبت وارد کنید.";
		if (amount_paid.split(".").length > 1) {
			if (amount_paid.split(".")[1].length > 2)
				errors["amount_paid"] = "مقدار رند وارد کنید.";
		}
		setErrors(errors);
	}, [amount_paid, expense.amount_due]);

	useEffect(() => {
		if (showCard) {
			document
				.querySelector(".payment-modal-container")
				.classList.remove("hide-card");
			document
				.querySelector(".payment-modal-container")
				.classList.add("show-card");
			document.getElementById("back").classList.remove("clicked");
		} else {
			document
				.querySelector(".payment-modal-container")
				.classList.remove("show-card");
			setShowCard(false);
		}
	}, [showCard]);

	const updateAmountPaid = (e) => {
		setAmountPaid(e.target.value);
	};

	const handleCancel = (e) => {
		e.preventDefault();
		showModal(false);
	};

	const handleShowCard = (e) => {
		window.open('https://zarinp.al/526874')
	};

	return (
		<>
			<h2 style={{ textAlign: "center", position: "absolute", top: 30 }}>
				پرداخت به {expense.bill.owner_name}
			</h2>
			<div className="payment-modal-container">
				<div className="payment-card payment-card-first">
					<form
						className="settle-up-form-container"
						onSubmit={handleSubmit}
					>
						<button
							className="close-modal"
							onClick={() => showModal(false)}
						>
							<i className="fas fa-times"></i>
						</button>
						<div className="gif-container"></div>
						<div className="dollar-sign-and-input settle-up-input-container">
							<div className="payment-input-container">
								<label
									htmlFor="amount_paid"
									className="dollar-sign settle-up-dollar-sign"
								>
									IRR
								</label>
								<input
									name="amount_paid"
									type="number"
									step="0.01"
									placeholder="0"
									value={amount_paid}
									onChange={updateAmountPaid}
									id="settle-up-input"
								/>
								<div className="errors-container">
									{errors.amount_paid
										? `${errors.amount_paid}`
										: ""}
								</div>
							</div>
							<div className="su-btn-container">
								<button
									className="settle-up-submit-btn choice-btn"
									type="submit"
								>
									<p className="testing-ellipses">{`پرداخت نقدی`}</p>
								</button>
								<button
									className="settle-up-submit-btn choice-btn card-choice"
									onClick={handleShowCard}
								>
									پرداخت آنلاین
								</button>
								<button
									onClick={handleCancel}
									className="form-cancel-btn"
									id="settle-up-cancel"
								>
									انصراف
								</button>
							</div>
						</div>
					</form>
				</div>
			</div>
		</>
	);
};

export default SettleUpForm;
