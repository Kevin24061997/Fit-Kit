import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
  },
  inputText: {
    color: 'white',
    fontSize: 28,
    textAlign: 'center',
  },
  inputField: {
    backgroundColor: 'black',
    color: 'white',
    fontSize: 28,
    padding: 10,
    textAlign: 'center',
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
