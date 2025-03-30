/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../../components/layouts/AuthLayout";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  //handle login submit
  const handleLogin = async (e) => {
    e.preventDefault();
  };

  return <AuthLayout>
    <div className="lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center">
      <h3 className="text=xl font-semibold text-black">Welcome Back</h3>
      <p className="text-xs text-slate-700 mt-[5px] mb-6">Please enter your details to login</p>
    </div>

<form onSubmit={handleLogin}>
  <Input value={email} onChange=()/>

</form>

  </AuthLayout>;
};

export default Login;
