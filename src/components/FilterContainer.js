import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import Table, {TableBody, TableCell, TableHead, TableRow} from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import DriverFilter from "./DriverFilter";

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
        marginLeft: '0px'
    },
    table: {
        minWidth: 700,
    },
});

function FilterContainer(props) {
    const {classes} = props;

    return (
        <Paper className={classes.root}>
            <Table className={classes.table}>
                <TableHead>
                    <TableRow>
                        <TableCell numeric>Screen</TableCell>
                        <TableCell numeric>Digital input</TableCell>
                        <TableCell numeric>Digital output</TableCell>
                        <TableCell numeric>Analog input</TableCell>
                        <TableCell numeric>Analog output</TableCell>
                        <TableCell>IP </TableCell>
                        <TableCell numeric>Price</TableCell>
                        <TableCell>Lang</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow key={"filter"}>
                        <TableCell>
                            <DriverFilter labelValue="Screen Size" drivers={props.drivers}
                                          inputId={"screen-size"} driverProperty={"screen"}/>
                        </TableCell>
                        <TableCell>
                            <DriverFilter labelValue="Digital Input" drivers={props.drivers}
                                          inputId={"digital-input"} driverProperty={"DI"}/>
                        </TableCell>
                        <TableCell>
                            <DriverFilter labelValue="Digital Output" drivers={props.drivers}
                                          inputId={"digital-output"} driverProperty={"DO"}/>
                        </TableCell>
                        <TableCell>
                            <DriverFilter labelValue="Analog Input" drivers={props.drivers}
                                          inputId={"analog-input"} driverProperty={"AI"}/>
                        </TableCell>
                        <TableCell>
                            <DriverFilter labelValue="Analog Output" drivers={props.drivers}
                                          inputId={"analog-output"} driverProperty={"AO"}/>
                        </TableCell>
                        <TableCell>
                            <DriverFilter labelValue="IP" drivers={props.drivers} inputId={"ip"}
                                          driverProperty={"IP"}/>
                        </TableCell>
                        <TableCell>
                            <DriverFilter labelValue="Price" drivers={props.drivers}
                                          inputId={"price"} driverProperty={"price"}/>
                        </TableCell>
                        <TableCell>
                            <DriverFilter labelValue="Lang" drivers={props.drivers} inputId={"lang"}
                                          driverProperty={"lang"}/>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </Paper>
    );
}

FilterContainer.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FilterContainer);