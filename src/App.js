import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import {Route} from 'react-router-dom';
import Storeis from './components/stories';
import {connect} from 'react-redux';
import {storiesRef, fetchItems} from './services/hnServices';
import addHackerNews from './actions/hacker';

class App extends Component {
    componentWillMount() {
        let storeRef = storiesRef('topstories');
        storeRef.limitToFirst(30).on('value', (snapshot) => {
            fetchItems(snapshot.val()).then(stories => {
                this.props.onStoriesUpdated(stories);
            });

        })

    }

    componentDidMount() {
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h1 className="App-title">Top Hacker News</h1>
                </header>
                <div className='App-content'>
                    <Route path="/" component={Storeis}/>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return state;
}
const mapDispatchToProps = (dispatch) => ({
    onStoriesUpdated: (stories) => dispatch(addHackerNews(stories))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
