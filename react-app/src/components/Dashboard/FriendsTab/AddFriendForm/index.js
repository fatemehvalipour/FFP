import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";

import { addFriend } from "../../../../store/friends";

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './AddFriendForm.css'

toast.configure()

const AddFriendForm = ({setShowModal}) => {
	const [errors, setErrors] = useState([]);
	const [username, setUsername] = useState("");
	const dispatch = useDispatch();

	useEffect(() => {
		const errors = [];
		if (username.length > 40) errors.push("Username must be less than 40 characters.")

		setErrors(errors);
	}, [username])

	const notify = () => {
		toast.success(`${username} با موفقیت به لیست دوستان شما اضافه شد!`,
			{position: toast.POSITION.TOP_RIGHT,
			autoClose:2000})
	}

	const onAddFriend = async (e) => {
		e.preventDefault();
		const data = await dispatch(addFriend(username));
		if (data && data.errors) {
			setErrors(data.errors);
		}
        else {
            setShowModal(false);
			notify()
            return <Redirect to="/friends" />;
        }
	};

	const updateUsername = (e) => {
		setUsername(e.target.value);
	};

	return (
		<form className="friend-form-container" onSubmit={onAddFriend}>
			<button
				className="close-modal"
				onClick={() => setShowModal(false)}
			>
				<i className="fas fa-times"></i>
			</button>
			<h3>اضافه کردن دوست</h3>
			<div className="friend-username-input-label">
				<label htmlFor="username" className="form-label">نام کاربری</label>
				<input
					name="username"
					type="text"
					placeholder="fatemeh_vlp_2000"
					value={username}
					onChange={updateUsername}
                    required={true}
					className="form-input"
					/>
			</div>

			<div className="errors-container">
				{errors.map((error, ind) => (
					<div key={ind}>{error}</div>
				))}
			</div>
			<button
				type="submit"
				className="friend-form-submit-btn"
				>ثبت</button>
		</form>
	);
};

export default AddFriendForm;
