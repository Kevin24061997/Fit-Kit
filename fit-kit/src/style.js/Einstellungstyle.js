import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: 'black', // Hintergrundfarbe der ScrollView
  },

  container: {
    backgroundColor: 'black',
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 10,
    justifyContent: 'space-between',
  },
  column: {
    padding: 10,
    height: 80,
    width: 165,
    backgroundColor: 'darkblue',
    borderRadius: 10,
    margin: 5,
    alignItems: 'center',
  },
  textWhite: {
    color: 'white',
    fontSize: 20,
  },
  input: {
    color: 'gray',
    fontSize: 22,
    fontWeight: 'bold',
  }
});
