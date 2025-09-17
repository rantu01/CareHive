"use client";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { use } from "react";
import { AuthContext } from "@/app/context/authContext";

const SocialLogin = () => {
  const { googleSignIn } = use(AuthContext);
  const router = useRouter();

  const handleGoogleLogin = async () => {
    try {
      const result = await googleSignIn();
      console.log("Google sign in result:", result);

      // Navigate to home or previous location
      router.push("/");
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error?.code || "Something went wrong!",
      });
    }
  };

  return (
    <div className="w-full flex flex-col items-center gap-4 mt-4">
      {/* Google Auth Button */}
      <button
        onClick={handleGoogleLogin}
        className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors"
      >
        <img
          src="https://www.svgrepo.com/show/475656/google-color.svg"
          alt="Google"
          className="w-5 h-5"
        />
        <span className="text-gray-700 font-medium">Continue with Google</span>
      </button>
    </div>
  );
};

export default SocialLogin;
