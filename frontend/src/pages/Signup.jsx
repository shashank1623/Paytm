
import {Heading} from "../components/Heading"
import {SubHeading} from "../components/SubHeading"
import {InputBox} from "../components/InputBox"
import { useState } from "react"
import {Button} from "../components/Button"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import {BottomWarning} from "../components/BottomWarning"

export const Signup = () =>{

    const [firstName , setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const navigate = useNavigate();

    return <div className="bg-slate-300 h-screen flex justify-center">
        <div className="flex flex-col justify-center">
            <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
                <Heading label={"Sign up"}/>
                <SubHeading label="Enter you information to create an account"/>

                <InputBox onChange={e=>{
                    setFirstName(e.target.value)
                }} placeholder="Jhon" label={"First Name"}/>

                <InputBox onChange={e=>{
                    setLastName(e.target.value)
                }} placeholder="Doe" label={"Last Name"}/>

            

                <div className="pt-4">
                    <Button onClick={async ()=>{
                        const response = await axios.post("http://localhost:8080/api/v1/user/signup",{
                            firstName,
                            lastName
                        });

                        localStorage.setItem("token",response.data.token)
                        navigate("/dashboard")

                    }} label={"Create Account"}/>
                </div>
                <BottomWarning label={"Already Have an Account"} buttonText={"Sign in"} to={"/signin"} />
            </div>

        </div>

    </div>
}