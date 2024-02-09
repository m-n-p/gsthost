import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment, useRef } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/utils/firebase";
import toast from "react-hot-toast";

const LoginPopup = ({ closeModal, isOpen }) => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const signIn = (e) => {
    e.preventDefault();

    if (emailRef.current && passwordRef.current) {
      signInWithEmailAndPassword(
        auth,
        emailRef.current.value,
        passwordRef.current.value
      )
        .then((user) => {
          console.log(user);
        })
        .catch((err) => {
          if (err.code === "auth/wrong-password") {
            toast.error("Wrong Password! Try again.");
            passwordRef.current?.focus();
          } else if (err.code === "auth/too-many-requests") {
            toast.error("Too many requests! Try again later.");
          } else if (err.code === "auth/user-not-found") {
            toast.error("No such user found,signup first");
          } else if (err.code === "auth/invalid-credential") {
            toast.error("Invalid credentials entered");
          }
          console.error(err.code);
        });
    }
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/90" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-xl font-semibold text-center mb-6 leading-6 text-gray-900"
                >
                  Sign to continue
                </Dialog.Title>
                <div className="mt-2 flex flex-col space-y-3 text-black">
                  <div className="flex flex-col">
                    <label className="inputLabel">Email</label>
                    <input
                      type="email"
                      ref={emailRef}
                      className="input"
                      placeholder="Email Address"
                      required
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="inputLabel">Password</label>
                    <input
                      type="password"
                      ref={passwordRef}
                      className="input"
                      placeholder="Password"
                      required
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white  hover:bg-blue-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    onClick={signIn}
                  >
                    Signin
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default LoginPopup;
