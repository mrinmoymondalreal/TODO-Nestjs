import { AuthProvider } from "../components/AuthProvider";

function Home() {
  return (
    <AuthProvider>
      <h1>Home</h1>
      <p>Welcome to the home page!</p>
    </AuthProvider>
  );
}

export default Home;
