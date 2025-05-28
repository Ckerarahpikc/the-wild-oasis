import styled from "styled-components";

const FormRow = styled.div`
  display: flex;
  flex-direction: column;
`

const Label = styled.label`
  font-weight: 500;
  margin: 1.5rem 0;
  font-size: 1.5rem;
`;

function FormRowVertical({ children, label, htmlFor }) {
  return (
    <FormRow>
      <Label htmlFor={htmlFor}>{label}</Label>
      {children}
    </FormRow>
  );
}

export default FormRowVertical;
