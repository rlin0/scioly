import React, { Component } from "react"
import axios from "axios"
import Table from "@material-ui/core/Table"
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const columns = [
    { id: 'name', label: 'Name', minWidth: 170 },
    { id: 'time', label: 'Time', minWidth: 100 },
]

export default class Leaderboard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            teams: []
        }
    }

    componentDidMount() {
        axios
            .get(`/api/er/leader`)
            .then((res) => {
                this.setState({
                    teams: res.data.teams.map((t) => {
                        return { name: t[0], time: t[1] }
                    })
                })
            })
            .catch((err) => {
                console.error(err)
            })
    }

    render() {
        return (
            <>
                <TableContainer sx={{ maxHeight: 440 }}>
                    <Table stickyHeader aria-label="sticky table" style={{ width: "80%", marginTop: "5%", marginLeft: "auto", marginRight: "auto" }} className="center">
                        <TableHead>
                            <TableRow>
                                {columns.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        align={column.align}
                                        style={{ minWidth: column.minWidth, fontWeight: "bold", fontSize: "large" }}
                                    >
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody style={{ backgroundColor: "white" }}>
                            {
                                this.state.teams
                                    .map((row) => {
                                        return (
                                            <TableRow hover role="checkbox" tabIndex={-1}>
                                                {columns.map((column) => {
                                                    const value = row[column.id];
                                                    return (
                                                        <TableCell key={column.id} align={column.align} style={{ color: "#e65100" }}>
                                                            {column.format && typeof value === 'number'
                                                                ? column.format(value)
                                                                : value}
                                                        </TableCell>
                                                    );
                                                })}
                                            </TableRow>
                                        );
                                    })
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </>
        )
    }
}
