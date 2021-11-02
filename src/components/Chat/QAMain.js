import { useEffect, useState } from "react";
import ApolloClient from "../../appllo/apolloClient";
import { QUERY_QUESTION } from "../../appllo/queries";
import { socket } from "../../utils/socketServer";

const QA = () => {
  const MainQuestion = () => {
    const { client } = ApolloClient();
    const [quest, setQuest] = useState("");

    useEffect(() => {
      socket.on("onQuestion", () => {
        LoadQuestion();
      });
      return () => {
        socket.off("onQuestion");
      };
    });

    useEffect(async () => {
      LoadQuestion();
    }, []);

    const LoadQuestion = async () => {
      try {
        const { data: question } = await client.query({
          query: QUERY_QUESTION,
        });
        setQuest(question?.questions);
      } catch (error) {}
    };

    return (
      <div className="border  border-logouttext mt-10 mx-4 rounded-3xl">
        <div className=" text-center py-4 border-b border-logouttext text-2xl   ">
          คำถาม
        </div>

        <div className="h-question overflow-y-scroll  pt-4 ">
          {quest && (
            <div>
              {quest?.map((question, index) => {
                return (
                  <div className="flex  border-gray-400  border-dashed border-b px-4 py-2">
                    <div className="w-1/12 pr-2">{index + 1}.</div>
                    <div className="w-5/12">{question?.quest}</div>
                    <div className="w-3/12">{question?.name}</div>
                    <div className="w-3/12">{question?.email}</div>
                    {/* <div className="w-2/12">{question?.department}</div> */}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    );
  };
  return (
    <div>
      <MainQuestion />
    </div>
  );
};
export default QA;
