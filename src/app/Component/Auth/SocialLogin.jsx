"use client";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import UseAuth from "@/app/Hooks/UseAuth";

const SocialLogin = () => {
  const { googleSignIn, githubSignIn } = UseAuth();
  const router = useRouter();

  const handleGoogleLogin = async () => {
    try {
      const result = await googleSignIn();
      console.log("Google sign in result:", result);

      // Get user data from the result
      const user = result?.user;
      const name = user?.displayName || "Unknown";
      const email = user?.email;

      if (email) {
        // Save to MongoDB users collection
        await fetch("/api/users", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name,
            email,
            role: "user",
          }),
        });
      }

      // Navigate to home
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

  const handleGithubLogin = async () => {
    try {
      const result = await githubSignIn();
      console.log("Github sign in result:", result);

      const user = result?.user;
      const name =
        user?.displayName || user?.reloadUserInfo?.screenName || "GitHub User";
      const email = user?.email;

      if (email) {
        // Save to MongoDB users collection
        await fetch("/api/users", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name,
            email,
            role: "user",
          }),
        });
      }

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
    <div className="w-full flex items-center gap-4 mt-4">
      {/* Google Auth Button */}
      <button
        onClick={handleGoogleLogin}
        className="flex-1 flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors"
      >
        <img
          src="https://www.svgrepo.com/show/475656/google-color.svg"
          alt="Google"
          className="w-5 h-5"
        />
        <span className="text-gray-700 font-medium cursor-pointer">
          Continue with Google
        </span>
      </button>

      {/* GitHub Auth Button */}
      <button
        onClick={handleGithubLogin}
        className="flex-1 flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors"
      >
        <img
          src="https://www.svgrepo.com/show/512317/github-142.svg"
          alt="GitHub"
          className="w-5 h-5"
        />
        <span className="text-gray-700 font-medium cursor-pointer">
          Continue with GitHub
        </span>
      </button>
    </div>
  );
};

export default SocialLogin;
