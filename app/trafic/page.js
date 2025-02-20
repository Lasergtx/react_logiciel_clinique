import Image from "next/image";
import left from "@/public/images/arrowleft.svg";
import right from "@/public/images/arrowright.svg";

export default function Trafic() {
    return (
        <main className="h-[100vh] flex flex-col items-center px-14">
            <h1 className="text-3xl w-full text-strat mt-10">Trafic</h1>
            <div className="flex justify-center mt-5 w-full bg-white border-[1px] rounded-xl border-[#D5D5D5] overflow-hidden">
                <table className="w-full text-center">
                    <thead>
                        <tr className="bg-[#FCFDFD] border-b-[1px] border-[#D5D5D5]">
                            <th className="py-2">Nom Prénom</th>
                            <th className="py-2">Numéros</th>
                            <th className="py-2">Date de passage</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white">
                        <tr>
                            <td className="py-3 border-b-[1px] border-[#D5D5D5]">
                                Jean Lagache
                            </td>
                            <td className="py-3 border-b-[1px] border-[#D5D5D5]">
                                0674812348
                            </td>
                            <td className="py-3 border-b-[1px] border-[#D5D5D5]">
                                12/10/2021
                            </td>
                        </tr>
                        <tr>
                            <td className="py-3 border-b-[1px] border-[#D5D5D5]">
                                Dilan Poity
                            </td>
                            <td className="py-3 border-b-[1px] border-[#D5D5D5]">
                                0674816478
                            </td>
                            <td className="py-3 border-b-[1px] border-[#D5D5D5]">
                                12/10/2021
                            </td>
                        </tr>
                        <tr>
                            <td className="py-3 border-b-[1px] border-[#D5D5D5]">
                                Paul Nilon
                            </td>
                            <td className="py-3 border-b-[1px] border-[#D5D5D5]">
                                0749748348
                            </td>
                            <td className="py-3 border-b-[1px] border-[#D5D5D5]">
                                12/10/2021
                            </td>
                        </tr>
                        <tr>
                            <td className="py-3 border-b-[1px] border-[#D5D5D5]">
                                Théo Dupont
                            </td>
                            <td className="py-3 border-b-[1px] border-[#D5D5D5]">
                                0622412333
                            </td>
                            <td className="py-3 border-b-[1px] border-[#D5D5D5]">
                                12/10/2021
                            </td>
                        </tr>
                        <tr>
                            <td className="py-3 border-b-[1px] border-[#D5D5D5]">
                                Paul Leborg
                            </td>
                            <td className="py-3 border-b-[1px] border-[#D5D5D5]">
                                0674812348
                            </td>
                            <td className="py-3 border-b-[1px] border-[#D5D5D5]">
                                12/10/2021
                            </td>
                        </tr>
                        <tr>
                            <td className="py-3 border-b-[1px] border-[#D5D5D5]">
                                Marie Haubon
                            </td>
                            <td className="py-3 border-b-[1px] border-[#D5D5D5]">
                                0774812342
                            </td>
                            <td className="py-3 border-b-[1px] border-[#D5D5D5]">
                                12/10/2021
                            </td>
                        </tr>
                        <tr>
                            <td className="py-3">Mathis Makaron</td>
                            <td className="py-3">0771348723</td>
                            <td className="py-3">12/10/2021</td>
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
