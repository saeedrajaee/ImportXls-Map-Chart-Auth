"use client";

import { createLibrary } from "../../../action/docs.api";
import { Button } from "@/common/ui/Button";
import { Input } from "@/common/ui/Input";
import Label from "@/common/ui/Label";
import { useFormState } from "react-dom";
import CustomFileInput from "@/common/ui/CustomFileInput";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useState } from "react";

const AddLibrary = ({ searchParams }) => {
  const { errorMessage } = searchParams;
  const [fileName, setFileName] = useState("");

  return (
    <div>
      <h1 className="text-3xl font-semibold p-2"> Add GCP </h1>

      <form
        className="grid gap-x-6 gap-y-10 mt-10 grid-cols-2 px-2"
        action={async (formData) => {
          const response = await createLibrary(formData);
        }}
      >
        {errorMessage && (
          <div className="col-span-2 border border-red-500 rounded-xl px-5 py-3 bg-red-50 w-fit">
            <span className="text-red-500 col-span-2 text-mg my-0 font-500">
              {errorMessage}
            </span>
          </div>
        )}

        <div className="grid gap-2">
          <Label required={true}>Document Name</Label>
          <Input placeholder="Enter Document Name" name="name" />
        </div>
        <div className="grid gap-2">
          <Label required={true}>Description</Label>
          <textarea
            id="message"
            rows="4"
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Enter Document Description"
            name="description"
          ></textarea>
        </div>

        <div className="grid gap-2">
          <Label required={true}>
            Upload File (.jpeg |.tiff |.png |.pdf |.doc)
          </Label>
          <CustomFileInput name="image" />
        </div>

        <Button className="w-52 col-span-2 mt-2">Submit</Button>
      </form>
    </div>
  );
};

export default AddLibrary;

// export default function AddDoc({ searchParams }) {
//   const { errorMessage } = searchParams;
//   const [state, formAction] = useFormState(createDoc, { error: "" });

//   return (
//     <div>
//       <h1 className="text-3xl font-semibold p-2"> Add Document </h1>

//       <form
//         className="grid gap-x-6 gap-y-10 mt-10 grid-cols-2 px-2"
//         action={formAction}
//       >
//         {errorMessage && (
//           <div className="col-span-2 border border-red-500 rounded-xl px-5 py-3 bg-red-50 w-fit">
//             <span className="text-red-500 col-span-2 text-mg my-0 font-500">
//               {errorMessage}
//             </span>
//           </div>
//         )}
//         <div className="grid gap-2">
//           <Label required={true}>Document Name</Label>
//           <Input placeholder="Enter Document Name" name="name" />
//         </div>
//         <div className="grid gap-2">
//           <Label required={true}>Description</Label>
//           <textarea
//             id="message"
//             rows="4"
//             className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//             placeholder="Enter Document Description"
//             name="description"
//           ></textarea>
//         </div>
//         <div className="grid gap-2">
//           <Label required={true}>
//             Upload File (.jpeg |.tiff |.png |.pdf |.doc)
//           </Label>
//           <CustomFileInput name="uploadFile"  />
//         </div>
//         <div className="grid gap-2"></div>
//         <Button className="w-52 col-span-2 mt-2">Submit</Button>
//       </form>
//     </div>
//   );
// }
