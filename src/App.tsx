import { useEffect, useState } from "react";
import { supabase } from "./initSupabase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faRotate, faSpinner } from "@fortawesome/free-solid-svg-icons";
import twMerge from "./twMerge";
import { Email } from "../types/Email";

function App() {
  const [loadingRows, setLoadingRows] = useState<boolean>(false);
  const [loadingInsert, setLoadingInsert] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [rows, setRows] = useState<Array<Email>>([]);
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

  const retrieveAll = async () => {
    const { data, error } = await supabase.from("emails").select("*");

    if (!error) {
      setRows(data);
    }
    return;
  };

  const insertRow = async () => {
    const { data, error } = await supabase
      .from("emails")
      .insert([{ email: newEmail }])
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

  useEffect(() => {
    setLoadingRows(true);
    retrieveAll();
    setLoadingRows(false);
  }, []);

  return (
    <div className="relative min-w-full min-h-screen bg-oasis-extra-light dark:bg-oasis-extra-dark">
      <div className="p-4">
        <div className="flex flex-row items-center justify-between mb-2">
          <a
            href="https://supabase.com/dashboard/project/ndixenzakynjwwijdjti/database/tables"
            className="hover:underline"
          >
            <h1 className="text-2xl mb-2 dark:text-oasis-green-pastel">
              Oasis Mailing List
            </h1>
          </a>
          <div className="flex flex-row gap-4">
            <button onClick={() => setShowModal(true)}>
              <FontAwesomeIcon
                className={twMerge(
                  "text-oasis-green shadow-sm hover:shadow-md hover:bg-oasis-green-pastel transition-all duration-300 bg-oasis-light dark:bg-oasis-dark p-2 rounded-full active:text-oasis-dark h-4 w-4 flex justify-center items-center",
                  loadingRows ? "animate-spin" : ""
                )}
                icon={faPlus}
              />
            </button>
            <button onClick={() => retrieveAll()}>
              <FontAwesomeIcon
                className={twMerge(
                  "text-oasis-green shadow-sm hover:shadow-md hover:bg-oasis-green-pastel transition-all duration-300 bg-oasis-light dark:bg-oasis-dark p-2 rounded-full active:text-oasis-dark h-4 w-4 flex justify-center items-center",
                  loadingRows ? "animate-spin" : ""
                )}
                icon={faRotate}
              />
            </button>
          </div>
        </div>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase font-bold bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
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
            <tbody>
              {rows.map((e: Email, i: number) => (
                <tr
                  className="bg-white border-b dark:bg-gray-900 dark:border-gray-700"
                  key={i}
                >
                  <th className="px-6 py-4 text-gray-900">{e.email}</th>
                  <td
                    scope="row"
                    className="px-6 py-4 font-medium whitespace-nowrap dark:text-white"
                  >
                    {e.created_at.toLocaleString()}
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
          "absolute flex items-center justify-center top-0 bottom-0 left-0 right-0 bg-oasis-gray bg-opacity-25",
          showModal ? "" : "hidden"
        )}
      >
        <div className="bg-oasis-extra-light dark:bg-oasis-extra-dark rounded-md shadow-xl flex flex-col w-full max-w-sm">
          <div className="flex flex-row gap-2 p-4">
            <div className="">
              <FontAwesomeIcon
                icon={faPlus}
                className="text-oasis-yellow p-2 bg-oasis-yellow-pastel bg-opacity-25 w-4 h-4 rounded-full"
              />
            </div>
            <div className="w-full">
              <div className="pr-4">
                <h3 className="mt-1 text-oasis-blue dark:text-oasis-yellow-pastel">
                  Insert Email
                </h3>
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
                  className="p-2 bg-oasis-extra-light rounded-lg ring-2 mt-2 w-full outline-oasis-yellow ring-oasis-yellow-pastel ring-opacity-50 dark:bg-oasis-dark dark:text-oasis-light"
                />
              </div>
            </div>
          </div>
          <div className="bg-oasis-light dark:bg-oasis-dark p-4 flex flex-row justify-end gap-4">
            <button
              className="bg-oasis-yellow-pastel dark:bg-oasis-green dark:hover:bg-oasis-blue hover:bg-oasis-yellow p-2 px-4 rounded-md shadow-sm transition-all duration-300"
              onClick={() => handleInsertRow()}
            >
              <div className="relative">
                <div className="flex flex-row items-center justify-center dark:text-oasis-light">
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
              className="hover:text-oasis-blue dark:hover:text-oasis-light text-oasis-gray transition-all duration-300"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
