import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 40,
    alignItems: 'center', // horizontally center all child elements
  },
  titleContainer: {
    backgroundColor: '#fff',
    marginBottom: 20,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10,
  },
  secondaryContainer: {
    flex: 1,
    backgroundColor: '#FFC27F',
    paddingHorizontal: 20,
    paddingVertical: 40,
    alignItems: 'center', // horizontally center all child elements
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#007AFF',
    textAlign: 'center',
  },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
  },
  headerText: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#007AFF',
    textAlign: 'center',
  },
  contentText: {
    fontSize: 16,
    color: '#4A4A4A',
    marginBottom: 20,
    alignContent: 'left',
  },
  input: {
    height: 50,
    borderColor: '#DDDDDD',
    width: '80%',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 20,
    marginBottom: 20,
    fontSize: 16,
    color: '#4A4A4A',
  },
  button: {
    backgroundColor: '#007AFF',
    height: 50,
    width: '80%',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  secondaryButtonText: {
    color: "#007AFF",
    fontSize: 16,
    textAlign: "center",
    marginTop: 20,
  },
  secondaryButtonTextHighlight: {
    color: "#FF8500",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 20,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
  footerText: {
    fontSize: 16,
    color: '#9B9B9B',
    marginRight: 10,
  },
  footerButton: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007AFF',
  },
});
