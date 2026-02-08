import { useState } from "react";
import { useCreateEmployee } from "../../hooks/use-create-employee";
import { useGetDivisions } from "../../hooks/use-get-divisions";
import { Label } from "../../../../../components/Label";
import { Input } from "../../../../../components/Input";
import { Button } from "../../../../../components/Button";
import type { TEmployeeValidationException } from "../../../../../../modules/employee/type";
import { EmployeeValidator } from "../../../../../../modules/employee/schema";
import { useNotification } from "../../../../../hooks/useNotification";
import { Select } from "../../../../../components/Select";

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
      image: error?.image?._errors[0] as string,
      name: error?.name?._errors[0],
      phone: error?.phone?._errors[0],
      position: error?.position?._errors[0],
    });
    if (!validate.success || form.image === null) return;
    mutate(
      {
        payload: {
          division: form.division,
          image: form.image!,
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
    <div className="p-2 space-y-4 transition-color">
      <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">
        Create Employee
      </h2>

      <div>
        <Label>Name</Label>
        <Input
          placeholder="Ex: John Doe" // Placeholder
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          disabled={isPending}
          error={errorField?.name}
        />
      </div>

      <div>
        <Label>Phone</Label>
        <Input
          placeholder="Ex: 08123456789" // Placeholder
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          disabled={isPending}
          error={errorField?.phone}
        />
      </div>

      <div>
        <Label>Position</Label>
        <Input
          placeholder="Ex: Software Engineer" // Placeholder
          value={form.position}
          onChange={(e) => setForm({ ...form, position: e.target.value })}
          disabled={isPending}
          error={errorField?.position}
        />
      </div>

      <div>
        <Label>Division</Label>
        <Select
          disabled={isPending}
          onChange={(e) => setForm({ ...form, division: e.target.value })}
          value={form.division}
          error={errorField?.division}
          placeholder="Select Division" // Placeholder dipindah ke props component
          items={divisions.map((d) => ({
            label: d.name,
            value: d.id,
            disable: false,
          }))}
        />
      </div>

      <div>
        <Label>Image</Label>
        <Input
          type="file"
          accept="image/*"
          disabled={isPending}
          onChange={(e) => {
            setForm({
              ...form,
              image: e.target.files?.[0] ?? null,
            });
          }}
          error={errorField?.image}
        />
      </div>

      <Button
        onClick={handleSubmit}
        disabled={isPending}
        variant="primary"
        className="w-full mt-4"
      >
        {isPending ? "Creating..." : "Create Employee"}
      </Button>
    </div>
  );
};
