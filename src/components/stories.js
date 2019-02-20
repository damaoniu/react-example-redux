import React, {Component} from 'react';
import {connect} from 'react-redux';
import Story from './story'
import './stories.css'

class Stories extends Component {

    render() {
        let stories = this.props.stories;
        return (
            <div className='Stories'>
                {(stories.length > 0) ? stories.map((story, i) => (
                    <Story key={story.id} rank={i + 1} story={story}></Story>)) : (
                    <div className='loader'>
                        <span className='loader-spinner'></span>
                        Loading...
                    </div>
                )}

            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        test: state.hackers.test,
        stories: state.hackers.stories
    }
}
Stories.defaultProps = {
    stories: []
};

export default connect(mapStateToProps)(Stories);