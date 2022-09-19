import React, { useEffect, useState } from "react";
import "./Posts.css";
import axios from "axios";
import Loading from "../components/shared/Loading";
import Search from "../components/shared/Search";
import Buttons from "../components/shared/Buttons";
import { styled } from "@mui/material/styles";
import { Table, TableBody, Pagination, PaginationItem, TableContainer, TableHead, TableRow, } from "@mui/material";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import AssignmentReturnedIcon from "@mui/icons-material/AssignmentReturned";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import CloseFullscreenIcon from "@mui/icons-material/CloseFullscreen";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import DescriptionIcon from "@mui/icons-material/Description";
import RingVolumeIcon from "@mui/icons-material/RingVolume";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { ArrowBack as ArrowBackIcon, ArrowForward as ArrowForwardIcon } from "@mui/icons-material";

import Swal from "sweetalert2";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";

//// for a text filed ///
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
//// for a text filed ///

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#344f7c",
    color: "#ededed",
    textAlign: "center",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 16,
    color: "var(--textcolor1)",
    textAlign: "center",
    transition: ".5s",
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  backgroundColor: "var(--background2)",
  transition: ".5s",
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function Posts() {
  const [postes, setPostes] = useState([]);
  const [DATA, setDATA] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deal, setDeal] = useState();
  const [login, setLogin] = useState("");
  const [entry, setEntry] = useState("");
  const [action, setAction] = useState("");
  const [symbol, setSymbol] = useState("");
  const [price, setPrice] = useState("");
  const [profit, setProfit] = useState("");
  const [volume, setVolume] = useState("");
  const [page, setPage] = useState(1);
  const [count, setCount] = useState('');
 
  const data = {
    deal: deal,
    login: login,
    entry: entry,
    action: action,
    symbol: symbol,
    price: price,
    profit: profit,
    volume: volume,
  };
  const HandeladdPoste = async (e) => {
    e.preventDefault();
    await axios
      .post("http://localhost:2000/api/post/data", data)
      .then((res) => {
        setDeal("");
        setLogin("");
        setEntry("");
        setAction("");
        setSymbol("");
        setPrice("");
        setProfit("");
        setVolume("");
        setOpen(false);
        Swal.fire({
          title: "The Poste  added Successfully",
          icon: "success",
          timer: 2000,
          timerProgressBar: true,
          toast: true,
          position: "top-end",
          showConfirmButton: false,
        });
        getAllPostes();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const HandelDeletePost = (id) => {
    axios
      .delete(`http://localhost:2000/api/post/${id}`)
      .then((res) => {
        setLoading(true);
        Swal.fire({
          title: " Deleted Successfully",
          icon: "success",
          timer: 2000,
          timerProgressBar: true,
          toast: true,
          position: "top-end",
          showConfirmButton: false,
        });
        getAllPostes();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  ////  end to delet a admins ///

  /// function to get All postes ///
  const getAllPostes = async () => {
    setLoading(true);
    await axios
      .post("http://localhost:2000/api/post", { page })
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
  const getCount = async () => {
    const calculatePagesCount = (pageSize, totalCount) => {
      return totalCount < pageSize ? 1 : Math.ceil(totalCount / pageSize);
    };
    setLoading(true);
    await axios
      .get("http://localhost:2000/api/post/count",)
      .then((res) => {
        if (res.status === 200) {
          setCount(calculatePagesCount(10, res.data.response));
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getCount()
  }, []);

  useEffect(() => {
    getAllPostes();
  }, [page]);


  /// function to get All postes ///

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setDeal("");
    setLogin("");
    setEntry("");
    setAction("");
    setSymbol("");
    setPrice("");
    setProfit("");
    setVolume("");
  };
  const handleChange = (event, value) => {
    setPage(value);
  };
  return (
    <div className="post">

      <div className="d-flex justify-content-around">
        {DATA && <Search
          placeholder="Search for Deal  OR  Login"
          data={DATA && DATA}
          searched={setPostes}
          page={"posts"}
        />}
        <Buttons
          buttonStyle="btn--success--solid"
          buttonSize="btn-lg"
          text={"Add Poste"}
          variant="outlined"
          onClick={handleClickOpen}
        />
        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-describedby="alert-dialog-slide-description"
        >
          <form onSubmit={HandeladdPoste}>
            <DialogTitle>{"Use Google's location service?"}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-slide-description">
                <Box
                  component="form"
                  sx={{
                    "& > :not(style)": { m: 1.5, width: "48ch" },
                  }}
                  noValidate
                  autoComplete="off"
                >
                  <TextField
                    id="standard-basic"
                    label="Add Your Deal"
                    variant="standard"
                    type='number'
                    required
                    value={deal}
                    onChange={(e) => setDeal(e.target.value)}
                  />
                  <TextField
                    id="standard-basic"
                    label="Add Your Login "
                    variant="standard"
                    type='number'
                    required
                    value={login}
                    onChange={(e) => setLogin(e.target.value)}
                  />
                  <TextField
                    id="standard-basic"
                    label="Add Your Entry "
                    variant="standard"
                    type='number'
                    required
                    value={entry}
                    onChange={(e) => setEntry(e.target.value)}
                  />
                  <TextField
                    id="standard-basic"
                    label="Add Your Action "
                    variant="standard"
                    type='number'
                    required
                    value={action}
                    onChange={(e) => setAction(e.target.value)}
                  />
                  <TextField
                    id="standard-basic"
                    label="Add Your Symbol "
                    variant="standard"
                    required
                    value={symbol}
                    onChange={(e) => setSymbol(e.target.value)}
                  />
                  <TextField
                    id="standard-basic"
                    label="Add Your Price "
                    variant="standard"
                    type='number'
                    required
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                  <TextField
                    id="standard-basic"
                    label="Add Your Profit "
                    type='number'
                    variant="standard"
                    required
                    value={profit}
                    onChange={(e) => setProfit(e.target.value)}
                  />
                  <TextField
                    id="standard-basic"
                    label="Add Your Volume "
                    type='number'
                    variant="standard"
                    required
                    value={volume}
                    onChange={(e) => setVolume(e.target.value)}
                  />
                </Box>
              </DialogContentText>
            </DialogContent>

            <DialogActions>
              <Buttons
                buttonStyle="btn--danger--solid"
                buttonSize="btn-lg"
                text={"Cancel "}
                onClick={handleClose}
              />
              <Buttons
                buttonStyle="btn--success--solid"
                buttonSize="btn-lg"
                text={"New poste"}
                type='submit'
              />
            </DialogActions>
          </form>
        </Dialog>
      </div>

      <div
        className="post_table"
        style={{ display: "flex", position: "relative", minHeight: "70vh" }}
      >
        <TableContainer>
          <Table sx={{ minWidth: 400 }} aria-label="contained table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="left">
                  <LocalOfferIcon style={{ width: "22px" }} /> &nbsp;
                  <span style={{ fontWeight: "bold", verticalAlign: "bottom" }}>
                    Deal
                  </span>
                </StyledTableCell>
                <StyledTableCell align="left">
                  <CalendarMonthIcon style={{ width: "22px" }} /> &nbsp;
                  <span style={{ fontWeight: "bold", verticalAlign: "bottom" }}>
                    Login
                  </span>
                </StyledTableCell>
                <StyledTableCell align="left">
                  <AssignmentReturnedIcon style={{ width: "22px" }} /> &nbsp;
                  <span style={{ fontWeight: "bold", verticalAlign: "bottom" }}>
                    Entry
                  </span>
                </StyledTableCell>
                <StyledTableCell align="left">
                  <CloseFullscreenIcon style={{ width: "22px" }} /> &nbsp;
                  <span style={{ fontWeight: "bold", verticalAlign: "bottom" }}>
                    Action
                  </span>
                </StyledTableCell>
                <StyledTableCell align="left">
                  <AccessTimeFilledIcon style={{ width: "22px" }} /> &nbsp;
                  <span style={{ fontWeight: "bold", verticalAlign: "bottom" }}>
                    Time
                  </span>
                </StyledTableCell>
                <StyledTableCell align="left">
                  <DescriptionIcon style={{ width: "22px" }} /> &nbsp;
                  <span style={{ fontWeight: "bold", verticalAlign: "bottom" }}>
                    Symbol
                  </span>
                </StyledTableCell>
                <StyledTableCell align="left">
                  <AttachMoneyIcon style={{ width: "22px" }} /> &nbsp;
                  <span style={{ fontWeight: "bold", verticalAlign: "bottom" }}>
                    Price
                  </span>
                </StyledTableCell>
                <StyledTableCell align="left">
                  <EmojiEventsIcon style={{ width: "22px" }} /> &nbsp;
                  <span style={{ fontWeight: "bold", verticalAlign: "bottom" }}>
                    Profit
                  </span>
                </StyledTableCell>
                <StyledTableCell align="left">
                  <RingVolumeIcon style={{ width: "22px" }} /> &nbsp;
                  <span style={{ fontWeight: "bold", verticalAlign: "bottom" }}>
                    Volume
                  </span>
                </StyledTableCell>

                <StyledTableCell align="left">
                  <RingVolumeIcon />
                  <span style={{ fontWeight: "bold", verticalAlign: "bottom" }}>
                    Action
                  </span>
                </StyledTableCell>
              </TableRow>
            </TableHead>

            {loading ? (
              <Loading />
            ) : (
              <TableBody>
                {postes &&
                  postes.map((item, index) => {
                    return (
                      <StyledTableRow key={index} className="main_row">
                        <StyledTableCell
                          component="th"
                          scope="row"
                          align="center"
                        >
                          {item.deal}
                        </StyledTableCell>
                        <StyledTableCell
                          component="th"
                          scope="row"
                          align="center"
                        >
                          {item.login}
                        </StyledTableCell>
                        <StyledTableCell
                          component="th"
                          scope="row"
                          align="center"
                        >
                          {item.entry}
                        </StyledTableCell>
                        <StyledTableCell
                          component="th"
                          scope="row"
                          align="center"
                        >
                          {item.action}
                        </StyledTableCell>
                        <StyledTableCell
                          component="th"
                          scope="row"
                          align="center"
                        >
                          {item.time}
                        </StyledTableCell>
                        <StyledTableCell
                          component="th"
                          scope="row"
                          align="center"
                        >
                          {item.symbol}
                        </StyledTableCell>
                        <StyledTableCell
                          component="th"
                          scope="row"
                          align="center"
                        >
                          {item.price}
                        </StyledTableCell>
                        <StyledTableCell
                          component="th"
                          scope="row"
                          align="center"
                        >
                          {item.profit}
                        </StyledTableCell>
                        <StyledTableCell
                          component="th"
                          scope="row"
                          align="center"
                        >
                          {item.volume}
                        </StyledTableCell>

                        <StyledTableCell align="left" style={{ padding: 0 }}>
                           <div className="button_table">
                            {/* <Buttons
                              buttonStyle="btn--success--solid"
                              buttonSize="btn-md"
                              icon={<ArrowBackIcon />}
                            />  */}

                           <Buttons
                              buttonStyle="btn--danger--solid"
                              buttonSize="btn-md"
                              icon={<DeleteOutlineIcon />}
                              onClick={() => HandelDeletePost(item._id)}
                            /> 
                          </div>
                        </StyledTableCell>
                      </StyledTableRow>
                    );
                  })}
              </TableBody>
            )}
          </Table>

        </TableContainer>
      </div>
      <div className="paginationBox">
        <Pagination
          count={count}
          onChange={handleChange}
          renderItem={(item) => (
            <PaginationItem
              components={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
              {...item}
            />
          )}
        />
      </div>
    </div>
  );
}
export default Posts;
