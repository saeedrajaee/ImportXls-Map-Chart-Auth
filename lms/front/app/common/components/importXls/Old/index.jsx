"use client";
import { createBulkUsers, deleteUsers } from "@/app/common/action/importXls.api";
import React, { useState } from "react";
import * as XLSX from "xlsx";


export default function ImportXlsTable({ dataProps }) {

  // console.log("2.dataProps-----------",dataProps)

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
          
          //save to the DB
          try {
            console.log(json)
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
    <div className="py-8 space-y-6">
      <div className="flex items-center gap-8">
        <div className="">
          <label
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            htmlFor="user_avatar"
          >
            Upload file
          </label>
          <input
            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
            aria-describedby="user_avatar_help"
            id="user_avatar"
            type="file"
            accept=".xls,.xlsx"
            onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
          />
        </div>
        {/* <button
          onClick={previewData}
          className=" hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 bg-slate-300 text-slate-900 "
        >
          Preview Data
        </button> */}
        <button onClick={saveData} className="hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 bg-purple-600 text-slate-900 ">
          Save Data
        </button>
        {/* <button onClick={clearData} className="hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 bg-red-600 text-slate-900 ">
          Clear Data
        </button> */}
      </div>

      {/* <pre>{jsonData}</pre> */}

      {
        loading?(
          <p>Saving Data please wait...</p>
        ):(
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          {/* {users&& users.length>0 &&} */}
  
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Age
                </th>
                <th scope="col" className="px-6 py-3">
                  City
                </th>
              </tr>
            </thead>
            <tbody>
              {dataProps.map((data) => {
                return (
                  <tr key={data.id}>
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {data.name}
                    </th>
                    <td className="px-6 py-4">{data.age}</td>
                    <td className="px-6 py-4">{data.city}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        )
      }


    </div>
  );
}
