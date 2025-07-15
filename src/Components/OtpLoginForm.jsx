import React, { useState } from "react";
import { useForm } from "react-hook-form";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import toast from "react-hot-toast";

const OTPLoginForm = ({ onSuccess }) => {
  const [step, setStep] = useState("phone");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const FAKE_OTP = "123456";

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const handlePhoneChange = (value) => {
    setValue("phone", value);
  };

  const onSubmitPhone = (data) => {
    setLoading(true);
    setMessage("Sending OTP...");
    toast.success("Sending OTP...");

    setTimeout(() => {
      setLoading(false);
      setMessage(`OTP sent to +${data.phone}`);
      setStep("otp");
    }, 1500);
  };

  const onSubmitOTP = (data) => {
    setLoading(true);
    setMessage("Verifying OTP...");
    toast.success("Verifying OTP...");

    setTimeout(() => {
      setLoading(false);
      if (data.otp === FAKE_OTP) {
        setMessage("✅ OTP Verified! Logging you in...");
        setStep("success");
        toast.success("success");

        setTimeout(() => {
          onSuccess(); // Call parent App to switch view
        }, 1000);
      } else {
        setMessage("❌ Invalid OTP.");
        toast.error("❌ Invalid OTP.");
      }
    }, 1500);
  };

  return (
    <div className="flex justify-center text-center min-h-screen ">
      {step === "phone" && (
        <form onSubmit={handleSubmit(onSubmitPhone)} className="mt-18 ">
          <PhoneInput
            country={"in"}
            enableSearch
            onChange={handlePhoneChange}
            inputProps={{ placeholder: "Enter phone number", name: "phone" }}
          />
          {errors.phone && (
            <p className="text-red-500 ">Phone number is required</p>
          )}
          <input
            type="hidden"
            {...register("phone", { required: true, minLength: 10 })}
          />
          <button
            type="submit"
            disabled={loading}
            className=" w-25 bg-gray-300 mt-4 py-2 font-semibold rounded-xl"
          >
            {loading ? "Sending..." : "Send OTP"}
          </button>
          <div className="mt-5">
            <p className="text-white">👉 Enter your mobile number </p>
            <p className="text-white">👉 you can change countrycode </p>
          </div>
        </form>
      )}

      {step === "otp" && (
        <form onSubmit={handleSubmit(onSubmitOTP)}>
          <input
            type="text"
            placeholder="Enter OTP"
            {...register("otp", {
              required: "OTP is required",
              pattern: { value: /^\d{6}$/, message: "OTP must be 6 digits" },
            })}
            className="mt-10 bg-gray-200 p-2 rounded-md mx-1"
          />
          {errors.otp && <p className="text-red-500 ">{errors.otp.message}</p>}
          <button
            type="submit"
            disabled={loading}
            className="mt-10 bg-gray-300 px-5 py-2 rounded-md"
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>

          {message && (
            <p
              className={`mt-15  ${
                loading ? "text-green-400" : "text-red-500"
              }`}
            >
              {message}
            </p>
          )}

          <p className="text-white">Enter default OTP = 123456</p>
        </form>
      )}
    </div>
  );
};

export default OTPLoginForm;
