import LoginPopup from "@/components/LoginPopup";
import MariaPlay from "@/components/MariaPlay";
import { auth } from "@/utils/firebase";
import Head from "next/head";
import { useEffect, useState } from "react";

export default function Home() {
  const [isOpen, setIsOpen] = useState(true);
  const [appUser, setAppUser] = useState(null);

  async function closeModel() {
    setIsOpen(!isOpen);
  }

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      let returnuser;
      if (user !== null) {
        returnuser = {
          uuid: user ? user.uid : "",
          emailAddress: user ? user.email : "",
          displayName: user ? user.displayName : "",
          loading: false,
        };
      } else {
        returnuser = {
          uuid: "",
          emailAddress: "",
          displayName: "",
          loading: false,
        };
      }
      setAppUser(returnuser);
    });
  }, []);

  console.log(appUser, "appuser");

  return (
    <>
      <Head>
        <title>Genie at GST Manager</title>
      </Head>
      <main className={`flex   items-center justify-between h-screen `}>
        <MariaPlay appUser={appUser} />
        <LoginPopup closeModal={closeModel} isOpen={appUser?.uuid === ""} />
      </main>
    </>
  );
}
