import { NextPage } from "next";
import Layout from "../components/layout";

const Home: NextPage = () => {
  return (
    <Layout title="Home" hasTabBar>
      <h1>Home Page</h1>
    </Layout>
  );
};

export default Home;
