import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';

import AlbumFieldSearch from './AlbumFieldSearch.js';
import RelationshipConfig from './RelationshipConfig.js';

class RelationshipSubmitter extends Component {
  constructor(props) {
    super(props);
    this.handleRelationshipSubmit = this.handleRelationshipSubmit.bind(this);
    this.handleACClick = this.handleACClick.bind(this);
    this.updateMessage = this.updateMessage.bind(this);
    this.state = {
      relationshipMessage: '',
      selectedAlbums: [
        {},
        {},
      ],
    };
  }
  handleRelationshipSubmit(event) {
    event.preventDefault();
    const sourceAlbum = this.state.selectedAlbums[0]._id;
    const targetAlbum = this.state.selectedAlbums[1]._id;
    const weightInput = this.state.relationshipMessage;

    const relationship = {
      source: {
        albumId: sourceAlbum,
        message: weightInput,
      },
      target: {
        albumId: targetAlbum,
        message: weightInput,
      },
    };

    Meteor.call('albums.updateRelationship', relationship);
    this.state.relationshipMessage = '';
    this.setState({
      relationshipMessage: '',
      selectedAlbums: [
        {},
        {},
      ],
    });
  }
  handleACClick(clicked, id) {
    const albumFound = this.props.albums.find(album => album.albumId === clicked.value);
    const newSelectedAlbums = this.state.selectedAlbums;
    newSelectedAlbums[id] = albumFound;
    this.setState({
      selectedAlbums: newSelectedAlbums,
    });
  }
  updateMessage(relationshipMessage) {
    this.setState({
      relationshipMessage,
    });
  }
  render() {
    return (
      <div className="relationship-submitter-container row" ref={(node) => { this.node = node; }}>
        <AlbumFieldSearch
          albums={this.props.albums}
          handleACClick={this.handleACClick}
          albumFound={this.state.selectedAlbums[0]}
          id={0}
        />
        <AlbumFieldSearch
          albums={this.props.albums}
          handleACClick={this.handleACClick}
          albumFound={this.state.selectedAlbums[1]}
          id={1}
        />
        <RelationshipConfig
          message={this.state.relationshipMessage}
          updateMessage={this.updateMessage}
          handleRelationshipSubmit={this.handleRelationshipSubmit}
        />
      </div>
    );
  }
}

RelationshipSubmitter.propTypes = {
  albums: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default RelationshipSubmitter;
