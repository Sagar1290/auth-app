import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from "../firebase";
import { signInEnd } from "../../redux/user/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const OAuth = () => {
  const dispatch = useDispatch();
  const navigator = useNavigate();
  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);

      const result = await signInWithPopup(auth, provider);

      const userData = {
        fullname: result.user.displayName,
        email: result.user.email,
        photoURL: result.user.photoURL,
      };
      const res = await fetch("http://localhost:8000/api/user/google", {
        method: "post",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      const data = await res.json();

      if (data.success == false) {
        dispatch(signInFailed(data));
        return;
      }
      dispatch(signInEnd(data));
      alert("user login successfully");
      navigator("/");
      console.log(data);
    } catch (error) {
      console.log("error while login with google ", error);
    }
  };

  return (
    <button
      onClick={handleGoogleClick}
      type="button"
      className="p-4 text-xl bg-red-600 text-white font-semibold rounded-md hover:opacity-80"
    >
      Login with Google
    </button>
  );
};

export default OAuth;
