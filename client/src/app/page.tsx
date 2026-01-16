"use client";
import UserProfile from "@/components/userprofilecard"

import UserTable from "@/components/usertable"
import { useAuth } from "@/context/authcontext"
import { useAllUser, useUserProfile } from "@/hooks/user";

export default function Home(){

  const {user} = useAuth();
  const {allUsers, isLoading} = useAllUser();
  const {user: userPofile, isLoading: userProfileLoading} = useUserProfile();

  return (
    <div className="min-h-screen gap-4 py-24 bg-base-300">
      {
        isLoading || userProfileLoading ? (
          <div className="text-center">
            <h1>Loading...</h1>
          </div>
        ) : user && user.role === "Admin" ? (
          <div>
            <UserTable users={allUsers}/>
          </div>
        ) : user && user.role === "User" ? (
          <div>
            <UserProfile user={userPofile}/>
          </div>
        ) : (
          <div>
            <p>Login to Continue</p>
          </div>
        )
      }
      
    </div>
  )
}