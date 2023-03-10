import useUser from "@libs/client/useUser";
import { NextPage } from "next";
import Layout from "../components/layout";

const Home: NextPage = () => {
  const { user, isLoading } = useUser();
  console.log(user);
  return (
    <Layout title="Home" hasTabBar>
      <h1>Home Page</h1>
    </Layout>
  );
};

export default Home;
