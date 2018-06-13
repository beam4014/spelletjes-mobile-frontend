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
  componentDidMount() {
    this.props.fetchGames().then(() => {
      this.setState({
        games: this.props.games,
      });
    });
  }
  onPressSubmitListing = (title, gameId, gameTitle, gameImage, type, secondaryType, price, description) => {
    this.setState({ loading: !this.state.loading });
    setTimeout(() => {
      this.props.submitListing(title, gameId, gameTitle, gameImage, type, secondaryType, price, description).then(() => {
        this.setState({ loading: !this.state.loading }); // stop showing loading
        // check if user is registered using the state registered in redux
        if (this.props.isSubmitted) {
          setTimeout(() => {
            this.props.navigator.pop();
            setTimeout(() => {
              Alert.alert('Listing Submission is Successful');
            }, 200); // show alert of successful registration
          }, 300);
        } else {
          Alert.alert(
            'Listing Submission Failed',
            'Make sure you have filled out all fields correctly.',
          );
        }
      });
    }, 400);
  }


  render() {
    if (this.state.loading) {
      return (
        <Spinner
          visible={this.state.loading}
          textContent="Submitting Listing"
          color="#FFFFFF"
          overlayColor="#e67e22"
        />
      );
    }
    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <SubmitListing
            title=""
            type=""
            games={this.state.games}
            price=""
            description=""
            submitClicked={this.onPressSubmitListing}
          />
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
    games: state.listings.games,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchGames: bindActionCreators(listingsActions.fetchGames, dispatch),
    submitListing: bindActionCreators(listingsActions.submitListing, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SubmitListingScreen);
