import React, { useMemo, useState } from 'react';

// material-ui
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableCell from '@mui/material/TableCell';
import Box from '@mui/material/Box';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Stack from '@mui/material/Stack';

// third-party
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  ColumnDef,
  HeaderGroup,
  flexRender,
  getFilteredRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFacetedMinMaxValues,
  ColumnFiltersState
} from '@tanstack/react-table';

// project-import
import ScrollX from 'components/ScrollX';
import MainCard from 'components/MainCard';
import LinearWithLabel from 'components/@extended/progress/LinearWithLabel';
import { CSVExport, DebouncedInput, SelectColumnVisibility, TablePagination } from 'components/third-party/react-table';

// types
import { LabelKeyObject } from 'react-csv/lib/core';
import CircularProgress from '@mui/material/CircularProgress';
import { historyJoinList } from '../../../../types/survey';
import { historyJoinData } from '../../../../data/competitions';

// ==============================|| REACT TABLE ||============================== //

function ReactTable({ data, columns, top }: { data: historyJoinList[]; columns: ColumnDef<historyJoinList>[]; top?: boolean }) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState('');
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    debugTable: true,
    state: { columnFilters, globalFilter },
    getFilteredRowModel: getFilteredRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
    columnResizeMode: 'onChange',
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter
  });

  let headers: LabelKeyObject[] = [];
  table.getAllColumns().map((columns) =>
    headers.push({
      label: typeof columns.columnDef.header === 'string' ? columns.columnDef.header : '#',
      // @ts-ignore
      key: columns.columnDef.accessorKey
    })
  );

  return (
    <>
      <MainCard title="History Join">
        <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-between" sx={{ padding: 2 }}>
          <DebouncedInput
            value={globalFilter ?? ''}
            onFilterChange={(value) => setGlobalFilter(String(value))}
            placeholder={`Search ${data.length} records...`}
          />
          <Stack direction="row" alignItems="center" pl={1} spacing={{ xs: 1, sm: 2 }}>
            <SelectColumnVisibility
              {...{
                getVisibleLeafColumns: table.getVisibleLeafColumns,
                getIsAllColumnsVisible: table.getIsAllColumnsVisible,
                getToggleAllColumnsVisibilityHandler: table.getToggleAllColumnsVisibilityHandler,
                getAllColumns: table.getAllColumns
              }}
            />
            <CSVExport {...{ data: table.getRowModel().rows.map((d) => d.original), headers, filename: 'filtering.csv' }} />
          </Stack>
        </Stack>
        <ScrollX>
          <Stack>
            {top && (
              <Box sx={{ p: 2 }}>
                <TablePagination
                  {...{
                    setPageSize: table.setPageSize,
                    setPageIndex: table.setPageIndex,
                    getState: table.getState,
                    getPageCount: table.getPageCount
                  }}
                />
              </Box>
            )}
            <TableContainer>
              <Table>
                <TableHead>
                  {table.getHeaderGroups().map((headerGroup: HeaderGroup<any>) => (
                    <TableRow key={headerGroup.id}>
                      {headerGroup.headers.map((header) => (
                        <TableCell key={header.id} {...header.column.columnDef.meta}>
                          {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableHead>
                <TableBody>
                  {table.getRowModel().rows.map((row) => (
                    <TableRow key={row.id}>
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id} {...cell.column.columnDef.meta}>
                          {cell.getValue() === null ? (
                            <CircularProgress size={20} color="warning" />
                          ) : (
                            flexRender(cell.column.columnDef.cell, cell.getContext())
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            {!top && (
              <>
                <Divider />
                <Box sx={{ p: 2 }}>
                  <TablePagination
                    {...{
                      setPageSize: table.setPageSize,
                      setPageIndex: table.setPageIndex,
                      getState: table.getState,
                      getPageCount: table.getPageCount
                    }}
                  />
                </Box>
              </>
            )}
          </Stack>
        </ScrollX>
      </MainCard>
    </>
  );
}

// ==============================|| REACT TABLE - PAGINATION ||============================== //

export default function HistoryJoin() {
  const data = useMemo(() => historyJoinData.map((item, index) => ({ ...item, index: (index + 1).toString() })), []);

  const columns = useMemo<ColumnDef<historyJoinList>[]>( // Use historyJoinList here
    () => [
      {
        header: '#',
        accessorKey: 'index',
        cell: (info) => (info.row.index + 1).toString(),
        meta: {
          className: 'cell-center'
        }
      },
      {
        accessorKey: 'surveyTitle',
        header: 'Survey Title',
        meta: {
          style: { whiteSpace: 'nowrap' }
        }
      },
      {
        accessorKey: 'historyJoinDate',
        header: 'Join Date',
        cell: (props) => {
          const date = new Date(props.getValue() as string);
          const formattedDate = date.toLocaleString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
          });
          return formattedDate.replace(/am|pm/i, (match) => match.toUpperCase()).replace(',', ', ');
        },
        meta: {
          style: { whiteSpace: 'nowrap' }
        }
      },
      {
        header: 'Status',
        accessorKey: 'status',
        cell: (props) => {
          switch (props.getValue()) {
            case 'Completed':
              return <Chip color="success" label="Completed" size="small" variant="light" />;
            case 'In Progress':
              return <Chip color="warning" label="In Progress" size="small" variant="light" />;
            default:
              return <Chip color="info" label="Single" size="small" variant="light" />;
          }
        }
      },
      {
        accessorKey: 'totalMarksObtained',
        header: 'Marks Obtained',
        meta: {
          style: { whiteSpace: 'nowrap' }
        }
      },
      {
        accessorKey: 'totalMarksPossible',
        header: 'Max Marks',
        meta: {
          style: { whiteSpace: 'nowrap' }
        }
      },
      {
        accessorKey: 'percentageAchieved',
        header: 'Percentage Achieved (%)',
        cell: (props) => <LinearWithLabel value={props.getValue() as number} sx={{ minWidth: 75 }} />,
        meta: {
          style: { whiteSpace: 'nowrap' }
        }
      },
      {
        accessorKey: 'totalTimeSpent',
        header: 'Total Time',
        meta: {
          style: { whiteSpace: 'nowrap' }
        }
      }
    ],
    []
  );

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <ReactTable {...{ data, columns }} />
      </Grid>
    </Grid>
  );
}
