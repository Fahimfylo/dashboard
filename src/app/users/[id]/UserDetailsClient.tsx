"use client";

import { motion } from "framer-motion";
import { User } from "@/app/types";

export default function UserDetailsClient({ user }: { user: User }) {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1, 
      },
    },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.25 } },
  };

  const personalFields = [
    { label: "Name", value: user.name },
    { label: "Username", value: `@${user.username}` },
    { label: "Email", value: user.email },
    { label: "Phone", value: user.phone },
    { label: "Website", value: user.website, isLink: true },
  ];

  const addressFields = [
    { label: "Street", value: user.address.street },
    { label: "Suite", value: user.address.suite },
    { label: "City", value: user.address.city },
    { label: "Zipcode", value: user.address.zipcode },
    {
      label: "Geo Location",
      value: `${user.address.geo.lat}, ${user.address.geo.lng}`,
    },
  ];

  const companyFields = [
    { label: "Name", key: "name" },
    { label: "Catch Phrase", key: "catchPhrase" },
    { label: "Business", key: "bs" },
  ];

  return (
    <div className="space-y-6 h-screen max-h-[750px] p-4 sm:p-8 mt-5 w-full sm:max-w-3xl md:max-w-5xl lg:max-w-7xl xl:max-w-[1400px] border border-gray-100 bg-white rounded-xl shadow-lg mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <motion.button
          onClick={() => history.back()}
          className="mb-4 sm:mb-0 px-3 cursor-pointer transform transition-all py-2 bg-gray-200 rounded-md hover:bg-gray-300"
          whileHover={{ scale: 1.05 }}
        >
          ← Back to Users
        </motion.button>

        <motion.h1
          className="text-2xl font-bold"
          initial="hidden"
          animate="visible"
          variants={itemVariants}
        >
          User Details
        </motion.h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          className="bg-gray-50 rounded-lg p-6 space-y-3"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h2
            className="text-2xl font-semibold mb-4"
            variants={itemVariants}
          >
            Personal Information
          </motion.h2>

          {personalFields.map((field) => (
            <motion.p
              key={field.label}
              className="flex flex-col"
              variants={itemVariants}
            >
              <span className="text-gray-600">{field.label}</span>
              <span
                className={`text-[18px] font-[500] ${
                  field.isLink
                    ? "text-blue-500 hover:text-blue-600 cursor-pointer"
                    : "text-black"
                }`}
              >
                {field.value}
              </span>
            </motion.p>
          ))}
        </motion.div>
        <motion.div
          className="bg-gray-50 rounded-lg p-6 space-y-3"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h2
            className="text-2xl font-semibold mb-4"
            variants={itemVariants}
          >
            Address
          </motion.h2>

          {addressFields.map((field) => (
            <motion.p
              key={field.label}
              className="flex flex-col"
              variants={itemVariants}
            >
              <span className="text-gray-600">{field.label}</span>
              <span className="text-black text-[18px] font-[500]">
                {field.value}
              </span>
            </motion.p>
          ))}
        </motion.div>
      </div>
      <motion.div
        className="bg-gray-50 rounded-lg p-6 mt-6 space-y-3 pb-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h2
          className="text-2xl font-semibold mb-4"
          variants={itemVariants}
        >
          Company
        </motion.h2>

        <div className="flex flex-col sm:flex-row gap-6 sm:gap-10">
          {companyFields.map((field) => (
            <motion.p
              key={field.key}
              className="flex flex-col"
              variants={itemVariants}
            >
              <span className="text-gray-600">{field.label}</span>
              <span className="text-black text-[18px] font-[500]">
                {user.company[field.key as keyof typeof user.company]}
              </span>
            </motion.p>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
