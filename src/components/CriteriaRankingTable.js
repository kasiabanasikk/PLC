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
        height: '100%'
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

const driverProperties = ['screen', 'DI', 'DO', 'AI', 'AO', 'price'];

class CriteriaRankingTable extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            cachedInputs: []
        };

        this.onCacheChange = this.onCacheChange.bind(this);
        this.getCachedValue = this.getCachedValue.bind(this);
    }

    static reverseKey(key) {
        return key.split("/").reverse().join("/");
    };

    onCacheChange(event) {
        let caches = [...this.state.cachedInputs];
        let key = event.target.id;
        let value = event.target.value;

        caches.forEach(dataObject => {
            if (dataObject.key === key) {
                dataObject.value = value;
                let reverseKey = CriteriaRankingTable.reverseKey(key);
                let includesReverse = caches.filter(cache => cache.key === reverseKey).length;

                if (includesReverse < 1) {
                    caches.push({
                        key: reverseKey,
                        value: 1 / value,
                    })
                } else {
                    caches.forEach(cache => {
                        if (cache.key === reverseKey) {
                            console.log("update reverse");
                            cache.value = 1 / value;
                        }
                    });
                }
            }
        });

        if (caches.filter((dataObject) => dataObject.key === key).length < 1) {
            caches.push({
                key: key,
                value: value,
            });

            let reverseKey = CriteriaRankingTable.reverseKey(key);
            let reverseIndex = caches.indexOf(cache => cache.key === reverseKey);

            if (reverseIndex === -1) {
                caches.push({
                    key: reverseKey,
                    value: 1 / value,
                })
            } else {
                caches.forEach(cache => {
                    if (cache.key === reverseKey) {
                        console.log("update reverse");
                        cache.value = 1 / value;
                    }
                });
            }
        }

        this.setState({
            cachedInputs: caches
        });

        this.props.setCache(caches);
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
                                driverProperties.map((driverProperty) => {
                                    return (
                                        <CustomTableCell>{driverProperty}</CustomTableCell>
                                    );
                                })}
                        </TableRow>
                        {driverProperties.map((horizontalValue) => {
                            return (
                                <TableRow>
                                    <CustomTableCell> {horizontalValue}
                                    </CustomTableCell>
                                    {
                                        driverProperties.map((verticalValue) => {
                                            let inputId = horizontalValue + "/" + verticalValue;

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
