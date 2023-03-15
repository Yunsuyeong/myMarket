import { NextPage } from "next";
import Layout from "../../components/layout";

const Chats: NextPage = () => {
  return (
    <Layout title="Chat" hasTabBar>
      <div className="divide-y-[1px] py-8">
        {[1, 2, 3, 4, 5, 6].map((_, i) => (
          <div
            key={i}
            className="flex items-center space-x-4 border-t px-2 py-2 last:border-b-0"
          >
            <div className="h-16 w-16 rounded-full bg-gray-400" />
            <div>
              <p className="text-md font-semibold">name</p>
              <p className="text-sm">message</p>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default Chats;
