import { Heading } from "../components/Heading";
import { SubHeading } from "../components/SubHeading";
import { InputBox } from "../components/InputBox";
import { Button } from "../components/Button";
import { BottomWarning } from "../components/BottomWarning";
export const Signin = () =>{

  return <div className="bg-slate-300 h-screen flex justify-center">
    <div className="flex flex-col justify-center">
      <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
        <Heading label={"Sign in"}/>
        <SubHeading label={"Enter you credentials to acess your account"}/>

        <InputBox placeholder="jhonDoe@gamil.com" label={"Email"}/>
        <InputBox placeholder="*******" label={"Password"}/>

        <div className="pt-4">
          <Button label={"Sign in"}/>
        </div>

        <BottomWarning label={"Don't have account?"} buttonText={"Sign Up"} to={"/signup"}/>
      </div>

    </div>

  </div>
}