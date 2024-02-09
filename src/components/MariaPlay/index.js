/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useRef, useState } from "react";
import { Quotes } from "@/utils/quotes";
import Loader from "../Loader/Loader";
import { Toaster, toast } from "react-hot-toast";
import {
  generateResponse,
  getConversationId,
  pollForResponse,
  sendUserMessage,
} from "@/helper/AIApiCalls";
import { useAuthStateChange } from "@/hooks/useAuthStateChange";
import { auth } from "@/utils/firebase";
import { signOut } from "firebase/auth";

const MariaPlay = ({ appUser }) => {
  const [chatMessage, setChatMessage] = useState([
    {
      type: "mandp",
      message: `Welcome Visionary, ask me anything about GST?
      `,
      name: "maria",
      for: "maria",
    },
  ]);
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [randomNumber, setRandomNumber] = useState(0);
  const scrollableContainerRef = useRef(null);
  const [conversationId, setConversationId] = useState(null);

  async function handleSubmit() {
    try {
      if (!userInput) {
        toast.error("Enter the required input");
        return;
      }

      setLoading(true);
      let userMessage = userInput;

      userMessage = userMessage;
      let newMessages = [...chatMessage];
      newMessages.push({
        type: "founder",
        message: userMessage,
        name: "Founder",
        for: "maria",
      });
      newMessages.push({
        type: "mandp",
        message: "Thinking...",
        name: "maria",
        for: "maria",
      });

      setChatMessage(newMessages);
      setUserInput("");
      console.log(conversationId, "convo");

      if (conversationId === null) {
        console.log(appUser);
        let convoId = await getConversationId(appUser.uuid);
        if (convoId.success) {
          await setConversationId(convoId.data.conversation_id);
          continueForResponse(
            convoId.data.conversation_id,
            userMessage,
            newMessages
          );
        }
      } else {
        continueForResponse(conversationId, userMessage, newMessages);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error("Something went wrong,try again in sometime");
    }
  }
  console.log(appUser);
  async function continueForResponse(
    conversation_id,
    userMessage,
    newMessages
  ) {
    try {
      let data = await generateResponse(
        appUser.uuid,
        conversation_id,
        userMessage
      );

      console.log(data, "data");

      let lastIndex = newMessages.length - 1;
      let newMessage = [...newMessages];
      console.log(newMessage);
      newMessage[lastIndex] = await {
        ...newMessage[lastIndex],
        message: data.result,
      };
      console.log(newMessage);

      setChatMessage(newMessage);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error("Something went wrong,try again in sometime");
    }
  }

  // useEffect(() => {
  //   const updateRandomNumber = async () => {
  //     try {
  //       let number = Math.floor(Math.random() * 40);
  //       await setRandomNumber(number);
  //     } catch (error) {
  //       console.error("Error updating random number:", error);
  //     }
  //   };

  //   if (loading) {
  //     updateRandomNumber();
  //   }

  //   const intervalId = setInterval(updateRandomNumber, 10000);

  //   return () => clearInterval(intervalId);
  // }, [loading]);

  useEffect(() => {
    const container = scrollableContainerRef.current;

    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }, [chatMessage]);

  async function handleLogout() {
    signOut(auth)
      .then(() => {
        window.location.reload(false);
      })
      .catch((error) => {
        // An error happened.
      });
  }

  return (
    <div className="founders_playarea">
      <button className="logoutbutton" onClick={handleLogout}>
        Logout
      </button>
      <div className="playarea">
        <div className="agentintro">
          <div className="headingorange">
            <h2>Genie:</h2>
          </div>
          <p>
            Experience unparalleled expertise and convenience with GST Genie,
            your ultimate guide to navigating GST complexities. Let us transform
            your tax experience, turning GST compliance into a smooth and
            efficient journey.{" "}
          </p>
        </div>

        <div className="chatarea">
          <div ref={scrollableContainerRef} className="chatbox">
            <div className="conversationplain">
              {chatMessage.map((message, index) => {
                return (
                  <div
                    key={index}
                    className={message.type === "mandp" ? "mandp" : "founder"}
                  >
                    <span>{message.name}</span>

                    <p
                      className="box"
                      dangerouslySetInnerHTML={{
                        __html: message.message.replace(
                          /\n/g,
                          message.type === "mandp" ? "<br/>" : "<br /><br/>"
                        ),
                      }}
                    ></p>
                  </div>
                );
              })}
              {/* {loading && (
                <p className="random-quote">
                  {` "${Quotes[randomNumber].quote}"`}
                  <br />-{Quotes[randomNumber].author}
                </p>
              )} */}
            </div>
          </div>
          <div className="input-div">
            <div className="inputbox">
              {
                <input
                  onKeyDown={(e) =>
                    !loading && e.key === "Enter" && handleSubmit()
                  }
                  required={true}
                  placeholder="Ask me anything"
                  onChange={(e) => setUserInput(e.target.value)}
                  value={userInput}
                />
              }
              <button disabled={loading} onClick={handleSubmit}>
                {loading ? <Loader size={20} /> : "Ask!"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MariaPlay;
