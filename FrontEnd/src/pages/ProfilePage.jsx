import { useEffect, useState } from "react";
import {Navbar} from "../Components/NavBar"
const ProfilePage = () => {
    const [products, setProducts] = useState([]);

    const getData = async () => {
        try {
            
            const resp = await fetch(`${import.meta.env.VITE_BACKEND_URL}/products`, {
                method: "GET",
            });
            const result = await resp.json();
            console.log(result);
            setProducts(result.data.products);
        } catch (err) {
            console.warn("Error while getting Products: ",err.message);
        }
    };

    useEffect(()=>{
        getData();
    },[]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const title = e.target.title.value;
            const price = e.target.price.value;
            const desc = e.target.description.value;
            const quantity = e.target.quantity.value;

            const resp = await fetch(`${import.meta.env.VITE_BACKEND_URL}/products`,{
                method:"POST",
                body: JSON.stringify({
                    title: title,
                    price: price,
                    description: desc,
                    quantity,
                }),
                headers: {
                    "content-type": "application/json",
                },
            });

            if(resp.status == '201'){
                console.log(resp);
                alert("Product added");
                getData();

            } else {
                alert('Invalid Data')
            }

        } catch (err) {
            console.warn("Cananot create product", err.message);
            alert(err.message);
        }
    }

    return (
        <div>
            <Navbar/>
            <div>
                <form onSubmit={handleSubmit} className="mx-auto my-4 flex flex-col gap-5 p-6 bg-blue-200 max-w-120">
                    <h2 className="self-center font-bold text-xl">Add New Product</h2>
                    <div className="flex gap-4">
                        <label>Title: </label>
                        <input name="title" type="text" className="b-1 py-1 px-2 rounded-md border-1"/>
                    </div>
                    <div className="flex gap-4">
                        <label>Price: </label>
                        <input name="price" type="number" className="b-1 py-1 px-2 rounded-md border-1"/>
                    </div>
                    <div className="flex gap-4">
                        <label>Description: </label>
                        <input name="description" type="text" className="b-1 py-1 px-2 rounded-md border-1"/>
                    </div>
                    <div className="flex gap-4">
                        <label>Quantity: </label>
                        <input name="quantity" type="number" className="b-1 py-1 px-2 rounded-md border-1"/>
                    </div>
                    <button className="border-1 py-1 px-2 rounded-md bg-blue-400">Add Product</button>
                </form>
            </div>
            <div className="flex flex-wrap gap-6 justify-center p-3 ">
                {products.map((elem)=>{
                    console.log(elem);
                    return (
                        <div key={elem._id} className="p-4 rounded-lg border-1 bg-fuchsia-300">
                            <p className="font-bold">{elem.title}</p>
                            <p>Price: {elem.price}</p>
                            <p>{elem.description}</p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export {ProfilePage};