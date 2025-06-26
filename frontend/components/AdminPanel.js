// frontend/components/AdminPanel.js
import { Admin, Resource, ListGuesser } from "react-admin";
import fakeDataProvider from "ra-data-fakerest";

const fakeData = {
  posts: [
    { id: 1, title: "First Post", body: "Welcome to your admin dashboard!" },
    { id: 2, title: "Second Post", body: "React Admin is working!" },
  ],
};

const dataProvider = fakeDataProvider(fakeData);

export default function AdminPanel() {
  return (
    <Admin dataProvider={dataProvider}>
      <Resource name="posts" list={ListGuesser} />
    </Admin>
  );
}
