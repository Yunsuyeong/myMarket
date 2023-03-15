import Button from "@components/button";
import Input from "@components/input";
import { NextPage } from "next";
import Layout from "../../components/layout";

const EditProfile: NextPage = () => {
  return (
    <Layout canGoBack>
      <div className="space-y-2 px-2 py-8">
        <div className="flex items-center space-x-2">
          <div className="h-12 w-12 rounded-full bg-slate-300" />
          <label
            className="cursor-pointer rounded-md border border-gray-500 py-2
          px-2 text-sm font-medium shadow-sm hover:bg-gray-600 focus:ring-2 focus:ring-offset-2
          "
          >
            Change
            <input type="file" className="hidden" accept="image/*" />
          </label>
        </div>
        <div className="space-y-1">
          <form className="mt-4 flex flex-col">
            <Input name="email" label="Email address" type="email" required />
          </form>
          <form className="mt-4 flex flex-col">
            <Input
              name="phone"
              label="Phone number"
              kind="phone"
              type="number"
              required
            />
            <Button method="email" text="Get login link" />
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default EditProfile;
