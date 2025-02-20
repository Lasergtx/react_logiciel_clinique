import Image from "next/image";
import left from "@/public/images/arrowleft.svg";
import right from "@/public/images/arrowright.svg";

export default function Spendings() {
    return (
        <main className="h-[100vh] flex flex-col items-center px-14">
            <h1 className="text-3xl w-full text-strat mt-10">Revenus</h1>
            <div className="flex justify-center mt-5 w-full bg-white border-[1px] rounded-xl border-[#D5D5D5] overflow-hidden">
                <table className="w-full text-center">
                    <thead>
                        <tr className="bg-[#FCFDFD] border-b-[1px] border-[#D5D5D5]">
                            <th className="py-2">Date</th>
                            <th className="py-2">Débiteur</th>
                            <th className="py-2">Montant</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody className="bg-white">
                        <tr>
                            <td className="py-3 border-b-[1px] border-[#D5D5D5]">
                                12/10/2021
                            </td>
                            <td className="py-3 border-b-[1px] border-[#D5D5D5]">
                                Jean Lagache
                            </td>
                            <td className="py-3 text-green-500 border-b-[1px] border-[#D5D5D5]">
                                + 200€
                            </td>
                            <td className="border-b-[1px] border-[#D5D5D5]">
                                <button className="bg-[#4AD991] bg-opacity-20 text-[#4AD991] text-sm py-1 px-4 rounded-lg">
                                    Détails
                                </button>
                            </td>
                        </tr>
                        <tr>
                            <td className="py-3 border-b-[1px] border-[#D5D5D5]">
                                12/10/2021
                            </td>
                            <td className="py-3 border-b-[1px] border-[#D5D5D5]">
                                Dilan Poity
                            </td>
                            <td className="py-3 text-green-500 border-b-[1px] border-[#D5D5D5]">
                                + 40€
                            </td>
                            <td className="border-b-[1px] border-[#D5D5D5]">
                                <button className="bg-[#4AD991] bg-opacity-20 text-[#4AD991] text-sm py-1 px-4 rounded-lg">
                                    Détails
                                </button>
                            </td>
                        </tr>
                        <tr>
                            <td className="py-3 border-b-[1px] border-[#D5D5D5]">
                                10/10/2021
                            </td>
                            <td className="py-3 border-b-[1px] border-[#D5D5D5]">
                                Paul Nilon
                            </td>
                            <td className="py-3 text-green-500 border-b-[1px] border-[#D5D5D5]">
                                + 400€
                            </td>
                            <td className="border-b-[1px] border-[#D5D5D5]">
                                <button className="bg-[#4AD991] bg-opacity-20 text-[#4AD991] text-sm py-1 px-4 rounded-lg">
                                    Détails
                                </button>
                            </td>
                        </tr>
                        <tr>
                            <td className="py-3 border-b-[1px] border-[#D5D5D5]">
                                5/10/2021
                            </td>
                            <td className="py-3 border-b-[1px] border-[#D5D5D5]">
                                Théo Dupont
                            </td>
                            <td className="py-3 text-green-500 border-b-[1px] border-[#D5D5D5]">
                                + 90€
                            </td>
                            <td className="border-b-[1px] border-[#D5D5D5]">
                                <button className="bg-[#4AD991] bg-opacity-20 text-[#4AD991] text-sm py-1 px-4 rounded-lg">
                                    Détails
                                </button>
                            </td>
                        </tr>
                        <tr>
                            <td className="py-3 border-b-[1px] border-[#D5D5D5]">
                                31/09/2021
                            </td>
                            <td className="py-3 border-b-[1px] border-[#D5D5D5]">
                                Paul Leborg
                            </td>
                            <td className="py-3 text-green-500 border-b-[1px] border-[#D5D5D5]">
                                + 120€
                            </td>
                            <td className="border-b-[1px] border-[#D5D5D5]">
                                <button className="bg-[#4AD991] bg-opacity-20 text-[#4AD991] text-sm py-1 px-4 rounded-lg">
                                    Détails
                                </button>
                            </td>
                        </tr>
                        <tr>
                            <td className="py-3 border-b-[1px] border-[#D5D5D5]">
                                28/09/2021
                            </td>
                            <td className="py-3 border-b-[1px] border-[#D5D5D5]">
                                Marie Haubon
                            </td>
                            <td className="py-3 text-green-500 border-b-[1px] border-[#D5D5D5]">
                                + 50€
                            </td>
                            <td className="border-b-[1px] border-[#D5D5D5]">
                                <button className="bg-[#4AD991] bg-opacity-20 text-[#4AD991] text-sm py-1 px-4 rounded-lg">
                                    Détails
                                </button>
                            </td>
                        </tr>
                        <tr>
                            <td className="py-3">28/09/2021</td>
                            <td className="py-3">Mathis Makaron</td>
                            <td className="py-3 text-green-500">+ 20€</td>
                            <td>
                                <button className="bg-[#4AD991] bg-opacity-20 text-[#4AD991] text-sm py-1 px-4 rounded-lg">
                                    Détails
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="flex justify-between w-full mt-5">
                <p className="text-sm text-gray-500">Pages 1 sur 3</p>
                <div className="flex">
                    <button className="bg-white py-1 px-2 rounded-l-lg border-[1px] border-[#D5D5D5]">
                        <Image src={left} alt="left arrow" className="w-5" />
                    </button>
                    <button className="bg-white py-1 px-2 rounded-r-lg border-y-[1px] border-r-[1px] border-[#D5D5D5]">
                        <Image src={right} alt="left arrow" className="w-5" />
                    </button>
                </div>
            </div>
        </main>
    );
}
