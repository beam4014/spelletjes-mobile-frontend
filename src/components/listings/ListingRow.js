import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';


class ListingRow extends React.Component {
  render() {
    return (
      <TouchableOpacity
        onPress={this.props.onPress}
        style={styles.container}
      >
        <Text style={styles.text}>{this.props.listing.title}</Text>
        <Text style={styles.text}>Type: {this.props.listing.type}</Text>
        <Text style={styles.text}>Price: {this.props.listing.asking_price.toString()}</Text>

      </TouchableOpacity>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#e67e22',
  },
  text: {
    color: '#fff',
  },
});

ListingRow.propTypes = {
  listing: PropTypes.object.isRequired,
  onPress: PropTypes.func.isRequired,
};

export default ListingRow;
