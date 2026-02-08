import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import type { TEmployee } from "../../../../modules/employee/type";
import { Button } from "../../../components/Button";
import { ModalTrigger } from "../../../components/Modal";
import { useGetEmployees } from "./hooks/use-get-employee";
import { CreateEmployeeForm } from "./components/create-employee-form";
import {
  Edit2Icon,
  Trash2Icon,
  ChevronLeftIcon,
  ChevronRightIcon,
  SearchIcon,
} from "lucide-react";
import { Input } from "../../../components/Input";
import { ConfirmDeleteEmployeeModal } from "./components/modal-delete";
import { Select } from "../../../components/Select";
import { useGetDivisions } from "./hooks/use-get-divisions";
import { FormEditEmployee } from "./components/edit-employee-form";

export default function Page() {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const search = searchParams.get("name") || "";
  const division_id = searchParams.get("division") || "";
  const [searchInput, setSearchInput] = useState(search);

  useEffect(() => {
    setSearchInput(search);
  }, [search]);

  const [isOpenCreateForm, seOpenCreateForm] = useState<boolean>(false);
  const [onActionData, setOnActionData] = useState<{
    data: TEmployee;
    action: "edit" | "delete";
  }>();

  const { data: divisionsData } = useGetDivisions({});

  const divisionSelectItems = useMemo(
    () =>
      divisionsData?.data.divisions.map((dv) => ({
        value: dv.id,
        label: dv.name,
        disable: false,
      })) || [],
    [divisionsData],
  );

  const { data, isLoading } = useGetEmployees({
    page: page,
    perpage: 10,
    name: search,
    division_id: division_id,
  });

  const employeeData = useMemo(() => {
    return {
      data: data?.data.employees || [],
      pagination: data?.pagination,
    };
  }, [data]);

  const updateParams = (key: string, value: string | number) => {
    const newParams = new URLSearchParams(searchParams);

    if (value) {
      newParams.set(key, String(value));
    } else {
      newParams.delete(key);
    }

    if (["name", "division_id"].includes(key)) {
      newParams.set("page", "1");
    }

    setSearchParams(newParams);
  };

  const handleNextPage = () => {
    if (employeeData.pagination && page < employeeData.pagination.last_page) {
      updateParams("page", page + 1);
    }
  };

  const handlePrevPage = () => {
    if (page > 1) {
      updateParams("page", page - 1);
    }
  };

  const handleSearch = () => {
    updateParams("name", searchInput);
  };

  const handleChangeDivision = (id: string) => {
    updateParams("division", id);
  };

  return (
    <div className="flex flex-col items-center justify-center gap-y-5 h-[80vh] max-w-7xl w-full mt-15 pt-10">
      <div className="flex flex-col md:flex-row justify-between w-full items-center shrink-0 gap-4">
        <h1 className="font-bold text-black dark:text-white text-xl lg:text-3xl text-left w-full lg:w-fit">
          List Employee
        </h1>

        <div className="flex items-center gap-3 ml-auto">
          <ModalTrigger
            isOpen={isOpenCreateForm}
            onClose={() => seOpenCreateForm(false)}
            TriggerComponent={
              <Button variant="primary" onClick={() => seOpenCreateForm(true)}>
                Add Employee
              </Button>
            }
          >
            <CreateEmployeeForm
              handleOnFinish={() => seOpenCreateForm(false)}
            />
          </ModalTrigger>
        </div>
      </div>
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-sm overflow-hidden transition-colors max-w-7xl w-full flex flex-col flex-1 min-h-0">
        <div className="p-4 border-b border-gray-200 dark:border-gray-800 flex justify-between items-center shrink-0 flex-col-reverse md:flex-row gap-y-2.5">
          <div className="items-center flex gap-2.5 w-full lg:w-fit">
            <div className="relative group">
              <Input
                type="text"
                placeholder="Search by name..."
                className="pl-10 pr-4 py-2.5 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400 dark:text-white w-64"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              />
              <SearchIcon
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={16}
              />
            </div>
            <Select
              items={[
                { label: "Select Division", value: "", disable: true },
                ...divisionSelectItems,
              ]}
              className="w-40"
              value={division_id}
              onChange={(e) => handleChangeDivision(e.target.value)}
            />
          </div>
          {employeeData.pagination && (
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Showing {employeeData.pagination.from} to{" "}
              {employeeData.pagination.to || 0} of{" "}
              {employeeData.pagination.total} entries
            </span>
          )}
        </div>

        <div className="overflow-auto flex-1">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-300 sticky top-0 shadow-sm">
              <tr>
                <th className="px-4 py-3 text-left font-medium">Employee</th>
                <th className="px-4 py-3 text-left font-medium">Phone</th>
                <th className="px-4 py-3 text-left font-medium">Division</th>
                <th className="px-4 py-3 text-left font-medium">Position</th>
                <th className="px-4 py-3 text-left font-medium">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
              {isLoading && (
                <tr>
                  <td
                    colSpan={5}
                    className="text-center py-6 text-gray-500 dark:text-gray-400"
                  >
                    Loading employees...
                  </td>
                </tr>
              )}
              {!isLoading && employeeData.data.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="text-center py-6 text-gray-500 dark:text-gray-400"
                  >
                    {search && search !== ""
                      ? ` No employees found matching "${search}".`
                      : "No employees found"}
                  </td>
                </tr>
              )}
              {!isLoading &&
                employeeData.data.map((employee) => (
                  <tr
                    key={employee.id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-800 transition"
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={employee.image}
                          alt={employee.name}
                          className="w-10 h-10 rounded-full object-cover border border-gray-200 dark:border-gray-700"
                        />
                        <span className="text-gray-800 dark:text-gray-200 font-medium">
                          {employee.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-gray-600 dark:text-gray-300">
                      {employee.phone}
                    </td>
                    <td className="px-4 py-3 text-gray-600 dark:text-gray-300">
                      {employee.division?.name}
                    </td>
                    <td className="px-4 py-3 text-gray-600 dark:text-gray-300">
                      {employee.position}
                    </td>
                    <td>
                      <div className="flex items-center gap-2.5">
                        <ModalTrigger
                          isOpen={onActionData?.action === "edit"}
                          onClose={() => setOnActionData(undefined)}
                          TriggerComponent={
                            <Button
                              variant="secondary"
                              className="aspect-square p-2.5"
                              onClick={() =>
                                setOnActionData({
                                  data: employee,
                                  action: "edit",
                                })
                              }
                            >
                              <Edit2Icon size={15} />
                            </Button>
                          }
                        >
                          <FormEditEmployee
                            handleFinish={() => setOnActionData(undefined)}
                            data={onActionData?.data}
                          />
                        </ModalTrigger>
                        <ModalTrigger
                          isOpen={onActionData?.action === "delete"}
                          className="w-1/3"
                          bgClassName="bg-black/10"
                          onClose={() => setOnActionData(undefined)}
                          TriggerComponent={
                            <Button
                              variant="danger"
                              className="aspect-square p-2.5"
                              onClick={() =>
                                setOnActionData({
                                  data: employee,
                                  action: "delete",
                                })
                              }
                            >
                              <Trash2Icon size={15} />
                            </Button>
                          }
                        >
                          <ConfirmDeleteEmployeeModal
                            handleFinish={() => setOnActionData(undefined)}
                            data={onActionData?.data}
                          />
                        </ModalTrigger>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        {employeeData.pagination && (
          <div className="p-4 border-t border-gray-200 dark:border-gray-800 text-sm text-gray-500 dark:text-gray-400 flex justify-between items-center shrink-0 bg-white dark:bg-gray-900 relative">
            <span className="hidden sm:inline">
              Page {employeeData.pagination.current_page} of{" "}
              {employeeData.pagination.last_page}
            </span>

            <div className="flex items-center gap-2 ml-auto sm:ml-0 w-full sm:w-auto justify-between sm:justify-end">
              <Button
                variant="bordered"
                onClick={handlePrevPage}
                disabled={page === 1 || isLoading}
                className="flex items-center gap-1 text-xs px-3 py-1.5"
              >
                <ChevronLeftIcon size={16} />
                Previous
              </Button>

              <span className="sm:hidden text-xs">
                {employeeData.pagination.current_page} /{" "}
                {employeeData.pagination.last_page}
              </span>

              <Button
                variant="bordered"
                onClick={handleNextPage}
                disabled={
                  page === employeeData.pagination.last_page || isLoading
                }
                className="flex items-center gap-1 text-xs px-3 py-1.5"
              >
                Next
                <ChevronRightIcon size={16} />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
