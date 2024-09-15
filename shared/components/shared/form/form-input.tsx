import React from "react";
import { useFormContext } from "react-hook-form";
import { RequiredSymbol } from "../required-symbol";
import { Input } from "@/shared/components/ui/input";
import { ClearButton } from "../clear-button";
import { ErrorText } from "../error-text";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
	name: string;
	label?: string;
	required?: boolean;
	className?: string;
}

export const FormInput: React.FC<Props> = ({ className, name, label, required, ...props }) => {
	const {
		register,
		formState: { errors },
		watch,
		setValue,
	} = useFormContext();

	const errorText = errors?.[name]?.message as string;
	const text = watch(name);

	const onClickClear = () => {
		setValue(name, "", { shouldValidate: true });
	};

	return (
		<div className={className}>
			{label && (
				<p className="font-medium mb-2">
					{label} {required && <RequiredSymbol />}
				</p>
			)}

			<div className="relative">
				<Input className="h-12 text-md" {...register(name)} {...props} />
				{text && <ClearButton onClick={onClickClear} />}
			</div>

			{errorText && <ErrorText text={errorText} className="mt-2" />}
		</div>
	);
};
