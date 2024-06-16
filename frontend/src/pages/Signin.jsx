import { Heading } from "../components/Heading";
import { SubHeading } from "../components/SubHeading";
import { InputBox } from "../components/InputBox";
import { Button } from "../components/Button";
import { BottomWarning } from "../components/BottomWarning";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const Signin = () =>{

  const [username,setUsername] = useState("");
  const [password,setPassword] = useState("");
  const navigate = useNavigate();

  return <div className="bg-slate-300 h-screen flex justify-center">
    <div className="flex flex-col justify-center">
      <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
        <Heading label={"Sign in"}/>
        <SubHeading label={"Enter you credentials to acess your account"}/>

        <InputBox onChange={e=>{
                    setUsername(e.target.value)
                }} placeholder="jhonDoe@gamil.com" label={"Email"}/>
        <InputBox onChange={e=>{
                    setPassword(e.target.value)
                }} placeholder="*******" label={"Password"}/>

        <div className="pt-4">
          <Button onClick={async ()=>{
                        const response = await axios.post("http://localhost:8080/api/v1/user/signin",{
                            username,
                            password
                        });

                        localStorage.setItem("token",response.data.token)
                        navigate("/dashboard")

                    }} label={"Sign in"}/>
        </div>

        <BottomWarning label={"Don't have account?"} buttonText={"Sign Up"} to={"/signup"}/>
      </div>

    </div>

  </div>
}