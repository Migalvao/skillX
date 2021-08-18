import React from "react";
import Layout from "./Layout";
import { Link } from "@inertiajs/inertia-react";

export default function Profile(props) {
  const EditButton = () => {
    if (props.can_edit) {
      return (
        <Link
          href={props.user.id + "/edit"}
          headers={window.defaultHeaders}
          as="button"
        >
          Edit
        </Link>
      );
    }
    return null;
  };

  return (
    <Layout current_user={props.user}>
      {/* <Head title="Welcome" /> */}
      <h1>Profile</h1>
      <p>Id: {props.user.id}</p>
      <p>Name: {props.user.name}</p>
      <p>Username: {props.user.username}</p>
      <p>Description: {props.user.description}</p>
      <p>Can edit?: {props.can_edit.toString()}</p>
      <EditButton />
      <br></br>

      <Link href="/home" headers={window.defaultHeaders} as="button">
        Home
      </Link>
    </Layout>
  );
}
