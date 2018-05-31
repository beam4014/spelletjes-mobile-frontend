import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as listingActions from '../../actions/listings/listingsActions';

class Report extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reason: '',
    };
    this.onChangeReason = this.onChangeReason.bind(this);
    this.onPressReport = this.onPressReport.bind(this);
  }
  onChangeReason(text) {
    this.setState({
      reason: text,
    });
  }
  onPressReport() {
    this.props.reportListing(this.props.listingId, this.state.reason).then(() => {
      if (this.props.listingReported) {
        this.props.navigator.dismissLightBox();
        setTimeout(() => {
          Alert.alert('Listing reported');
        }, 300);
      } else {
        this.props.navigator.dismissLightBox();
        setTimeout(() => {
          Alert.alert('Something went wrong');
        }, 300);
      }
    });
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <TextInput
            value={this.state.reason}
            onChangeText={this.onChangeReason}
            placeholder="Reason of report"
          />
          <TouchableOpacity
            style={styles.button}
            onPress={this.onPressReport}
          >
            <Text style={styles.text}>Report listing</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

Report.propTypes = {
  reportListing: PropTypes.func.isRequired,
  listingReported: PropTypes.bool.isRequired,
  listingId: PropTypes.number.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    height: 200,
  },
  content: {
    flex: 1,
    padding: 10,
  },
  button: {
    backgroundColor: 'red',
    padding: 5,
    borderRadius: 5,
  },
  text: {
    fontSize: 13,
    color: '#fff',
  },
});

function mapStateToProps(state, ownProps) {
  return {
    listingReported: state.listings.listingReported,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    reportListing: bindActionCreators(listingActions.reportListing, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Report);
