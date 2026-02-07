import { useState } from "react";
import type { TEmployee } from "../../../../modules/employee/type";
import { Button } from "../../../components/Button";
import { ModalTrigger } from "../../../components/Modal";
import { useGetEmployees } from "../employee/hooks/use-get-employee";
import { CreateEmployeeForm } from "./components/create-employee-form";

export default function Page() {
  const { data, isLoading } = useGetEmployees({});

  const employees: TEmployee[] = data?.data.employee || [];
  const pagination = data?.pagination;

  const [isOpenCreateForm, seOpenCreateForm] = useState<boolean>(false);

  return (
    <div className="flex flex-col items-center justify-center gap-y-2.5 h-[90vh] max-w-7xl w-full ">
      <ModalTrigger
        isOpen={isOpenCreateForm}
        onClose={() => seOpenCreateForm(false)}
        TriggerComponent={
          <Button
            variant="primary"
            onClick={() => seOpenCreateForm(true)}
            className="ml-auto"
          >
            Add Employee
          </Button>
        }
      >
        <CreateEmployeeForm />
      </ModalTrigger>
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-sm overflow-hidden transition-colors max-w-7xl w-full">
        <div className="p-4 border-b border-gray-200 dark:border-gray-800 flex justify-between items-center max-w-5xl">
          <h1 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
            Employees
          </h1>
          {pagination && (
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {pagination.from}-{pagination.to} of {pagination.total}
            </span>
          )}
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-300">
              <tr>
                <th className="px-4 py-3 text-left font-medium">Employee</th>
                <th className="px-4 py-3 text-left font-medium">Phone</th>
                <th className="px-4 py-3 text-left font-medium">Division</th>
                <th className="px-4 py-3 text-left font-medium">Position</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-800 h-[50vh]">
              {isLoading && (
                <tr>
                  <td
                    colSpan={4}
                    className="text-center py-6 text-gray-500 dark:text-gray-400"
                  >
                    Loading employees...
                  </td>
                </tr>
              )}
              {!isLoading && employees.length === 0 && (
                <tr>
                  <td
                    colSpan={4}
                    className="text-center py-6 text-gray-500 dark:text-gray-400"
                  >
                    No employees found.
                  </td>
                </tr>
              )}
              {!isLoading &&
                employees.map((employee) => (
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
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        {pagination && (
          <div className="p-4 border-t border-gray-200 dark:border-gray-800 text-sm text-gray-500 dark:text-gray-400 flex justify-between">
            <span>
              Page {pagination.current_page} of {pagination.last_page}
            </span>
            <span>Total: {pagination.total}</span>
          </div>
        )}
      </div>
    </div>
  );
}
