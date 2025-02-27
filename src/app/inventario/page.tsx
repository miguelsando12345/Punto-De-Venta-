import React from "react";
import InventoryTable from "@/components/inventario/InventoryTable";
import AddProductButton from "@/components/inventario/AddProductButton";
import Layout from "../layout/Layout";

const InventoryPage = () => {
  return (
    <Layout>
      <div className="p-4 relative">
        <InventoryTable />
        <AddProductButton />
      </div>
    </Layout>
  );
};

export default InventoryPage;
