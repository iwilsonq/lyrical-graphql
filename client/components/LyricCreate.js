import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

class LyricCreate extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: ''
    };
  }

  onSubmit(event) {
    event.preventDefault();

    this.props.mutate({
      variables: {
        content: this.state.content,
        songId: this.props.songId
      }
    });
    this.setState({ content: '' });
  }

  render() {
    return (
      <form onSubmit={this.onSubmit.bind(this)}>
        <label htmlFor="lyric">Add a Lyric:</label>
        <input
          type="text"
          onChange={event => this.setState({ content: event.target.value })}
          value={this.state.content}
        />
      </form>
    );
  }
}

const mutation = gql`
  mutation AddLyricToSong($songId: ID, $content: String){
    addLyricToSong(content: $content, songId: $songId){
      id
      lyrics {
        id
        content
      }
    }
  }
`;

export default graphql(mutation)(LyricCreate);
