import { getUniqueGcp } from "@/common/action/importXls.api";
import EditGcp from "@/common/components/importXls/edit";

export default async function EditGcpPage({ params, searchParams }) {
  const gcp = await getUniqueGcp(params.gcpId);
// console.log("gcp.............",gcp)
  return (
    <div>
      <EditGcp searchParams={searchParams} gcp={gcp} />
    </div>
  );
}
