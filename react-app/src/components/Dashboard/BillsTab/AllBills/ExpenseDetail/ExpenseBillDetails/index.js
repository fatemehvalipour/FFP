import { useSelector } from "react-redux";

import { formatToRial } from "../../../../../../utils/formatToIRR";
import { formatToShamsi } from "../../../../../../utils/formatToShamsi";
import ExpensesForBill from "./ExpensesForBill";

import "./ExpenseBillDetails.css";

const ExpenseBillDetails = ({ expense, showModal }) => {
    const expenseId = expense.id;
    const bills = useSelector(state => state.bills)
    const expenseObject = bills.expenses
    const bill = expenseObject[expenseId].bill


    return (
        <div className='bill-details-modal-container'>
            <button
                className="close-modal"
                onClick={() => showModal(false)}
            >
                <i className="fas fa-times"></i>
            </button>
            <div className='bd-title-total-container'>
                <div className='bd-paid-for-bill'>
                    <div className='bd-paid-by-text'>
                        <span className='bold'>{bill.owner_name}</span> برای
                    </div>
                    <div className='bd-title-container'>
                        <span className='bd-title-icon'><i className="fas fa-file-invoice-dollar"></i></span>
                        <h2 className='bd-title-text'>
                            {bill.description}
                        </h2>
                    </div>
                    پرداخت کرد
                </div>
                <div className='bd-total-amount brand-font'>{formatToRial(bill.total_amount)}</div>
            </div>
            <div className="bd-bill-deadline">
                <i className="fas fa-calendar-alt"></i>
                <span>{formatToShamsi(expense.bill.deadline)}</span>
            </div>
            <ExpensesForBill bill={bill} />
        </div>
    )
}

export default ExpenseBillDetails;
