import React, { Component, Children, cloneElement } from 'react';
import { InputType } from './Input';
import { isValidInputNode, getInitialData } from './helpers/formHelpers';

export interface IFormData { [key: string]: string; }

type FormProps<T> = React.PropsWithChildren<IFormProps<T>>;
type ValidationFn = (value: string) => boolean;
type Validation<T> = ValidationFn | {
    [K in keyof Partial<T>]: ValidationFn;
};

interface IFormProps<T> {
    onSubmit?: (data: T) => void;
    validation?: Validation<T>;
}

export default class Form<T extends IFormData> extends Component<FormProps<T>> {
    public readonly state: T;

    private get initialData(): T { return getInitialData<T>(this.children); }
    private get children(): InputType[] {
        return Children.toArray(this.props.children).filter(isValidInputNode);
    };

    public constructor(props: FormProps<T>) {
        super(props);
        this.state = this.initialData;
    }
    
    private getState(): T {
        if (Object.keys(this.state).length === 0) return this.initialData;
        return this.state;
    }

    private onUpdate(key: string, value: string) {
        this.setState(state => ({ ...state, [key]: value }));
    };

    private validate(key: string, value: string): boolean {
        const { validation } = this.props;
        const val = validation && (
            typeof(validation) === 'function' ? validation : validation[key]
        );

        return val ? val(value) : true;
    };

    private onSubmitData = (event: React.FormEvent) => {
        event.preventDefault();

        const { onSubmit } = this.props;
        if (!onSubmit) {
            console.warn("<Form/>: prop 'onSubmit' was not defined.")
            return;
        };

        onSubmit(this.getState());
        this.setState(this.initialData);
    };

    private getEnhancedChild = (child: InputType) => {
        const props = child.props;
        const { name } = props;
 
        if (props.onChange) {
            console.warn(`<Form/>: '${name}' - 'onChange' property will be overridden.`);
        }

        const value = this.getState()[name];
        const onChange = (event: any) => this.onUpdate(name, event.target.value);

        const children = Children.toArray(props.children);
        children.push((
            <span>{!this.validate(name, value) && '* Invalid value'}</span>
        ));

        return cloneElement(
            child,
            { ...props, value, onChange },
            ...children,
        );
    };

    private checkDisabled(): boolean {
        const state = this.getState();
        return !Object.keys(state)
            .every(key => this.validate(key, state[key]))
    };

    public render() {
        const children = this.children;
        return (
            <form onSubmit={this.onSubmitData}>
                {children.map(this.getEnhancedChild)}
                {children.length > 0 && (
                    <button disabled={this.checkDisabled()} type="submit">SUBMIT</button>
                )}
            </form>
        );
    }
}
