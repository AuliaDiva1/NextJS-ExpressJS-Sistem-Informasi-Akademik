"use client";

import React, { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import "/styles/gradient.css";
import ToastNotifier from "/app/components/toastNotifier";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const toastRef = useRef(null);
  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault();

    if (email === "superadmin@example.com" && password === "password") {
      localStorage.setItem("role", "superadmin");
      router.push("/");
    } else {
      toastRef.current?.showToast("01", "Email atau password salah");
    }
  };

  return (
    <div className="min-h-screen flex justify-content-center align-items-center">
      <ToastNotifier ref={toastRef} />

      <div className="animated-gradient-bg w-full h-full flex justify-content-center align-items-center">
        <div className="card w-full md:w-6 h-auto p-5 shadow-3 rounded-lg">
          <div className="grid h-full">
            <div className="col-12 md:col-6 flex flex-col justify-center h-full px-4">
              <div>
                <h3 className="text-2xl text-center font-semibold mb-5">
                  {process.env.NEXT_PUBLIC_APP_NAME || "Sistem Informasi Akademik SMA"}
                </h3>

                <form onSubmit={handleLogin} className="grid">
                  <div className="col-12 mb-4">
                    <label htmlFor="email" className="block text-sm font-semibold">Email</label>
                    <InputText
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <div className="col-12 mb-4">
                    <label htmlFor="password" className="block text-sm font-semibold">Password</label>
                    <InputText
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <div className="col-12 mb-4">
                    <Button
                      type="submit"
                      label="Login"
                      className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </form>
              </div>
            </div>

            <div className="hidden md:block md:col-6 h-full">
              <img
                src="/layout/images/siakad.png"
                className="w-full h-full object-cover rounded-lg"
                alt="cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
