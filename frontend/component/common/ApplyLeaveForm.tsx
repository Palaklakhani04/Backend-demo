import {
  ApplyLeaveReqInitialValue,
  ApplyLeaveRequestType,
  options,
  Options,
} from "@/lib/Types";
import { FormikHelpers } from "formik";
import React from "react";
import GenericForm from "./GenericForm";
import { LeaveSchema } from "@/lib/Validation";
import Select from "./Select";
import TextInput from "./TextInput";
import Button from "./Button";
import Link from "next/link";
import { studentApplyLeave } from "@/services/services";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const LeaveTypeOptions: options[] = [
  { value: "firstHalf", label: "First Half" },
  { value: "secondHalf", label: "Seconde Half" },
  { value: "fullDay", label: "Full Day" },
];

export default function ApplyLeaveForm({
  approverOption,
  initialValues,
  submitLabel = "submit Request",
}: {
  approverOption: options[];
  initialValues?: Partial<ApplyLeaveRequestType>;
  submitLabel?: string;
}) {
  const router = useRouter();
  return (
    <GenericForm<ApplyLeaveRequestType>
      initialValues={ApplyLeaveReqInitialValue}
      validationSchema={LeaveSchema}
      onSubmit={async (values: ApplyLeaveRequestType, formikHelpers) => {
        if (
          (values.leaveType === "firstHalf" ||
            values.leaveType === "secondeHalf") &&
          values.startDate !== values.endDate
        ) {
          toast.error("half Day leave is valide for same day only");
        }
        if (values.startDate > values.endDate) {
          toast.error("Invalide date");
        }
        const studentLeave = await studentApplyLeave(values);
        if (!studentLeave) {
          toast.error("Error in Leave Request.");
        } else {
          toast.success("Leave request successfully send.");
        }
        if (!formikHelpers) return;
        const { resetForm } = formikHelpers;
        resetForm();
      }}
      className="space-y-4"
    >
      <>
        <Select
          name="leaveType"
          label="Leave Type"
          options={LeaveTypeOptions}
        />
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <TextInput name="startDate" type="date" label="Start Date" />
          <TextInput name="endDate" type="date" label="End Date" />
        </div>
        <Select
          name="requestToId"
          label="Request To"
          options={approverOption}
        />
        <TextInput name="reason" type="text" label="Reason" />
        <div className="flex gap-2">
          <Button type="submit" onClick={() => router.back()}>{submitLabel}</Button>
          <Button
            type="button"
            onClick={() => router.back()}
            className="rounded-lg border px-4 py-2 text-sm"
          >
            Back
          </Button>
        </div>
      </>
    </GenericForm>
  );
}
