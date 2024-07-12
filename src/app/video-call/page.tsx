import Home from "@/components/Home";
import React from "react";
import Layout from "@/components/layout";

const page = () => {
  return (
   <Layout>
    <section className="w-full h-full">
      <Home />
    </section>
   </Layout>
  );
};

export default page;
