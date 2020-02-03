import React from 'react';

class ClickableElement extends React.Component {
    static INTERVAL = 1000;
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentWillReceiveProps(nextProps) {
        const { onClick, disabled } = nextProps;
        this.setState({
        onClick,
        disabled,
        });
    }
    onClickDebounced(e) {
        const { onClick, disabled } = this.state;
        if (!disabled && _.isFunction(onClick)) {
        onClick(e);
        }
    }
    componentWillMount() {
        this.componentWillReceiveProps(this.props);
        const { clickwait } = this.props;
        const wait = clickwait || Button.INTERVAL;
        this.onElementClicked = _.debounce(this.onClickDebounced,
            wait,
        {
            maxWait:wait,
            leading: true,
            trailing: false,
        });
    }
}

export default class TouchButton extends ClickableElement {
    render() {
      const otherProps = _.omit(this.props, ['onClick', 'type']);
      return (
        <button
            onClick={e => this.onElementClicked(e)}
            type="button"
            {...otherProps}
        >{otherProps.value}</button>
      );
    }
}  