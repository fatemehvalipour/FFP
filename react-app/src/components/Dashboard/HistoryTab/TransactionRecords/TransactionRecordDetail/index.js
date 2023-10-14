import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import { formatToRial } from "../../../../../utils/formatToIRR";
import { formatToShamsi } from "../../../../../utils/formatToShamsi";

import User from "../../../../../assets/user.png";

const TransactionRecordDetail = ({ record }) => {
    const location = useLocation();

    const sessionUser = useSelector(state => state.session.user)
    let payer;
    let recipient;
    let amountColor;
    let imageBubble = "";
    let imageAlt = ""

    if (record.payer_name === sessionUser.username) {
        imageBubble = record.recipient_image;
        imageAlt = record.recipient_name + "-pic";
        payer = "شما"
        amountColor = "negative-payment"
    } else {
        imageBubble = record.payer_image;
        imageAlt = record.payer_name + "-pic";
        payer = record.payer_name
        amountColor = "positive-payment"
    }

    console.log(record.recipient_name, sessionUser.username);

    if (record.recipient_name === sessionUser.username) {
        recipient = "شما"
    } else {
        recipient = record.recipient_name
    }

    return (
        <>
            {(location.pathname === "/friends") ?
                <div className='transaction-record-detail-container'>
                    <div className="record-image-text">
                        <img src={imageBubble} alt={imageAlt} />
                        <div className='record-text'>
                            <h3 className="testing-ellipses">
                                مقدار <span className={`${amountColor}`}> {formatToRial(record.amount_paid)} </span> بابت <span className="bold">{record.transaction_description}</span> توسط <span className={payer !== "شما" ? "bold" : ""}>{payer}</span> به <span className={recipient !== "شما" ? "bold" : ""}>{recipient}</span> پرداخت شد.
                            </h3>
                        </div>
                        <div className='record-date'>
                            <p>{formatToShamsi(record.created_at.slice(0, 16))}</p>
                        </div>
                    </div>
                </div>

                :

                <div className='transactions-tab-records-container'>
                    <div className='tb-image'>
                        <img src={User} alt={imageAlt} />
                    </div>
                    <div className='tb-record-text'>
                        <h3 className='testing-ellipses' id='tb-text'>
                            مقدار <span className={`${amountColor}`}> {formatToRial(record.amount_paid)} </span> بابت <span className="bold">{record.transaction_description}</span> توسط <span className={payer !== "شما" ? "bold" : ""}>{payer}</span> به <span className={recipient !== "شما" ? "bold" : ""}>{recipient}</span> پرداخت شد
                        </h3>
                    </div>
                    <div className='tb-record-date'>
                        <p>{formatToShamsi(record.created_at.slice(0, 16))}</p>
                    </div>
                </div>
            }
        </>
    )
}

export default TransactionRecordDetail;
