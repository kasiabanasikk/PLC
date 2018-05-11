import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import Table, {TableBody, TableCell, TableHead, TableRow} from 'material-ui/Table';
import Paper from 'material-ui/Paper';

const styles = theme => ({
    root: {
        width: '100%',
        height: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
    },
    table: {
        minWidth: 700,
    },
});

function ResultsTable(props) {
    const {classes} = props;

    if (props.rankedScoreMap === undefined || props.rankedScoreMap.length < 1) {
        return (
            <div>
            </div>
        );
    }

    return (

        <Paper className={classes.root}>
            <Table className={classes.table}>
                <TableHead>
                    <TableRow>
                        <TableCell>Driver name</TableCell>
                        <TableCell>Score</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {Object.entries(props.rankedScoreMap).map((driver) => {
                        return (
                            <TableRow key={driver[0]}>
                                <TableCell component="th" scope="row">
                                    {driver[0]}
                                </TableCell>
                                <TableCell>{driver[1]}</TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </Paper>
    );
}

ResultsTable.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ResultsTable);
