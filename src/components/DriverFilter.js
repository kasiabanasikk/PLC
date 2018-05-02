import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import Input, {InputLabel} from 'material-ui/Input';
import {MenuItem} from 'material-ui/Menu';
import {FormControl} from 'material-ui/Form';
import Select from 'material-ui/Select';
import Chip from 'material-ui/Chip';

const styles = theme => ({
    root: {
        display: 'inline',
        flexWrap: 'wrap',
    },
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 120,
        maxWidth: 300,
    },
    chips: {
        display: 'inline',
        flexWrap: 'wrap',
    },
    chip: {
        margin: theme.spacing.unit / 4,
    },
});

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

class DriverFilter extends React.Component {
    state = {
        name: [],
    };

    handleChange = event => {
        this.setState({name: event.target.value});
        this.props.filterChange(this.props.driverProperty, event.target.value);
    };

    static uniqBy(drivers, property) {
        return drivers.filter((driver, index, self) =>
            index === self.findIndex((other) => {
                return other[property] === driver[property];
            })
        );
    }

    render() {
        const {classes, theme} = this.props;

        let sortedDrivers = DriverFilter.uniqBy(this.props.drivers, this.props.driverProperty);

        return (
            <div className={classes.root}>
                <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="select-multiple-chip">{this.props.labelValue}</InputLabel>
                    <Select
                        multiple
                        value={this.state.name}
                        onChange={this.handleChange}
                        input={<Input id={this.props.inputId}/>}
                        renderValue={selected => (
                            <div className={classes.chips}>
                                {selected.map(value => <Chip key={value} label={value}
                                                             className={classes.chip}/>)}
                            </div>
                        )}
                        MenuProps={MenuProps}
                    >
                        {sortedDrivers.map(driver => (
                            <MenuItem
                                key={driver[this.props.driverProperty]}
                                value={driver[this.props.driverProperty]}
                                style={{
                                    fontWeight:
                                        this.state.name.indexOf(driver) === -1
                                            ? theme.typography.fontWeightRegular
                                            : theme.typography.fontWeightMedium,
                                }}
                            >
                                {driver[this.props.driverProperty]}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </div>
        );
    }
}

DriverFilter.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default withStyles(styles, {withTheme: true})(DriverFilter);
