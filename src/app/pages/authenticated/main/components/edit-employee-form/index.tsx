import { useEffect, useState } from "react";
import { useUpdateEmployee } from "../../hooks/use-update-employee";
import { useGetDivisions } from "../../hooks/use-get-divisions";
import type { TProps } from "./type";
import { useNotification } from "../../../../../hooks/useNotification";
import type { TEmployeeValidationException } from "../../../../../../modules/employee/type";
import { EmployeeValidator } from "../../../../../../modules/employee/schema";
import { Label } from "../../../../../components/Label";
import { Input } from "../../../../../components/Input";
import { Button } from "../../../../../components/Button";
import { Select } from "../../../../../components/Select";

export const FormEditEmployee = ({ data, handleFinish }: TProps) => {
  const { mutate, isPending } = useUpdateEmployee(data?.id);
  const { show } = useNotification();

  const { data: divisionData } = useGetDivisions({});
  const divisions = divisionData?.data.divisions || [];

  const [form, setForm] = useState({
    name: "",
    phone: "",
    position: "",
    division: "",
    image: null as File | null,
  });

  const [errorField, setErrorField] = useState<TEmployeeValidationException>();

  useEffect(() => {
    if (data) {
      setForm({
        name: data.name,
        phone: data.phone,
        position: data.position,
        division: data.division.id,
        image: null,
      });
    }
  }, [data]);

  const handleUpdate = () => {
    const validate = EmployeeValidator.safeParse(form);

    if (!validate.success) {
      const error = validate.error.format();

      const isImageErrorOnly = form.image === null;

      setErrorField({
        division: error.division?._errors[0],
        image: isImageErrorOnly
          ? undefined
          : (error.image?._errors[0] as string),
        name: error.name?._errors[0],
        phone: error.phone?._errors[0],
        position: error.position?._errors[0],
      });
      if (error.name || error.phone || error.position || error.division) return;
    }

    if (!data) return;

    mutate(
      {
        payload: {
          division: form.division,
          image: form.image!,
          name: form.name,
          phone: form.phone,
          position: form.position,
        },
        id: data.id,
      },
      {
        onSuccess: () => {
          show(`Success update employee ${form.name}`, "success");
          handleFinish();
        },
        onError: (e: any) => {
          if (e.response?.data?.error) {
            const errorResponse = e.response.data.error;
            setErrorField({
              division: errorResponse.division?.[0],
              image: errorResponse.image?.[0],
              name: errorResponse.name?.[0],
              phone: errorResponse.phone?.[0],
              position: errorResponse.position?.[0],
            });
          }
        },
      },
    );
  };

  return (
    <div className="p-2 space-y-4 transition-color">
      <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">
        Edit Employee
      </h2>

      <div>
        <Label>Name</Label>
        <Input
          placeholder="Ex: John Doe"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          disabled={isPending}
          error={errorField?.name}
        />
      </div>

      <div>
        <Label>Phone</Label>
        <Input
          placeholder="Ex: 08123456789"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          disabled={isPending}
          error={errorField?.phone}
        />
      </div>

      <div>
        <Label>Position</Label>
        <Input
          placeholder="Ex: Software Engineer"
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
          placeholder="Select Division"
          items={divisions.map((d) => ({
            label: d.name,
            value: d.id,
            disable: false,
          }))}
        />
      </div>

      <div>
        <Label>Image (Optional)</Label>
        <div className="space-y-2">
          {!form.image && data?.image && (
            <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-2">
              <span>Current image:</span>
              <img
                src={data.image}
                alt="current"
                className="w-8 h-8 rounded-full object-cover border border-gray-200"
              />
              <span className="italic">(Upload new file to change)</span>
            </div>
          )}

          <Input
            type="file"
            accept="image/*"
            disabled={isPending}
            onChange={(e) =>
              setForm({
                ...form,
                image: e.target.files?.[0] ?? null,
              })
            }
            error={errorField?.image}
          />
        </div>
      </div>

      <Button
        onClick={handleUpdate}
        disabled={isPending}
        variant="primary"
        className="w-full mt-4"
      >
        {isPending ? "Updating..." : "Save Changes"}
      </Button>
    </div>
  );
};
