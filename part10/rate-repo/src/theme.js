import {Platform} from 'react-native';

const theme = {
  colors: {
    textPrimary: '#24292e',
    textSecondary: '#FFFFFF',
    separator: '#dddedc', 
    primary: '#0366d6',
    appbar: '#3c9600',
  },
  fontSizes: {
    body: 14,
    subheading: 16,
    heading:20,
  },
  fonts: {
    main: Platform.select({
      ios: 'Arial',
      android: 'Roboto',
      default: 'System'
    })
  },
  fontWeights: {
    normal: '400',
    bold: '700',
  }, 
  button: {
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderRadius: 3,
    marginVertical: 3,
  },
  buttonText:{
    justifyContent: 'space-around',
    color: '#FFFFFF',
    fontWeight: 'bold',
    paddingVertical: 5,
    paddingHorizontal: 15,
  },
  textField:{
    padding: 5,
    borderRadius: 3,
    borderWidth: 1,
    marginTop: 10,
  },
};

theme.button.backgroundColor = theme.colors.primary;
theme.textField.borderColor = theme.colors.separator;

export default theme;