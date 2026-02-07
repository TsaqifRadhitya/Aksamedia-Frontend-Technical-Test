import { useState } from "react";
import { useCreateEmployee } from "../../../employee/hooks/use-create-employee";
import { useGetDivisions } from "../../../employee/hooks/use-get-divisions";
import { Label } from "../../../../../components/Label";
import { Input } from "../../../../../components/Input";
import { Button } from "../../../../../components/Button";

export const CreateEmployeeForm = () => {
  const { data } = useGetDivisions({});
  const { mutate, isPending } = useCreateEmployee();

  const divisions = data?.data.divisions || [];

  const [form, setForm] = useState({
    name: "",
    phone: "",
    position: "",
    division_id: "",
    image: null as File | null,
  });

  const handleSubmit = () => {
    if (!form.name || !form.phone || !form.division_id || form.image == null)
      return;

    mutate({
      payload: {
        division_id: form.division_id,
        image: form.image,
        name: form.name,
        phone: form.phone,
        position: form.position,
      },
    });
  };

  return (
    <div className="bg-white dark:bg-gray-900  dark:border-gray-800 rounded-xl shadow-sm p-2 space-y-5 transition-colors min-w-lg w-2/3">
      <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
        Create Employee
      </h2>

      <div>
        <Label>Name</Label>
        <Input
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          disabled={isPending}
        />
      </div>
      <div>
        <Label>Phone</Label>
        <Input
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          disabled={isPending}
        />
      </div>
      <div>
        <Label>Position</Label>
        <Input
          value={form.position}
          onChange={(e) => setForm({ ...form, position: e.target.value })}
          disabled={isPending}
        />
      </div>
      <div>
        <Label>Division</Label>
        <select
          value={form.division_id}
          onChange={(e) => setForm({ ...form, division_id: e.target.value })}
          disabled={isPending}
          className="w-full px-3 py-2 border rounded-md bg-white dark:bg-gray-800 
                     border-gray-300 dark:border-gray-700 
                     text-gray-800 dark:text-gray-200
                     focus:outline-none focus:ring-2 focus:ring-green-500 transition"
        >
          <option value="">Select Division</option>
          {divisions.map((division: any) => (
            <option key={division.id} value={division.id}>
              {division.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <Label>Image</Label>
        <input
          type="file"
          accept="image/*"
          disabled={isPending}
          onChange={(e) =>
            setForm({
              ...form,
              image: e.target.files?.[0] ?? null,
            })
          }
          className="w-full text-sm text-gray-600 dark:text-gray-300"
        />
      </div>

      <Button
        onClick={handleSubmit}
        disabled={isPending}
        variant="primary"
        className="w-full"
      >
        {isPending ? "Creating..." : "Create Employee"}
      </Button>
    </div>
  );
};
