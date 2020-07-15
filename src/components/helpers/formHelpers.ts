import { ReactNode, isValidElement } from "react";
import Input, { InputType } from "../Input";

export function isValidInputNode(child: ReactNode): child is InputType {
    if (!isValidElement(child)) return false;

    if (child.type !== Input) {
        console.warn("<Form/>: only 'Input' allowed. Child will be ignored.");
        return false;
    }

    return true;
}

export function getInitialData<T extends {}>(children: InputType[]): T {
    const initialData = Object.create(null);

    children.forEach(c => {
        initialData[c.props.name] = "";
    });

    return initialData;
};
