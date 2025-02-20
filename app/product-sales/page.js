import Image from "next/image";
import left from "@/public/images/arrowleft.svg";
import right from "@/public/images/arrowright.svg";

export default function Trafic() {
    return (
        <main className="h-[100vh] flex flex-col items-center px-14">
            <h1 className="text-3xl w-full text-strat mt-10">
                Tableau des vente produit
            </h1>
            <div className="flex justify-center mt-5 w-full bg-white border-[1px] rounded-xl border-[#D5D5D5] overflow-hidden">
                <table className="w-full text-center">
                    <thead>
                        <tr className="bg-[#FCFDFD] border-b-[1px] border-[#D5D5D5]">
                            <th className="py-2">Produit</th>
                            <th className="py-2">Quantité vendu</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white">
                        <tr>
                            <td className="py-3 border-b-[1px] border-[#D5D5D5]">
                                Croquettes Royal Canin (chien adulte)
                            </td>
                            <td className="py-3 border-b-[1px] border-[#D5D5D5]">
                                32
                            </td>
                        </tr>
                        <tr>
                            <td className="py-3 border-b-[1px] border-[#D5D5D5]">
                                Litière agglomérante premium
                            </td>
                            <td className="py-3 border-b-[1px] border-[#D5D5D5]">
                                15
                            </td>
                        </tr>
                        <tr>
                            <td className="py-3 border-b-[1px] border-[#D5D5D5]">
                                Antiparasitaire Frontline (chat)
                            </td>
                            <td className="py-3 border-b-[1px] border-[#D5D5D5]">
                                27
                            </td>
                        </tr>
                        <tr>
                            <td className="py-3 border-b-[1px] border-[#D5D5D5]">
                                Complément articulaire pour chien
                            </td>
                            <td className="py-3 border-b-[1px] border-[#D5D5D5]">
                                18
                            </td>
                        </tr>
                        <tr>
                            <td className="py-3 border-b-[1px] border-[#D5D5D5]">
                                Shampooing dermatologique hypoallergénique
                            </td>
                            <td className="py-3 border-b-[1px] border-[#D5D5D5]">
                                22
                            </td>
                        </tr>
                        <tr>
                            <td className="py-3 border-b-[1px] border-[#D5D5D5]">
                                Os à mâcher pour l’hygiène dentaire
                            </td>
                            <td className="py-3 border-b-[1px] border-[#D5D5D5]">
                                40
                            </td>
                        </tr>
                        <tr>
                            <td className="py-3">Seringues stériles 5ml</td>
                            <td className="py-3">60</td>
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
