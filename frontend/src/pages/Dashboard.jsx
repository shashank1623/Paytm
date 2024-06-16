
import { useEffect,useState } from "react";
import {Appbar} from "../components/Appbar"
import {Balance} from "../components/Balance"
import {Users} from "../components/Users"
import axios from "axios";
export const Dashboard = () =>{


    const [balance,setBalance] = useState("10,000.00");

    useEffect(() => {
        const fetchBalance = async () => {
            const token = localStorage.getItem("authToken");

            if (!token) {
                console.error("No auth token found");
                return;
            }

            try {
                const response = await axios.get("/balance", {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                });

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