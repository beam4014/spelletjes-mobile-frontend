import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import PropTypes from 'prop-types';


class ListingRow extends React.Component {
  render() {
    return (
      <TouchableOpacity
        onPress={this.props.onPress}
        style={styles.container}
      >
        <Image
          style={styles.headerImage}
          source={{ uri: 'http://images.vg247.com/current//2013/11/mario-party-island-tour-header-112313.jpg' }}
        />
        <View style={styles.content}>
          <View style={styles.top}>
            <Text style={[styles.text, styles.title]}>{this.props.listing.title}</Text>
            <Text style={[styles.text, styles.type]}>{this.props.listing.type.toUpperCase()}
              {
                this.props.listing.secondary_type
                  ?  <Text style={[styles.text, styles.type]}>
                    /{this.props.listing.secondary_type.toUpperCase()}
                  </Text>
                  : false
              }
              </Text>

          </View>
          {
            this.props.listing.asking_price
              ? <Text style={styles.text}>{this.props.listing.asking_price.toString()} EUR</Text>
              : false
          }
        </View>
      </TouchableOpacity>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e67e22',
    marginBottom: 10,
  },
  content: {
    padding: 10,
  },
  headerImage: {
    width: '100%',
    height: 50,
  },
  text: {
    color: '#fff',
  },
  title: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  top: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  type: {
    color: '#e67e22',
    backgroundColor: '#fff',
    padding: 5,
  },
});

ListingRow.propTypes = {
  listing: PropTypes.object.isRequired,
  onPress: PropTypes.func.isRequired,
};

export default ListingRow;
