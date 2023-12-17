
import stls from './Button.module.sass'




export interface ButtonProps {
    label: string;
}
const Button = (props: ButtonProps) => {
    return <button className={stls.button}>{props.label}</button>;
};
export default Button;