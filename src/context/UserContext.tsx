"use client";

import React, { createContext, useContext, useState } from "react";

interface UserProfile {
  name: string;
  email: string;
  avatarUrl?: string;
}

interface UserContextType {
  user: UserProfile;
  updateUser: (data: Partial<UserProfile>) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile>({
    name: "Alex Morgan",
    email: "alex@store.com",
    avatarUrl: "",
  });

  const updateUser = (data: Partial<UserProfile>) => {
    setUser((prev) => ({ ...prev, ...data }));
  };

  return (
    <UserContext.Provider value={{ user, updateUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
