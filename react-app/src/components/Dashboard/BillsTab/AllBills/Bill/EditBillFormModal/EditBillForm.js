import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { editBill, getUserBalance } from "../../../../../../store/bills";

import { DatePicker } from "zaman";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import User from "../../../../../../assets/user.png";

import DeleteBillModal from "../DeleteBillModal";

toast.configure();

const EditBillForm = ({ showModal, bill }) => {
	const dispatch = useDispatch();

	const sessionUser = useSelector((state) => state.session.user);
	const allFriendsObject = useSelector((state) => state.friends.byId);
	const allFriends = Object.values(allFriendsObject);

	const expenses = bill.expenses;
	const payers = [];
	expenses.forEach((expense) => {
		if (expense.payer_name !== sessionUser.username) {
			payers.push(expense.payer_name);
		}
	});

	const [errors, setErrors] = useState({});
	const [total_amount, setTotal_Amount] = useState(bill.total_amount);
	const [description, setDescription] = useState(bill.description);
	const [deadline, setDeadline] = useState(bill.deadline);
	const [friends, setFriends] = useState(payers);

	const notify = () => {
		toast.success(`حساب مورد نظر با موفقیت به‌روز شد!`, {
			position: toast.POSITION.TOP_RIGHT,
			autoClose: 2000,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const friendsString = friends.join(", ");
		console.log(friendsString)
		const data = await dispatch(
			editBill(
				bill.id,
				sessionUser.id,
				total_amount,
				description,
				deadline,
				friendsString
			)
		);
		dispatch(getUserBalance(sessionUser.id));

		if (data) {
			const errors = {}
			for (let i = 0; i < data.length; i++) {
				const error = data[i].split(": ");
				errors[error[0]] = error[1]
			}
			setErrors(errors)
			return;
		}

		notify();

		showModal(false);
	};


	useEffect(() => {
		const errors = [];
		if (description.length > 36)
			errors["description"] =
				"Description must be less than 36 characters.";
		if (total_amount <= 0)
			errors["total_amount"] =
				"Provide a positive value for the total amount.";
		if (total_amount === "0")
			errors["total_amount"] =
				"Provide a non-zero value for the total bill.";
		setErrors(errors);
	}, [description, total_amount]);


	const updateTotal = (e) => {
		setTotal_Amount(e.target.value);
	};

	const updateDescription = (e) => {
		setDescription(e.target.value);
	};

	const updateDeadline = (e) => {
		setDeadline(e.value?.toISOString().split("T")[0]);
		delete errors.deadline;
	};

	const updateFriends = (e) => {
		const currFriends = friends.slice();
		if (!currFriends.includes(e.target.value))
			currFriends.push(e.target.value);
		else if (currFriends.includes(e.target.value))
			currFriends.splice(currFriends.indexOf(e.target.value), 1);
		setFriends((prev) => (prev = currFriends.slice()));
	};

	return (
		<form
			className="form-container bill-form edit-form"
			onSubmit={handleSubmit}
		>
			<div className="edit-delete-bill-buttons-container">
				<div
					className="delete-bill-button-container"
					id="delete-bill-on-edit-form"
				>
					<DeleteBillModal billId={bill.id} />
				</div>
			</div>
			<h3 className="edit-a-bill">ویرایش حساب</h3>
			<button className="close-modal" onClick={() => showModal(false)}>
				<i className="fas fa-times"></i>
			</button>
			<div className="form-input-container">
				<div className="form-element">
					<label className="form-label" htmlFor="total_amount">
						مبلغ حساب
					</label>
					<div className="dollar-sign-and-input">
						<p className="dollar-sign">ریال</p>
						<input
							className="form-input"
							name="total_amount"
							type="number"
							step="0.01"
							placeholder="0"
							value={total_amount}
							onChange={updateTotal}
						/>
					</div>
					<div className="errors-container">
						{errors.total_amount ? `${errors.total_amount}` : ""}
					</div>
				</div>
				<div className="form-element">
					<label className="form-label" htmlFor="description">
						توضیحات
					</label>
					<input
						className="form-input"
						name="description"
						type="text"
						placeholder="این حساب برای چه ساخته شده؟"
						value={description}
						onChange={updateDescription}
					/>
					<div className="errors-container">
						{errors.description ? `${errors.description}` : ""}
					</div>
				</div>
				<div className="form-element">
					<label className="form-label" htmlFor="deadline">
						مهلت پرداخت
					</label>
					
					<DatePicker defaultValue={deadline} onChange={updateDeadline} />
					<div className="errors-container">
						{errors.deadline ? `${errors.deadline}` : ""}
					</div>
				</div>
			</div>
			<div className="form-element form-friends-list">
				<div className="form-label form-label-friends">
				تقسیم بین چند نفر؟
				</div>
				{allFriends.map((friend) => {
					return (
						<div
							className="friend-name-checkbox-container"
							key={friend.id}
						>
							<div className="friends-checkboxes" key={friend.id}>
								<input
									type="checkbox"
									id={`${friend.friend_name}Select`}
									name="friend"
									value={friend.friend_name}
									defaultChecked={payers.includes(
										friend.friend_name
									)}
									onChange={updateFriends}
								/>
							</div>
							<label
								className="form-friend-name"
								htmlFor={`${friend.friend_name}Select`}
							>
								<div className="friend-name">
									{friend.friend_name}
								</div>
								<div className="comment-pic-div split-with-pic">
									<img
										src={User}
										alt={friend.friend_name}
										className="friend-pic"
									/>
								</div>
							</label>
						</div>
					);
				})}
				<div className="errors-container">
						{errors.friends ? `${errors.friends}` : ""}
					</div>
				<div className="bill-btn-container">
					<div className="btn-container">
						<button
							className="bill-form-submit-btn"
							type="submit"
						>
							ثبت
						</button>
					</div>
				</div>
			</div>
		</form>
	);
};

export default EditBillForm;
