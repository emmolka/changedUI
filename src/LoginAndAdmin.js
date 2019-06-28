import React from "react";
import AdminLTE from "adminlte-2-react";
import Login from "./LoginAdminLTE";

function LoginAndAdmin() {
  return (
    <AdminLTE title={["Admin", " LTE"]} titleShort={["A", "LTE"]} theme="blue">
      <Login path="/login" />
    </AdminLTE>
  );
}
export default LoginAndAdmin;
