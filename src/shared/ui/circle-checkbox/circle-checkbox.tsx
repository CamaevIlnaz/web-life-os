import { Checkbox } from '@chakra-ui/react';

interface CircleCheckboxProps extends Checkbox.RootProps {
  ariaLabel: string;
}

export function CircleCheckbox({
  ariaLabel,
  colorPalette = 'blue',
  ...props
}: CircleCheckboxProps) {
  return (
    <Checkbox.Root
      {...props}
      aria-label={ariaLabel}
      colorPalette={colorPalette}
      size="md"
    >
      <Checkbox.HiddenInput />
      <Checkbox.Control borderRadius="full" cursor="pointer">
        <Checkbox.Indicator boxSize="90%" />
      </Checkbox.Control>
    </Checkbox.Root>
  );
}
