import React, { Fragment, useState } from "react";
import useSubCategories from "./../../Hooks/useSubCategories";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";
import Loading from "../Loading/Loading";
import { useMutation } from "react-query";
import axios from "axios";
import { CREATE_NEW_ARTICLE } from "../../utilities/api";

const endpoint = "https://outgoing-yeti-60.hasura.app/v1/graphql";
const headers = {
  "content-type": "application/json",
  "x-hasura-admin-secret":
    "jATXg2oxueJpZ23gw3QNIDscVC97dwPnldO0H6sp19dy4Jp7uZDWoife1vhQXj89",
};

const AddArticle = () => {
  const [subCategories, isLoading] = useSubCategories();
  const [selected, setSelected] = useState({ name: "Select Sub Category!" });
  //console.log("Sub categories type", subCategories);

  const graphqlQuery = (title, content, sub_category_id) => {
    //console.log("query", title, content, sub_category_id);
    return {
      query: CREATE_NEW_ARTICLE,
      variables: { title, content, sub_category_id },
    };
  };

  const { mutate } = useMutation(
    ({ title, content, sub_category_id }) =>
      axios.post(endpoint, graphqlQuery(title, content, sub_category_id), {
        headers: headers,
      }),
    {
      onSettled: (data) => {
        //console.log("mutation", data);
      },
    }
  );

  const handleSubmit = (event) => {
    event.preventDefault();
    const title = event.target.title.value;
    const content = event.target.content.value;
    //console.log(selected.id, title, content);
    mutate({ title, content, sub_category_id: selected.id });

    // console.log(selected.id, title, content);

    event.target.reset();
  };

  const handleOnChange = (value) => {
    //console.log(value);
    setSelected(value);
  };

  return isLoading ? (
    <Loading></Loading>
  ) : (
    <div className="w-3/4 mx-auto">
      <h1 className="text-center text-2xl ">Add an Article</h1>
      <div className="w-1/2 mx-auto  mt-5">
        <form onSubmit={handleSubmit}>
          {/* dropdown */}
          <div className="w-full my-4 border-2 border-black rounded">
            <Listbox value={selected} onChange={handleOnChange}>
              <div className="relative mt-1">
                <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                  <span className="block truncate">{selected.name}</span>
                  <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                    <SelectorIcon
                      className="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </span>
                </Listbox.Button>
                <Transition
                  as={Fragment}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                    {subCategories.map((subCategory, subCategoryIdx) => (
                      <Listbox.Option
                        key={subCategoryIdx}
                        className={({ active }) =>
                          `relative cursor-default select-none py-2 pl-10 pr-4 ${
                            active
                              ? "bg-amber-100 text-amber-900"
                              : "text-gray-900"
                          }`
                        }
                        value={{ id: subCategory.id, name: subCategory.name }}
                      >
                        {({ selected }) => (
                          <>
                            <span
                              className={`block truncate ${
                                selected ? "font-medium" : "font-normal"
                              }`}
                            >
                              {subCategory.name}
                            </span>
                            {selected ? (
                              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                <CheckIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              </span>
                            ) : null}
                          </>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </Transition>
              </div>
            </Listbox>
          </div>
          <input
            type="text"
            name="title"
            className="w-full p-2 rounded border-2 border-black"
            placeholder="Type Your Article Title..."
          />
          <textarea
            name="content"
            cols="30"
            rows="10"
            className="w-full my-4 rounded p-2 border-2 border-black"
            placeholder="Type Your Article Content..."
          ></textarea>

          <button className="w-full py-2 bg-blue-500 rounded text-white">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddArticle;
