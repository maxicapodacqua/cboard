import React, { Component } from 'react';
import { injectIntl, intlShape } from 'react-intl';
import { compose } from 'recompose';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import FileCopyIcon from '@material-ui/icons/FileCopyOutlined';
import SaveIcon from '@material-ui/icons/Save';

// import messages from './BoardSpeedDial.messages';
import './BoardSpeedDial.css';

const styles = theme => ({
  root: {
    height: 380
  },
  speedDial: {
    position: 'absolute',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 3
  }
});

const actions = [
  { icon: <FileCopyIcon />, name: 'Add new board', option: 'board' },
  { icon: <SaveIcon />, name: 'Add new pictogram', option: 'pictogram' }
];

export class BoardSpeedDial extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    intl: intlShape.isRequired
    // onAddClick: PropTypes.func
  };

  constructor(props) {
    super(props);

    this.state = {
      open: false,
      hidden: false
    };
  }

  handleVisibility = () => {
    this.setState(state => ({
      open: false,
      hidden: !state.hidden
    }));
  };

  handleClick = () => {
    this.setState(state => ({
      open: !state.open
    }));
  };

  handleOpen = () => {
    if (!this.state.hidden) {
      this.setState({
        open: true
      });
    }
  };

  handleClose = () => {
    this.setState({
      open: false
    });
  };

  render() {
    const { onAddClick } = this.props;

    const { classes } = this.props;
    const { hidden, open } = this.state;

    return (
      <div className={classes.root}>
        <div className="mobile-only">
          <Button onClick={this.handleVisibility}>Toggle Speed Dial</Button>
          <SpeedDial
            ariaLabel="SpeedDial tooltip example"
            className={classes.speedDial}
            hidden={hidden}
            icon={<SpeedDialIcon />}
            onBlur={this.handleClose}
            onClick={this.handleClick}
            onClose={this.handleClose}
            onFocus={this.handleOpen}
            onMouseEnter={this.handleOpen}
            onMouseLeave={this.handleClose}
            open={open}
          >
            {actions.map(action => (
              <SpeedDialAction
                key={action.name}
                icon={action.icon}
                tooltipTitle={action.name}
                tooltipOpen
                onClick={onAddClick}
              />
            ))}
          </SpeedDial>
        </div>
      </div>
    );
  }
}

export default compose(withStyles(styles))(injectIntl(BoardSpeedDial));
