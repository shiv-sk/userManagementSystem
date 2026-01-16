"use client";

import { Userdata } from "@/interface/userdatainterface";

export default function UserTable(
    {users}:
    {
        users: Userdata[]
    }){
    return(
        <div className="bg-base-100 flex justify-center items-center max-w-187.5 p-6 rounded-lg shadow-lg mx-auto flex-col">
            <h1 className="text-center font-bold text-2xl underline">All Users</h1>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                        {
                            users && users.length > 0 ? users.map((user)=>(
                                <tr key={user._id}>
                                    <th>{user._id}</th>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.role}</td>
                                    <td>{'change Role'}</td>
                                </tr>
                            )) : (
                                <div className="text-center">
                                    <p>Users data not available</p>
                                </div>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}