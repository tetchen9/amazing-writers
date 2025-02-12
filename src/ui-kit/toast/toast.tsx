import { ComponentPropsWithoutRef, ReactElement } from "react";
import styled from "styled-components";
import IconTimesCircle from "@/theme/icons/times-circle.svg?react";
import IconCheckCircle from "@/theme/icons/check-circle.svg?react";
import IconTimes from "@/theme/icons/times.svg?react";
import { ButtonClose } from "../button-close";

export const StyledToast = styled.div`&&{
  position: relative;
  display: flex;
  align-items: center;
  gap: 8px;
  height: 56px;
  width: auto;
  min-width: 338px;
  padding-left: 16px;
  box-shadow: none;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.color.blank};
  color: ${({ theme }) => theme.color.bayoux};
  ${({ theme }) => theme.typography.bodySmall};
  
  >svg {
    width: 20px;
    height: 20px;
    fill: ${({ theme }) => theme.color.redPink};
  }
}
`;

const StyledButtonClose = styled(ButtonClose)`&&{
  align-self: flex-start;
  margin: 4px 4px 0 auto;
`;

type ToastVariants = "error" | "success" 

/**
 * Type definition for the variants of a Toast component.
 * These variants are used to determine the icon and default message to be displayed in the toast.
 * 
 * This type maps each variant of the Toast to:
 * - `icon`: A React element representing the icon for the toast.
 * - `message`: A string representing the default message for the toast.
 * 
 * @typedef {Object} ToastVariantsType
 * @property {ReactElement} icon - The icon to be displayed in the toast.
 * @property {string} message - The default message to be displayed in the toast.
 */
type ToastVariantsType = {
  [key in ToastVariants]: {
    icon: ReactElement
    message: string
  }
}

const toastVariants: ToastVariantsType = { 
  error: {
    icon: <IconTimesCircle />, 
    message: "Sorry, something went wrong"},
  success: {
    icon: <IconCheckCircle/>, 
    message: "Success!"
  },
};

type ToastProps = {
  // The variant of the toast, default is "error".
  $variant?: ToastVariants
  // The message to be displayed in the toast.
  onClose?: () => void
  // Optional callback function to handle the close action.
  $message?: string
}

type Props = ComponentPropsWithoutRef<"div"> & ToastProps


/**
 * Toast component to display different types of messages.
 *
 * @param {string} props.$variant - The variant of the toast, default is "error".
 * @param {string} props.$message - The message to be displayed in the toast.
 * @param {Function} [props.handleOnClose] - Optional callback function to handle the close action.
 *
 * @returns {ReactElement} The rendered Toast component.
 */
export const Toast = (props: Props): ReactElement => {
  const { $variant = "error", $message, onClose, ...rest} = props;

  return (
    <StyledToast data-testid={`${$variant}-toast`} {...rest}>
      {toastVariants[$variant].icon}
      {$message ?? toastVariants[$variant].message}
      {!!onClose && <StyledButtonClose onClick={onClose}><IconTimes /></StyledButtonClose>}
    </StyledToast>
  );
};
