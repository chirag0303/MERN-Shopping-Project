import { Link, useNavigate } from "react-router";

const LoginPage = () => {

    const navigate = useNavigate();
    const handleLogin = async (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        const dataObj = {
            email,
            password,
        };
        console.log(dataObj);

        try {
            const resp = await fetch(`${import.meta.env.VITE_BACKEND_URL}/auth/login`, {
                method: "POST",
                body: JSON.stringify(dataObj),
                headers: {
                    "content-type": "application/json",
                },
            });
            const result = await resp.json();
            if (resp.status == 201) {
                alert("Login Successful");
                navigate("/");
            } else {
                alert(`Login Error, ${result.message}`);
            }


        } catch (err) {
            alert(`Error: ${err.message}`);
            console.log("Error in Login User", err.message);
        }

    };
    return (
        <div className="min-h-[100vh] p-4 flex items-center justify-center">
            <form onSubmit={handleLogin} className="p-5 flex flex-col gap-4 items-center bg-emerald-200 rounded-lg">
                <div className="flex gap-4 items-center">
                    <label className="text-gray-700" htmlFor="user-email">Email: </label>
                    <input id="user-email" type="email" name="email" required className="border-1 rounded-md py-1 px-2 text-indigo-700 bg-white" />

                </div>
                <div className="flex gap-4 items-center">
                    <label className="text-gray-700" htmlFor="user-pass">Password: </label>
                    <input id="user-pass" type="password" name="password" required className="border-1 rounded-md py-1 px-2 text-indigo-700 bg-white" />

                </div>
                <div className="flex flex-col gap-3 items-center">
                    <button className="border-1 py-1 px-2 bg-green-800 text-white rounded-lg">Login</button>
                    <p>
                        Don't have an Account?
                        <Link to="/signup" className="text-blue-600 underline">Click Here</Link></p>
                </div>
            </form>
        </div>
    );
}

export { LoginPage };