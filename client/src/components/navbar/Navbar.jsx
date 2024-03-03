import useToken from "../../hooks/useToken";

export default function Navbar() {
  const urlImg = localStorage.getItem("profilePic");
  const email = localStorage.getItem("email");
  const { removeToken } = useToken();

  const handleLogout = () => {
    removeToken();
    localStorage.removeItem("profilePic");
    localStorage.removeItem("email");
    window.location.reload();
  };
  return (
    <>
      <nav className="px-10 py-5 flex flex-row justify-between">
        <div className="text-3xl">Tables App</div>
        <div className="flex flex-row gap-[10px] items-center">
          {email}
          {urlImg && (
            <img
              src={urlImg}
              alt={urlImg}
              className="w-10 h-10 rounded-full border"
            />
          )}
          <div
            className="bg-primary p-2 rounded-full text-white cursor-pointer"
            onClick={handleLogout}
          >
            Logout
          </div>
        </div>
      </nav>
    </>
  );
}
