import BillExpenses from "./BillExpenses";
import EditBillFormModal from "../EditBillFormModal";
import DeleteBillModal from "../DeleteBillModal";

import "./BillDetails.css";
import { formatToRial } from "../../../../../../utils/formatToIRR";
import { formatToShamsi } from "../../../../../../utils/formatToShamsi";

const BillDetails = ({ bill, showModal }) => {
	return (
		<div className="bill-details-modal-container">
			<button
				className="close-modal"
				onClick={() => showModal(false)}
			>
				<i className="fas fa-times"></i>
			</button>
			<div className="bd-edit-delete-btns-container">
				<EditBillFormModal bill={bill} />
				<DeleteBillModal billId={bill.id} />
			</div>
			<div className="bd-title-total-container">
				<div className="bd-title-container">
					<span className="bd-title-icon">
						<i className="fas fa-file-invoice-dollar"></i>
					</span>
					<h2 className="bd-title-text">{bill.description}</h2>
				</div>
				<div className="bd-total-amount brand-font">{formatToRial(bill.total_amount)}</div>
			</div>
			{bill.deadline !== "None" && (
				<div className="bd-bill-deadline">
					<i className="fas fa-calendar-alt"></i>
					<span>{formatToShamsi(bill.deadline)}</span>
				</div>
			)}
			<div className='bd-expenses-container'>
				<BillExpenses expenses={bill.expenses} />
			</div>
		</div>
	);
};

export default BillDetails;
