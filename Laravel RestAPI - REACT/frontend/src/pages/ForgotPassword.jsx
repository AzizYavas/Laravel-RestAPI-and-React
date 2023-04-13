import React from 'react'
import { useState } from 'react';
import axios from '../api/axios';
import useAuthContext from '../context/AuthContext';

const ForgotPassword = () => {

    const [email, setEmail] = useState("");
    const [errors , setErrors] = useState([]);
    const [ status, setStatus ] = useState(null);

    const { csrf } = useAuthContext();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await csrf();
        setErrors([]);
        setStatus(null);
        try{
            const response = await axios.post("/forgot-password", {email});
            setStatus(response.data.status)
        }catch(e) {
            if(e.response.status == 422){
                setErrors(e.response.data.errors);
            }
        }
    }

    return (
            <section className="bg-green-300 py-20 min-h-screen lg:py-[120px]">
                <div className="container mx-auto">
                    <div className="-mx-4 flex flex-wrap">
                        <div className="w-full px-4">
                            <div className="relative mx-auto max-w-[525px] overflow-hidden rounded-lg bg-white py-16 px-10 text-center sm:px-12 md:px-[60px]">
                                <div className="mb-10 text-center md:mb-16">Şifrenizimi unuttunuz ? , Lütfen email adresinizi giriniz</div>
                                {status && <div className="bg-green-700 m-2 p-2 rounded text-white">{status}</div>}
                                <form onSubmit={handleSubmit} >
                                    <div className="mb-4">
                                        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="
                                            bordder-[#E9EDF4]
                                            w-full
                                            rounded-md
                                            border
                                            bg-[#FCFDFE]
                                            py-3
                                            px-5
                                            text-base text-body-color
                                            placeholder-[#ACB6BE]
                                            outline-none
                                            focus:border-primary
                                            focus-visible:shadow-none
                                        " />
                                        {errors.email &&
                                            <div className="flex">
                                                <span className="text-red-400 text-sm m-2 p-2">{errors.email[0]}</span>
                                            </div>
                                        }
                                        <div className="mb-10 mt-2">
                                        <button type="submit" className="
                                            w-full
                                            px-4
                                            py-3
                                            bg-green-500
                                            hover:bg-green-700
                                            rounded-md
                                            text-white
                                        "> Send Email </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
    )
}

export default ForgotPassword