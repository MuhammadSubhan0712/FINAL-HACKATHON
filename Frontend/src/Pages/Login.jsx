import React from 'react'
import {Card , CardContent , CardHeader} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";


const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
    <Card className="w-full max-w-md p-4">
      <CardHeader className="text-center mb-4">
        <h2 className="text-xl font-bold">Login</h2>
        <p className="text-sm text-gray-600">Access your dashboard</p>
      </CardHeader>
      <CardContent>
        <Input type="email" placeholder="Email" className="mb-4" />
        <Input type="password" placeholder="Password" className="mb-4" />
        <Button className="w-full">Login</Button>
      </CardContent>
    </Card>
</div>
  )
}

export default Login