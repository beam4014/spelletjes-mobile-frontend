import React from 'react';
import PropTypes from 'prop-types';
import Spinner from 'react-native-loading-spinner-overlay';
import { View, StyleSheet, Alert } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as listingsActions from '../../actions/listings/listingsActions';
import EditListing from '../../components/listings/EditListing';

class EditListingScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
    this.handleSubmitEditListing = this.handleSubmitEditListing.bind(this);
  }

  handleSubmitEditListing(title, price, description) {
    this.setState({
      loading: true,
    });
    this.props.editListing(this.props.listingId, title, price, description).then(() => {
      this.setState({
        loading: false,
      });
      setTimeout(() => {
        if (this.props.listingEdited) {
          Alert.alert(
            'Success',
            'You have successfully updated your listing.',
          );
          this.props.navigator.pop();
        } else {
          Alert.alert(
            'Failed',
            'Something went wrong...',
          );
        }
      });
    });
  }

  render() {
    if (this.state.loading) {
      return (
        <Spinner
          visible={this.state.loading}
          textContent="Submitting"
          color="white"
          overlayColor="orange"
        />
      );
    }
    return (
      <View style={styles.container}>
        <EditListing
          title={this.props.title}
          price={this.props.price}
          type={this.props.type}
          description={this.props.description}
          submitClicked={this.handleSubmitEditListing}
        />
      </View>
    );
  }

}

EditListingScreen.propTypes = {
  listingId: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  editListing: PropTypes.func.isRequired,
  description: PropTypes.string.isRequired,
  navigator: PropTypes.object.isRequired,
  listingEdited: PropTypes.bool.isRequired,
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
    listingEdited: state.listings.listingEdited,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    editListing: bindActionCreators(listingsActions.editListing, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditListingScreen);
