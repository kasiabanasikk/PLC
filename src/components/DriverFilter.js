import React, {Component} from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

const names = [
    'Oliver Hansen',
    'Van Henry',
    'April Tucker',
    'Ralph Hubbard',
    'Omar Alexander',
    'Carlos Abbott',
    'Miriam Wagner',
    'Bradley Wilkerson',
    'Virginia Andrews',
    'Kelly Snyder',
];

/**
 * `SelectField` can handle multiple selections. It is enabled with the `multiple` property.
 */
class DriverFilter extends Component {

    state = {
        values: []
    };
    handleChange = (event, index, values) => this.setState({values});

    constructor(props) {
        super(props);
    }

    menuItems(values) {
        return names.map((name) => (
            <MenuItem
                key={name}
                insetChildren={true}
                checked={values && values.indexOf(name) > -1}
                value={name}
                primaryText={name}
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