/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import AuthLayout from "../../components/layouts/AuthLayout";
import { validateEmail } from "../../utils/helper";
import ProfilePhotoSelector from "../../components/Inputs/ProfilePhotoSelector";

const Signup = () => {
  const [profilePic, setProfilePic] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [adminInviteToken, setAdminInviteToken] = useState("");

  const [error, setError] = useState(null);

  // Handle Signup form submit
  const handleSignUp = async (e) => {
    e.preventDefault();
  };

  if (!fullName) {
    setError("Fullname is required");
    return;
  }

  if (!validateEmail(email)) {
    setError("Please enter a valid email address");
    return;
  }

  if (!password) {
    setError("Password is required");
    return;
  }

  setError("");

  return (
    <AuthLayout>
      <div className="lg:w-[100%] h-auto md:h-full mt-10 md:mt-0 flex flex-col justify-center">
        <h3 className="text-xl font-black">Create an Account</h3>
        <p className="text-xs text-slate-700 mt-[5px] mb-6">
          Please enter your details to create an account
        </p>

        <form onSubmit={handleSignUp}>
          <ProfilePhotoSelector
            image={profilePic}
            setImage={setProfilePic}
          ></ProfilePhotoSelector>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4"></div>
        </form>
      </div>
    </AuthLayout>
  );
};

export default Signup;
