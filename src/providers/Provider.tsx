"use client";

import UserProvider from "@/components/context/UserContext";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <UserProvider>
      {/* <StoreProvider>{children}</StoreProvider> */}
      {children}
    </UserProvider>
  );
};

export default Providers;
