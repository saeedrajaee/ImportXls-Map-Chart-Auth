// "use client";
import dynamic from "next/dynamic";
import getImportXls from "@/common/action/importXls.api";

const Map = dynamic(() => import("../common/components/map/map"), {
  ssr: true,
});

export default async function Home() {

  const dataProps = await getImportXls() || [];
  // console.log("dataProps",dataProps)
  return (
    <main>
      <Map data={dataProps}/>
    </main>
  );
}
