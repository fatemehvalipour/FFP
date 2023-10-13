import React from "react";
import { useDispatch } from "react-redux";

import { removeFriend } from "../../../../store/friends";

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function DeleteFriendForm({ showModal, id }) {
    const dispatch = useDispatch();

    const notify = () => {
        toast.error(`دوستتان حذف شد`,
            {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 2000
            })
    }

    const handleSubmit = async (e) => {
		e.preventDefault();
        e.stopPropagation();
		await dispatch(removeFriend(id));
        notify();
        showModal(false);
    };

    const handleCancelClick = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        showModal(false);
    }


    return (
        <div className="delete-friend-div" onClick={(e) => e.stopPropagation()}>
            <form className='delete-confirmation-container'>
                <div className='dc-text-container'>
                    <div className='dc-text'>
                        مطمئنید می‌خواهید این دوست را حذف کنید؟
                    </div>
                </div>
                <div className='dc-btn-container'>
                    <button
                        type="button"
                        className='form-delete-btn'
                        onClick={handleSubmit}
                    >
                        Delete
                    </button>
                    <button
                        type='button'
                        onClick={handleCancelClick}
                        className='form-cancel-btn'
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}

export default DeleteFriendForm;
