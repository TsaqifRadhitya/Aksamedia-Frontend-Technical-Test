import { useState } from "react";
import { useCreateEmployee } from "../../hooks/use-create-employee";
import { useGetDivisions } from "../../hooks/use-get-divisions";
import { Label } from "../../../../../components/Label";
import { Input } from "../../../../../components/Input";
import { Button } from "../../../../../components/Button";
import type { TEmployeeValidationException } from "../../../../../../modules/employee/type";
import { EmployeeValidator } from "../../../../../../modules/employee/schema";
import { useNotification } from "../../../../../hooks/useNotification";

export const CreateEmployeeForm = ({
  handleOnFinish,
}: {
  handleOnFinish: () => void;
}) => {
  const { data } = useGetDivisions({});
  const { mutate, isPending } = useCreateEmployee();
  const { show } = useNotification();

  const divisions = data?.data.divisions || [];

  const [form, setForm] = useState({
    name: "",
    phone: "",
    position: "",
    division: "",
    image: null as File | null,
  });

  const [errorField, setErrorField] = useState<TEmployeeValidationException>();

  const handleSubmit = () => {
    const validate = EmployeeValidator.safeParse(form);
    const error = validate.error?.format();
    setErrorField({
      division: error?.division?._errors[0],
      image: error?.image?._errors[0],
      name: error?.name?._errors[0],
      phone: error?.phone?._errors[0],
      position: error?.position?._errors[0],
    });
    if (!validate.success || form.image === null) return;
    mutate(
      {
        payload: {
          division: form.division,
          image: form.image,
          name: form.name,
          phone: form.phone,
          position: form.position,
        },
      },
      {
        onSuccess: () => {
          show(`Success add new employee ${form.name}`, "success");
          handleOnFinish();
        },
        onError: (e: any) => {
          const errorResponse: TEmployeeValidationException =
            e.response.data.error;
          const { division, image, name, phone, position } = errorResponse;
          setErrorField({
            division: division?.[0],
            image: image?.[0],
            name: name?.[0],
            phone: phone?.[0],
            position: position?.[0],
          });
        },
      },
    );
  };

  return (
    <div className="bg-white dark:bg-gray-900  dark:border-gray-800 rounded-xl shadow-sm p-2 space-y-2.5 transition-colors min-w-lg w-2/3">
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
        {errorField?.name && <Label variant="error">{errorField?.name}</Label>}
      </div>
      <div>
        <Label>Phone</Label>
        <Input
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          disabled={isPending}
        />
        {errorField?.phone && (
          <Label variant="error">{errorField?.phone}</Label>
        )}
      </div>
      <div>
        <Label>Position</Label>
        <Input
          value={form.position}
          onChange={(e) => setForm({ ...form, position: e.target.value })}
          disabled={isPending}
        />
        {errorField?.position && (
          <Label variant="error">{errorField?.position}</Label>
        )}
      </div>
      <div>
        <Label>Division</Label>
        <select
          value={form.division}
          onChange={(e) => setForm({ ...form, division: e.target.value })}
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
        {errorField?.division && (
          <Label variant="error">{errorField?.division}</Label>
        )}
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
        {errorField?.image && (
          <Label variant="error">{errorField?.image}</Label>
        )}
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
