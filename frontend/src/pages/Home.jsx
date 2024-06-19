
import { BottomWarning } from "../components/BottomWarning";
export const Home = ()=>{
    return <div className="bg-slate-300 h-screen flex justify-center">
       <BottomWarning label={"Don't have account?"} buttonText={"Sign Up"} to={"/signup"}/>
    </div>
}