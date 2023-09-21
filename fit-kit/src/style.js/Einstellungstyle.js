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
  columnrechnung: {
    padding: 10,
    height: 80,
    width: 165,
    backgroundColor: 'dimgray',
    borderRadius: 10,
    margin: 5,
    alignItems: 'center',
  },
  textWhite: {
    color: 'white',
    fontSize: 20,
  },
  input: {
    color: 'silver',
    fontSize: 21,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'black',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  goalButton: {
    width: 160,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText1: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  
});
