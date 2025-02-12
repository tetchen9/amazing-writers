import { ReactElement } from "react";
import styled from "styled-components";

const Checkbox = styled.input`
  appearance: none;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid ${({ theme }) => theme.color.checkbox.border};
  border-radius: 2px;
  background-color: ${({ theme }) => theme.color.checkbox.background};
  cursor: pointer;

  &:hover {
    border: 1px solid ${({ theme }) => theme.color.checkbox.hover.border};
  }

  &::before {
    content: "";
    width: .5rem;
    height: .5rem;
    margin: 2px;
    border: 1px solid ${({ theme }) => theme.color.checkbox.background};
    border-radius: 2px;
    background-color: ${({ theme }) => theme.color.checkbox.background};
  }

  &:checked::before {
    border: 1px solid ${({ theme }) => theme.color.checkbox.checked.fill};
    background-color: ${({ theme }) => theme.color.checkbox.checked.fill};
  }

  &:focus{
    border: 1px solid ${({ theme }) => theme.color.checkbox.checked.focus.border};
    outline: none;
  }
`;

const Label = styled.label`
  display: flex;
  align-items: center;
  gap: 11px;
  height: 2.5rem;
  width: fit-content;
  border: 1.5px solid ${({ theme }) => theme.color.filter.border};
  border-radius: 12px;
  padding: 9px 12px 8px;
  cursor: pointer;
  white-space: nowrap;
  ${({ theme }) => theme.typography.bodySmallMedium}

  &:hover {
    background-color: ${({ theme }) => theme.color.filter.hover.background};
  }

  &:focus-within {
    outline: 1.5px solid ${({ theme }) => theme.color.filter.focus.outline};
    outline-offset: 3px;
  }
`;

type FilterProps = {
  /** The label for the filter. */
  label: string
  /** The value associated with the filter. */
  value: string
  /** Indicates whether the checkbox is checked. */
  checked?: boolean
  /** The callback function to handle changes to the checkbox state. */
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

/**
 * Filter component renders a labeled checkbox for filtering purposes.
 *
 * @param {string} props.label - The label for the filter.
 * @param {string} props.value - The value associated with the filter.
 * @param {boolean} props.checked - Indicates whether the checkbox is checked.
 * @param {function} props.onChange - The callback function to handle changes to the checkbox state.
 * @returns {ReactElement} The rendered Filter component.
 */
export const Filter = ({ label, value, checked, onChange }: FilterProps): ReactElement => {
  return (
    <Label aria-label={`Filter by ${label}`}>
      {label}
      <Checkbox 
        type="checkbox" 
        checked={checked} 
        onChange={onChange} 
        value={value}
      />
    </Label>
  );
};
