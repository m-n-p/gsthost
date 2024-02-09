import { auth } from "@/utils/firebase";

export function useAuthStateChange() {
  auth.onAuthStateChanged((user) => {
    console.log(user, "session");
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
    return returnuser;
  });
}
