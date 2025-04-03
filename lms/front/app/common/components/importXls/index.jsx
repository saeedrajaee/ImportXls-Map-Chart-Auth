"use client";
import { createBulkUsers, deleteUsers } from "@/common/action/importXls.api";
import { DeleteIcon } from "@/common/icons";
import { EditIcon } from "@/common/icons";
import Link from "next/link";
import { Button } from "@/common/ui/Button";
import DeleteConfirmationModal from "@/common/ui/DeleteConfirmationModal";
import { deleteGcp } from "@/common/action/importXls.api";
import React, { useState } from "react";
import * as XLSX from "xlsx";

export default function ImportXlsGcpTable({ dataProps }) {
  // console.log("2.dataProps-----------", dataProps);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState();

  const handleDelete = async () => {
    await deleteProduct(selectedId);
    setIsDeleteModalOpen(false);
    setSelectedId(null);
  };

  //file
  const [file, setFile] = useState([]);
  const [loading, setLoading] = useState(false);
  const [jsonData, setJsonData] = useState("");

  //json stringified
  function previewData() {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = e.target?.result;
        if (data) {
          const workbook = XLSX.read(data, { type: "binary" });
          //sheetname
          const sheetName = workbook.SheetNames[0];
          //worksheet
          const workSheet = workbook.Sheets[sheetName];
          //json
          const json = XLSX.utils.sheet_to_json(workSheet);
          setJsonData(JSON.stringify(json, null, 2));
        }
      };
      reader.readAsBinaryString(file);
    }
  }

  function saveData() {
    if (file) {
      setLoading(true);
      const reader = new FileReader();
      reader.onload = async (e) => {
        const data = e.target?.result;
        if (data) {
          const workbook = XLSX.read(data, { type: "binary" });
          //sheetname
          const sheetName = workbook.SheetNames[0];
          //worksheet
          const workSheet = workbook.Sheets[sheetName];
          //json
          // const json: UserProps[] = XLSX.utils.sheet_to_json(workSheet);
          const json = XLSX.utils.sheet_to_json(workSheet);
          // console.log("1.json-----------", json);

          //save to the DB
          try {
            console.log(json);
            await createBulkUsers(json);
            setLoading(false);
          } catch (error) {
            console.log(error);
          }
        }
      };
      reader.readAsBinaryString(file);
    }
  }

  // async function clearData() {
  //   try {
  //     await deleteUsers()
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
  return (
    <div>
      <div className="flex justify-between">
        <h1 className="font-semibold text-3xl p-2"> GCP Management </h1>
        <div className="flex justify-between">
          <button>
            <Link href="/importXls/add" className="custom-primary-btn">
              Add Product
            </Link>
          </button>
        </div>
      </div>
      <div className="flex justify-between">
        <h1 className="font-semibold text-3xl p-2"> Upload file </h1>
          <input
            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
            aria-describedby="user_avatar_help"
            id="user_avatar"
            type="file"
            accept=".xls,.xlsx"
            onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
          />
        <div className="flex justify-between">
          <button onClick={saveData} className="custom-primary-btn">
            Save Data
          </button>
        </div>
        <div>
        </div>

      </div>

      <hr className="my-5" />

      <div className="mt-20">
        <table className="custom-table">
          <thead className="border-y-2 border-gray-400">
            <tr>
              <th> Sr. No.</th>
              <th>X</th>
              <th>Y</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 font-medium text-lg text-center">
            {dataProps.map((data, key) => (
              <tr key={data.id}>
                <td>{key + 1}</td>
                <td>{data.X}</td>
                <td>{data.Y}</td>
                <td>{data.description}</td>
                <td className="flex items-center gap-x-3">
                  <Link href={`/importXls/edit/${data.id}`} className="w-fit">
                  {/* <Link href="/" className="w-fit"> */}
                    <EditIcon />
                  </Link> 
                   <Button
                    className="bg-transparent p-0 px-2 border-none text-red-500"
                    onClick={() => {
                      setIsDeleteModalOpen(true);
                      setSelectedId(data.id);
                    }}
                  >
                    <DeleteIcon />
                  </Button> 
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {isDeleteModalOpen && (
          <DeleteConfirmationModal
            setIsOpen={setIsDeleteModalOpen}
            onCancel={() => setIsDeleteModalOpen(false)}
            handleConfirm={handleDelete}
          />
        )}
      </div>
    </div>
  );
}
