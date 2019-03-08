import React from 'react';
import './App.css';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


const styles = theme => ({
    root: {
      width: '70%',
    //   marginTop: theme.spacing.unit * 3,
      overflowX: 'auto',
    },
    table: {
    //   minWidth: 700,
    },
  });

class DisplayTable extends React.Component{
    
    render(){
        console.log('issues count---',this.props.issues);
        const { classes } = this.props;
        return(
        <Paper className={classes.root} id="paper">
          <Table id="table" className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>Total Issues</TableCell>
                <TableCell>Last 24 hours Issues</TableCell>
                <TableCell>Last 7 Days Issues</TableCell>
                <TableCell>7 Days ago's Issues</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
                <TableRow>
                  <TableCell>{this.props.issues}</TableCell>
                  <TableCell>{this.props.last24}</TableCell>
                  <TableCell>{this.props.last7Days}</TableCell>
                  <TableCell>{this.props.moreThan7Days}</TableCell>
                </TableRow>
            </TableBody>
          </Table>  
        </Paper>
    )
  }
}
DisplayTable.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  export default withStyles(styles)(DisplayTable);