import React, { useEffect, useState } from "react";
import "./Posts.css";
import axios from "axios";
import Loading from "../components/shared/Loading";
import Search from "../components/shared/Search";
import { Table, TableBody, Pagination, PaginationItem, TableContainer, TableHead, TableRow, TableSortLabel, TablePagination, FormControlLabel, Switch, } from "@mui/material";
import TableCell from "@mui/material/TableCell";
import { visuallyHidden } from '@mui/utils';
import PropTypes from 'prop-types';
import Box from "@mui/material/Box";



function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}
const headCells = [
    {
        id: 'deal',
        sort: true,
        disablePadding: false,
        label: 'Deal',
    },
    {
        id: 'login',
        sort: true,
        disablePadding: false,
        label: 'Login',
    },
    {
        id: 'entry',
        label: 'Entry',
    },
    {
        id: 'action',

        label: 'Action',
    },
    {
        id: 'time',

        label: 'Time',
    },
    {
        id: 'symbol',

        label: 'Symbol',
    },
    {
        id: 'price',

        label: 'Price',
    },
    {
        id: 'profit',

        label: 'Profit',
    },
    {
        id: 'volume',

        label: 'Volume',
    },
];


function Posts1(props) {
    const [postes, setPostes] = useState([]);
    const [DATA, setDATA] = useState([]);
    const [loading, setLoading] = useState(false);
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('calories');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const getAllPostes = async () => {
        setLoading(true);
        await axios
            .get("http://localhost:2000/api/post",)
            .then((res) => {
                if (res.status === 200) {
                    setPostes(res.data.response);
                    setDATA(res.data.response);
                    setLoading(false);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };


    useEffect(() => {
        getAllPostes();
    }, []);

    console.log({ DATA });

    /// function to get All postes ///

    function EnhancedTableHead(props) {
        const { order, orderBy, onRequestSort } =
            props;
        const createSortHandler = (property) => (event) => {
            onRequestSort(event, property);
        };

        return (
            <TableHead>
                <TableRow>
                    {headCells.map((headCell) => (
                        <TableCell
                            sx={{ backgroundColor: 'lightblue' }}
                            key={headCell.id}
                            align={'center'}
                            sortDirection={orderBy === headCell.id ? order : false}
                        >
                            {headCell.sort ?
                                <TableSortLabel
                                    active={orderBy === headCell.id}
                                    direction={orderBy === headCell.id ? order : 'asc'}
                                    onClick={createSortHandler(headCell.id)}
                                >
                                    <b>{headCell.label}</b>
                                    {orderBy === headCell.id ? (
                                        <Box component="span" sx={visuallyHidden}>
                                            {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                        </Box>
                                    ) : null}
                                </TableSortLabel>
                                : <b>{headCell.label}</b>
                            }


                        </TableCell>
                    ))}
                </TableRow>
            </TableHead>
        );
    }

    EnhancedTableHead.propTypes = {
        numSelected: PropTypes.number.isRequired,
        onRequestSort: PropTypes.func.isRequired,
        onSelectAllClick: PropTypes.func.isRequired,
        order: PropTypes.oneOf(['asc', 'desc']).isRequired,
        orderBy: PropTypes.string.isRequired,
        rowCount: PropTypes.number.isRequired,
    };

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };



    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleChangeDense = (event) => {
        setDense(event.target.checked);
    };


    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - postes.length) : 0;


    return (
        <div className="post">

            <div className="d-flex justify-content-start">
                {DATA && <Search
                    placeholder="Search for Deal  OR  Login"
                    data={DATA && DATA}
                    searched={setPostes}
                    page={"posts"}
                />}

            </div>

            <div
                className="post_table"
                style={{ position: "relative", height: "100%" }}
            >
                <TableContainer>
                    <Table
                        sx={{ minWidth: 750 }}
                        aria-labelledby="tableTitle"
                        size={dense ? 'small' : 'medium'}
                    >
                        <EnhancedTableHead
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onRequestSort={handleRequestSort}
                            rowCount={postes.length}
                        />
                        <TableBody>
                            {postes.slice().sort(getComparator(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, index) => {
                                    const labelId = `enhanced-table-checkbox-${index}`;

                                    return (
                                        <TableRow
                                            hover
                                            tabIndex={-1}
                                            key={row.name}
                                        >
                                            <TableCell align="center">
                                                {row.deal}
                                            </TableCell>
                                            <TableCell align="center">{row.login}</TableCell>
                                            <TableCell align="center">{row.entry}</TableCell>
                                            <TableCell align="center">{row.action}</TableCell>
                                            <TableCell align="center">{row.time}</TableCell>
                                            <TableCell align="center">{row.symbol}</TableCell>
                                            <TableCell align="center">{row.price}</TableCell>
                                            <TableCell align="center">{row.profit}</TableCell>
                                            <TableCell align="center">{row.volume}</TableCell>
                                        </TableRow>
                                    );
                                })}
                            {emptyRows > 0 && (
                                <TableRow
                                    style={{
                                        height: (dense ? 33 : 53) * emptyRows,
                                    }}
                                >
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={postes.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
                <FormControlLabel
                    control={<Switch checked={dense} onChange={handleChangeDense} />}
                    label="Dense padding"
                />
            </div>
        </div >
    );
}
export default Posts1;
