'use client';
import { Provider } from "react-redux";
import Table from "./shared/components/Table";
import store from "./shared/redux/store";



export default function Home() {
  return (
    <Provider store={store}>
      <Table />
    </Provider>
  );
}
