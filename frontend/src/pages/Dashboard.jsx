
import { useEffect,useState } from "react";
import {Appbar} from "../components/Appbar"
import {Balance} from "../components/Balance"
import {Users} from "../components/Users"
import axios from "axios";
export const Dashboard = () =>{


    const [balance,setBalance] = useState("10,000.00");

    useEffect(() => {
        const fetchBalance = async () => {
            const token = localStorage.getItem("token");

            if (!token) {
                console.error("No auth token found");
                return;
            }

            try {
                const response = await axios.get("http://localhost:8080/api/v1/account/balance", {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                });
                //console.log("Balance response:", response.data);
                setBalance(response.data.balance);
            } catch (error) {
                console.error("Error fetching balance:", error);
            }
        };

        fetchBalance();
    }, []);

    return <div>
        <Appbar/>
        <div className="m-8">
            <Balance value={balance}/>

            <Users/>

        </div>
    </div>
}