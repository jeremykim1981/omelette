import MainContent from "./MainContent";
import IP from "public-ip";
import { useEffect } from "react";
import AppolloClient from "../../appllo/apolloClient";
import { CREATE_LOGIN_LOG, CREATE_TIME } from "../../appllo/mutations";

// const CreateLog = async () => {
//   const { client } = AppolloClient();
//   const hours = new Date().getHours();
//   const mins = new Date().getMinutes();
//   await client.mutate({
//     mutation: CREATE_TIME,
//     variables: {
//       input: {
//         data: {
//           time: `${hours + ":" + mins}`,
//           name: localStorage?.getItem("IP"),
//           email: "ไม่ระบุ",
//           department: "ออกจากหน้า /Live",
//         },
//       },
//     },
//   });
// };

const WithNoAuth = () => {
  const { client } = AppolloClient();

  // useEffect(async () => {
  //   try {
  //     const hours = new Date().getHours();
  //     const mins = new Date().getMinutes();
  //     await client.mutate({
  //       mutation: CREATE_LOGIN_LOG,
  //       variables: {
  //         input: {
  //           data: {
  //             time: `${hours + ":" + mins}`,
  //             name: await IP.v4(),
  //             email: "ไม่ระบุ",
  //             department: "เข้ามาจาก /Live",
  //           },
  //         },
  //       },
  //     });
  //     localStorage.setItem("IP", await IP.v4());
  //   } catch (error) {
  //     console.log("Error", error);
  //   }
  // }, []);

  // useEffect(() => {
  // return () => {
  //     window.addEventListener("beforeunload", function (e) {
  //       let confirmationMessage = "Are you sure you want to close?";

  //       (e || window.event).returnValue = confirmationMessage; //Gecko + IE

  //       CreateLog();

  //       return confirmationMessage; //Webkit, Safari, Chrome
  //     });
  //   };
  // });

  return (
    <div>
      <MainContent />
    </div>
  );
};
export default WithNoAuth;
