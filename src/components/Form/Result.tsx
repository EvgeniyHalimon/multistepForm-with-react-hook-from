import { List, ListItem, ListItemIcon, ListItemText, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { useState } from "react";
import { useData } from "../../context/FormDataContext";
import Confetti from "react-confetti";
import Swal from "sweetalert2";
import { MainContainer } from "../MainContainer";
import { InsertDriveFile } from "@mui/icons-material";
import { PrimaryButton } from "../PrimaryButton";
import { Link } from "react-router-dom";

export const Result = () => {
  const [success, setSuccess] = useState(false);
  const { data } = useData();

  const entries = Object.entries(data).filter((entry : any) => entry[0] !== "files")
  const { files } = data;

  const onSubmit = async () => {
    const formData = new FormData()
    if(data.files){
      data.files.forEach((file: any) => {
        formData.append("files", file, file.name);
      });
    }
    entries.forEach((entry: any) => {
      formData.append(entry[0], entry[1]);
    });

    const res = await fetch("http://localhost:4000/", {
      method: "POST",
      body: formData,
    });

    if (res.status === 200) {
      Swal.fire("Great job!", "You've passed the challenge!", "success");
      setSuccess(true);
    }
  }

  if(success){
    <Confetti width={1000} height={1000}/>
  }

  return (
    <MainContainer>
      {success && <Confetti width={window.innerWidth || 300} height={window.innerHeight || 300}/>}
      <Typography component="h2" variant="h5">
        📋 Form Values
      </Typography>
      <TableContainer component={Paper} className="my-4 drop-shadow-xl">
          <Table  aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Field</TableCell>
                <TableCell align="right">Value</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {entries?.map((entry: any) => (
                <TableRow key={entry[0]}>
                  <TableCell component="th" scope="row">
                    {entry[0]}
                  </TableCell>
                  <TableCell align="right">{entry[1]?.toString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        {files && (
          <>
            <Typography component="h2" variant="h5">
              📦 Files
            </Typography>
            <List>
              {files.map((f: any, index: number) => (
                <ListItem key={index}>
                  <ListItemIcon>
                    <InsertDriveFile />
                  </ListItemIcon>
                  <ListItemText primary={f.name} secondary={f.size} />
                </ListItem>
              ))}
            </List>
          </>
        )}
        <PrimaryButton onClick={onSubmit}>Submit</PrimaryButton>
        <Link className="block mt-4 hover:text-gray-500" to="/">Start over</Link>
    </MainContainer>
  )
}