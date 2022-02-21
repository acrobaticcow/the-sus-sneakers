import { Outlet } from "react-router-dom";
import { Container } from "react-bootstrap";
import Nav from "../../components/navigate/Nav";



export default () => {
  return (
    <>
      <Nav />
      <Outlet />
    </>
  );
};
