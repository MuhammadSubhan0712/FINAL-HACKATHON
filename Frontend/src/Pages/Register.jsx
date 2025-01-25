import { useState } from "react";
import {Card , CardContent , CardHeader} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

const Register = () => {
  const [role , setRole] = useState("user");
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
    <Card className="w-full max-w-md p-4">
      <CardHeader className="text-center mb-4">
        <h2 className="text-xl font-bold">Register</h2>
        <p className="text-sm text-gray-600">Create a new account</p>
      </CardHeader>
      <CardContent>
        <Input type="text" placeholder="Username" className="mb-4" />
        <Input type="email" placeholder="Email" className="mb-4" />
        <Input type="password" placeholder="Password" className="mb-4" />
        <Input type="file" className="mb-4" accept="image/*" />
        <Select onValueChange={(value) => setRole(value)}>
          <SelectTrigger className="mb-4">
            <SelectValue placeholder="Select Role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="user">User</SelectItem>
            <SelectItem value="admin">Admin</SelectItem>
          </SelectContent>
        </Select>
        <Button className="w-full">Register</Button>
      </CardContent>
    </Card>
  </div>
  )
}

export default Register