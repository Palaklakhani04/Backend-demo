import { ApplyLeaveReqInitialValue, ApplyLeaveRequestType, options, Options } from "@/lib/Types";
import { FormikHelpers } from "formik";
import React from "react";
import GenericForm from "./GenericForm";
import { LeaveSchema } from "@/lib/Validation";
import Select from "./Select";
import TextInput from "./TextInput";
import Button from "./Button";
import Link from "next/link";

const LeaveTypeOptions: options[] = [
    {value: "firstHalf", label: "FirstHalf"},
    {value: "secondeHalf", label: "secondeHalf"},
    {value: "fullDay", label: "FullDay"}
]

export default function ApplyLeaveForm({
  approverOption,
  onSubmit,
  initialValues,
  submitLabel = "submit Request",
}: {
    approverOption: options[];
    onSubmit: (payload: ApplyLeaveRequestType) => void | Promise<void>
    initialValues?:Partial<ApplyLeaveRequestType>
    submitLabel?:string;
}) {
  return( 
  <GenericForm<ApplyLeaveRequestType>
    initialValues={ApplyLeaveReqInitialValue}
    validationSchema={LeaveSchema}
    onSubmit={ async (values:ApplyLeaveRequestType) => {
        const payload: ApplyLeaveRequestType = {
            leaveType:values.leaveType as string,
            startDate: values.startDate,
            endDate:values.endDate,
            requestToId:values.requestToId,
            reason:values.reason
        }
        await onSubmit(payload)
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
            <TextInput name="startDate" type="date" label="Start Date"/>
            <TextInput name="endDate" type="date" label="End Date"/>
        </div>
        <Select 
            name="requestToId"
            label="Request To"
            options={approverOption}
        />
        <TextInput name="reason" type="text" label="Reason"/>
        <div className="flex gap-2">
            <Button type="submit">{submitLabel}</Button>
            <Link href="/dashaboard/student" className="rounded-lg border px-4 py-2 text-sm">
                cancel
            </Link>
        </div>
    </>
  </GenericForm>
);
}
