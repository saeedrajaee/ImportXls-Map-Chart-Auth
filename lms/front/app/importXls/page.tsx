import ImportXlsGcpTable from "../common/components/importXls";
import getImportXls from "../common/action/importXls.api";

export default async function ImportXlsPage() {
  const dataProps = await getImportXls() || [];
  return (
    <div>
      <ImportXlsGcpTable dataProps = {dataProps} />
    </div>
    )
}