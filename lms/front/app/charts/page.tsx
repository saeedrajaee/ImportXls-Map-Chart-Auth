import LineChart from "@/common/components/charts/chart1";
import {useState} from 'react'
import getImportXls from "../common/action/importXls.api";

export default async function App() {

  const dataProps = await getImportXls() || [];
  return (
    <>

    <div>
      <LineChart data={dataProps}/>
    </div></>
  );
};