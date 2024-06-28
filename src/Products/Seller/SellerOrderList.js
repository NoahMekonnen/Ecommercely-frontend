import SellerOrderListCard from "./SellerOrderListCard";
import './SellerOrderList.css';
import { v4 as uuid } from 'uuid';


const SellerOrderList = ({ interactions, setSellerOrders, user, handleApproval }) => {
    return (
        <div className="SellerOrderList">
            {
                interactions.length != 0
                    ?
                    interactions.map(interaction =>
                        <SellerOrderListCard interaction={interaction}
                            setSellerOrders={setSellerOrders}
                            user={user}
                            key={uuid()} 
                            handleApproval={handleApproval}
                            />)
                    :
                    <h4 className="SellerOrderList-None">
                        No Pending Orders...
                    </h4>
            }
        </div>
    )
}

export default SellerOrderList;