import Authentication from "./components/auth/Authentication";
import Home from "./components/home/Home";
import useToken from "./hooks/useToken";

export default function App() {
  const { token } = useToken();
  return <>{token ? <Home /> : <Authentication />}</>;
}
