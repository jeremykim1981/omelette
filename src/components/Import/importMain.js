// import { useState } from "react";
// import { CREATE_USER } from "../../appllo/mutations";
// import { Data } from "./data";
// import AppolloClient from "../../appllo/apolloClient";

const ImportMain = () => {
  return <div>WoW!</div>;
  //   const [loading, setLoading] = useState(false);
  //   const roleId = "6128c292f9a7055a60f98fa3";
  //   const { client } = AppolloClient();

  //   const onClickImport = async () => {
  //     try {
  //       {
  //         Data?.map(async (row) => {
  //           await client.mutate({
  //             mutation: CREATE_USER,
  //             variables: {
  //               input: {
  //                 data: {
  //                   username: `${row?.Name + " " + row?.Lastname}` || "Missing",
  //                   email: row?.Account || "Missing",
  //                   password: `${row?.Password}` || "123456",
  //                   role: roleId,
  //                   department: row?.Department || "Missing",
  //                 },
  //               },
  //             },
  //           });
  //         });
  //       }
  //     } catch (error) {
  //       console.log("Error : ", error);
  //     }
  //   };
  //   return (
  //     <div>
  //       <div
  //         onClick={() => onClickImport()}
  //         className="cursor-pointer w-24 p-2 bg-gray-500 text-white mx-auto my-20 rounded-xl text-center"
  //       >
  //         Import
  //       </div>
  //     </div>
  //   );
  // };
};
export default ImportMain;
