import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
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
      flex: 1, // Fülle den verfügbaren Raum aus
      backgroundColor: 'black', // Grauer Hintergrund für den Container
      maxHeight: 600,
      padding: 20, // Innenabstand des Containers
    },
    infoBlock: {
      flexDirection: 'row',
      backgroundColor: 'darkblue', // Schwarzer Hintergrund für die Info-Blöcke
      height: 200,
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
      color: 'white', // Grauer Text für "Einstellung" und "Training"
      fontSize: 22,
      marginRight: 20,
      marginLeft: 20,
      marginTop: 10,
    },
    sectionContainer: {
      flexDirection: 'row', // Container nebeneinander
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
      flex: 1, // Fülle den verfügbaren Raum aus
      backgroundColor: 'black', // Grauer Hintergrund für den Container
      maxHeight: 800,
      padding: 20, // Innenabstand des Containers
      
    },
    ÜbungsBlock: {
      flexDirection: 'row',
      backgroundColor: 'darkblue', // Schwarzer Hintergrund für die Info-Blöcke
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
  });

export default styles;