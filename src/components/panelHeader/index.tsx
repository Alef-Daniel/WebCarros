import { signOut } from "firebase/auth";
import { Link } from "react-router-dom";
import { auth } from "../../services/firebaseConnection";


export default function DashboardHeader() {
    async function handleLogout() {
        await signOut(auth)
    }

 return (
   <div className="w-full items-center flex bg-red-500 h-10 rounded-lg text-white font-medium gap-4 px-4 mb-4">
        <Link to={"/dashboard"}>Dashboard</Link>
        <Link to={"/dashboard/new"}>Cadastrar Carro</Link>
        <button className="ml-auto" onClick={handleLogout}>Sair da Conta</button>
   </div>
 );
}
