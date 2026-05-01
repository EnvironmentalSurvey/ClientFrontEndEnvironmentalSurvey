import React, { useMemo, useState } from 'react';

// material-ui
import Grid from '@mui/material/Grid';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableCell from '@mui/material/TableCell';
import Box from '@mui/material/Box';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import StarIcon from '@mui/icons-material/Star';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
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

// types
import { LeaderboardEntry } from '../../../types/survey';

// Mock Data
export const leaderboardEntryData: LeaderboardEntry[] = [
  {
    leaderboardId: 'L002',
    userId: 'U002',
    userName: 'Jane Smith',
    totalPoints: 95,
    totalSurveys: 8,
    rank: 2,
    updatedAt: '2024-12-01 12:00:00'
  },
  {
    leaderboardId: 'L003',
    userId: 'U003',
    userName: 'Alex Johnson',
    totalPoints: 85,
    totalSurveys: 7,
    rank: 3,
    updatedAt: '2024-12-01 12:00:00'
  },
  {
    leaderboardId: 'L004',
    userId: 'U004',
    userName: 'Michael Brown',
    totalPoints: 75,
    totalSurveys: 6,
    rank: 4,
    updatedAt: '2024-12-01 12:00:00'
  },
  {
    leaderboardId: 'L001',
    userId: 'U001',
    userName: 'John Doe',
    totalPoints: 120,
    totalSurveys: 10,
    rank: 1,
    updatedAt: '2024-12-01 12:00:00'
  }
];

// ==============================|| REACT TABLE ||============================== //

function ReactTable({ data, columns }: { data: LeaderboardEntry[]; columns: ColumnDef<LeaderboardEntry>[] }) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState('');
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: { columnFilters, globalFilter },
    getFilteredRowModel: getFilteredRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
    columnResizeMode: 'onChange',
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter
  });

  return (
    <MainCard content={false}>
      <ScrollX>
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
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </ScrollX>
    </MainCard>
  );
}

// ==============================|| RANKING PAGE ||============================== //

export const RankingHistory = () => {
  const data = useMemo(() => {
    // Sort data by `totalPoints` descending and recalculate rank
    return leaderboardEntryData.sort((a, b) => b.totalPoints - a.totalPoints).map((item, index) => ({ ...item, rank: index + 1 }));
  }, []);

  const columns = useMemo<ColumnDef<LeaderboardEntry>[]>(
    () => [
      {
        header: 'Rank',
        accessorKey: 'rank',
        cell: (props) => {
          const rank = props.row.index + 1; // Determine the rank from the row index

          // Render the stars based on rank
          const renderRankStars = (rank: number) => {
            switch (rank) {
              case 1:
                return (
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '50px',
                      height: '50px',
                      borderRadius: '50%',
                      position: 'relative'
                    }}
                  >
                    <StarIcon
                      sx={{
                        color: '#FFD700',
                        fontSize: '55px',
                        zIndex: 1
                      }}
                    />
                    <Typography
                      sx={{
                        fontWeight: 'bold',
                        color: '#CD7F32',
                        fontSize: '14px',
                        position: 'absolute',
                        top: '15px',
                        zIndex: 2
                      }}
                    >
                      {rank}
                    </Typography>
                  </Box>
                );
              case 2:
                return (
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '50px',
                      height: '50px',
                      borderRadius: '50%',
                      position: 'relative'
                    }}
                  >
                    <StarIcon
                      sx={{
                        color: '#FFD700',
                        fontSize: '55px',
                        zIndex: 1
                      }}
                    />
                    <Typography
                      sx={{
                        fontWeight: 'bold',
                        color: '#CD7F32',
                        fontSize: '14px',
                        position: 'absolute',
                        top: '15px',
                        zIndex: 2
                      }}
                    >
                      {rank}
                    </Typography>
                  </Box>
                );
              case 3:
                return (
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '50px',
                      height: '50px',
                      borderRadius: '50%',
                      position: 'relative'
                    }}
                  >
                    <StarIcon
                      sx={{
                        color: '#FFD700',
                        fontSize: '55px',
                        zIndex: 1
                      }}
                    />
                    <Typography
                      sx={{
                        fontWeight: 'bold',
                        color: '#CD7F32',
                        fontSize: '14px',
                        position: 'absolute',
                        top: '15px',
                        zIndex: 2
                      }}
                    >
                      {rank}
                    </Typography>
                  </Box>
                );
              default:
                return (
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '50px',
                      height: '50px',
                      borderRadius: '50%'
                    }}
                  >
                    <Typography>{rank}</Typography>
                  </Box>
                );
            }
          };

          return renderRankStars(rank);
        },
        meta: { className: 'cell-center' }
      },
      {
        accessorKey: 'userName',
        header: 'Nickname',
        cell: (props) => {
          const rank = props.row.index + 1;
          const userName = props.getValue() as string;
          return <Typography sx={{ fontWeight: rank <= 3 ? 'bold' : 'normal', fontSize: '0.775rem' }}>{userName}</Typography>;
        }
      },
      {
        accessorKey: 'totalPoints',
        header: 'Total Points',
        cell: (props) => <Typography sx={{ fontSize: '0.775rem' }}>{props.getValue() as string}</Typography>,
        meta: { sx: { textAlign: 'center' } }
      },
      {
        accessorKey: 'totalSurveys',
        header: 'Surveys Completed',
        cell: (props) => <Typography sx={{ fontSize: '0.775rem' }}>{props.getValue() as string}</Typography>,
        meta: { sx: { textAlign: 'center' } }
      }
    ],
    []
  );
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={8}>
        <ReactTable data={data} columns={columns} />
      </Grid>
      <Grid item xs={12} md={4}>
        <MainCard title="Competition Ranking">
          <Typography variant="body1" gutterBottom>
            The competition ranking is based on the total points each participant earns during the week and month through participation in
            surveys.
          </Typography>
          <Button variant="contained" color="primary">
            Compete Now!
          </Button>
        </MainCard>
      </Grid>
    </Grid>
  );
};
