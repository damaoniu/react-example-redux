import React, {Component} from 'react';
import {fetchItems} from '../services/hnServices'
import './story.css';

class Story extends Component {
    constructor(props) {
        super(props);
        this.state = {
            topCommenters: null,
            loaded: false
        };
    }

    componentWillMount() {
        if (this.props.story.kids) {
            fetchItems(this.props.story.kids).then((comments) => {
                comments = comments.map(c => c.val());
                let sortedCommenter = {};
                comments.forEach(c => {
                    if (sortedCommenter[c.by]) {
                        sortedCommenter[c.by] += 1;
                    } else {
                        sortedCommenter[c.by] = 1;
                    }

                });
                let sortedCommenterArray = Object.keys(sortedCommenter).map(k => {
                    return {key: k, value: sortedCommenter[k]};
                }).sort((a, b) => b.value - a.value);
                this.setState({
                    topCommenters: sortedCommenterArray.slice(0, 10),
                    loaded: true
                });
            })
        } else {
            this.setState({
                loaded: true
            });
        }

    }

    renderCommenters(commenters) {
        if (commenters) {
            if (commenters.length > 0) {
                return commenters.map((c, i) => (
                    <li key={i}>{c.key}: {c.value}</li>));
            }

        }
        if (this.state.loaded) {
            return (
                <span> No commenters yet!</span>
            );
        }
        return (
            <div className='comment-loader'>
                <span className='loader-spinner'></span>Loading ...
            </div>

        );

    }

    render() {
        let story = this.props.story;
        let topCommenters = this.state.topCommenters;
        return (
            <div className='story'>
                <div><span className='story-rank'>{this.props.rank}</span><span
                    className='story-title'>{story.title}</span></div>
                <div className='commenters'>
                    <h5>Top Commenters: </h5>
                    <ul className='commenters-list'>
                        {this.renderCommenters(topCommenters)}
                    </ul>
                </div>

            </div>
        )
    }
}

export default Story;