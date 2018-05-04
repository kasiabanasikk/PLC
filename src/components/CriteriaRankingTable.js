import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import Table, {TableBody, TableCell, TableRow} from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import Input from 'material-ui/Input';
import './CriteriaRankingTable.css';

const CustomTableCell = withStyles(theme => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
        textAlign: 'center'
    }
}))(TableCell);

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
    },
    table: {
        minWidth: 700,
    },
    row: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.background.default,
        },
    },
    tableInput: {
        margin: theme.spacing.unit,
    }
});


class CriteriaRankingTable extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            values: this.props.values,
            cachedInputs: []
        };

        this.onCacheChange = this.onCacheChange.bind(this);
        this.getCachedValue = this.getCachedValue.bind(this);
    }

    onCacheChange(event) {
        let caches = [...this.state.cachedInputs];
        let key = event.target.id;
        let value = event.target.value;
        caches.forEach(dataObject => {
            if (dataObject.key === key) {
                dataObject.value = value;
            }
        });

        if (caches.filter((dataObject) => dataObject.key === key).length < 1) {
            caches.push({
                key: key,
                value: value,
            })
        }

        this.setState({
            cachedInputs: caches
        });

    };


    getCachedValue(key) {
        let cachedKeys = this.state.cachedInputs.filter(cachedValue => cachedValue.key === key);

        if (cachedKeys.length < 1) {
            return 1;
        }

        return cachedKeys[0].value;
    }

    render() {
        const {classes} = this.props;

        return (
            <Paper className={classes.root}>
                <Table className={classes.table}>
                    <TableBody>
                        <TableRow>
                            <CustomTableCell>X</CustomTableCell>
                            {
                                this.state.values.map((value) => {
                                    return (
                                        <CustomTableCell>{value}</CustomTableCell>
                                    );
                                })}
                        </TableRow>
                        {this.props.values.map((horizontalValue) => {
                            return (
                                <TableRow>
                                    <CustomTableCell> {horizontalValue}
                                    </CustomTableCell>
                                    {
                                        this.props.values.map((verticalValue) => {
                                            let inputId = this.props.driverProperty + "/" + horizontalValue + "/" + verticalValue;

                                            return (
                                                <CustomTableCell>
                                                    <Input
                                                        id={inputId}
                                                        className={[classes.tableInput].join(" ")}
                                                        inputProps={{
                                                            'aria-label': 'Description',
                                                            disabled: horizontalValue === verticalValue,
                                                            value: this.getCachedValue(inputId),
                                                            onChange: this.onCacheChange
                                                        }}
                                                    />
                                                </CustomTableCell>
                                            );
                                        })}
                                </TableRow>);
                        })}
                    </TableBody>
                </Table>
            </Paper>
        );
    }
}

CriteriaRankingTable.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CriteriaRankingTable);
