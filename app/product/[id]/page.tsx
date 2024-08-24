import React from "react";

interface Props {
	params: {
		id: string;
	}
}

export const Page: React.FC<Props> = ({ params: { id } }: Props) => {
	return (
		<div> Product: {id} </div>
	);
};

export default Page;

