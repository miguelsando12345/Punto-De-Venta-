"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import AddProductModal from "./AddProductModal";

const AddProductButton = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        className="fixed bottom-6 right-6 rounded-full p-4 shadow-lg bg-blue-600 hover:bg-blue-700"
        onClick={() => setOpen(true)}
      >
        <Plus size={24} />
      </Button>
      <AddProductModal open={open} setOpen={setOpen} />
    </>
  );
};

export default AddProductButton;
