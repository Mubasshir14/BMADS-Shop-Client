"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { getAllCategories } from "../services/Category";
import Image from "next/image";

const AllCategories = () => {
  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data: fetchedCategories } = await getAllCategories();
      setCategories(fetchedCategories);
    };

    fetchData();
  }, []);

  const scrollToSection = (id: any) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <div className="max-w-screen-xl mx-auto px-5 mb-10">
      <h1 className="text-2xl uppercase text-blue-500 font-bold text-center mb-4">
        All Categories
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
        {categories?.map((c: any) => (
          <div
            onClick={() => scrollToSection(c.name)}
            key={c.id}
            className="border bg-blue-100 border-blue-200 p-4 text-center rounded-lg hover:scale-105 duration-5000 transform-gpu transition-all cursor-pointer"
          >
            <Image
              src={c.icon}
              alt={c.name}
              width={50}
              height={50}
              className="mx-auto"
            />
            <p className="mt-2 text-lg">{c.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllCategories;
