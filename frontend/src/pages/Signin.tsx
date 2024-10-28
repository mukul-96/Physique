import { Login } from "../components/Login";

export const Signin = () => {
  return (
    <div className="bg-login-bg h-screen w-full flex justify-center items-center">
      <div className="h-[600px]  w-full max-w-[1350px] bg-red-300 rounded-2xl grid grid-cols-1 xl:grid-cols-[60%_40%] md:grid-cols-[50%_50%]">
        <div className="bg-login-image bg-cover bg-center bg-no-repeat rounded-l-2xl  items-center justify-start hidden xl:flex md:flex">

          <div className="flex flex-col text-white font-bold p-10 mr-8">
            <p className="text-5xl px-3 py-3">Empowering</p>
            <p className="text-5xl p-3">You to live</p>
            <p className="text-5xl p-3">Healthier</p>
          </div>
        </div>
          <Login/>
      </div>
    </div>
  );
};
