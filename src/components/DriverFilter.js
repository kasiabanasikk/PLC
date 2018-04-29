import React, {Component} from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

class DriverFilter extends Component {

    state = {
        values: []
    };

    constructor(props) {
        super(props);
    }

    handleChange = (event, index, values) => this.setState({values});

    menuItems(values) {
        return this.props.drivers.map((driver) => (
            <MenuItem
                key={driver.screen}
                insetChildren={true}
                checked={values && values.indexOf(driver.screen) > -1}
                value={driver.screen}
                primaryText={driver.screen}
            />
        ));
    }

    render() {
        const {values} = this.state;
        return (
            <SelectField
                multiple={true}
                hintText={this.props.hint}
                value={values}
                onChange={this.handleChange}
            >
                {this.menuItems(values)}
            </SelectField>
        );
    }
}

export default DriverFilter;