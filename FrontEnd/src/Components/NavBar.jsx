import { Link } from "react-router"
import { useMyContext } from "../context/AppContext";

const Navbar = () => {

    const { count } = useMyContext();
    return (
        <div className="py-4 px-6 flex justify-between bg-amber-400">
            <div className="font-bold text-white p-2 text-3xl ">Shopping App</div>
            <div className="flex gap-2">
                <input className="b-1 py-1 px-2 rounded-md border-1 my-auto bg-white" />
                <button className="b-1 py-1 px-2 rounded-md bg-blue-400 my-auto">Search</button>
            </div>
            <div className="flex gap-2">
                <Link to='/profile' className="border-1 my-auto py-1 px-1 bg-lime-300">Profile</Link>
                <Link to='/signup' className="border-1 my-auto py-1 px-1 bg-lime-300">Signup</Link>
                <p className="border-1 my-auto py-1 px-1 bg-lime-300">Cart: {count}</p>
            </div>
        </div>
    );
}

export { Navbar };