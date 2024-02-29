import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";

import {
  signOut,
  updateUserStart,
  updateUserEnd,
  updateUserFailed,
} from "../../redux/user/userSlice";

const Profile = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const [image, setImage] = useState(undefined);
  const [uploadError, setUploadError] = useState(null);
  const [uploadPercentage, setUploadPercentage] = useState(0);
  const [formData, setFormData] = useState({});
  const [photoURL, setPhotoUrl] = useState(null);
  const [imageHelp, setImageHelp] = useState(false);
  const [userUpdated, setUserUpdated] = useState(false);

  const handleShowHelp = () => {
    setImageHelp(!imageHelp);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  // console.log(photoURL);

  const id = currentUser.rest._id;

  const handleUpdateUser = async (e) => {
    e.preventDefault();

    try {
      dispatch(updateUserStart());
      const res = await fetch(`http://localhost:8000/api/user/update/${id}`, {
        method: "post",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      console.log(res);

      if (!res.ok) {
        dispatch(updateUserFailed(res));
        throw new Error("Failed to update user details");
      }
      const data = await res.json();
      dispatch(updateUserEnd(data));
    } catch (error) {
      console.error("Error updating user:", error.message);
      dispatch(updateUserFailed(error));
    }
  };

  useEffect(() => {
    if (image) handleImageUpload(image);
  }, [image]);

  const handleImageUpload = async (image) => {
    const storage = getStorage(app);
    const fileName = image.name + new Date();
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, image);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadPercentage(Math.round(progress));
      },
      (error) => {
        setUploadError(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setPhotoUrl(downloadURL);
          setFormData({ ...formData, photoURL: downloadURL });
        });
      }
    );
  };

  const handleSignOut = () => {
    dispatch(signOut());
  };

  const imageRef = useRef(null);
  return (
    <div className="p-4 max-w-lg mx-auto">
      <h1 className="text-3xl font-bold text-center my-8">Profile</h1>
      <form
        className="flex flex-col gap-2 justify-center items-center rounded-lg"
        onSubmit={handleUpdateUser}
      >
        <input
          type="file"
          ref={imageRef}
          hidden
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <img
          src={photoURL || currentUser.rest.photoURL}
          alt="profile-pic"
          className="h-24 w-24 rounded-full my-2 cursor-pointer object-cover"
          onClick={() => imageRef.current.click()}
        />
        <p className="text-center p-4 relative">
          {uploadError ? (
            <span className="text-red-500">
              Error while uploading to database
              <i
                class="fa fa-question-circle ml-2"
                onClick={handleShowHelp}
              ></i>
              {imageHelp && (
                <span className="text-black absolute bottom-[45px] left-1/2 text-right whitespace-nowrap flex flex-col">
                  <span>Only Image files accepted.</span>
                  <span>Image size should be less than 2MB.</span>
                </span>
              )}
            </span>
          ) : uploadPercentage < 100 && uploadPercentage > 0 ? (
            <span>{`upload in progress: ${uploadPercentage} %`}</span>
          ) : (
            uploadPercentage === 100 && <span>Upload successfull!</span>
          )}
        </p>

        <input
          id="username"
          placeholder="Username"
          value={currentUser.rest.username}
          type="text"
          className="w-full text-lg p-4 my-2 bg-cyan-200 rounded-md"
          onChange={handleChange}
          readOnly
        />
        <input
          id="fullname"
          placeholder="Full name"
          defaultValue={currentUser.rest.fullname}
          type="text"
          className="w-full text-lg p-4 my-2 bg-cyan-200 rounded-md"
          onChange={handleChange}
        />
        <input
          id="password"
          placeholder="Password"
          type="password"
          className="w-full text-lg p-4 my-2 bg-cyan-200 rounded-md"
          onChange={handleChange}
        />
        <button
          type="submit"
          className="p-4 uppercase bg-red-700 rounded-md w-full text-white text-lg font-semibold"
        >
          update
        </button>
      </form>
      <div className="flex justify-between my-4">
        <span className="text-red-800 cursor-pointer">Delete Account</span>
        <span className="text-red-800 cursor-pointer" onClick={handleSignOut}>
          Sign Out
        </span>
      </div>
      <div>
        <p>{userUpdated && "user updated successfully!"}</p>
      </div>
    </div>
  );
};

export default Profile;
