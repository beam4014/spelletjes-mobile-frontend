import React from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import PropTypes from 'prop-types';

import Spinner from 'react-native-loading-spinner-overlay';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import SubmitListing from '../../components/Listings/SubmitListing';
import * as listingsActions from '../../actions/listings/listingsActions';

class SubmitListingScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
    this.onPressSubmitListing = this.onPressSubmitListing.bind(this);
  }

  onPressSubmitListing = (title, gameId, type, price, description) => {
    this.setState({ loading: !this.state.loading });
    setTimeout(() => {
      this.props.submit(title, gameId, type, price, description).then(() => {
        this.setState({ loading: !this.state.loading }); // stop showing loading
        // check if user is registered using the state registered in redux
        if (this.props.isSubmitted) {
          setTimeout(() => {
            this.props.navigator.pop(); // go back to login page
            setTimeout(() => {
              Alert.alert('Submit Successful');
            }, 200); // show alert of successful registration
          }, 300);
        } else {
          Alert.alert(
            'Registration Unsuccessful',
            'Make sure you have filled out all fields correctly.',
          ); // show unsuccessful alert
        }
      });
    }, 400);
  }


  render() {
    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <SubmitListing submitClicked={this.onPressSubmitListing} />
        </View>
      </View>
    );
  }
}

SubmitListingScreen.propTypes = {

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
    isSubmitted: state.listings.submittedListing,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    submittedListing: bindActionCreators(listingsActions.submitListing, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SubmitListingScreen);
