// const KPICard = ({ title, value, icon: Icon, trend, color = "blue" }) => {
//   const colorClasses = {
//     blue: "bg-blue-50 text-blue-700",
//     green: "bg-green-50 text-green-700",
//     purple: "bg-purple-50 text-purple-700",
//     orange: "bg-orange-50 text-orange-700"
//   };

//   return (
//     <div className="bg-white p-6 rounded-lg shadow-sm border">
//       <div className="flex items-center justify-between">
//         <div>
//           <p className="text-sm font-medium text-gray-600">{title}</p>
//           <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
//           {trend && (
//             <p className="text-sm text-green-600 mt-1">
//               ↗ {trend}% from yesterday
//             </p>
//           )}
//         </div>
//         <div className={`p-3 rounded-full ${colorClasses[color]}`}>
//           <Icon className="w-6 h-6" />
//         </div>
//       </div>
//     </div>
//   );
// };

const KPICard = ({ title, value, icon: Icon, trend, color = "blue" }) => {
  const colorClasses = {
    blue: "bg-blue-50 text-blue-700",
    green: "bg-green-50 text-green-700",
    purple: "bg-purple-50 text-purple-700",
    orange: "bg-orange-50 text-orange-700",
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
          {trend && (
            <p className="text-sm text-green-600 mt-1">
              ↗ {trend}% from yesterday
            </p>
          )}
        </div>
        <div className={`p-3 rounded-full ${colorClasses[color]}`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
};

export default KPICard;
