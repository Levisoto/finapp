import { FC } from "react";
import { signOut } from "next-auth/react";
import { useSession, getSession } from "next-auth/react";
import axios from "axios";

type IAccountControlsProps = {};

export const AccountControls: FC<IAccountControlsProps> = () => {
  const { data: session, status } = useSession();
  const user = session?.user?.name || "No user";

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "unauthenticated") {
    return <p>Access Denied</p>;
  }

  const handleLogout = async () => {
    try {
      await axios.put("/api/auth/signoutprovider", null);
      // signOut only if PUT was successful
      return await signOut();
    } catch (error) {
      // <show some notification to user asking to retry signout>
      throw error;
    }
  };

  const InitialName = user.slice(0, 1);

  return (
    <div className="flex flex-row items-center gap-2">
      <div>
        <p className="text-body-large">{user}</p>
        <p
          className="text-body-small cursor-pointer"
          onClick={() => handleLogout()}
        >
          Cerrar sesión
        </p>
      </div>
      <div
        className="
        flex items-center justify-center h-[50px] w-[50px]
        rounded-full
        bg-primary
        "
      >
        <p
          className="text-diplay-small text-white"
          style={{ textTransform: "uppercase" }}
        >
          {InitialName}
        </p>
      </div>
    </div>
  );
};

export default AccountControls;
