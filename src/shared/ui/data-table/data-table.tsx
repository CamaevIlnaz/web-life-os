import { Box, Table, Text } from '@chakra-ui/react';
import type { ReactNode } from 'react';

interface DataTableRootProps {
  title?: ReactNode;
  footer?: ReactNode;
  children: ReactNode;
}

export function DataTableRoot({ title, footer, children }: DataTableRootProps) {
  return (
    <Box
      bg="panel"
      borderWidth="1px"
      borderColor="border"
      borderRadius="lg"
      overflow="hidden"
    >
      {title != null ? (
        <Box px="5" pt="5" pb="2">
          {typeof title === 'string' ? (
            <Text fontSize="md" fontWeight="semibold" color="heading" lineHeight="1.3">
              {title}
            </Text>
          ) : (
            title
          )}
        </Box>
      ) : null}

      <Box px="3" pb={footer != null ? '0' : '3'}>
        <Table.Root size="sm" variant="line">
          {children}
        </Table.Root>
      </Box>

      {footer != null ? (
        <Box px="5" py="4">
          {footer}
        </Box>
      ) : null}
    </Box>
  );
}

interface DataTableColumnHeaderProps extends Table.ColumnHeaderProps {
  highlighted?: boolean;
}

export function DataTableColumnHeader({
  highlighted = false,
  children,
  ...props
}: DataTableColumnHeaderProps) {
  return (
    <Table.ColumnHeader
      color="muted"
      fontWeight="bold"
      fontSize="xs"
      borderColor="gray.100"
      textAlign="center"
      py="3"
      px="2"
      bg={highlighted ? 'blue.50' : undefined}
      {...props}
    >
      {children}
    </Table.ColumnHeader>
  );
}

interface DataTableCellProps extends Table.CellProps {
  highlighted?: boolean;
}

export function DataTableCell({
  highlighted = false,
  children,
  ...props
}: DataTableCellProps) {
  return (
    <Table.Cell
      borderColor="gray.100"
      py="3"
      px="2"
      textAlign="center"
      bg={highlighted ? 'blue.50' : undefined}
      {...props}
    >
      {children}
    </Table.Cell>
  );
}

export const DataTableHeader = Table.Header;
export const DataTableBody = Table.Body;
export const DataTableRow = Table.Row;

export const DataTable = {
  Root: DataTableRoot,
  Header: DataTableHeader,
  Body: DataTableBody,
  Row: DataTableRow,
  ColumnHeader: DataTableColumnHeader,
  Cell: DataTableCell,
};
