import React, { Component } from 'react';
import PropTypes from 'prop-types';

import AutoComplete from 'material-ui/AutoComplete';


export default class AlbumFieldSearch extends Component {
  constructor(props) {
    super(props);
    this.handleUpdateInput = this.handleUpdateInput.bind(this);
    this.state = {
      searchResults: [],
    };
  }
  handleUpdateInput(value) {
    const newSearchResults = [];
    this.props.albums.map((album) => {
      const albumName = album.albumInfo.albumName;
      if (albumName.includes(value)) {
        newSearchResults.push(albumName);
      }
    });
    this.setState({
      searchResults: newSearchResults,
    });
  }
  render() {
    return (
      <div className="album-field-search-container">
        <AutoComplete
          hintText="search album"
          dataSource={this.state.searchResults}
          onUpdateInput={this.handleUpdateInput}
        />
      </div>
    );
  }
}


AlbumFieldSearch.propTypes = {
  albums: PropTypes.arrayOf(PropTypes.object).isRequired,
};