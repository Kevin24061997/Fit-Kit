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


// EinzelÜbungsScreen########################################

container1: {
  flex: 21,
  backgroundColor: 'darkblue',
  height: 400,
  borderRadius: 10,
  padding: 10,
  marginBottom: - 30,
},
content1: {
  flexDirection: 'row',
  alignItems: 'center',
},
listContainer1: {
  flex: 1,
},
listItem1: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: 20,
  paddingHorizontal: 10,
},
xContainer: {
  flexDirection: 'column',
  alignItems: 'center',
},
xListItem: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: 19,
  paddingHorizontal: 10,
},
indexText1: {
  fontSize: 20,
  marginRight: 10,
  color: 'white',
},
itemText1: {
  fontSize: 20,
  flex: 1,
  color: 'white',
  marginLeft: 50,
},
xText: {
  marginTop: 1,
  fontSize: 20,
  color: 'white',
},
invisible: {
  opacity: 0, // Mach das erste X unsichtbar
  fontSize: 13,
  fontWeight: 'bold',
  color: 'white',
  marginBottom: 10,
},
checkbox1: {
  width: 20,
  height: 20,
  borderWidth: 1,
  borderColor: 'black',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'white',
},
checkedCheckbox1: {
  backgroundColor: 'green',
},
headerText1: {
  fontSize: 21,
  fontWeight: 'bold',
  color: 'white',
  marginBottom: 10,
  marginTop: 10,
},
buttonsContainer1: {
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: 35,
},
button1: {
  backgroundColor: 'darkblue',
  width: 40,
  height: 40,
  borderRadius: 20,
  justifyContent: 'center',
  alignItems: 'center',
  marginHorizontal: 10,
},
buttonText1: {
  fontSize: 24,
  fontWeight: 'bold',
  color: 'white',
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

inputDescription: {
  color: 'gray',
  fontSize: 21,
  fontWeight: 'bold',
},

input: {
  color: 'silver',
  fontSize: 21,
  fontWeight: 'bold',
},

modalContent1: {
  width: 320,
  height: 500,
  backgroundColor: 'black',
  padding: 20,
  borderRadius: 10,
  alignItems: 'center',
},

difficultyButton: {
  width: 100,
  height: 40,
  borderRadius: 20,
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom: 10,
},

headingStyle: {
  textAlign: 'center',
  fontSize: 20,
  fontWeight: 'bold',
  color: 'white',
  marginBottom: 0,
  marginTop: - 30,
  marginLeft: 40,
},

headingStyle1: {
  textAlign: 'center',
  fontSize: 26,
  fontWeight: 'bold',
  color: 'white',
  marginBottom: 10,
  marginTop: 0,
  marginLeft: 40,
},

mainseite: {
  flex: 1,
  backgroundColor: 'black', // Hintergrundfarbe auf Schwarz setzen
},

infoTagBilder: {
  height: 180,
  width: 140,
  margin: 9,
  marginTop: 0,
  borderRadius: 10
},

});