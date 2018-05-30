import React, { Component } from 'react';
import { connect } from 'react-redux'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import * as moment from 'moment';
import { fetchItems } from './actions';
import './App.css';

class App extends Component {

  componentDidMount() {
    const { dispatch } = this.props
    dispatch(fetchItems())
  }

  render() {
    const { isFetching, items } = this.props
    return (
      <div className="root">
        <AppBar position="static">
          <Toolbar>
            <Typography variant="title" color="inherit" className="flex">Hacker News</Typography>
          </Toolbar>
        </AppBar>
        {isFetching && items.length === 0 && <h2>Loading...</h2>}
        <List>
          {items.map((item, i) => 
            <ListItem key={i}>
              <Avatar>
                {item.title.substring(0, 1)}
              </Avatar>
              <ListItemText primary={item.title} secondary={`${item.score}점 by ${item.by} / ${moment().diff(moment.unix(item.time), 'hours')}시간 전 /${item.descendants}개의 코멘트`} />
            </ListItem>
          )}
        </List>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { fetchItems } = state

  const {
    isFetching,
    lastUpdated,
    items
  } = fetchItems || {
    isFetching: true,
    items: []
  }

  return {
    items,
    isFetching,
    lastUpdated
  }
}
export default connect(mapStateToProps)(App)