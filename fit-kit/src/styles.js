import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  
  container: {
    flex: 1,
    backgroundColor: 'darkblue',
    padding: 0,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    marginRight: 10,
    marginLeft: 10,
    marginTop: 0,
  },
  dayContainer: {
    alignItems: 'center',
  },
  dayText: {
    color: 'white',
    fontSize: 26,
  },
  dateText: {
    color: 'white',
    fontSize: 22,
  },

  infoBlockContainer: {
    flex: 1,
    backgroundColor: 'black',
    padding: 20, // Innenabstand des Containers
  },

  infoBlock: {
    flexDirection: 'row',
    backgroundColor: 'darkblue',
    height: 200,
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
  },
  Wiederholungen: {
    flexDirection: 'row',
    backgroundColor: 'darkblue',
    height: 400,
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
  },
  infoText: {
    color: 'white',
    flex: 1,
    marginRight: 10,
  },
  infoImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  sectionText: {
    color: 'white',
    fontSize: 22,
    marginRight: 20,
    marginLeft: 20,
    marginTop: 10,
  },
  sectionContainer: {
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between', // Container nebeneinander mit Abstand
  },
  sectionContainer1: {
    marginTop: 100,
    marginBottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-between', // Container nebeneinander mit Abstand
  },
  currentDateText: {
    color: 'red',
    fontSize: 22,
    fontWeight: 'bold',
  },
  timerText: {
    fontSize: 20,
    color: 'white',
  },
  buttonContainer: {
    marginTop: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  // #####################################
  ÜbungsBlockContainer: {
    flex: 1,
    backgroundColor: 'black',
    maxHeight: 800,
    padding: 20, // Innenabstand des Containers
  },
  ÜbungsBlock: {
    flexDirection: 'row',
    backgroundColor: 'darkblue',
    height: 150,
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
  },
  infoText: {
    color: 'white',
    flex: 1,
    marginRight: 10,
  },
  buttonContainer1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  buttonText1: {
    fontSize: 16,
    color: 'white',
  },

  timerControls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    
  },
  controlButton: {
    color: 'blue',
    fontSize: 18,
  },
  timerDisplay: {
    color: 'white',
    fontSize: 24,
  },
  timecontainer: {
    position: 'absolute', // Position absolut setzen
    top: 10, // Abstand zum oberen Rand
    right: 10, // Abstand zum rechten Rand
    backgroundColor: 'black', // Hintergrundfarbe auf schwarz setzen
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    borderRadius: 10
  },

});
