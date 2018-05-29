import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, Alert } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as listingsActions from '../../actions/listings/listingsActions';
import SubmitListing from '../../components/Listings/SubmitListing';

class EditListingScreen extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.handleSubmitEditListing = this.handleSubmitEditListing.bind(this);
  }

  handleSubmitEditListing(listingId, title, type, description) {
    this.props.editListing(listingId, title, type, description).then(() => {
      if (this.props.editedSuccessful) {
        Alert.alert(
          'Success',
          'You have successfully updated your listing.',
        );
        this.props.navigator.pop();
      } else {
        Alert.alert(
          'Failed',
          'Something went wrong, and your listing hasn\'t been successfully updated',
        );
      }
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <SubmitListing
          title={this.props.title}
          price={this.props.price}
          game={this.props.game}
          description={this.props.description}
          type={this.props.type}
          submitClicked={this.handleSubmitEditListing}
        />
      </View>
    );
  }

}

EditListingScreen.propTypes = {
  title: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  game: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  editListing: PropTypes.func.isRequired,
  navigator: PropTypes.object.isRequired,
  editedSuccessful: PropTypes.bool.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {

  },
});

function mapStateToProps(state) {
  return {
    editedSuccessful: state.listings.listingEdited,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    editListing: bindActionCreators(listingsActions.editListing, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditListingScreen);
