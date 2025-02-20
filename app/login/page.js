import Image from "next/image";
import logo from "@/public/images/logo-full.svg";

export default function Login() {
    return (
        <main className="bg-[#F5F6FA] h-[100vh] flex justify-center items-center">
            <div className="flex flex-col space-y-10">
                <Image src={logo} alt="Logo de la clinique" className="w-96" />
                <div className="flex flex-col bg-white rounded-xl p-10 justify-center items-center">
                    <h1>Connexion</h1>
                    <form className="flex flex-col space-y-8 mt-12 w-full">
                        <div className="flex flex-col min-h-44 space-y-4">
                            <div className="flex flex-col space-y-1">
                                <label>Nom d'utilisateur</label>
                                <input
                                    type="text"
                                    placeholder="Nom d'utilisateur"
                                    className="p-2 rounded-lg w-full border bg-[#F5F6FA] border-gray-300"
                                />
                            </div>

                            <div className="flex flex-col space-y-1">
                                <label>Mot de passe</label>
                                <input
                                    type="password"
                                    placeholder="Mot de passe"
                                    className="p-2 rounded-lg w-full border bg-[#F5F6FA] border-gray-300"
                                />
                            </div>
                        </div>

                        <button className="bg-[#374C78] text-white hover:bg-[#7D8AA7] hover:text-black py-2 rounded-lg">
                            Se connecter
                        </button>
                    </form>
                </div>
            </div>
        </main>
    );
}
