// "use client";
// import lineBlack from "./lineBlack.png";
// import lineWhite from "./lineWhite.png";
// import apps from "./apps.jpg";
// import Image from "next/image";
// import React from "react";
// import MoodChartComponent from "./MoodChartComponent";
// import olly from "./olly.jpg";
// import ine from "./ine.jpg";
// import { data } from "../mood";

// const MoodChart = () => {
//   const calculateAverage = (dataKey: string) => {
//     const total = data.reduce(
//       (sum, entry) => sum + parseFloat(entry[dataKey]),
//       0
//     );
//     return total / data.length;
//   };

//   const ollyAverage = calculateAverage("Olly Mood");
//   const ineAverage = calculateAverage("Ine Mood");

//   return (
//     <div className="px-56 py-72 border pb-72 bg-gray-50">
//       <div>
//         <MoodChartComponent
//           data={data}
//           dataKey="Olly Mood"
//           color="black"
//           average={ollyAverage}
//           imageSrc={olly}
//           altText="Olly"
//           showAverageLine={true}
//           domain={[0, 100]}
//         />
//         <MoodChartComponent
//           data={data}
//           dataKey="Ine Mood"
//           color="black"
//           average={ineAverage}
//           imageSrc={ine}
//           altText="Ine"
//           showAverageLine={true}
//           domain={[0, 100]}
//         />
//       </div>
//       <div>
//         <div className="flex items-start justify-start -mt-32 ml-4 text-sm gap-2 transform scale-125 translate-x-56">
//           <div className="flex border rounded-xl gap-2 shadow-lg bg-white text-black items-center overflow-hidden">
//             <Image
//               src={lineBlack}
//               className="w-16  h-16 object-contain px-2 border-r"
//               alt={""}
//             />
//             <div className="flex flex-col py-2 pl-2 pr-4">
//               <div className="text-xs font-light">Made with</div>
//               <div className="font-bold">substate.app</div>
//             </div>
//           </div>
//           {/* <Image src={apps} className="h-12 w-auto" alt={""} /> */}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MoodChart;
