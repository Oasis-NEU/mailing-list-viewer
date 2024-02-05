import { useState } from "react";
import { supabase } from "../initSupabase";
import {
  faPlus,
  faRotate,
  faPaperPlane,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Email } from "../types/Email";
import twMerge from "../twMerge";
import { downloadMailingList } from "../utils";

interface Props {
  rows: Email[];
  loadingRows: boolean;
  retrieveAll: () => {};
}

export default function ListViewer({ rows, loadingRows, retrieveAll }: Props) {
  const [loadingInsert, setLoadingInsert] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);

  const [newEmail, setNewEmail] = useState<string>("");

  const handleInsertRow = () => {
    setLoadingInsert(true);
    console.log(newEmail);
    insertRow();
    setLoadingInsert(false);
    retrieveAll();
    setShowModal(false);
    setNewEmail("");
  };

  const insertRow = async () => {
    await supabase
      .from("emails")
      .insert([{ email: newEmail, source: "manual" }])
      .select();
  };

  const removeEmail = async (email: Email) => {
    const { error } = await supabase
      .from("emails")
      .delete()
      .eq("email", email.email);

    if (!error) {
      retrieveAll();
    }
  };

  const download = () => {
    downloadMailingList(rows);
  };

  return (
    <div className="relative min-w-full min-h-screen bg-oasis-extra-light">
      <div className="p-4">
        <div className="flex flex-row items-center justify-between mb-2 sticky top-2 z-10 bg-oasis-light p-2 shadow-lg rounded-md">
          <a
            href="https://supabase.com/dashboard/project/ndixenzakynjwwijdjti/database/tables"
            className="hover:underline"
          >
            <h1 className="text-2xl mb-2 ">Oasis Mailing List</h1>
          </a>
          <div className="flex flex-row gap-4">
            <button title="Insert Row" onClick={() => setShowModal(true)}>
              <FontAwesomeIcon
                className={twMerge(
                  "text-oasis-green shadow-sm hover:shadow-md hover:bg-oasis-green-pastel transition-all duration-300 bg-oasis-extra-light  p-2 rounded-full active:text-oasis-dark h-4 w-4 flex justify-center items-center",
                  loadingRows ? "animate-spin" : ""
                )}
                icon={faPlus}
              />
            </button>
            <button title="Reload" onClick={() => retrieveAll()}>
              <FontAwesomeIcon
                className={twMerge(
                  "text-oasis-green shadow-sm hover:shadow-md hover:bg-oasis-green-pastel transition-all duration-300 bg-oasis-extra-light  p-2 rounded-full active:text-oasis-dark h-4 w-4 flex justify-center items-center",
                  loadingRows ? "animate-spin" : ""
                )}
                icon={faRotate}
              />
            </button>
            <button title="Download" onClick={() => download()}>
              <FontAwesomeIcon
                className={twMerge(
                  "text-oasis-green shadow-sm hover:shadow-md hover:bg-oasis-green-pastel transition-all duration-300 bg-oasis-extra-light  p-2 rounded-full active:text-oasis-dark h-4 w-4 flex justify-center items-center",
                  loadingRows ? "animate-spin" : ""
                )}
                icon={faPaperPlane}
              />
            </button>
          </div>
        </div>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 ">
            <thead className="text-xs text-gray-700 uppercase font-bold bg-gray-50  ">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Email
                </th>
                <th scope="col" className="px-6 py-3">
                  Date
                </th>
                <th></th>
              </tr>
            </thead>
            <tbody className="">
              {rows
                .sort((lhs: Email, rhs: Email) => {
                  if (lhs.created_at < rhs.created_at) {
                    return 1;
                  } else if (lhs.created_at === rhs.created_at) {
                    return 1;
                  } /* lhs.created_at > rhs.created_at */ else {
                    return -1;
                  }
                })
                .map((e: Email, i: number) => (
                  <tr className="bg-white border-b  " key={i}>
                    <th className="px-6 py-4 text-gray-900">{e.email}</th>
                    <td className="px-6 py-4 font-medium whitespace-nowrap ">
                      {
                        new Date(
                          e.created_at
                        ).toDateString() /*.toDateString()*/
                      }
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => removeEmail(e)}
                        className="font-medium text-red-300 hover:text-red-500 hover:underline transition-all duration-300"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
      <div
        className={twMerge(
          "fixed flex items-center justify-center top-0 left-0 w-screen h-screen bg-oasis-gray bg-opacity-25",
          showModal ? "" : "hidden"
        )}
      >
        <div className="bg-oasis-extra-light  rounded-md shadow-xl flex flex-col w-full max-w-sm">
          <div className="flex flex-row gap-2 p-4">
            <div className="">
              <FontAwesomeIcon
                icon={faPlus}
                className="text-oasis-yellow p-2 bg-oasis-yellow-pastel bg-opacity-25 w-4 h-4 rounded-full"
              />
            </div>
            <div className="w-full">
              <div className="pr-4">
                <h3 className="mt-1 text-oasis-blue ">Insert Email</h3>
                <input
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleInsertRow();
                    }
                  }}
                  type="email"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  placeholder="oasisneu@gmail.com"
                  className="p-2 bg-oasis-extra-light rounded-lg ring-2 mt-2 w-full outline-oasis-yellow ring-oasis-yellow-pastel ring-opacity-50 "
                />
              </div>
            </div>
          </div>
          <div className="bg-oasis-light  p-4 flex flex-row justify-end gap-4">
            <button
              className="bg-oasis-yellow-pastel  hover:bg-oasis-yellow p-2 px-4 rounded-md shadow-sm transition-all duration-300"
              onClick={() => handleInsertRow()}
            >
              <div className="relative">
                <div className="flex flex-row items-center justify-center ">
                  Insert
                </div>
                <div
                  className={twMerge(
                    "absolute top-0 bottom-0 left-0 right-0",
                    loadingInsert ? "" : "hidden"
                  )}
                >
                  <FontAwesomeIcon className="animate-spin" icon={faSpinner} />
                </div>
              </div>
            </button>
            <button
              onClick={() => setShowModal(false)}
              type="button"
              className="hover:text-oasis-blue  text-oasis-gray transition-all duration-300"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
