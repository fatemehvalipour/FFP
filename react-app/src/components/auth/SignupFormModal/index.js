import React, { useState, useEffect } from "react";
import { Modal } from "../../../context/Modal";
import SignUpForm from "./SignUpForm";

function SignUpFormModal() {
	const [showModal, setShowModal] = useState(false);

	useEffect(() => {
		return () => setShowModal(false);
	}, []);

	return (
		<>
			<div
				id="signup"
				className="login-signup"
				onClick={() => setShowModal(true)}
			>
				ثبت‌نام
			</div>
			{showModal && (
				<Modal onClose={() => setShowModal(false)}>
					<SignUpForm />
				</Modal>
			)}
		</>
	);
}

export default SignUpFormModal;
